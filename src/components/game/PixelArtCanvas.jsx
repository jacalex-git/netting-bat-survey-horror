import React, { useRef, useEffect, useState } from "react";

const PALETTE = {
  black: "#0a0a0f",
  darkPurple: "#1a0a2e",
  purple: "#2d1b4e",
  deepGreen: "#0a2e1a",
  sickGreen: "#2e4a1a",
  mutedGreen: "#3a5a2a",
  amber: "#c4890a",
  dimAmber: "#8a6008",
  darkAmber: "#5a3f05",
  red: "#6a1a1a",
  darkRed: "#3a0a0a",
  white: "#c8c0b0",
  gray: "#3a3a4a",
  darkGray: "#1a1a2a",
  fogGray: "#2a2a3a",
  skin: "#8a7a6a",
  water: "#0a1a3a"
};

function drawPixel(ctx, x, y, color, scale) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, scale, scale);
}

function drawRect(ctx, x, y, w, h, color, scale) {
  ctx.fillStyle = color;
  ctx.fillRect(x * scale, y * scale, w * scale, h * scale);
}

// Seeded PRNG (xorshift32) — deterministic, no Math.random() in BG renders
function makeSeededRandom(seed) {
  let s = ((seed ^ 0xdeadbeef) >>> 0) || 1;
  return function () {
    s ^= s << 13;
    s ^= s >> 17;
    s ^= s << 5;
    return (s >>> 0) / 4294967296;
  };
}

function sceneSeed(scene) {
  let h = 5381;
  for (let i = 0; i < scene.length; i++) {
    h = (Math.imul(h, 33) ^ scene.charCodeAt(i)) >>> 0;
  }
  return h;
}

// ===================== BACKGROUND RENDERERS (static, seeded rand) =====================

function drawArrivalBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  for (let i = 0; i < w; i += 3) {
    const treeH = 20 + Math.sin(i * 0.7) * 10 + Math.cos(i * 0.3) * 5;
    for (let y = h - 40 - treeH; y < h - 40; y++) {
      if (rand() > 0.15) {
        drawPixel(ctx, i, y, PALETTE.darkPurple, scale);
        if (i + 1 < w) drawPixel(ctx, i + 1, y, PALETTE.darkPurple, scale);
      }
    }
  }
  for (let y = h - 40; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawPixel(ctx, x, y, rand() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
  for (let x = 20; x < w - 20; x++) {
    if (rand() > 0.6) {
      const y = h - 15 + Math.floor(rand() * 10);
      drawPixel(ctx, x, y, PALETTE.water, scale);
    }
  }
  const figX = 50, figY = h - 48;
  drawRect(ctx, figX - 2, figY - 7, 4, 2, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 3, figY - 5, 6, 6, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 2, figY + 1, 2, 4, PALETTE.darkGray, scale);
  drawRect(ctx, figX + 1, figY + 1, 2, 4, PALETTE.darkGray, scale);
  drawPixel(ctx, figX + 1, figY - 6, PALETTE.amber, scale);
}

function drawNetsBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  const treePositions = [15, 55, 85, 110];
  treePositions.forEach(tx => {
    drawRect(ctx, tx, 10, 3, h - 20, PALETTE.darkPurple, scale);
    for (let y = 5; y < 25; y++) {
      const spread = Math.max(0, 8 - Math.abs(y - 15));
      for (let x = tx - spread; x < tx + spread + 3; x++) {
        if (rand() > 0.3) drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  });
  drawRect(ctx, 16, 30, 1, 40, PALETTE.fogGray, scale);
  drawRect(ctx, 54, 30, 1, 40, PALETTE.fogGray, scale);
  for (let y = h - 15; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawPixel(ctx, x, y, rand() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
}

function drawBatCaptureBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);

  // Forest silhouette at top
  for (let i = 0; i < w; i += 7) {
    const treeH = 8 + Math.floor(Math.sin(i * 0.6) * 4);
    drawRect(ctx, i + 2, 0, 3, treeH + 3, PALETTE.darkPurple, scale);
    for (let y = 0; y < treeH; y++) {
      const sp = Math.max(0, 5 - Math.abs(y - treeH * 0.4));
      for (let x = i - sp; x <= i + sp + 3; x++) {
        if (x >= 0 && x < w && rand() > 0.35) drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  }

  const cx = 64;
  const palmTop = 50;

  // Wrist / arm from bottom
  drawRect(ctx, cx - 10, palmTop + 16, 20, h - palmTop - 16, PALETTE.darkAmber, scale);
  drawRect(ctx, cx - 8,  palmTop + 17, 16, h - palmTop - 17, PALETTE.dimAmber,  scale);

  // Palm
  drawRect(ctx, cx - 22, palmTop,     44, 18, PALETTE.darkAmber, scale);
  drawRect(ctx, cx - 19, palmTop + 1, 38, 15, PALETTE.dimAmber,  scale);

  // Thumb (left side)
  drawRect(ctx, cx - 30, palmTop + 4, 10, 12, PALETTE.darkAmber, scale);
  drawRect(ctx, cx - 28, palmTop + 5,  7,  9, PALETTE.dimAmber,  scale);

  // Fingers — drawn first so bat sits ON TOP of them
  // Index
  drawRect(ctx, cx - 16, palmTop - 11, 8, 12, PALETTE.darkAmber, scale);
  drawRect(ctx, cx - 15, palmTop - 10, 6, 10, PALETTE.dimAmber,  scale);
  // Middle
  drawRect(ctx, cx - 6, palmTop - 14, 8, 15, PALETTE.darkAmber, scale);
  drawRect(ctx, cx - 5, palmTop - 13, 6, 13, PALETTE.dimAmber,  scale);
  // Ring
  drawRect(ctx, cx + 4, palmTop - 13, 8, 14, PALETTE.darkAmber, scale);
  drawRect(ctx, cx + 5, palmTop - 12, 6, 12, PALETTE.dimAmber,  scale);
  // Pinky
  drawRect(ctx, cx + 14, palmTop - 9, 7, 10, PALETTE.darkAmber, scale);
  drawRect(ctx, cx + 15, palmTop - 8, 5,  8, PALETTE.dimAmber,  scale);

  // Bat body — drawn AFTER fingers so it's fully visible, resting in the palm
  const bx = cx - 6;      // 58
  const by = palmTop - 10; // raise it so it clears the finger tops
  drawRect(ctx, bx,     by,     12, 8, PALETTE.gray,    scale);
  drawRect(ctx, bx + 2, by + 2,  8, 5, PALETTE.darkGray, scale);

  // Bat head
  drawRect(ctx, bx + 3, by - 5, 6, 6, PALETTE.gray, scale);
  // Ears
  drawPixel(ctx, bx + 3, by - 7, PALETTE.gray,    scale);
  drawPixel(ctx, bx + 2, by - 8, PALETTE.darkGray, scale);
  drawPixel(ctx, bx + 8, by - 7, PALETTE.gray,    scale);
  drawPixel(ctx, bx + 9, by - 8, PALETTE.darkGray, scale);
}

function drawDarkForestBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  for (let i = 0; i < w; i += 6) {
    const treeH = 30 + Math.sin(i) * 15;
    drawRect(ctx, i + 2, h - 15 - treeH, 2, treeH, PALETTE.darkPurple, scale);
    for (let y = h - 15 - treeH - 5; y < h - 15 - treeH + 10; y++) {
      for (let x = i - 2; x < i + 7; x++) {
        if (rand() > 0.4) drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  }
  for (let y = h - 15; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawPixel(ctx, x, y, rand() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
}

function drawCreatureBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  const cx = 64;
  for (let x = 15; x < 115; x++) {
    const bulge = Math.max(0, 15 - Math.abs(x - cx) * 0.3);
    drawPixel(ctx, x, 25 + bulge, PALETTE.gray, scale);
  }
  drawRect(ctx, 0, h - 12, w, 12, PALETTE.deepGreen, scale);
}

function drawMistBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
}

function drawFleeBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
}

function drawCaveBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  const cx = 64;
  for (let y = 10; y < h - 5; y++) {
    const caveWidth = 25 + Math.sin((y - 10) / (h - 15) * Math.PI) * 20;
    for (let x = cx - caveWidth; x < cx + caveWidth; x++) {
      if (x >= 0 && x < w) {
        const edgeDist = Math.min(Math.abs(x - (cx - caveWidth)), Math.abs(x - (cx + caveWidth)));
        drawPixel(ctx, x, y, edgeDist < 3 ? PALETTE.darkGray : PALETTE.darkPurple, scale);
      }
    }
  }
  for (let y = 25; y < h - 10; y++) {
    const innerWidth = 15 + Math.sin(y * 0.1) * 5;
    for (let x = 64 - innerWidth; x < 64 + innerWidth; x++) {
      drawPixel(ctx, x, y, PALETTE.black, scale);
    }
  }
  [[50, h - 18], [55, h - 16], [70, h - 17], [75, h - 15], [62, h - 19]].forEach(([bx, by]) => {
    drawPixel(ctx, bx, by, PALETTE.white, scale);
    drawPixel(ctx, bx + 1, by, PALETTE.white, scale);
  });
  for (let i = 0; i < 12; i++) {
    const rx = 45 + i * 4;
    const ry = 20 + Math.sin(i) * 3;
    drawPixel(ctx, rx, ry, PALETTE.darkGray, scale);
    drawPixel(ctx, rx - 1, ry + 1, PALETTE.darkGray, scale);
    drawPixel(ctx, rx + 1, ry + 1, PALETTE.darkGray, scale);
  }
  for (let x = 0; x < w; x++) drawPixel(ctx, x, h - 5, PALETTE.darkGray, scale);
}

function drawEndingEscapeBg(ctx, w, h, scale, rand) {
  for (let y = 0; y < h; y++) {
    const ratio = y / h;
    for (let x = 0; x < w; x++) {
      if (ratio < 0.3) drawPixel(ctx, x, y, PALETTE.darkPurple, scale);
      else if (ratio < 0.5) drawPixel(ctx, x, y, rand() > 0.5 ? PALETTE.darkAmber : PALETTE.darkPurple, scale);
      else drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
    }
  }
  for (let x = 30; x < 100; x++) {
    for (let y = h - 20; y < h - 5; y++) drawPixel(ctx, x, y, PALETTE.darkGray, scale);
  }
  const figX = 65, figY = h - 27;
  drawRect(ctx, figX, figY - 5, 3, 2, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 1, figY - 3, 5, 4, PALETTE.darkGray, scale);
  drawRect(ctx, figX, figY + 1, 2, 3, PALETTE.darkGray, scale);
  drawRect(ctx, figX + 2, figY + 1, 2, 4, PALETTE.darkGray, scale);
  for (let i = 0; i < 10; i++) {
    drawPixel(ctx, 55 + Math.cos(i * 0.6) * 20, 10 + Math.sin(i * 0.6) * 5, PALETTE.dimAmber, scale);
  }
}

function drawEndingAbsorbedBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  drawRect(ctx, 0, h - 5, w, 5, PALETTE.deepGreen, scale);
}

function drawEndingCaveBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < 20; x++) {
      if (rand() > 0.5) drawPixel(ctx, x, y, PALETTE.darkGray, scale);
    }
    for (let x = w - 20; x < w; x++) {
      if (rand() > 0.5) drawPixel(ctx, x, y, PALETTE.darkGray, scale);
    }
  }
  for (let i = 0; i < 30; i++) {
    const bx = 20 + (i % 10) * 9;
    const by = 10 + Math.floor(i / 10) * 8;
    drawPixel(ctx, bx, by, PALETTE.darkPurple, scale);
    drawPixel(ctx, bx - 1, by + 1, PALETTE.darkPurple, scale);
    drawPixel(ctx, bx + 1, by + 1, PALETTE.darkPurple, scale);
  }
}

