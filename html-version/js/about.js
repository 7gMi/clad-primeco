document.addEventListener('DOMContentLoaded', () => {
  initializeProcessHover();
});

function initializeProcessHover() {
  const processCircles = document.querySelectorAll('.process-circle');

  processCircles.forEach(circle => {
    circle.addEventListener('mouseenter', () => {
      circle.style.transform = 'scale(1.1)';
    });

    circle.addEventListener('mouseleave', () => {
      circle.style.transform = 'scale(1)';
    });
  });
}
