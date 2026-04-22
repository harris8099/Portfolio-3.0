const cable = document.querySelector('.cable-wrap');

if (cable) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!prefersReducedMotion) {
    let t = 0;

    const animate = () => {
      t += 0.02;
      const y = Math.sin(t) * 1.2;
      cable.style.transform = `translateY(${y}px)`;
      requestAnimationFrame(animate);
    };

    animate();
  }
}