function drawEndingDarknessBg(ctx, w, h, scale, rand) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  const figX = 64, figY = h - 25;
  drawPixel(ctx, figX, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX - 1, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX + 1, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX, figY - 1, PALETTE.darkGray, scale);
}

// ===================== FOREGROUND RENDERERS (animated, frame-driven) =====================

function drawArrivalFg(ctx, w, h, scale, frame) {
  const figX = 50, figY = h - 48;
  for (let d = 1; d < 25; d++) {
    const spread = Math.floor(d * 0.4);
    for (let s = -spread; s <= spread; s++) {
      const alpha = Math.max(0, 1 - d / 25);
      const flicker = frame % 8 < 1 ? 0.6 : 1;
      if (Math.random() < alpha * flicker) {
        drawPixel(ctx, figX + d, figY - 5 + s, PALETTE.dimAmber, scale);
      }
    }
  }
}

function drawNetsFg(ctx, w, h, scale, frame) {
  // Mist net mesh lines
  for (let shelf = 0; shelf < 4; shelf++) {
    const y = 35 + shelf * 8;
    for (let x = 17; x < 54; x++) {
      if (frame % 4 === 0 || Math.random() > 0.2) {
        drawPixel(ctx, x, y + (Math.sin(x * 0.3 + frame * 0.1) > 0.5 ? 1 : 0), PALETTE.gray, scale);
      }
    }
  }
  // Firefly dots
  for (let i = 0; i < 5; i++) {
    const px = (frame * 2 + i * 30) % w;
    const py = 20 + Math.sin(frame * 0.05 + i) * 15;
    drawPixel(ctx, px, py, PALETTE.dimAmber, scale);
  }
}

