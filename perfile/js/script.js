const navLinks = document.querySelectorAll('header nav a');
const logoLink = document.querySelector('.logo');

const section = document.querySelectorAll('section');

const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('header nav');

menuIcon.addEventListener('click', () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
})

function activePage() {
    const header = document.querySelector('header');
    const barsBox = document.querySelector('.bars-box');

    header.classList.remove('active');
    setTimeout(() => {
        header.classList.add('active');

    }, 1100);

    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    barsBox.classList.remove('active');
    setTimeout(() => {
        barsBox.classList.add('active');

    }, 1100);

    section.forEach(section => {
        section.classList.remove('active');
    }); 

    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

}

navLinks.forEach((link, idx) =>{
    link.addEventListener('click', () =>{
        if(!link.classList.contains('active')){
            activePage();

            link.classList.add('active');

            setTimeout(() =>{
                section[idx].classList.add('active');
            },1100)
        }
    });
});

logoLink.addEventListener('click',() =>{
    if(!navLinks[0].classList.contains('active')){
        activePage();
        
        navLinks[0].classList.add('active');

        setTimeout(() =>{
            section[0].classList.add('active');
        },1100)
    }
});

const resumeBtns = document.querySelectorAll('.resume-btn');

resumeBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        const resumeDetails = document.querySelectorAll('.resume-detail');

        // Remove 'active' class from all buttons
        resumeBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        // Add 'active' class to the clicked button
        btn.classList.add('active');

        // Remove 'active' class from all details and add to the corresponding one
        resumeDetails.forEach(detail => {
            detail.classList.remove('active');
        });
        resumeDetails[idx].classList.add('active');
    });
});

const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');

let index = 0;

// Function to update portfolio carousel position
const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');


    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => {
        detail.classList.remove('active');
    });
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    if (index < 4) { // Corrected to allow up to index 5 as per the logic
        index++;
        arrowLeft.classList.remove('disabled');
    } 
    else  {
        index = 5;
        arrowRight.classList.add('disabled'); 
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) { // Corrected to allow down to index 0 as per the logic
        index--;
        arrowRight.classList.remove('disabled'); 
    } 
    else  {
        index = 0;
        arrowLeft.classList.add('disabled'); 
    }
    activePortfolio();
});





// Smooth scrolling function (optional)
function smoothScroll(target) {
  const targetElement = document.querySelector(target);
  const startPosition = window.pageYOffset; // Get current scroll position
  const distance = targetElement.offsetTop - startPosition; // Calculate distance to target
  let startTime = null;

  // Function to animate scroll position
  function animate(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const ease = 0.5 + (Math.sin((timeElapsed / 1000) * Math.PI) * 0.5); // Ease-in-out easing
    const newPosition = startPosition + ease * distance;

    window.scrollTo(0, newPosition);

    if (newPosition < distance + startPosition) {
      requestAnimationFrame(animate);
    } else {
      window.scrollTo(0, targetElement.offsetTop); // Ensure final scroll position
    }
  }

  requestAnimationFrame(animate);
}

// Add click event listeners to navigation links
navLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent default anchor link behavior
    const target = link.getAttribute('href');
    smoothScroll(target); // Call smooth scrolling function (optional)
    // Or: window.scrollTo(0, document.querySelector(target).offsetTop);  // Basic scroll
  });
});

// Add event listener for smooth scrolling on page load (optional)
window.addEventListener('load', () => {
  const urlHash = window.location.hash; // Check for anchor link in URL
  if (urlHash) {
    smoothScroll(urlHash); // Scroll to section based on hash
  }
});