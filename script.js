const grid = document.getElementById('grid');
const colorPicker = document.getElementById('color-picker');
const clearBtn = document.getElementById('clear-btn');
const rainbowBtn = document.getElementById('rainbow-btn');
const exportBtn = document.getElementById('export-btn');

const GRID_SIZE = 16; 
let isDrawing = false;
let isRainbowMode = false;

function createGrid() {
  grid.innerHTML = '';
  for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');

    pixel.addEventListener('mousedown', (e) => {
      isDrawing = true;
      colorPixel(e.target);
    });
    pixel.addEventListener('mouseenter', (e) => {
      if (isDrawing) colorPixel(e.target);
    });
    
    grid.appendChild(pixel);
  }
}

function colorPixel(pixel) {
  if (isRainbowMode) {
    const randomColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    pixel.style.backgroundColor = randomColor;
  } else {
    pixel.style.backgroundColor = colorPicker.value;
  }
}

// Переключение режима радуги
function toggleRainbowMode() {
  isRainbowMode = !isRainbowMode;
  rainbowBtn.textContent = isRainbowMode ? 'Радуга: Вкл' : 'Радуга: Выкл';
  rainbowBtn.style.borderColor = isRainbowMode ? '#ff007f' : '#00ffcc';
  rainbowBtn.style.color = isRainbowMode ? '#ff007f' : '#00ffcc';
}

function clearGrid() {
  document.querySelectorAll('.pixel').forEach(p => p.style.backgroundColor = '#25283d');
}

function exportToPNG() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const scale = 20; 
  
  canvas.width = GRID_SIZE * scale;
  canvas.height = GRID_SIZE * scale;

  const pixels = document.querySelectorAll('.pixel');
  pixels.forEach((pixel, index) => {
    const x = (index % GRID_SIZE) * scale;
    const y = Math.floor(index / GRID_SIZE) * scale;
    
    ctx.fillStyle = pixel.style.backgroundColor || '#25283d';
    ctx.fillRect(x, y, scale, scale);
  });

  const link = document.createElement('a');
  link.download = 'pixel-art.png';
  link.href = canvas.toDataURL();
  link.click();
}

window.addEventListener('mouseup', () => isDrawing = false);
rainbowBtn.addEventListener('click', toggleRainbowMode);
clearBtn.addEventListener('click', clearGrid);
exportBtn.addEventListener('click', exportToPNG);
createGrid();