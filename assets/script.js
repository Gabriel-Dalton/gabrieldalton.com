
// Constants
const RELATIONSHIP_START_DATE = '2024-07-02T00:00:00';

// DOM Elements
const timeUnitsContainer = document.getElementById('time-units');
const heartContainer = document.getElementById('heart-container');
const startDateElement = document.getElementById('start-date');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
  // Display the formatted start date
  const startDateFormatted = new Date(RELATIONSHIP_START_DATE).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  startDateElement.textContent = `Since ${startDateFormatted}`;
  
  // Initialize the timer
  updateTimeDisplay();
  setInterval(updateTimeDisplay, 1000);
  
  // Initialize the heart animation
  startHeartAnimation();
});

// Helper Functions
function calculateTimeTogether() {
  const start = new Date(RELATIONSHIP_START_DATE);
  const now = new Date();
  
  const totalMilliseconds = now - start;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  
  // Calculate time units
  const seconds = Math.floor(totalSeconds % 60);
  const minutes = Math.floor((totalSeconds / 60) % 60);
  const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
  const days = Math.floor((totalSeconds / (60 * 60 * 24)) % 7);
  const weeks = Math.floor((totalSeconds / (60 * 60 * 24 * 7)) % 4.345);
  const months = Math.floor((totalSeconds / (60 * 60 * 24 * 30.44)) % 12);
  const years = Math.floor(totalSeconds / (60 * 60 * 24 * 365.25));
  
  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
    seconds,
    totalSeconds
  };
}

// UI Update Functions
function updateTimeDisplay() {
  const time = calculateTimeTogether();
  
  // Update time units
  const timeUnits = [
    { value: time.years, label: 'Years' },
    { value: time.months, label: 'Months' },
    { value: time.weeks, label: 'Weeks' },
    { value: time.days, label: 'Days' },
    { value: time.hours, label: 'Hours' },
    { value: time.minutes, label: 'Minutes' },
    { value: time.seconds, label: 'Seconds' }
  ];
  
  // Clear existing content if necessary
  if (timeUnitsContainer.children.length === 0) {
    // Initial render
    renderTimeUnits(timeUnits);
  } else {
    // Update existing values
    updateTimeUnits(timeUnits);
  }
  
}

function renderTimeUnits(timeUnits) {
  timeUnits.forEach(unit => {
    const timeUnitElement = document.createElement('div');
    timeUnitElement.className = 'time-unit';
    timeUnitElement.dataset.label = unit.label.toLowerCase();
    
    const valueElement = document.createElement('div');
    valueElement.className = 'counter-value';
    valueElement.textContent = unit.value;
    
    const labelElement = document.createElement('div');
    labelElement.className = 'counter-label';
    labelElement.textContent = unit.label;
    
    timeUnitElement.appendChild(valueElement);
    timeUnitElement.appendChild(labelElement);
    timeUnitsContainer.appendChild(timeUnitElement);
  });
}

function updateTimeUnits(timeUnits) {
  timeUnits.forEach(unit => {
    const unitElement = timeUnitsContainer.querySelector(`[data-label="${unit.label.toLowerCase()}"] .counter-value`);
    if (unitElement && parseInt(unitElement.textContent) !== unit.value) {
      // Animate the number change
      unitElement.classList.remove('animate-number');
      void unitElement.offsetWidth; // Trigger reflow
      unitElement.classList.add('animate-number');
      unitElement.textContent = unit.value;
    }
  });
}
  

function startHeartAnimation() {
  setInterval(() => {
    createHeart();
  }, 2000);
}

function createHeart() {
  const heartSize = Math.floor(Math.random() * 20) + 10; // 10-30px
  const left = Math.floor(Math.random() * 90) + 5; // 5-95%
  const duration = Math.floor(Math.random() * 6) + 4; // 4-10s
  const delay = Math.floor(Math.random() * 5); // 0-5s
  const rotation = Math.floor(Math.random() * 60) - 30; // -30 to 30 degrees
  
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = `${left}%`;
  heart.style.width = `${heartSize}px`;
  heart.style.height = `${heartSize}px`;
  heart.style.animation = `heart-rise ${duration}s ease-in-out forwards`;
  heart.style.animationDelay = `${delay}s`;
  heart.style.transform = `rotate(${rotation}deg)`;
  
  // Create heart SVG
  const heartSvg = document.createElement('div');
  heartSvg.style.width = '100%';
  heartSvg.style.height = '100%';
  heartSvg.style.backgroundColor = 'rgba(236, 72, 153, 0.4)';
  heartSvg.style.maskImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\'/%3E%3C/svg%3E")';
  heartSvg.style.maskSize = 'contain';
  heartSvg.style.maskRepeat = 'no-repeat';
  heartSvg.style.maskPosition = 'center';
  heartSvg.style.webkitMaskImage = 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z\'/%3E%3C/svg%3E")';
  heartSvg.style.webkitMaskSize = 'contain';
  heartSvg.style.webkitMaskRepeat = 'no-repeat';
  heartSvg.style.webkitMaskPosition = 'center';
  
  heart.appendChild(heartSvg);
  heartContainer.appendChild(heart);
  
  // Clean up after animation
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
  
  // Limit total hearts
  if (heartContainer.children.length > 20) {
    heartContainer.removeChild(heartContainer.firstChild);
  }
}
