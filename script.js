// Smooth scrolling for navigation links
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

// Property search functionality
const searchForm = document.querySelector('.search-section form');
const propertiesContainer = document.querySelector('.properties-section .row');

// Simple function to extract price as a number
const getPriceValue = (priceText) => {
    if (!priceText) return 0;
    const number = parseInt(priceText.replace(/[^0-9]/g, ''));
    return isNaN(number) ? 0 : number;
};

// Simple function to check property type
const matchesType = (title, type) => {
    if (type === 'Tipo de Imóvel') return true;
    return title.toLowerCase().includes(type.toLowerCase());
};

// Simple function to check price range
const matchesPrice = (price, range) => {
    if (range === 'Faixa de Preço') return true;
    
    const value = getPriceValue(price);
    if (value === 0) return false;

    switch (range) {
        case 'Até R$ 200.000':
            return value <= 200000;
        case 'R$ 200.000 - R$ 500.000':
            return value >= 200000 && value <= 500000;
        case 'Acima de R$ 500.000':
            return value > 500000;
        default:
            return true;
    }
};

// Function to show/hide no results message
const toggleNoResults = (show) => {
    const container = document.querySelector('.properties-section .row');
    let message = document.getElementById('no-results-message');

    if (show) {
        if (!message) {
            message = document.createElement('div');
            message.id = 'no-results-message';
            message.className = 'col-12 text-center my-4';
            message.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    Nenhum imóvel encontrado com os filtros selecionados.
                    <button class="btn btn-link p-0 ms-2" onclick="window.location.reload()">Limpar filtros</button>
                </div>
            `;
            container.appendChild(message);
        }
    } else if (message) {
        message.remove();
    }
};

// Main filter function
const applyFilters = (e) => {
    e.preventDefault();
    
    // Get filter values
    const typeSelect = document.getElementById('propertyType');
    const priceSelect = document.getElementById('priceRange');
    
    if (!typeSelect || !priceSelect) {
        console.error('Filter elements not found');
        return;
    }
    
    const selectedType = typeSelect.value;
    const selectedPrice = priceSelect.value;
    
    console.log('Applying filters:', { selectedType, selectedPrice });
    
    // Filter properties
    const properties = document.querySelectorAll('.property-card');
    let visibleCount = 0;
    
    properties.forEach(property => {
        const card = property.closest('.col-md-4');
        const title = property.querySelector('.card-title')?.textContent || '';
        const price = property.querySelector('.price')?.textContent || '';
        
        const typeMatch = matchesType(title, selectedType);
        const priceMatch = matchesPrice(price, selectedPrice);
        
        console.log('Property check:', {
            title,
            price,
            priceValue: getPriceValue(price),
            typeMatch,
            priceMatch
        });
        
        if (typeMatch && priceMatch) {
            card.style.display = '';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    toggleNoResults(visibleCount === 0);
    
    console.log('Filter complete:', {
        total: properties.length,
        visible: visibleCount
    });
};

// Initialize filters when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const typeSelect = document.getElementById('propertyType');
    const priceSelect = document.getElementById('priceRange');
    
    if (form && typeSelect && priceSelect) {
        form.addEventListener('submit', applyFilters);
        console.log('Filter system initialized');
    } else {
        console.error('Filter initialization failed:', {
            form: !!form,
            typeSelect: !!typeSelect,
            priceSelect: !!priceSelect
        });
    }
});

// Contact form validation and submission
const contactForm = document.querySelector('.contact-section form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    let isValid = true;
    let errorMessage = '';
    
    if (!name.trim()) {
        errorMessage += 'Nome é obrigatório\n';
        isValid = false;
    }
    
    if (!email.trim() || !email.includes('@')) {
        errorMessage += 'Email inválido\n';
        isValid = false;
    }
    
    if (!phone.trim() || phone.length < 10) {
        errorMessage += 'Telefone inválido\n';
        isValid = false;
    }
    
    if (!message.trim()) {
        errorMessage += 'Mensagem é obrigatória\\n';
        isValid = false;
    }
    
    if (!isValid) {
        alert('Por favor, corrija os seguintes erros:\\n' + errorMessage);
        return;
    }

    // Simulate form submission
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';
    
    // Simulate API call
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        this.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
    }, 1500);
});

// Dynamic navbar behavior on scroll
const navbar = document.querySelector('.navbar');
const handleScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// Add scroll event listener and run once on load
window.addEventListener('scroll', handleScroll);
handleScroll(); // Run once to set initial state

// Property card hover effect with image zoom
document.querySelectorAll('.property-card').forEach(card => {
    const img = card.querySelector('img');
    card.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
        img.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
});

// WhatsApp contact button
document.querySelectorAll('.social-links a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '5511912345678'; // Substitua pelo número real
        const message = 'Olá! Gostaria de mais informações sobre os imóveis.';
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    });
});
