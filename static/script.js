const mainMenu = document.getElementById('main-menu');
const pickerBox = document.getElementById('picker-box');
const clickBox = document.getElementById('click-box');
const resultText = document.getElementById('result');
const backBtn = document.getElementById('back-btn');

let currentCategory = null;

mainMenu.addEventListener('click', (e) => {
  const card = e.target.closest('.card.clickable');
  if (!card) return;

  currentCategory = card.dataset.category;
  if (!currentCategory) return;

  // Hide main menu, show picker box
  mainMenu.classList.add('hidden');
  pickerBox.classList.remove('hidden');

  // Reset picker box
  clickBox.textContent = 'Click me to get your choice';
  clickBox.style.color = '#2c3e50'; // reset color
  resultText.textContent = '';
});

clickBox.addEventListener('click', async () => {
  if (!currentCategory) return;

  try {
    const res = await fetch(`/pick/${currentCategory}`);
    if (!res.ok) throw new Error('Failed to fetch choice');

    const data = await res.json();
    const choice = data.result;

    resultText.textContent = choice;

    // If color category, color the result text
    if (currentCategory === 'colors') {
      resultText.style.color = choice.startsWith('#') ? choice : choice.toLowerCase();
    } else {
      resultText.style.color = '#2c3e50'; // default text color
    }
  } catch (err) {
    alert('Oops! Something went wrong.');
    console.error(err);
  }
});

backBtn.addEventListener('click', () => {
  pickerBox.classList.add('hidden');
  mainMenu.classList.remove('hidden');
  currentCategory = null;
});
