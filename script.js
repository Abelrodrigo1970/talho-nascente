// Mobile Navigation
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    // Toggle Nav
    nav.classList.toggle('active');
    
    // Animate Links
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dados dos produtos (sem preços - serão carregados do JSON)
const productsData = [
    {
        name: 'Picanha',
        description: 'Corte nobre bovina',
        image: 'images/bife.jpg'
    },
    {
        name: 'Bife do Vazio',
        description: 'Corte macio e saboroso',
        image: 'images/bife_vazio.jpg'
    },
    {
        name: 'Bife do Rolo',
        description: 'Corte Perfeito para o Pão',
        image: 'images/bife_rolo.jpg'
    },
    {
        name: 'Carne Bocadinhos',
        description: 'Perfeita para Guizar',
        image: 'images/carne_guisar.jpg'
    },
    {
        name: 'Feveras de Porco ',
        description: 'Para Grelhas, Panar',
        image: 'images/feveras.jpg'
    },
    {
        name: 'Lombo S/ Osso',
        description: 'Lombo para Assar',
        image: 'images/lombo_sem osso.jpg'
    },
    {
        name: 'Entrecosto',
        description: 'Perfeita para Grelhar',
        image: 'images/entrecosto3.jpg'
    },
    {
        name: 'Bifanas de Porco',
        description: 'Perfeito para o Pão',
        image: 'images/bifanas.jpg'
    },
    {
        name: 'Frango',
        description: 'Perfeito para tudo',
        image: 'images/FRANGO.jpg'
    },
    {
        name: 'Asas de Frango',
        description: 'Perfeito para Grelhar',
        image: 'images/ASAS_FRANGO.jpg'
    },   
    {
        name: 'Coxas de Frango',
        description: 'Perfeito para Assar',
        image: 'images/coxas_frango.jpg'
    },
    {
        name: 'Perninhas de Frango',
        description: 'Perfeito para a Air Fryer',
        image: 'images/pernas_frango.jpg'
    }
];

// Mapeamento das promoções (ordem no HTML)
const promocoesOrder = [
    'Costeletas da Rilada',
    'Frango Panado',
    'Carne para Rojões',
    'Almondegas de Bife'
];

// Carregar preços do JSON
async function loadPrecos() {
    try {
        const response = await fetch('precos.json');
        if (!response.ok) throw new Error('Erro ao carregar preços');
        
        const precos = await response.json();
        
        // Atualizar preços dos produtos
        if (precos.produtos && precos.produtos.length > 0) {
            const products = productsData.map((product) => {
                const precoData = precos.produtos.find(p => p.nome === product.name);
                return {
                    ...product,
                    price: precoData ? precoData.preco : 'Preço não disponível'
                };
            });
            loadProducts(products);
        } else {
            // Fallback: usar produtos sem preço
            loadProducts(productsData.map(p => ({ ...p, price: 'Preço não disponível' })));
        }
        
        // Atualizar preços das promoções
        if (precos.promocoes && precos.promocoes.length > 0) {
            updatePromocoesPrecos(precos.promocoes);
        }
        
    } catch (error) {
        console.error('Erro ao carregar preços do JSON:', error);
        // Fallback: usar produtos sem preço
        loadProducts(productsData.map(p => ({ ...p, price: 'Preço não disponível' })));
    }
}

// Atualizar preços das promoções no HTML
function updatePromocoesPrecos(promocoes) {
    const promoCards = document.querySelectorAll('.promo-card');
    
    promocoesOrder.forEach((nomePromo, index) => {
        const promoData = promocoes.find(p => p.nome === nomePromo);
        if (promoData && promoCards[index]) {
            const priceElement = promoCards[index].querySelector('.price');
            if (priceElement) {
                // Manter o formato "Apenas" se já existir, senão usar apenas o preço
                const currentText = priceElement.textContent.trim();
                if (currentText.includes('Apenas') || currentText.startsWith('Apenas')) {
                    priceElement.textContent = 'Apenas ' + promoData.preco;
                } else {
                    priceElement.textContent = promoData.preco;
                }
            }
        }
    });
}

// Load Products Dynamically
function loadProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="price">${product.price}</p>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Carregar receitas dinamicamente
function loadReceitas() {
    const grid = document.getElementById('recipes-grid');
    if (!grid) return;
    grid.innerHTML = '';
    receitas.forEach(receita => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <img src="${receita.imagem}" alt="${receita.nome}">
            <h3>${receita.nome}</h3>
            <p>${receita.resumo}</p>
        `;
        card.addEventListener('click', () => TONO.mostrarReceitaNoModal(receita));
        grid.appendChild(card);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Carregar preços do JSON
    loadPrecos();
    
    // Carregar receitas
    loadReceitas();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            header.classList.toggle('scrolled', window.scrollY > 0);
        }
    });
    
    // Fechar modal
    const modal = document.getElementById('modal-receita');
    const closeModal = document.querySelector('#modal-receita .close-modal');
    if (closeModal && modal) {
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        window.addEventListener('click', function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }
});
