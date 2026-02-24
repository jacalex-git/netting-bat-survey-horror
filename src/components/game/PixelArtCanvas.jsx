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

// Scene drawing functions
function drawArrival(ctx, w, h, scale, frame) {
  // Sky
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Treeline silhouettes
  for (let i = 0; i < w; i += 3) {
    const treeH = 20 + Math.sin(i * 0.7) * 10 + Math.cos(i * 0.3) * 5;
    for (let y = h - 40 - treeH; y < h - 40; y++) {
      if (Math.random() > 0.15) {
        drawPixel(ctx, i, y, PALETTE.darkPurple, scale);
        if (i + 1 < w) drawPixel(ctx, i + 1, y, PALETTE.darkPurple, scale);
      }
    }
  }
  
  // Ground/wetland
  for (let y = h - 40; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const c = Math.random() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple;
      drawPixel(ctx, x, y, c, scale);
    }
  }
  
  // Standing water reflections
  for (let x = 20; x < w - 20; x++) {
    if (Math.random() > 0.6) {
      const y = h - 15 + Math.floor(Math.random() * 10);
      drawPixel(ctx, x, y, PALETTE.water, scale);
    }
  }
  
  // Headlamp cone from figure
  const figX = 50;
  const figY = h - 48;
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
  
  // Figure silhouette
  drawRect(ctx, figX - 2, figY - 7, 4, 2, PALETTE.darkGray, scale); // head
  drawRect(ctx, figX - 3, figY - 5, 6, 6, PALETTE.darkGray, scale); // body
  drawRect(ctx, figX - 2, figY + 1, 2, 4, PALETTE.darkGray, scale); // legs
  drawRect(ctx, figX + 1, figY + 1, 2, 4, PALETTE.darkGray, scale);
  drawPixel(ctx, figX + 1, figY - 6, PALETTE.amber, scale); // headlamp
}

