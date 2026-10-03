import React, { useEffect, useRef } from 'react';

/**
 * WaveformBackground: Animated Black & White Audio Frequency Soundwave Visualizer
 * Directly inspired by the reference audio waveform equalizer image.
 * Uses HTML5 canvas to dynamically animate undulating, symmetric vertical audio bars in monochrome.
 */
export default function WaveformBackground({ className = '', height = 180, barCount = 72, isInteractive = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio || 800;
      canvas.height = (height || rect.height) * window.devicePixelRatio || 200;
    };

    resize();
    window.addEventListener('resize', resize);

    // Generate bar frequency data with harmonic wave modulation
    const render = () => {
      time += 0.035;
      const width = canvas.width;
      const h = canvas.height;
      const centerY = h / 2;

      ctx.clearRect(0, 0, width, h);

      const count = barCount;
      const totalWidth = width * 0.94;
      const startX = width * 0.03;
      const spacing = totalWidth / count;
      const barWidth = Math.max(2.5, spacing * 0.45);

      // Center baseline glow line
      ctx.beginPath();
      ctx.moveTo(startX, centerY);
      ctx.lineTo(startX + totalWidth, centerY);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < count; i++) {
        const x = startX + i * spacing + spacing / 2;
        const normalizedX = i / count;

        // Symmetric envelope envelope clusters (peaks and valleys matching the reference image)
        const envelope1 = Math.exp(-Math.pow((normalizedX - 0.2) * 6, 2));
        const envelope2 = Math.exp(-Math.pow((normalizedX - 0.42) * 5, 2));
        const envelope3 = Math.exp(-Math.pow((normalizedX - 0.72) * 5.5, 2));
        const envelope4 = Math.exp(-Math.pow((normalizedX - 0.9) * 7, 2));
        const baseEnvelope = (envelope1 * 0.9 + envelope2 * 1.1 + envelope3 * 1.05 + envelope4 * 0.85) + 0.12;

        // Dynamic frequency modulation over time
        const wave1 = Math.sin(time * 2.2 + i * 0.28) * 0.35;
        const wave2 = Math.cos(time * 1.6 - i * 0.19) * 0.3;
        const wave3 = Math.sin(time * 3.1 + i * 0.45) * 0.2;
        const wave4 = Math.sin(time * 0.8 + normalizedX * Math.PI * 4) * 0.25;

        const dynamicFactor = Math.max(0.08, 0.5 + wave1 + wave2 + wave3 + wave4);
        const amplitude = (h * 0.42) * baseEnvelope * dynamicFactor;

        const topY = centerY - amplitude;
        const bottomY = centerY + amplitude;

        // Calculate opacity and luminance based on bar height
        const barIntensity = Math.min(1, Math.max(0.2, amplitude / (h * 0.35)));
        const alpha = 0.3 + barIntensity * 0.65;

        // Draw upper/lower rounded soundwave bar
        ctx.beginPath();
        ctx.moveTo(x, topY);
        ctx.lineTo(x, bottomY);
        
        // Gradient from bright white center to translucent tips
        const grad = ctx.createLinearGradient(x, topY, x, bottomY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
        grad.addColorStop(0.3, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${alpha * 1.1})`);
        grad.addColorStop(0.7, `rgba(255, 255, 255, ${alpha})`);
        grad.addColorStop(1, `rgba(255, 255, 255, ${alpha * 0.6})`);

        ctx.strokeStyle = grad;
        ctx.lineWidth = barWidth;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Extra subtle center pulse dot for prominent peaks
        if (amplitude > h * 0.28 && i % 3 === 0) {
          ctx.beginPath();
          ctx.arc(x, centerY, barWidth * 0.8, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [height, barCount]);

  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-90"
        style={{ height: `${height}px` }}
      />
    </div>
  );
}
