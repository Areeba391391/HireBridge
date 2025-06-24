const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.testimonial-slide');
const indexEl = document.getElementById('slideIndex');
let currentIndex = 0;
let autoSlideInterval;

function updateSlide() {
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
    indexEl.textContent = currentIndex + 1;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateSlide();
}

// Event listeners
document.getElementById('next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.getElementById('prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, 4000); // change every 4 seconds
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Initialize
updateSlide();
startAutoSlide();

const statNumbers = document.querySelectorAll(".stat-number");

const animateCount = (element) => {
    const target = +element.getAttribute("data-target");
    const speed = 200; // smaller is faster
    const increment = target / speed;

    const updateCount = () => {
        const current = +element.innerText;
        if (current < target) {
            element.innerText = Math.ceil(current + increment);
            requestAnimationFrame(updateCount);
        } else {
            element.innerText = target;
        }
    };

    updateCount();
};

// Intersection Observer to animate only when visible
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const stat = entry.target.querySelector(".stat-number");
            animateCount(stat);
            observer.unobserve(entry.target); // run only once
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll(".stat-ring").forEach((ring) => {
    observer.observe(ring);
});


const techStackData = {
    backend: [
        { name: "Node.js", img: "https://placehold.co/100x100/6DA55F/ffffff?text=Node.js" },
        { name: "PHP", img: "https://placehold.co/100x100/787CB5/ffffff?text=PHP" },
        { name: "Java", img: "https://placehold.co/100x100/E02E2E/ffffff?text=Java" },
        { name: ".NET Core", img: "https://placehold.co/100x100/512BD4/ffffff?text=.NET" },
        { name: "Python", img: "https://placehold.co/100x100/3776AB/ffffff?text=Python" },
        { name: "Ruby on Rails", img: "https://placehold.co/100x100/CC0000/ffffff?text=Rails" }
    ],
    frontend: [
        { name: "React", img: "https://placehold.co/100x100/61DAFB/20232A?text=React" },
        { name: "Angular", img: "https://placehold.co/100x100/DD0031/ffffff?text=Angular" },
        { name: "Vue.js", img: "https://placehold.co/100x100/4FC08D/ffffff?text=Vue.js" },
        { name: "JavaScript", img: "https://placehold.co/100x100/F7DF1E/333333?text=JS" },
        { name: "HTML5", img: "https://placehold.co/100x100/E34F26/ffffff?text=HTML5" },
        { name: "CSS3", img: "https://placehold.co/100x100/1572B6/ffffff?text=CSS3" }
    ],
    databases: [
        { name: "MySQL", img: "https://placehold.co/100x100/00758F/ffffff?text=MySQL" },
        { name: "MongoDB", img: "https://placehold.co/100x100/47A248/ffffff?text=MongoDB" },
        { name: "PostgreSQL", img: "https://placehold.co/100x100/336791/ffffff?text=PostgreSQL" },
        { name: "SQL Server", img: "https://placehold.co/100x100/CC2927/ffffff?text=SQL+Server" },
        { name: "Cassandra", img: "https://placehold.co/100x100/1287B9/ffffff?text=Cassandra" },
        { name: "Redis", img: "https://placehold.co/100x100/DC382D/ffffff?text=Redis" }
    ],
    cms: [
        { name: "WordPress", img: "https://placehold.co/100x100/21759B/ffffff?text=WordPress" },
        { name: "Drupal", img: "https://placehold.co/100x100/0678AF/ffffff?text=Drupal" },
        { name: "Joomla", img: "https://placehold.co/100x100/5093CD/ffffff?text=Joomla" },
        { name: "Shopify", img: "https://placehold.co/100x100/96BF48/ffffff?text=Shopify" },
        { name: "Squarespace", img: "https://placehold.co/100x100/121212/ffffff?text=SquareSpace" },
        { name: "Webflow", img: "https://placehold.co/100x100/4353FF/ffffff?text=Webflow" }
    ],
    cloudtesting: [
        { name: "Selenium", img: "https://placehold.co/100x100/43B02A/ffffff?text=Selenium" },
        { name: "Jenkins", img: "https://placehold.co/100x100/D24939/ffffff?text=Jenkins" },
        { name: "AWS Device Farm", img: "https://placehold.co/100x100/FF9900/ffffff?text=AWS+DF" },
        { name: "BrowserStack", img: "https://placehold.co/100x100/6C4DAB/ffffff?text=BrowserStack" },
        { name: "Cypress", img: "https://placehold.co/100x100/172A3A/ffffff?text=Cypress" },
        { name: "Playwright", img: "https://placehold.co/100x100/21272E/ffffff?text=Playwright" }
    ]
};

const techIconsContainer = document.getElementById('tech-icons-container');
const categoryButtons = document.querySelectorAll('.tech-category-btn');


function renderTechIcons(category) {
    techIconsContainer.innerHTML = '';
    const iconsToRender = techStackData[category] || [];


    techIconsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';

    iconsToRender.forEach(tech => {
        const techDiv = document.createElement('div');
        techDiv.className = 'tech-icon-card';

        techDiv.innerHTML = `
                    <img src="${tech.img}" alt="${tech.name} Logo" class="tech-icon-img">
                    <span class="tech-icon-name">${tech.name}</span>
                `;
        techIconsContainer.appendChild(techDiv);
    });
}

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => {
            btn.classList.remove('tech-category-btn-active');
            btn.classList.add('tech-category-btn-default');
        });

        button.classList.add('tech-category-btn-active');
        button.classList.remove('tech-category-btn-default');

        const selectedCategory = button.dataset.category;
        renderTechIcons(selectedCategory);
    });
});


if (categoryButtons.length > 0) {
    categoryButtons[0].click();
}

window.addEventListener('resize', () => {
    const activeCategoryButton = document.querySelector('.tech-category-btn-active');
    if (activeCategoryButton) {
        renderTechIcons(activeCategoryButton.dataset.category);
    }
    if (window.innerWidth < 480) {
        techIconsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (window.innerWidth >= 768 && window.innerWidth < 1024) {
        techIconsContainer.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else if (window.innerWidth >= 1024) {
        techIconsContainer.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }
});
//////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.querySelector(".toggle-btn");
    const menu = document.querySelector(".right-nav ul");
    const header_left = document.querySelector(".header-left");
    toggleBtn.addEventListener("click", () => {
        menu.classList.toggle("open");
        // header_left.style.marginTop = "400px";
        header_left.classList.toggle("slide");

    });
});



//    function togglemenu() {
//             let menulist = document.getElementById("menulist");
//             menulist.classList.toggle("show");
//         }
/////////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const counterElement = document.getElementById('counter');

    const runCounter = () => {
        const target = 150;
        let current = 0;
        const duration = 2000;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                clearInterval(timer);
                counterElement.innerText = target;
            } else {
                counterElement.innerText = Math.ceil(current);
            }
        }, stepTime);
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                runCounter();
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    observer.observe(counterElement);
});
