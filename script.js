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

// Sample Products Data
const products = [
    {
        name: 'Picanha',
        description: 'Corte nobre bovina',
        price: '€ 16,95/kg',
        image: 'images/bife.jpg'
    },
    
    {
        name: 'Bife do Vazio',
        description: 'Corte macio e saboroso',
        price: '€ 18.95/kg',
        image: 'images/bife_vazio.jpg'
    },
    {
        name: 'Bife do Rolo',
        description: 'Corte Perfeito para o Pão',
        price: '€ 14.95/kg',
        image: 'images/bife_rolo.jpg'
    },

    
    {
        name: 'Carne Bocadinhos',
        description: 'Perfeita para Guizar',
        price: '€ 9,95/kg',
        image: 'images/carne_guisar.jpg'
    },
    {
        name: 'Feveras de Porco ',
        description: 'Para Grelhas, Panar',
        price: '€ 5,99/kg',
        image: 'images/feveras.jpg'
    },

    {
        name: 'Lombo S/ Osso',
        description: 'Lombo para Assar',
        price: '€ 5,99/kg',
        image: 'images/lombo_sem osso.jpg'
    },
    {
        name: 'Entrecosto',
        description: 'Perfeita para Grelhar',
        price: '€ 5,95/kg',
        image: 'images/entrecosto3.jpg'
    },
    {
        name: 'Bifanas de Porco',
        description: 'Perfeito para o Pão',
        price: '€ 5,99/kg',
        image: 'images/bifanas.jpg'
    },
    {
        name: 'Frango',
        description: 'Perfeito para tudo',
        price: '€ 2,65/kg',
        image: 'images/FRANGO.jpg'
    },
    {
        name: 'Asas de Frango',
        description: 'Perfeito para Grelhar',
        price: '€ 2,39/kg',
        image: 'images/ASAS_FRANGO.jpg'
    },   
    {
        name: 'Coxas de Frango',
        description: 'Perfeito para Assar',
        price: '€ 2,95/kg',
        image: 'images/coxas_frango.jpg'
    },
    {
        name: 'Perninhas de Frango',
        description: 'Perfeito para a Air Fryer',
        price: '€ 4,99/kg',
        image: 'images/pernas_frango.jpg'
    }
];

// Load Products Dynamically
function loadProducts() {
    const productsGrid = document.querySelector('.products-grid');
    
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Add scroll event listener for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        header.classList.toggle('scrolled', window.scrollY > 0);
    });
});

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

// Fechar modal
document.addEventListener('DOMContentLoaded', function() {
  loadReceitas();
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
/*
  const tonoMascote = document.getElementById('tono-mascote');
  if (tonoMascote) {
    tonoMascote.addEventListener('click', function() {
      const sugestao = TONO.sugereReceita();
      TONO.mostrarReceitaNoModal(sugestao);
    });
  }*/
}); 