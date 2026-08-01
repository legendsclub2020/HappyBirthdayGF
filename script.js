// Cursor following effect
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    }
});

// Typing effect for greeting
const greetingText = "Hey You Know What! You're the most adorable human i ever met! 💖";
const greetingElement = document.querySelector('.greeting');
let charIndex = 0;

function typeGreeting() {
    if (greetingElement && charIndex < greetingText.length) {
        greetingElement.textContent += greetingText.charAt(charIndex);
        charIndex++;
        setTimeout(typeGreeting, 100);
    }
}

// Create floating elements
const floatingElements = ['💖', '✨', '🌸', '💫', '💕'];
function createFloating() {
    const element = document.createElement('div');
    element.className = 'floating';
    element.textContent = floatingElements[Math.floor(Math.random() * floatingElements.length)];
    element.style.left = Math.random() * 100 + 'vw';
    element.style.top = Math.random() * 100 + 'vh';
    element.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(element);

    gsap.to(element, {
        y: -500,
        x: Math.random() * 100 - 50,
        rotation: Math.random() * 360,
        duration: Math.random() * 5 + 5,
        opacity: 1,
        ease: "none",
        onComplete: () => element.remove()
    });
}

// Function to trigger Flower Rain on click
function startFlowerRain() {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    const flowers = ['🌸', '🌺', '🌷', '🌹', '✨', '💖', '🌼'];

    for (let i = 0; i < 50; i++) {
        const flower = document.createElement('div');
        flower.innerText = flowers[Math.floor(Math.random() * flowers.length)];
        flower.style.position = 'absolute';
        flower.style.top = '-50px';
        flower.style.left = Math.random() * 100 + 'vw';
        flower.style.fontSize = (Math.random() * 1.5 + 1.2) + 'rem';

        container.appendChild(flower);

        gsap.to(flower, {
            y: '105vh',
            rotation: 360,
            duration: Math.random() * 2 + 2,
            delay: Math.random() * 1,
            ease: "none"
        });
    }
}

// Initialize animations
window.addEventListener('load', () => {
    // Title animation
    gsap.to('h1', {
        opacity: 1,
        duration: 1,
        y: 20,
        ease: "bounce.out"
    });

    // Button animation
    gsap.to('.cta-button', {
        opacity: 1,
        duration: 1,
        y: -20,
        ease: "back.out"
    });

    // Start typing effect
    typeGreeting();

    // Create floating elements periodically
    setInterval(createFloating, 1000);
});

// Hover and Click effects
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.1,
            duration: 0.3
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3
        });
    });

    // Flower rain + smooth transition to lock page on click
    button.addEventListener('click', () => {
        // Trigger the flower rain shower
        startFlowerRain();

        // Smooth fade out and redirect to lock.html
        gsap.to('body', {
            opacity: 0,
            duration: 1.5,
            delay: 1,
            onComplete: () => {
                window.location.href = 'lock.html';
            }
        });
    });
});
