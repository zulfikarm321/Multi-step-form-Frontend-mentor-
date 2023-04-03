const mainContent = document.querySelector('.section_content');

let stepNumber = 0;
const backButton = document.querySelector('.back_button');
const nextButton = document.querySelector('.next_button');
const stepNumberCircles = document.querySelectorAll('.step_number');

const content = [
  `<h1>PAGE 1</h1>`,
  `<h1>PAGE 2</h1>`,
  '<h1>PAGE 3</h1>',
  '<h1>PAGE 4</h1>'
];

function renderMainContent(content) {
  for (circle of stepNumberCircles) {
    circle.classList.remove('active');
    stepNumberCircles[stepNumber].classList.add('active');
  }
  mainContent.innerHTML = content[stepNumber];
}

nextButton.addEventListener('click', function () {
  if (stepNumber == 3) return;
  stepNumber += 1;
  renderMainContent(content);
});

backButton.addEventListener('click', function () {
  if (stepNumber == 0) return;
  stepNumber -= 1;
  renderMainContent(content);
});

renderMainContent(content);
