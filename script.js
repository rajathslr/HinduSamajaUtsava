// Language Toggle Functionality
let currentLang = 'kn'; // Default to Kannada

const langToggle = document.getElementById('langToggle');
const langOptions = langToggle.querySelectorAll('.lang-option');

langToggle.addEventListener('click', function () {
    // Toggle language
    currentLang = currentLang === 'kn' ? 'en' : 'kn';

    // Update active state on toggle button
    langOptions.forEach(option => {
        if ((currentLang === 'kn' && option.textContent === 'ಕನ್ನಡ') ||
            (currentLang === 'en' && option.textContent === 'English')) {
            option.classList.add('active');
        } else {
            option.classList.remove('active');
        }
    });

    // Update all translatable elements
    updateLanguage();
});

function updateLanguage() {
    const elements = document.querySelectorAll('[data-en][data-kn]');

    elements.forEach(element => {
        const text = currentLang === 'en' ? element.getAttribute('data-en') : element.getAttribute('data-kn');
        element.textContent = text;
    });
}

// Android Detection and Google Calendar Integration
function isAndroid() {
    return /Android/i.test(navigator.userAgent);
}

// Show calendar button only on Android devices
if (isAndroid()) {
    const calendarBtn = document.getElementById('addToCalendar');
    if (calendarBtn) {
        calendarBtn.style.display = 'inline-flex';

        // Create Google Calendar event link
        calendarBtn.addEventListener('click', function (e) {
            e.preventDefault();

            // Event details
            const eventTitle = 'Hindu Samajotsava';
            const eventLocation = 'Global Village Back Gate, Channasandra, Bengaluru';
            const eventDescription = 'Hindu Samajotsava - A festival celebrating our culture, strength and unity.';
            const startDate = '20260201T160000'; // Feb 1, 2026, 4:00 PM
            const endDate = '20260201T210000'; // Feb 1, 2026, 9:00 PM

            // Create Google Calendar URL
            const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}&sf=true&output=xml`;

            // Open in new tab
            window.open(googleCalendarUrl, '_blank');
        });
    }
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Add animation on scroll for cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.event-card, .speaker-card, .donate-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
});