function drawSpectrogramPanel(ctx, w, h, scale, frame) {
  const pX = 63, pY = 32, pW = 54, pH = 28;

  // Panel background + border
  drawRect(ctx, pX, pY, pW, pH, PALETTE.black, scale);
  for (let x = pX; x < pX + pW; x++) {
    drawPixel(ctx, x, pY,           PALETTE.gray, scale);
    drawPixel(ctx, x, pY + pH - 1,  PALETTE.gray, scale);
  }
  for (let y = pY; y < pY + pH; y++) {
    drawPixel(ctx, pX,          y, PALETTE.gray, scale);
    drawPixel(ctx, pX + pW - 1, y, PALETTE.gray, scale);
  }

  // Frequency grid lines (subtle)
  for (let gy = pY + 7; gy < pY + pH - 2; gy += 7) {
    for (let gx = pX + 1; gx < pX + pW - 1; gx += 3) {
      drawPixel(ctx, gx, gy, PALETTE.darkGray, scale);
    }
  }

  function drawCall(points, color, shadow) {
    for (let i = 0; i < points.length - 1; i++) {
      const [x0, y0] = points[i];
      if (x0 < pX + 1 || x0 >= pX + pW - 1) continue;
      if (y0 >= pY + 1 && y0 < pY + pH - 1) {
        drawPixel(ctx, x0, y0, color, scale);
        if (shadow && y0 + 1 < pY + pH - 1) drawPixel(ctx, x0, y0 + 1, shadow, scale);
      }
    }
  }

  const scrollSpeed = 0.4;

  // Lasiurus: bouncy downswoop with uptick
  for (let c = 0; c < 4; c++) {
    const ox = ((frame * scrollSpeed + c * 22) % (pW + 10));
    const startX = pX + pW - 2 - Math.floor(ox);
    const callW = 9;
    const points = [];
    for (let t = 0; t < callW; t++) {
      const norm = t / (callW - 1);
      let freq;
      if (norm < 0.75) { freq = norm * norm * 1.1; }
      else { freq = 0.62 - (norm - 0.75) * 0.5; }
      points.push([startX + t, pY + 3 + Math.floor(freq * (pH - 6))]);
    }
    drawCall(points, PALETTE.sickGreen, PALETTE.deepGreen);
  }

  // Myotis: sigmoidal S-curve FM sweep
  for (let c = 0; c < 3; c++) {
    const ox = ((frame * scrollSpeed + c * 28 + 11) % (pW + 10));
    const startX = pX + pW - 2 - Math.floor(ox);
    const callW = 12;
    const points = [];
    for (let t = 0; t < callW; t++) {
      const norm = t / (callW - 1);
      const sig = 1 / (1 + Math.exp(-10 * (norm - 0.5)));
      points.push([startX + t, pY + 3 + Math.floor(sig * (pH - 6))]);
    }
    drawCall(points, PALETTE.mutedGreen, PALETTE.deepGreen);
  }

  // Indicator dot
  drawPixel(ctx, pX + 2, pY + 2, PALETTE.amber, scale);
  drawPixel(ctx, pX + 4, pY + 2, PALETTE.amber, scale);
}

