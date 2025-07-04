const slides = document.querySelectorAll('.slide');
const paginationContainer = document.getElementById('pagination');
let currentIndex = 0;
const nav = document.querySelector("nav");
const toggleBtn = document.querySelector('.nav-toggle');
const navOptions = document.querySelector('.nav-options');


//Navigation toggle functionality
toggleBtn.addEventListener('click', () => {
  navOptions.classList.toggle('show');
});

//Adding stylling for nav when scrolled
window.addEventListener("scroll", () =>{
  if (window.pageYOffset > 60){
    nav.classList.add("scrolled");
  }else{
    nav.classList.remove("scrolled");
  }
})

// Create pagination dots dynamically
slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.classList.add('pagination-dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  paginationContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.pagination-dot');

function updatePagination() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active');
    slide.style.left = i === index ? '0' : '100%';
  });
  slides[index].classList.add('active');
  updatePagination();
}

function nextSlide() {
  slides[currentIndex].style.left = '-100%';
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].style.left = '100%';
  slides[currentIndex].classList.add('active');
  setTimeout(() => slides[currentIndex].style.left = '0', 10);
  updatePagination();
}

function prevSlide() {
  slides[currentIndex].style.left = '100%';
  slides[currentIndex].classList.remove('active');
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  slides[currentIndex].style.left = '-100%';
  slides[currentIndex].classList.add('active');
  setTimeout(() => slides[currentIndex].style.left = '0', 10);
  updatePagination();
}

function goToSlide(index) {
  if (index === currentIndex) return;
  slides[currentIndex].classList.remove('active');
  slides[currentIndex].style.left = index > currentIndex ? '-100%' : '100%';

  slides[index].style.left = index > currentIndex ? '100%' : '-100%';
  slides[index].classList.add('active');
  setTimeout(() => slides[index].style.left = '0', 10);

  currentIndex = index;
  updatePagination();
}

// ✅ Attach to window for onclick support
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;