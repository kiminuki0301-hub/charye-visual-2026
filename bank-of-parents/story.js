(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const animated = document.querySelectorAll('.price,.borrowing,.generations');
  if (!reduced && 'IntersectionObserver' in window) {
    const reveal = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          reveal.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px 40px 0px' });
    animated.forEach(element => reveal.observe(element));

    const story = document.getElementById('fund-story');
    const steps = document.querySelectorAll('[data-fund-step]');
    const activeStep = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
      if (visible.length) story.dataset.step = visible[0].target.dataset.fundStep;
    }, { threshold: [0.2, 0.5, 0.8], rootMargin: '-15% 0px -20% 0px' });
    steps.forEach(step => activeStep.observe(step));
    document.documentElement.classList.add('js');
  } else {
    animated.forEach(element => element.classList.add('in-view'));
  }

  // Optional parent-page listener can set a no-scroll iframe to its content height.
  if (window.parent !== window) {
    let lastHeight = 0;
    const reportHeight = () => {
      const height = Math.ceil(document.documentElement.scrollHeight);
      if (Math.abs(height - lastHeight) > 1) {
        lastHeight = height;
        window.parent.postMessage({ type: 'bank-of-parents-height', height }, '*');
      }
    };
    if ('ResizeObserver' in window) new ResizeObserver(reportHeight).observe(document.documentElement);
    window.addEventListener('load', reportHeight);
    document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', reportHeight));
    reportHeight();
  }
})();
