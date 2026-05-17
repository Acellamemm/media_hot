// Background images for each filter category
const backgroundImages = {
  all: 'https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FJason_Duval_05.921c79be.jpg&w=1920&q=75',
  pdf: 'https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FLucia_Caminos_03.e39f02a9.jpg&w=1920&q=75',
  video: 'https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FCal_Hampton_04.07347c1d.jpg&w=1920&q=75',
  software: 'https://www.rockstargames.com/VI/_next/image?url=%2FVI%2F_next%2Fstatic%2Fmedia%2FVice_City_09.632112c4.jpg&w=1920&q=75'
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

    // Toggle a class instead of manipulating inline styles directly
    resource.classList.toggle('hidden', !show);
    // Keep accessibility tree in sync
    resource.setAttribute('aria-hidden', String(!show));

    if (show) visibleCount++;
  });

  // Update an optional live region for screen readers
  const status = document.getElementById('filter-status');
  if (status) {
    status.textContent = `${visibleCount} resource${visibleCount === 1 ? '' : 's'} shown`;
  }

  // Change background image with zoom animation
  const body = document.body;
  const newImage = backgroundImages[category] || backgroundImages.all;
  body.classList.remove('bg-zoom');
  
  // Trigger reflow to restart animation
  void body.offsetWidth;
  
  body.style.backgroundImage = `url("${newImage}")`;
  body.classList.add('bg-zoom');

  // Change h1 color based on filter category
  const h1 = document.querySelector('h1');
  if (h1) {
    const newColor = h1Colors[category] || h1Colors.all;
    h1.style.color = newColor;
  }

  // Change outer filter container background color
  const filterContainer = document.getElementById('filter-container');
  if (filterContainer) {
    filterContainer.style.backgroundColor = filterContainerColors[category] || filterContainerColors.all;
  }
}
