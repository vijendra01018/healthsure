import React, { useEffect, useRef } from 'react';

interface DnaCanvasProps {
  className?: string;
  interactive?: boolean;
}

export const DnaCanvas: React.FC<DnaCanvasProps> = ({ className = '', interactive = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetSpeed = 0.015;
    let currentSpeed = 0.015;

    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      targetSpeed = 0.002;
    }

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
      targetSpeed = 0.015 + Math.abs(mouseX) * 0.02;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Number of base pairs in helix
    const numPairs = 24;
    const helixRadius = 45;
    const verticalSpacing = 14;

    const render = () => {
      if (!canvas || !ctx) return;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      ctx.clearRect(0, 0, width, height);

      currentSpeed += (targetSpeed - currentSpeed) * 0.05;
      angle += currentSpeed;

      const centerX = width / 2;
      const startY = (height - numPairs * verticalSpacing) / 2;

      // Base pairs
      for (let i = 0; i < numPairs; i++) {
        const y = startY + i * verticalSpacing;
        const currentAngle = angle + i * 0.35;

        // 3D projection
        const x1 = centerX + Math.cos(currentAngle) * helixRadius;
        const z1 = Math.sin(currentAngle) * helixRadius;

        const x2 = centerX + Math.cos(currentAngle + Math.PI) * helixRadius;
        const z2 = Math.sin(currentAngle + Math.PI) * helixRadius;

        // Depth perspective scale
        const scale1 = (z1 + helixRadius * 1.5) / (helixRadius * 2.5);
        const scale2 = (z2 + helixRadius * 1.5) / (helixRadius * 2.5);

        // Draw connecting hydrogen bond rung
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        const alpha = Math.max(0.15, (scale1 + scale2) / 3);
        ctx.strokeStyle = `rgba(56, 189, 248, ${alpha * 0.7})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        // Node 1 (Strand A: Cyan)
        ctx.beginPath();
        const r1 = Math.max(2, 3.5 * scale1);
        ctx.arc(x1, y, r1, 0, Math.PI * 2);
        ctx.fillStyle = z1 > 0 ? '#38bdf8' : '#0284c7';
        ctx.shadowColor = '#00f2fe';
        ctx.shadowBlur = z1 > 0 ? 8 : 2;
        ctx.fill();

        // Node 2 (Strand B: Teal / Electric Violet)
        ctx.beginPath();
        const r2 = Math.max(2, 3.5 * scale2);
        ctx.arc(x2, y, r2, 0, Math.PI * 2);
        ctx.fillStyle = z2 > 0 ? '#2dd4bf' : '#0d9488';
        ctx.shadowColor = '#2dd4bf';
        ctx.shadowBlur = z2 > 0 ? 8 : 2;
        ctx.fill();

        // Reset shadow
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      aria-label="Interactive 3D glowing DNA double-helix simulation"
      role="img"
    />
  );
};
