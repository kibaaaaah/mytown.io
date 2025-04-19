/**
 * MyTown Services - Main JavaScript File
 * This handles all interactive functionality across the website
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('MyTown Services - Script loaded');
    
    // Initialize components based on which page we're on
    const currentPage = document.body.id;
    
    switch(currentPage) {
        case 'home-page':
            initHomePage();
            break;
        case 'services-page':
            initServicesPage();
            break;
        case 'provider-page':
            initProviderPage();
            break;
        case 'booking-page':
            initBookingPage();
            break;
    }
    
    // Common initialization for all pages
    initCommonComponents();
});

function initCommonComponents() {
    // Image error handling
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            const serviceType = this.alt.replace(' Services', '') || 'Service';
            this.src = `https://placehold.co/600x400/CCCCCC/999999?text=${encodeURIComponent(serviceType)}`;
        });
    });
}

function initHomePage() {
    console.log('Initializing home page');
    
    // Animate the hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        heroSection.style.transform = 'translateY(20px)';
        heroSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        
        setTimeout(() => {
            heroSection.style.opacity = '1';
            heroSection.style.transform = 'translateY(0)';
        }, 100);
    }
}

function initServicesPage() {
    console.log('Initializing services page');
    
    // Make entire card clickable except buttons
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                return;
            }
            
            const serviceId = this.getAttribute('data-service-id');
            if (serviceId) {
                window.location.href = `provider.html?service=${serviceId}`;
            }
        });
    });
}

function initProviderPage() {
    console.log('Initializing provider page');
    
    const urlParams = new URLSearchParams(window.location.search);
    const serviceType = urlParams.get('service');
    
    if (!serviceType) {
        window.location.href = 'services.html';
        return;
    }
    
    const providers = {
        plumbing: {
            name: "John's Plumbing",
            rating: "4.8 ★ (42 reviews)",
            about: "10 years experience in residential plumbing. Licensed and insured.",
            services: [
                "Pipe repair - ₹500",
                "Faucet installation - ₹800",
                "Water heater service - ₹1200"
            ],
            image: "https://placehold.co/400x400/003366/FFFFFF?text=Plumber"
        },
        tutoring: {
            name: "Priya's Tutoring",
            rating: "4.9 ★ (35 reviews)",
            about: "Certified math tutor with 7 years experience helping students excel.",
            services: [
                "Math tutoring - ₹300/hour",
                "Science tutoring - ₹350/hour",
                "Exam preparation - ₹400/hour"
            ],
            image: "https://placehold.co/400x400/660033/FFFFFF?text=Tutor"
        },
        handyman: {
            name: "Rahul's Handyman Services",
            rating: "4.7 ★ (28 reviews)",
            about: "5 years experience in home repairs and maintenance. Reliable and affordable.",
            services: [
                "Furniture assembly - ₹600",
                "TV mounting - ₹800",
                "General home repairs - ₹500/hour"
            ],
            image: "https://placehold.co/400x400/336600/FFFFFF?text=Handyman"
        }
    };
    
    const provider = providers[serviceType];
    
    if (!provider) {
        window.location.href = 'services.html';
        return;
    }
    
    // Update the page with provider data
    document.getElementById('provider-name').textContent = provider.name;
    document.getElementById('provider-rating').textContent = provider.rating;
    document.getElementById('provider-about').textContent = provider.about;
    document.getElementById('provider-img').src = provider.image;
    document.getElementById('provider-img').alt = provider.name;
    
    // Populate services list
    const servicesList = document.getElementById('provider-services');
    servicesList.innerHTML = provider.services.map(service => 
        `<li class="list-group-item">${service}</li>`
    ).join('');
    
    // Set up the Book Now button
    const bookNowBtn = document.getElementById('book-now-btn');
    if (bookNowBtn) {
        bookNowBtn.href = `booking.html?service=${encodeURIComponent(provider.name)}&provider=${encodeURIComponent(provider.name)}&type=${serviceType}`;
    }
}

function initBookingPage() {
    console.log('Initializing booking page');
    
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service');
    const provider = urlParams.get('provider');
    const type = urlParams.get('type');

    if (service && provider) {
        document.getElementById('service-display').textContent = `Service: ${service}`;
        document.getElementById('provider-display').textContent = `Provider: ${provider}`;
        document.getElementById('service-type').value = type;
    } else {
        window.location.href = 'services.html';
    }

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('booking-date').min = today;

    // Form submission handler
    document.getElementById('booking-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (this.checkValidity()) {
            const bookingDetails = {
                service: document.getElementById('service-display').textContent.replace('Service: ', ''),
                provider: document.getElementById('provider-display').textContent.replace('Provider: ', ''),
                date: document.getElementById('booking-date').value,
                time: document.getElementById('booking-time').value,
                name: document.getElementById('customer-name').value,
                phone: document.getElementById('customer-phone').value,
                address: document.getElementById('customer-address').value,
                notes: document.getElementById('special-notes').value
            };

            console.log('Booking details:', bookingDetails);
            
            alert(`Booking confirmed!\n\n${bookingDetails.service}\nWith ${bookingDetails.provider}\nOn ${bookingDetails.date} at ${bookingDetails.time}\n\nWe'll contact you shortly.`);
            
            window.location.href = 'index.html';
        }
        
        this.classList.add('was-validated');
    });
}