function drawNets(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Trees
  const treePositions = [15, 55, 85, 110];
  treePositions.forEach(tx => {
    drawRect(ctx, tx, 10, 3, h - 20, PALETTE.darkPurple, scale);
    for (let y = 5; y < 25; y++) {
      const spread = Math.max(0, 8 - Math.abs(y - 15));
      for (let x = tx - spread; x < tx + spread + 3; x++) {
        if (Math.random() > 0.3) drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  });
  
  // Mist net between trees (gossamer thin lines)
  for (let shelf = 0; shelf < 4; shelf++) {
    const y = 35 + shelf * 8;
    for (let x = 17; x < 54; x++) {
      if (frame % 4 === 0 || Math.random() > 0.2) {
        drawPixel(ctx, x, y + (Math.sin(x * 0.3 + frame * 0.1) > 0.5 ? 1 : 0), PALETTE.gray, scale);
      }
    }
  }
  
  // Net poles
  drawRect(ctx, 16, 30, 1, 40, PALETTE.fogGray, scale);
  drawRect(ctx, 54, 30, 1, 40, PALETTE.fogGray, scale);
  
  // Ground
  for (let y = h - 15; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
  
  // Ambient particles
  for (let i = 0; i < 5; i++) {
    const px = (frame * 2 + i * 30) % w;
    const py = 20 + Math.sin(frame * 0.05 + i) * 15;
    drawPixel(ctx, px, py, PALETTE.dimAmber, scale);
  }
}

function drawBatCapture(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Net with bat
  for (let x = 20; x < 100; x++) {
    const sag = Math.sin((x - 20) / 80 * Math.PI) * 5;
    drawPixel(ctx, x, 40 + sag, PALETTE.gray, scale);
  }
  
  // Bat in net
  const batX = 60;
  const batY = 42;
  const wingFlap = Math.sin(frame * 0.3) * 2;
  drawPixel(ctx, batX, batY, PALETTE.darkGray, scale); // body
  drawPixel(ctx, batX - 1, batY, PALETTE.darkGray, scale);
  for (let wx = 1; wx < 6; wx++) {
    drawPixel(ctx, batX - 1 - wx, batY - 1 + wingFlap, PALETTE.darkGray, scale);
    drawPixel(ctx, batX + wx, batY - 1 - wingFlap, PALETTE.darkGray, scale);
  }
  
  // Gloved hands reaching
  drawRect(ctx, 55, 55, 4, 3, PALETTE.skin, scale);
  drawRect(ctx, 62, 56, 4, 3, PALETTE.skin, scale);
  
  // Amber headlamp glow on bat
  for (let d = 0; d < 15; d++) {
    const spread = Math.floor(d * 0.3);
    for (let s = -spread; s <= spread; s++) {
      if (Math.random() < 0.3) {
        drawPixel(ctx, batX + s, batY - d + 5, PALETTE.darkAmber, scale);
      }
    }
  }
  
  // Trees background
  for (let i = 0; i < w; i += 12) {
    for (let y = 0; y < 30; y++) {
      if (Math.random() > 0.6) drawPixel(ctx, i + Math.floor(Math.random() * 3), y, PALETTE.deepGreen, scale);
    }
  }
  
  drawRect(ctx, 0, h - 10, w, 10, PALETTE.deepGreen, scale);
}

function drawDarkForest(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Dense trees
  for (let i = 0; i < w; i += 6) {
    const treeH = 30 + Math.sin(i) * 15;
    drawRect(ctx, i + 2, h - 15 - treeH, 2, treeH, PALETTE.darkPurple, scale);
    // Canopy
    for (let y = h - 15 - treeH - 5; y < h - 15 - treeH + 10; y++) {
      for (let x = i - 2; x < i + 7; x++) {
        if (Math.random() > 0.4) drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  }
  
  // Eyes in the dark
  const eyeCount = 2 + Math.floor(frame / 30) % 4;
  for (let i = 0; i < eyeCount; i++) {
    const ex = 15 + (i * 31 + frame) % (w - 30);
    const ey = 15 + (i * 17) % 30;
    if ((frame + i * 7) % 20 > 3) {
      drawPixel(ctx, ex, ey, PALETTE.amber, scale);
      drawPixel(ctx, ex + 2, ey, PALETTE.amber, scale);
    }
  }
  
  // Ground
  for (let y = h - 15; y < h; y++) {
    for (let x = 0; x < w; x++) {
      drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
  
  // Subtle fog
  for (let i = 0; i < 20; i++) {
    const fx = (frame * 0.5 + i * 7) % w;
    const fy = h - 25 + Math.sin(i + frame * 0.02) * 5;
    drawPixel(ctx, fx, fy, PALETTE.fogGray, scale);
    drawPixel(ctx, fx + 1, fy, PALETTE.fogGray, scale);
  }
}

function drawCreature(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // The creature in the net
  const cx = 64;
  const cy = 35;
  
  // Distended net
  for (let x = 15; x < 115; x++) {
    const bulge = Math.max(0, 15 - Math.abs(x - cx) * 0.3);
    drawPixel(ctx, x, 25 + bulge, PALETTE.gray, scale);
  }
  
  // Body - wrong geometry, shifting
  const pulse = Math.sin(frame * 0.1) * 2;
  for (let angle = 0; angle < Math.PI * 2; angle += 0.2) {
    const r = 8 + Math.sin(angle * 3 + frame * 0.05) * 3 + pulse;
    const px = Math.floor(cx + Math.cos(angle) * r);
    const py = Math.floor(cy + Math.sin(angle) * r * 0.6);
    drawPixel(ctx, px, py, PALETTE.darkPurple, scale);
    drawPixel(ctx, px + 1, py, PALETTE.purple, scale);
  }
  
  // Fill body
  for (let y = cy - 6; y < cy + 6; y++) {
    for (let x = cx - 8; x < cx + 8; x++) {
      if (Math.random() > 0.2) {
        drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.darkPurple : PALETTE.purple, scale);
      }
    }
  }
  
  // Wings - impossibly large
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
  
  // Eyes - too many, wrong colors
  const eyePositions = [[cx-3, cy-2], [cx+2, cy-2], [cx, cy-4], [cx-1, cy+1], [cx+3, cy]];
  eyePositions.forEach(([ex, ey], i) => {
    if ((frame + i * 11) % 15 > 2) {
      drawPixel(ctx, ex, ey, i < 2 ? PALETTE.amber : PALETTE.sickGreen, scale);
    }
  });
  
  // Ground
  drawRect(ctx, 0, h - 12, w, 12, PALETTE.deepGreen, scale);
}

function drawMist(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Mist wall - advancing
  const mistEdge = Math.max(10, w - 30 - (frame % 60));
  for (let x = mistEdge; x < w; x++) {
    for (let y = 5; y < h - 5; y++) {
      const density = (x - mistEdge) / (w - mistEdge);
      if (Math.random() < density * 0.7) {
        drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.fogGray : PALETTE.darkGray, scale);
      }
    }
  }
  
  // Shapes in the mist
  for (let i = 0; i < 6; i++) {
    const sx = mistEdge + 10 + (i * 15 + frame * 0.5) % (w - mistEdge - 10);
    const sy = 15 + Math.sin(frame * 0.03 + i * 2) * 20;
    // Wing silhouettes
    for (let wx = -5; wx < 5; wx++) {
      const wy = -Math.abs(wx) * 0.5 + Math.sin(frame * 0.2 + i) * 2;
      drawPixel(ctx, sx + wx, sy + wy, PALETTE.darkPurple, scale);
    }
  }
  
  // Trees dissolving where mist touches
  for (let i = 0; i < 5; i++) {
    const tx = 10 + i * 22;
    if (tx < mistEdge) {
      drawRect(ctx, tx, 15, 2, h - 25, PALETTE.darkPurple, scale);
    }
  }
  
  // Ground water
  for (let x = 0; x < w; x++) {
    for (let y = h - 8; y < h; y++) {
      drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.water : PALETTE.deepGreen, scale);
    }
  }
  
  // Water ripples
  for (let i = 0; i < 3; i++) {
    const rx = 30 + i * 35;
    const ry = h - 6;
    const r = (frame * 0.3 + i * 5) % 10;
    for (let a = 0; a < Math.PI * 2; a += 0.5) {
      drawPixel(ctx, rx + Math.cos(a) * r, ry + Math.sin(a) * r * 0.3, PALETTE.fogGray, scale);
    }
  }
}

function drawFlee(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Blurred trees rushing past
  const offset = frame * 3;
  for (let i = 0; i < 15; i++) {
    const tx = ((i * 20 - offset) % (w + 20) + w + 20) % (w + 20) - 10;
    // Motion blur effect
    for (let b = 0; b < 4; b++) {
      drawRect(ctx, tx - b * 2, 5, 2, h - 15, PALETTE.darkPurple, scale);
    }
  }
  
  // Running figure
  const bounce = Math.sin(frame * 0.5) * 2;
  const figX = 35;
  const figY = h - 30 + bounce;
  drawRect(ctx, figX, figY - 7, 4, 2, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 1, figY - 5, 6, 5, PALETTE.darkGray, scale);
  // Running legs
  const legPhase = frame * 0.5;
  drawRect(ctx, figX, figY, 2, 3 + Math.sin(legPhase), PALETTE.darkGray, scale);
  drawRect(ctx, figX + 2, figY, 2, 3 - Math.sin(legPhase), PALETTE.darkGray, scale);
  // Headlamp beam bouncing
  drawPixel(ctx, figX + 3, figY - 6, PALETTE.amber, scale);
  for (let d = 1; d < 15; d++) {
    if (Math.random() < 0.5) {
      drawPixel(ctx, figX + 3 + d, figY - 6 + bounce * 0.5, PALETTE.darkAmber, scale);
    }
  }
  
  // Things on tree trunks
  for (let i = 0; i < 4; i++) {
    const bx = ((i * 25 + 60 - offset) % (w + 20) + w + 20) % (w + 20) - 10;
    if ((frame + i * 13) % 20 > 5) {
      drawPixel(ctx, bx + 1, 30 + i * 5, PALETTE.sickGreen, scale);
      drawPixel(ctx, bx + 3, 30 + i * 5, PALETTE.sickGreen, scale);
    }
  }
  
  // Ground rushing
  for (let x = 0; x < w; x++) {
    for (let y = h - 10; y < h; y++) {
      const streakX = (x + offset * 2) % w;
      drawPixel(ctx, streakX, y, Math.random() > 0.5 ? PALETTE.deepGreen : PALETTE.darkPurple, scale);
    }
  }
}

function drawCave(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Cave mouth
  for (let y = 10; y < h - 5; y++) {
    const caveWidth = 25 + Math.sin((y - 10) / (h - 15) * Math.PI) * 20;
    const cx = 64;
    for (let x = cx - caveWidth; x < cx + caveWidth; x++) {
      if (x >= 0 && x < w) {
        const edgeDist = Math.min(Math.abs(x - (cx - caveWidth)), Math.abs(x - (cx + caveWidth)));
        if (edgeDist < 3) {
          drawPixel(ctx, x, y, PALETTE.darkGray, scale);
        } else {
          drawPixel(ctx, x, y, PALETTE.darkPurple, scale);
        }
      }
    }
  }
  
  // Deep darkness inside
  for (let y = 25; y < h - 10; y++) {
    const innerWidth = 15 + Math.sin(y * 0.1) * 5;
    for (let x = 64 - innerWidth; x < 64 + innerWidth; x++) {
      drawPixel(ctx, x, y, PALETTE.black, scale);
    }
  }
  
  // Bones at entrance
  const bonePositions = [[50, h - 18], [55, h - 16], [70, h - 17], [75, h - 15], [62, h - 19]];
  bonePositions.forEach(([bx, by]) => {
    drawPixel(ctx, bx, by, PALETTE.white, scale);
    drawPixel(ctx, bx + 1, by, PALETTE.white, scale);
  });
  
  // Roosting shapes on cave walls
  for (let i = 0; i < 12; i++) {
    const rx = 45 + (i * 4);
    const ry = 20 + Math.sin(i) * 3;
    drawPixel(ctx, rx, ry, PALETTE.darkGray, scale);
    drawPixel(ctx, rx - 1, ry + 1, PALETTE.darkGray, scale);
    drawPixel(ctx, rx + 1, ry + 1, PALETTE.darkGray, scale);
  }
  
  // Pulsing glow from within
  const pulse = Math.sin(frame * 0.05) * 0.5 + 0.5;
  if (pulse > 0.3) {
    for (let i = 0; i < 5; i++) {
      const gx = 60 + Math.random() * 8;
      const gy = 45 + Math.random() * 10;
      drawPixel(ctx, gx, gy, PALETTE.sickGreen, scale);
    }
  }
  
  // Ground
  for (let x = 0; x < w; x++) {
    drawPixel(ctx, x, h - 5, PALETTE.darkGray, scale);
  }
}

function drawEndingEscape(ctx, w, h, scale, frame) {
  // Dawn gradient
  for (let y = 0; y < h; y++) {
    const ratio = y / h;
    for (let x = 0; x < w; x++) {
      if (ratio < 0.3) {
        drawPixel(ctx, x, y, PALETTE.darkPurple, scale);
      } else if (ratio < 0.5) {
        drawPixel(ctx, x, y, Math.random() > 0.5 ? PALETTE.darkAmber : PALETTE.darkPurple, scale);
      } else {
        drawPixel(ctx, x, y, PALETTE.deepGreen, scale);
      }
    }
  }
  
  // Road
  for (let x = 30; x < 100; x++) {
    for (let y = h - 20; y < h - 5; y++) {
      drawPixel(ctx, x, y, PALETTE.darkGray, scale);
    }
  }
  
  // Stumbling figure
  const figX = 65;
  const figY = h - 27;
  drawRect(ctx, figX, figY - 5, 3, 2, PALETTE.darkGray, scale);
  drawRect(ctx, figX - 1, figY - 3, 5, 4, PALETTE.darkGray, scale);
  drawRect(ctx, figX, figY + 1, 2, 3, PALETTE.darkGray, scale);
  drawRect(ctx, figX + 2, figY + 1, 2, 4, PALETTE.darkGray, scale); // stumbling
  
  // Dim sunrise
  for (let i = 0; i < 10; i++) {
    const sx = 55 + Math.cos(i * 0.6) * 20;
    const sy = 10 + Math.sin(i * 0.6) * 5;
    drawPixel(ctx, sx, sy, PALETTE.dimAmber, scale);
  }
}

function drawEndingAbsorbed(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Transforming figure
  const cx = 64;
  const cy = 40;
  
  // Body becoming wings
  const spread = 10 + Math.sin(frame * 0.05) * 5;
  for (let wx = 0; wx < spread; wx++) {
    const wy = Math.sin(wx * 0.3 + frame * 0.1) * 3;
    drawPixel(ctx, cx - wx, cy + wy, PALETTE.purple, scale);
    drawPixel(ctx, cx + wx, cy + wy, PALETTE.purple, scale);
    // Membrane
    if (wx % 2 === 0) {
      for (let fy = 0; fy < 3; fy++) {
        drawPixel(ctx, cx - wx, cy + wy + fy, PALETTE.darkPurple, scale);
        drawPixel(ctx, cx + wx, cy + wy + fy, PALETTE.darkPurple, scale);
      }
    }
  }
  
  // Head/body core
  drawRect(ctx, cx - 2, cy - 4, 4, 6, PALETTE.purple, scale);
  drawPixel(ctx, cx - 1, cy - 3, PALETTE.amber, scale);
  drawPixel(ctx, cx + 1, cy - 3, PALETTE.amber, scale);
  
  // Surrounding swarm
  for (let i = 0; i < 20; i++) {
    const angle = (frame * 0.02 + i * 0.3);
    const r = 20 + Math.sin(i + frame * 0.01) * 5;
    const bx = cx + Math.cos(angle) * r;
    const by = cy + Math.sin(angle) * r * 0.5;
    drawPixel(ctx, bx, by, PALETTE.darkPurple, scale);
  }
  
  drawRect(ctx, 0, h - 5, w, 5, PALETTE.deepGreen, scale);
}

function drawEndingCave(ctx, w, h, scale, frame) {
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // The eye
  const cx = 64;
  const cy = 35;
  const blink = Math.sin(frame * 0.03);
  
  if (blink > -0.5) {
    const eyeH = Math.max(1, Math.floor((blink + 0.5) * 10));
    // Eye shape
    for (let x = cx - 15; x < cx + 15; x++) {
      const dx = Math.abs(x - cx) / 15;
      const localH = Math.floor(eyeH * (1 - dx * dx));
      for (let y = cy - localH; y < cy + localH; y++) {
        drawPixel(ctx, x, y, PALETTE.sickGreen, scale);
      }
    }
    // Pupil
    for (let x = cx - 2; x < cx + 2; x++) {
      for (let y = cy - eyeH + 2; y < cy + eyeH - 2; y++) {
        drawPixel(ctx, x, y, PALETTE.black, scale);
      }
    }
  }
  
  // Cave walls
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < 20; x++) {
      if (Math.random() > 0.5) drawPixel(ctx, x, y, PALETTE.darkGray, scale);
    }
    for (let x = w - 20; x < w; x++) {
      if (Math.random() > 0.5) drawPixel(ctx, x, y, PALETTE.darkGray, scale);
    }
  }
  
  // Thousands of identical bats
  for (let i = 0; i < 30; i++) {
    const bx = 20 + (i % 10) * 9;
    const by = 10 + Math.floor(i / 10) * 8;
    drawPixel(ctx, bx, by, PALETTE.darkPurple, scale);
    drawPixel(ctx, bx - 1, by + 1, PALETTE.darkPurple, scale);
    drawPixel(ctx, bx + 1, by + 1, PALETTE.darkPurple, scale);
  }
}

function drawEndingDarkness(ctx, w, h, scale, frame) {
  // Almost pure black
  drawRect(ctx, 0, 0, w, h, PALETTE.black, scale);
  
  // Barely visible shapes moving
  for (let i = 0; i < 8; i++) {
    const angle = (frame * 0.01 + i * 0.8);
    const x = 64 + Math.cos(angle) * 30;
    const y = h / 2 + Math.sin(angle) * 20;
    
    // Vague shape outline
    if ((frame + i * 13) % 25 > 5) {
      drawPixel(ctx, x, y, PALETTE.darkPurple, scale);
      drawPixel(ctx, x + 1, y, PALETTE.darkPurple, scale);
      drawPixel(ctx, x - 1, y + 1, PALETTE.darkPurple, scale);
      drawPixel(ctx, x + 2, y + 1, PALETTE.darkPurple, scale);
    }
  }
  
  // Occasional glimpses of many eyes
  if (frame % 60 < 3) {
    for (let i = 0; i < 15; i++) {
      const ex = 10 + (i * 8) % (w - 20);
      const ey = 15 + (i * 11) % (h - 30);
      drawPixel(ctx, ex, ey, PALETTE.red, scale);
      drawPixel(ctx, ex + 3, ey, PALETTE.red, scale);
    }
  }
  
  // Figure silhouette barely visible, on ground
  const figX = 64;
  const figY = h - 25;
  drawPixel(ctx, figX, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX - 1, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX + 1, figY, PALETTE.darkGray, scale);
  drawPixel(ctx, figX, figY - 1, PALETTE.darkGray, scale);
  
  // Something reaching toward the figure
  if (frame % 40 < 20) {
    for (let i = 0; i < 10; i++) {
      const tx = figX - 15 + i;
      const ty = figY - 5 + Math.sin(i * 0.5) * 2;
      if (Math.random() > 0.5) {
        drawPixel(ctx, tx, ty, PALETTE.darkPurple, scale);
      }
    }
  }
}

const SCENE_RENDERERS = {
  arrival: drawArrival,
  nets: drawNets,
  bat_capture: drawBatCapture,
  dark_forest: drawDarkForest,
  creature: drawCreature,
  mist: drawMist,
  flee: drawFlee,
  cave: drawCave,
  ending_escape: drawEndingEscape,
  ending_absorbed: drawEndingAbsorbed,
  ending_cave: drawEndingCave,
  ending_darkness: drawEndingDarkness
};

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

    function render() {
      ctx.imageSmoothingEnabled = false;
      const renderer = SCENE_RENDERERS[scene] || drawDarkForest;
      renderer(ctx, w, h, scale, frameRef.current);
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
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-10"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)"
        }}
      />
    </div>
  );
}