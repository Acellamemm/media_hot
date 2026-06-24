// Background images for each filter category
const backgroundImages = {
  all: 'https://www.rockstargames.com/VI/_next/static/media/Jason_Duval_05.0kxp6enhvzqka.jpg',
  pdf: 'https://www.rockstargames.com/VI/_next/static/media/Lucia_Caminos_03.14xgd2y_ymmeg.jpg?akim=1&imdensity=1&imwidth=640',
  video: 'https://www.rockstargames.com/VI/_next/static/media/Cal_Hampton_04.0-78dep86yx2q.jpg',
  software: 'https://www.rockstargames.com/VI/_next/static/media/Raul_Bautista_01.0md1ii-yrn96r.jpg'
};

// H1 colors for each filter category
const h1Colors = {
  all: 'rgba(139, 194, 203, 0.95)',
  pdf: '#FFD700',
  video: '#6bff8bff',
  software: '#e8a2edff'
};

// Container background colors for each filter category
const filterContainerColors = {
  all: 'rgba(37, 81, 88, 0.95)',
  pdf: '#969635ff',
  video: '#2f4b3c',
  software: '#4c2b65'
};

function filterResources(category) {
  // Normalize input and handle null/undefined
  category = category == null ? 'all' : String(category).trim().toLowerCase();

  const resources = document.querySelectorAll('.resource');
  if (!resources.length) return;

  let visibleCount = 0;

  resources.forEach(resource => {
    const raw = resource.dataset.category || '';
    const cats = raw.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const show = category === 'all' || cats.includes(category);

    resource.classList.toggle('hidden', !show);
    resource.setAttribute('aria-hidden', String(!show));

    if (show) visibleCount++;
  });

  // Update live region for screen readers
  const status = document.getElementById('filter-status');
  if (status) {
    status.textContent = `${visibleCount} resource${visibleCount === 1 ? '' : 's'} shown`;
  }

  // Target the dedicated bg-layer div instead of document.body.
  // This is what makes background-size:cover work correctly on mobile —
  // the layer is position:fixed with inset:0 so it always fills the screen,
  // and we animate transform:scale() rather than background-size so cover
  // is never overridden.
  const bgLayer = document.getElementById('bg-layer');
  if (bgLayer) {
    const newImage = backgroundImages[category] || backgroundImages.all;
    bgLayer.classList.remove('bg-zoom');
    void bgLayer.offsetWidth; // force reflow to restart animation
    bgLayer.style.backgroundImage = `url("${newImage}")`;
    bgLayer.classList.add('bg-zoom');
  }

  // Change h1 color based on filter category
  const h1 = document.querySelector('h1');
  if (h1) {
    h1.style.color = h1Colors[category] || h1Colors.all;
  }

  // Change filter container background color
  const filterContainer = document.getElementById('filter-container');
  if (filterContainer) {
    filterContainer.style.backgroundColor = filterContainerColors[category] || filterContainerColors.all;
  }
}
