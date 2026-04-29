import { useEffect, useRef } from 'react';

// Simple colorful particles effect
const COLORS = [
  '#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#B983FF', '#FFB4B4', '#FF6F91', '#FFC75F', '#F9F871', '#A0E7E5', '#B4F8C8', '#FCE38A', '#FFBABA', '#B5FFFC', '#FFB347', '#B2FF9E'
];

const ParticlesBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const PARTICLE_COUNT = Math.max(32, Math.min(96, Math.round((width * height) / 12000)));
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 7 + 6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));

    // Mouse pointer state
    const pointer = { x: -9999, y: -9999, active: false };

    const onMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = touch.clientX - rect.left;
      pointer.y = touch.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      // Spread force: particles repel each other
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 60 && dist > 0) {
            // Repel each other
            const force = (60 - dist) / 60 * 0.08;
            const fx = (dx / dist) * force;
            const fy = (dy / dist) * force;
            p1.vx -= fx;
            p1.vy -= fy;
            p2.vx += fx;
            p2.vy += fy;
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.55;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Repulse from mouse/touch pointer
        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 0) {
            const influence = (180 - dist) / 180;
            p.vx += (dx / dist) * influence * 0.09;
            p.vy += (dy / dist) * influence * 0.09;
          }
        }

        p.x += p.vx * 0.98;
        p.y += p.vy * 0.98;

        // Gentle damping
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;
      }
      requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  );
};

export default ParticlesBackground;