function drawAcousticFg(ctx, w, h, scale, frame) {
  // Same nets mesh in background
  for (let shelf = 0; shelf < 4; shelf++) {
    const y = 35 + shelf * 8;
    for (let x = 17; x < 54; x++) {
      if (frame % 4 === 0 || Math.random() > 0.2) {
        drawPixel(ctx, x, y + (Math.sin(x * 0.3 + frame * 0.1) > 0.5 ? 1 : 0), PALETTE.gray, scale);
      }
    }
  }
  drawSpectrogramPanel(ctx, w, h, scale, frame);
}

function drawBatCaptureFg(ctx, w, h, scale, frame) {
  const cx = 64;
  const palmTop = 50;
  const by = palmTop - 6;  // bat body top
  const bx = cx - 6;      // 58

  // Slowly flapping wings — gentle, struggling motion
  const flapAngle = Math.sin(frame * 0.12) * 0.7 + 0.3; // 0..1 ish
  const wingSpan = Math.floor(14 + flapAngle * 12);      // 14..26 px spread each side
  const wingDrop = Math.floor(flapAngle * 5);             // droops as they open

  // Left wing membrane
  for (let wx = 1; wx <= wingSpan; wx++) {
    const wy = Math.floor(Math.sin(wx / wingSpan * Math.PI) * wingDrop);
    const alpha = 1 - wx / wingSpan;
    const color = alpha > 0.5 ? PALETTE.gray : PALETTE.darkGray;
    drawPixel(ctx, bx - wx, by + 2 + wy, color, scale);
    if (wx < wingSpan - 2) drawPixel(ctx, bx - wx, by + 3 + wy, PALETTE.darkGray, scale);
    // Wing finger bones every few pixels
    if (wx % 5 === 0 && wx < wingSpan) {
      for (let fy = 0; fy <= wy + 2; fy++) {
        drawPixel(ctx, bx - wx, by + 2 + fy, PALETTE.darkGray, scale);
      }
    }
  }

  // Right wing membrane
  for (let wx = 1; wx <= wingSpan; wx++) {
    const wy = Math.floor(Math.sin(wx / wingSpan * Math.PI) * wingDrop);
    const alpha = 1 - wx / wingSpan;
    const color = alpha > 0.5 ? PALETTE.gray : PALETTE.darkGray;
    drawPixel(ctx, bx + 12 + wx, by + 2 + wy, color, scale);
    if (wx < wingSpan - 2) drawPixel(ctx, bx + 12 + wx, by + 3 + wy, PALETTE.darkGray, scale);
    if (wx % 5 === 0 && wx < wingSpan) {
      for (let fy = 0; fy <= wy + 2; fy++) {
        drawPixel(ctx, bx + 12 + wx, by + 2 + fy, PALETTE.darkGray, scale);
      }
    }
  }

  // Eye glint — blinks occasionally
  if (frame % 40 > 5) {
    drawPixel(ctx, bx + 4, by - 3, PALETTE.amber, scale);
    drawPixel(ctx, bx + 7, by - 3, PALETTE.amber, scale);
  }

}

function drawDarkForestFg(ctx, w, h, scale, frame) {
  const eyeCount = 2 + Math.floor(frame / 30) % 4;
  for (let i = 0; i < eyeCount; i++) {
    const ex = 15 + (i * 31 + frame) % (w - 30);
    const ey = 15 + (i * 17) % 30;
    if ((frame + i * 7) % 20 > 3) {
      drawPixel(ctx, ex, ey, PALETTE.amber, scale);
      drawPixel(ctx, ex + 2, ey, PALETTE.amber, scale);
    }
  }
  for (let i = 0; i < 20; i++) {
    const fx = (frame * 0.5 + i * 7) % w;
    const fy = h - 25 + Math.sin(i + frame * 0.02) * 5;
    drawPixel(ctx, fx, fy, PALETTE.fogGray, scale);
    drawPixel(ctx, fx + 1, fy, PALETTE.fogGray, scale);
  }
}

