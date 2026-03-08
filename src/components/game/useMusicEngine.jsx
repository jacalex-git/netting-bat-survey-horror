import { useEffect, useRef, useState, useCallback } from "react";

// ── Scene → mood mapping ──────────────────────────────────────────────────────
const HORROR_SCENES = new Set([
  "creature", "mist", "cave",
  "ending_cave", "ending_absorbed", "ending_darkness"
]);

function getMood(scene) {
  return HORROR_SCENES.has(scene) ? "horror" : "tense";
}

// ── Note frequencies (Hz) ─────────────────────────────────────────────────────
const N = {
  A1: 55.00,
  E2: 82.41,
  A2: 110.00,
  Bb2: 116.54,
  C3: 130.81,
  E3: 164.81,
  F3: 174.61,
  G3: 196.00,
  A3: 220.00,
};

// ── Mood parameter sets ───────────────────────────────────────────────────────
const MOODS = {
  tense: {
    bassFreq: N.A1,
    bassGain: 0.15,
    padFreq: N.A2,
    padDetuneCents: 7,
    padFilterFreq: 900,
    lfoRate: 0.15,
    lfoDepth: 150,
    arpNotes: [N.A2, N.C3, N.E3, N.G3],   // Am7 arpeggio
    arpIntervalMs: 1800,
    arpGain: 0.11,
  },
  horror: {
    bassFreq: N.A1,
    bassGain: 0.24,
    padFreq: N.E2,
    padDetuneCents: 14,                     // wider detune = more unsettling
    padFilterFreq: 420,
    lfoRate: 0.07,
    lfoDepth: 270,
    arpNotes: [N.A2, N.Bb2, N.E3, N.F3],  // chromatic tension
    arpIntervalMs: 2600,
    arpGain: 0.07,
  },
};

// ─────────────────────────────────────────────────────────────────────────────

