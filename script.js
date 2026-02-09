const elements = document.querySelectorAll(
  '.reveal, .reveal-left, .reveal-right'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, { threshold: 0.15 });

elements.forEach(el => observer.observe(el));

// COUNTERS
document.querySelectorAll('[data-count]').forEach(counter => {
  let done = false;
  observer.observe(counter);

  observer.callback = entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !done) {
        done = true;
        let target = +counter.dataset.count;
        let current = 0;
        let step = Math.ceil(target / 80);

        const update = () => {
          current += step;
          counter.textContent = current >= target ? target : current;
          if (current < target) requestAnimationFrame(update);
        };
        update();
      }
    });
  };
});