function drawCreatureFg(ctx, w, h, scale, frame) {
  const cx = 64, cy = 35;
  const pulse = Math.sin(frame * 0.1) * 2;
  for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
    const r = 8 + Math.sin(angle * 3 + frame * 0.05) * 3 + pulse;
    const px = Math.floor(cx + Math.cos(angle) * r);
    const py = Math.floor(cy + Math.sin(angle) * r * 0.6);
    drawPixel(ctx, px, py, PALETTE.darkPurple, scale);
    drawPixel(ctx, px + 1, py, PALETTE.purple, scale);
  }
  for (let y = cy - 6; y < cy + 6; y++) {
    for (let x = cx - 8; x < cx + 8; x++) {
      if (Math.random() > 0.2) {
        drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.darkPurple : PALETTE.purple, scale);
      }
    }
  }
  for (let wx = 1; wx < 35; wx++) {
    const wy = Math.sin(wx * 0.1 + frame * 0.05) * 3;
    const membrane = cy - 2 + wy;
    drawPixel(ctx, cx - wx, membrane, PALETTE.purple, scale);
    drawPixel(ctx, cx + wx, membrane, PALETTE.purple, scale);
    if (wx % 3 === 0) {
      for (let fy = membrane; fy < membrane + 4; fy++) {
        drawPixel(ctx, cx - wx, fy, PALETTE.darkPurple, scale);
        drawPixel(ctx, cx + wx, fy, PALETTE.darkPurple, scale);
      }
    }
  }
  const eyePositions = [[cx - 3, cy - 2], [cx + 2, cy - 2], [cx, cy - 4], [cx - 1, cy + 1], [cx + 3, cy]];
  eyePositions.forEach(([ex, ey], i) => {
    if ((frame + i * 11) % 15 > 2) {
      drawPixel(ctx, ex, ey, i < 2 ? PALETTE.amber : PALETTE.sickGreen, scale);
    }
  });
}

function drawMistFg(ctx, w, h, scale, frame) {
  const mistEdge = Math.max(10, w - 30 - (frame % 60));
  for (let i = 0; i < 5; i++) {
    const tx = 10 + i * 22;
    if (tx < mistEdge) drawRect(ctx, tx, 15, 2, h - 25, PALETTE.darkPurple, scale);
  }
  for (let x = mistEdge; x < w; x++) {
    for (let y = 5; y < h - 5; y++) {
      const density = (x - mistEdge) / (w - mistEdge);
      if (Math.random() < density * 0.7) {
        drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.fogGray : PALETTE.darkGray, scale);
      }
    }
  }
  for (let i = 0; i < 6; i++) {
    const sx = mistEdge + 10 + (i * 15 + frame * 0.5) % (w - mistEdge - 10);
    const sy = 15 + Math.sin(frame * 0.03 + i * 2) * 20;
    for (let wx = -5; wx < 5; wx++) {
      const wy = -Math.abs(wx) * 0.5 + Math.sin(frame * 0.2 + i) * 2;
      drawPixel(ctx, sx + wx, sy + wy, PALETTE.darkPurple, scale);
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = h - 8; y < h; y++) {
      drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.water : PALETTE.deepGreen, scale);
    }
  }
  for (let i = 0; i < 3; i++) {
    const rx = 30 + i * 35, ry = h - 6;
    const r = (frame * 0.3 + i * 5) % 10;
    for (let a = 0; a < Math.PI * 2; a += 0.5) {
      drawPixel(ctx, rx + Math.cos(a) * r, ry + Math.sin(a) * r * 0.3, PALETTE.fogGray, scale);
    }
  }
}