export default function useMusicEngine(scene, isMuted) {
  const [started, setStarted] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef(null);
  const moodRef = useRef(getMood(scene));
  const arpIndexRef = useRef(0);
  const startedOnceRef = useRef(false);

  // ── Build the audio graph ─────────────────────────────────────────────────
  const buildGraph = useCallback((ctx) => {
    // Master output
    const master = ctx.createGain();
    master.gain.value = 0.75;
    master.connect(ctx.destination);

    // ── BASS: sawtooth through lowpass, with slow tremolo ──────────────────
    const bassOsc = ctx.createOscillator();
    bassOsc.type = "sawtooth";
    bassOsc.frequency.value = N.A1;

    const bassFilter = ctx.createBiquadFilter();
    bassFilter.type = "lowpass";
    bassFilter.frequency.value = 200;
    bassFilter.Q.value = 2.2;

    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.15;

    // Slow tremolo on bass (pulsing drone feel)
    const bassTremoloOsc = ctx.createOscillator();
    bassTremoloOsc.type = "sine";
    bassTremoloOsc.frequency.value = 0.45;
    const bassTremoloDepth = ctx.createGain();
    bassTremoloDepth.gain.value = 0.05;
    bassTremoloOsc.connect(bassTremoloDepth);
    bassTremoloDepth.connect(bassGain.gain);
    bassTremoloOsc.start();

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(master);
    bassOsc.start();

    // ── PAD: two detuned sawtooths (80s chorus/ensemble) ──────────────────
    const padOsc1 = ctx.createOscillator();
    padOsc1.type = "sawtooth";
    padOsc1.frequency.value = N.A2;
    padOsc1.detune.value = -7;

    const padOsc2 = ctx.createOscillator();
    padOsc2.type = "sawtooth";
    padOsc2.frequency.value = N.A2;
    padOsc2.detune.value = 7;

    const padFilter = ctx.createBiquadFilter();
    padFilter.type = "lowpass";
    padFilter.frequency.value = 900;
    padFilter.Q.value = 1.8;

    const padGain = ctx.createGain();
    padGain.gain.value = 0.065;

    padOsc1.connect(padFilter);
    padOsc2.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(master);
    padOsc1.start();
    padOsc2.start();

    // ── LFO modulating pad filter cutoff ──────────────────────────────────
    const lfoOsc = ctx.createOscillator();
    lfoOsc.type = "sine";
    lfoOsc.frequency.value = 0.15;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150;

    lfoOsc.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfoOsc.start();

    // ── Shared delay/reverb loop (for arp and stabs) ───────────────────────
    const delay = ctx.createDelay(0.6);
    delay.delayTime.value = 0.28;

    const feedback = ctx.createGain();
    feedback.gain.value = 0.38;

    const delayWet = ctx.createGain();
    delayWet.gain.value = 0.42;

    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayWet);
    delayWet.connect(master);

    // ── ARP: triangle wave through bandpass, into reverb ──────────────────
    const arpOsc = ctx.createOscillator();
    arpOsc.type = "triangle";
    arpOsc.frequency.value = N.A2;

    const arpEnv = ctx.createGain();
    arpEnv.gain.value = 0;

    const arpFilter = ctx.createBiquadFilter();
    arpFilter.type = "bandpass";
    arpFilter.frequency.value = 1400;
    arpFilter.Q.value = 0.7;

    const arpGain = ctx.createGain();
    arpGain.gain.value = 0.11;

    arpOsc.connect(arpEnv);
    arpEnv.connect(arpFilter);
    arpFilter.connect(arpGain);
    arpGain.connect(master);      // dry
    arpFilter.connect(delay);     // wet (into reverb)

    arpOsc.start();

    // ── STABS: high sawtooth stab, high reverb, occasional ────────────────
    const stabOsc = ctx.createOscillator();
    stabOsc.type = "sawtooth";
    stabOsc.frequency.value = N.A3;

    const stabEnv = ctx.createGain();
    stabEnv.gain.value = 0;

    const stabFilter = ctx.createBiquadFilter();
    stabFilter.type = "bandpass";
    stabFilter.frequency.value = 1800;
    stabFilter.Q.value = 1.3;

    const stabGain = ctx.createGain();
    stabGain.gain.value = 0.09;

    stabOsc.connect(stabEnv);
    stabEnv.connect(stabFilter);
    stabFilter.connect(stabGain);
    stabGain.connect(delay);      // mostly wet (high reverb)

    stabOsc.start();

    return {
      master,
      bassOsc, bassFilter, bassGain,
      padOsc1, padOsc2, padFilter, padGain,
      lfoOsc, lfoGain,
      arpOsc, arpEnv, arpFilter, arpGain,
      stabOsc, stabEnv, stabFilter, stabGain,
    };
  }, []);

  // ── initAudio — must be called from a user gesture ────────────────────────
  const initAudio = useCallback(() => {
    if (startedOnceRef.current) {
      if (ctxRef.current?.state === "suspended") ctxRef.current.resume();
      return;
    }
    startedOnceRef.current = true;

    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    ctxRef.current = ctx;

    const nodes = buildGraph(ctx);
    nodesRef.current = nodes;

    // Immediately set initial mood (always "tense" at game start)
    const p = MOODS.tense;
    moodRef.current = "tense";
    nodes.bassGain.gain.setValueAtTime(p.bassGain, ctx.currentTime);
    nodes.padFilter.frequency.setValueAtTime(p.padFilterFreq, ctx.currentTime);
    nodes.lfoOsc.frequency.setValueAtTime(p.lfoRate, ctx.currentTime);
    nodes.lfoGain.gain.setValueAtTime(p.lfoDepth, ctx.currentTime);
    nodes.arpGain.gain.setValueAtTime(p.arpGain, ctx.currentTime);

    setStarted(true);
  }, [buildGraph]);

  // ── Arpeggio scheduler ────────────────────────────────────────────────────
  useEffect(() => {
    if (!started) return;
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    let timer;

    const fire = () => {
      const mood = moodRef.current;
      const p = MOODS[mood];
      const freq = p.arpNotes[arpIndexRef.current % p.arpNotes.length];
      arpIndexRef.current++;

      const now = ctx.currentTime;
      nodes.arpOsc.frequency.setValueAtTime(freq, now);
      nodes.arpEnv.gain.cancelScheduledValues(now);
      nodes.arpEnv.gain.setValueAtTime(0, now);
      nodes.arpEnv.gain.linearRampToValueAtTime(1, now + 0.05);
      nodes.arpEnv.gain.setTargetAtTime(0, now + 0.12, 0.28);

      timer = setTimeout(fire, MOODS[moodRef.current].arpIntervalMs);
    };

    fire();
    return () => clearTimeout(timer);
  }, [started]);

  // ── Occasional high pad stab ──────────────────────────────────────────────
  useEffect(() => {
    if (!started) return;
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    const stabNotes = [N.A3, N.E3, N.C3, N.G3];
    let timer;

    const fire = () => {
      const now = ctx.currentTime;
      const freq = stabNotes[Math.floor(Math.random() * stabNotes.length)];
      nodes.stabOsc.frequency.setValueAtTime(freq, now);
      nodes.stabEnv.gain.cancelScheduledValues(now);
      nodes.stabEnv.gain.setValueAtTime(0, now);
      nodes.stabEnv.gain.linearRampToValueAtTime(0.9, now + 0.012);
      nodes.stabEnv.gain.setTargetAtTime(0, now + 0.025, 0.18);

      timer = setTimeout(fire, 5000 + Math.random() * 8000);
    };

    timer = setTimeout(fire, 3000 + Math.random() * 3000);
    return () => clearTimeout(timer);
  }, [started]);

  // ── Scene → mood crossfade ────────────────────────────────────────────────
  useEffect(() => {
    if (!started || !ctxRef.current || !nodesRef.current) return;
    const newMood = getMood(scene);
    if (newMood === moodRef.current) return;
    moodRef.current = newMood;

    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    const p = MOODS[newMood];
    const now = ctx.currentTime;
    const tc = 1.1; // time constant → ~3s transition

    nodes.bassOsc.frequency.setTargetAtTime(p.bassFreq, now, tc);
    nodes.bassGain.gain.setTargetAtTime(p.bassGain, now, tc);
    nodes.padOsc1.frequency.setTargetAtTime(p.padFreq, now, tc);
    nodes.padOsc2.frequency.setTargetAtTime(p.padFreq, now, tc);
    nodes.padOsc1.detune.setTargetAtTime(-p.padDetuneCents, now, tc);
    nodes.padOsc2.detune.setTargetAtTime(p.padDetuneCents, now, tc);
    nodes.padFilter.frequency.setTargetAtTime(p.padFilterFreq, now, tc);
    nodes.lfoOsc.frequency.setTargetAtTime(p.lfoRate, now, tc);
    nodes.lfoGain.gain.setTargetAtTime(p.lfoDepth, now, tc);
    nodes.arpGain.gain.setTargetAtTime(p.arpGain, now, tc);
  }, [scene, started]);

  // ── Mute / unmute ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (!started || !nodesRef.current) return;
    const ctx = ctxRef.current;
    nodesRef.current.master.gain.setTargetAtTime(
      isMuted ? 0 : 0.75,
      ctx.currentTime,
      0.08
    );
  }, [isMuted, started]);

  // ── Cleanup ───────────────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      ctxRef.current?.close();
    };
  }, []);

  return { initAudio };
}