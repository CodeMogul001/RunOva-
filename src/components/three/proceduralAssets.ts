import * as THREE from 'three';

// Procedural soft radial contact shadow texture
export function createContactShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 240);
  gradient.addColorStop(0, 'rgba(17, 17, 17, 0.45)');
  gradient.addColorStop(0.3, 'rgba(17, 17, 17, 0.25)');
  gradient.addColorStop(0.65, 'rgba(17, 17, 17, 0.08)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural technical ring dial texture for autonomous rings
export function createRingDialTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = 'rgba(255, 255, 255, 0)';
  ctx.fillRect(0, 0, 1024, 128);

  ctx.strokeStyle = '#111111';
  ctx.fillStyle = '#111111';
  ctx.lineWidth = 1;

  // Draw fine tick marks
  for (let i = 0; i < 1024; i += 8) {
    const isMajor = i % 64 === 0;
    const isMedium = i % 32 === 0;
    const h = isMajor ? 32 : isMedium ? 18 : 8;
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, h);
    ctx.stroke();

    if (isMajor) {
      ctx.font = '10px monospace';
      ctx.fillText((i / 8).toString().padStart(3, '0'), i + 2, 45);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.repeat.set(4, 1);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