function drawFleeFg(ctx, w, h, scale, frame) {
  const offset = frame * 3;
  for (let i = 0; i < 15; i++) {
    const tx = ((i * 20 - offset) % (w + 20) + w + 20) % (w + 20) - 10;
    for (let b = 0; b < 4; b++) drawRect(ctx, tx - b * 2, 5, 2, h - 15, PALETTE.darkPurple, scale);
  }
  const bounce = Math.sin(frame * 0.5) * 2;
  const figX = 35, figY = h - 30 + bounce;
  drawRect(ctx, figX, figY - 7, 4, 2, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 1, figY - 5, 6, 5, PALETTE.darkGray, scale);
  const legPhase = frame * 0.5;
  drawRect(ctx, figX, figY, 2, 3 + Math.sin(legPhase), PALETTE.darkGray, scale);
  drawRect(ctx, figX + 2, figY, 2, 3 - Math.sin(legPhase), PALETTE.darkGray, scale);
  drawPixel(ctx, figX + 3, figY - 6, PALETTE.amber, scale);
  for (let d = 1; d < 15; d++) {
    if (Math.random() < 0.5) drawPixel(ctx, figX + 3 + d, figY - 6 + bounce * 0.5, PALETTE.darkAmber, scale);
  }
  for (let i = 0; i < 4; i++) {
    const bx = ((i * 25 + 60 - offset) % (w + 20) + w + 20) % (w + 20) - 10;
    if ((frame + i * 13) % 20 > 5) {
      drawPixel(ctx, bx + 1, 30 + i * 5, PALETTE.sickGreen, scale);
      drawPixel(ctx, bx + 3, 30 + i * 5, PALETTE.sickGreen, scale);
    }
  }
  for (let x = 0; x < w; x++) {
    for (let y = h - 10; y < h; y++) {
      const streakX = (x + offset * 2) % w;
      drawPixel(ctx, streakX, y, Math.random() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
}

function drawCaveFg(ctx, w, h, scale, frame) {
  const pulse = Math.sin(frame * 0.05) * 0.5 + 0.5;
  if (pulse > 0.3) {
    for (let i = 0; i < 5; i++) {
      drawPixel(ctx, 60 + Math.random() * 8, 45 + Math.random() * 10, PALETTE.sickGreen, scale);
    }
  }
}

function drawEndingEscapeFg(ctx, w, h, scale, frame) {
  // fully static scene — nothing to animate
}

function drawEndingAbsorbedFg(ctx, w, h, scale, frame) {
  const cx = 64, cy = 40;
  const spread = 10 + Math.sin(frame * 0.05) * 5;
  for (let wx = 0; wx < spread; wx++) {
    const wy = Math.sin(wx * 0.3 + frame * 0.1) * 3;
    drawPixel(ctx, cx - wx, cy + wy, PALETTE.purple, scale);
    drawPixel(ctx, cx + wx, cy + wy, PALETTE.purple, scale);
    if (wx % 2 === 0) {
      for (let fy = 0; fy < 3; fy++) {
        drawPixel(ctx, cx - wx, cy + wy + fy, PALETTE.darkPurple, scale);
        drawPixel(ctx, cx + wx, cy + wy + fy, PALETTE.darkPurple, scale);
      }
    }
  }
  drawRect(ctx, cx - 2, cy - 4, 4, 6, PALETTE.purple, scale);
  drawPixel(ctx, cx - 1, cy - 3, PALETTE.amber, scale);
  drawPixel(ctx, cx + 1, cy - 3, PALETTE.amber, scale);
  for (let i = 0; i < 20; i++) {
    const angle = frame * 0.02 + i * 0.3;
    const r = 20 + Math.sin(i + frame * 0.01) * 5;
    drawPixel(ctx, cx + Math.cos(angle) * r, cy + Math.sin(angle) * r * 0.5, PALETTE.darkPurple, scale);
  }
}

function drawEndingCaveFg(ctx, w, h, scale, frame) {
  const cx = 64, cy = 35;
  const blink = Math.sin(frame * 0.03);
  if (blink > -0.5) {
    const eyeH = Math.max(1, Math.floor((blink + 0.5) * 10));
    for (let x = cx - 15; x < cx + 15; x++) {
      const dx = Math.abs(x - cx) / 15;
      const localH = Math.floor(eyeH * (1 - dx * dx));
      for (let y = cy - localH; y < cy + localH; y++) drawPixel(ctx, x, y, PALETTE.sickGreen, scale);
    }
    for (let x = cx - 2; x < cx + 2; x++) {
      for (let y = cy - eyeH + 2; y < cy + eyeH - 2; y++) drawPixel(ctx, x, y, PALETTE.black, scale);
    }
  }
}

function drawEndingDarknessFg(ctx, w, h, scale, frame) {
  for (let i = 0; i < 8; i++) {
    const angle = frame * 0.01 + i * 0.8;
    const x = 64 + Math.cos(angle) * 30;
    const y = h / 2 + Math.sin(angle) * 20;
    if ((frame + i * 13) % 25 > 5) {
      drawPixel(ctx, x, y, PALETTE.darkPurple, scale);
      drawPixel(ctx, x + 1, y, PALETTE.darkPurple, scale);
      drawPixel(ctx, x - 1, y + 1, PALETTE.darkPurple, scale);
      drawPixel(ctx, x + 2, y + 1, PALETTE.darkPurple, scale);
    }
  }
  if (frame % 60 < 3) {
    for (let i = 0; i < 15; i++) {
      const ex = 10 + (i * 8) % (w - 20);
      const ey = 15 + (i * 11) % (h - 30);
      drawPixel(ctx, ex, ey, PALETTE.red, scale);
      drawPixel(ctx, ex + 3, ey, PALETTE.red, scale);
    }
  }
  if (frame % 40 < 20) {
    const figX = 64, figY = h - 25;
    for (let i = 0; i < 10; i++) {
      if (Math.random() > 0.5) {
        drawPixel(ctx, figX - 15 + i, figY - 5 + Math.sin(i * 0.5) * 2, PALETTE.darkPurple, scale);
      }
    }
  }
}

// ===================== RENDERER MAPS =====================

const BG_RENDERERS = {
  arrival: drawArrivalBg,
  nets: drawNetsBg,
  acoustic: drawNetsBg,
  bat_capture: drawBatCaptureBg,
  dark_forest: drawDarkForestBg,
  creature: drawCreatureBg,
  mist: drawMistBg,
  flee: drawFleeBg,
  cave: drawCaveBg,
  ending_escape: drawEndingEscapeBg,
  ending_absorbed: drawEndingAbsorbedBg,
  ending_cave: drawEndingCaveBg,
  ending_darkness: drawEndingDarknessBg,
};

const FG_RENDERERS = {
  arrival: drawArrivalFg,
  nets: drawNetsFg,
  acoustic: drawAcousticFg,
  bat_capture: drawBatCaptureFg,
  dark_forest: drawDarkForestFg,
  creature: drawCreatureFg,
  mist: drawMistFg,
  flee: drawFleeFg,
  cave: drawCaveFg,
  ending_escape: drawEndingEscapeFg,
  ending_absorbed: drawEndingAbsorbedFg,
  ending_cave: drawEndingCaveFg,
  ending_darkness: drawEndingDarknessFg,
};

// ===================== COMPONENT =====================

export default function PixelArtCanvas({ scene }) {
  const canvasRef = useRef(null);
  const frameRef = useRef(0);
  const animRef = useRef(null);
  const [fadeOpacity, setFadeOpacity] = useState(0);
  const prevScene = useRef(scene);

  useEffect(() => {
    if (prevScene.current !== scene) {
      setFadeOpacity(1);
      const timeout = setTimeout(() => {
        setFadeOpacity(0);
        prevScene.current = scene;
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [scene]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const scale = 3;
    const w = Math.floor(canvas.width / scale);
    const h = Math.floor(canvas.height / scale);

    // Pre-render static background once using seeded PRNG
    const offscreen = new OffscreenCanvas(canvas.width, canvas.height);
    const octx = offscreen.getContext("2d");
    octx.imageSmoothingEnabled = false;
    const rand = makeSeededRandom(sceneSeed(scene));
    const bgRenderer = BG_RENDERERS[scene] || drawDarkForestBg;
    bgRenderer(octx, w, h, scale, rand);

    function render() {
      ctx.imageSmoothingEnabled = false;
      // Stamp cached background
      ctx.drawImage(offscreen, 0, 0);
      // Draw only animated elements on top
      const fgRenderer = FG_RENDERERS[scene] || drawDarkForestFg;
      fgRenderer(ctx, w, h, scale, frameRef.current);
      frameRef.current++;
      animRef.current = requestAnimationFrame(render);
    }

    render();
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [scene]);

  return (
    <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
      <canvas
        ref={canvasRef}
        width={384}
        height={216}
        className="w-full h-full rounded-lg border border-gray-800"
        style={{ imageRendering: "pixelated" }}
      />
      <div
        className="absolute inset-0 bg-black rounded-lg pointer-events-none transition-opacity duration-400"
        style={{ opacity: fadeOpacity }}
      />
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
        }}
      />
    </div>
  );
}