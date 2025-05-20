const TONO = {
  // Estados de humor do Tono
  estados: {
    feliz: "😊",
    pensativo: "🤔",
    surpreso: "",
    animado: ""
  },

  // Frases de saudação
  saudacoes: [
    "Olá! Não sabe o que fazer para o Almoço/Jantar?",
    "Olá! Que tal uma receita nova para o Almoço/Jantar?"
  ],
  ultimoIngredienteFalhado: null,
  // Inicialização
  init: function() {
    // Usar as receitas diretamente do arquivo receitas.js
    this.receitas = receitas;
    
    // Adicionar evento de clique no mascote
    const mascote = document.getElementById('tono-mascote');
    if (mascote) {
      mascote.addEventListener('click', () => {
        const chat = document.getElementById('tono-chat');
        if (chat) {
          chat.style.display = 'block';
          this.iniciarConversa();
        }
      });
    }

    // Inicialmente esconder o chat
    const chat = document.getElementById('tono-chat');
    if (chat) {
      chat.style.display = 'none';
    }

    // Adicionar evento de submit no formulário
    const form = document.getElementById('tono-chat-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.getElementById('tono-chat-input');
        if (input && input.value.trim()) {
          this.processarMensagem(input.value.trim());
          input.value = '';
        }
      });
    }

    // Adicionar evento de fechar no botão de fechar
    const closeButton = document.getElementById('tono-chat-close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        const chat = document.getElementById('tono-chat');
        if (chat) {
          chat.style.display = 'none';
        }
      });
    }
  },

  // Função para limpar o chat
  limparChat: function() {
    const chatBody = document.getElementById('tono-chat-body');
    if (chatBody) {
        chatBody.innerHTML = '';
    }
  },

  // Função para iniciar conversa
  iniciarConversa: function() {
    // Limpar o chat antes de iniciar
    this.limparChat();
    
    const saudacao = this.saudacoes[Math.floor(Math.random() * this.saudacoes.length)];
    this.mostrarMensagem(saudacao);
    this.mostrarMensagem("Diga um produto (ex: carne de vaca) e eu vou te ajudar a encontrar uma receita!");
  },

  // Busca uma receita pelo id
  getReceitaPorId: function(id) {
    return this.receitas.find(r => r.id === id);
  },

  // Sugere uma receita aleatória
  sugereReceita: function() {
    if (!this.receitas || this.receitas.length === 0) {
      console.error('Nenhuma receita disponível');
      return null;
    }
    const idx = Math.floor(Math.random() * this.receitas.length);
    return this.receitas[idx];
  },

  // Procura receitas por nome ou ingredientes
  procuraReceita: function(termo) {
    if (!this.receitas || this.receitas.length === 0) {
      console.error('Nenhuma receita disponível para busca');
      return [];
    }

    termo = termo.toLowerCase();
    console.log('Procurando receitas com termo:', termo);

    const receitasEncontradas = this.receitas.filter(r => {
      // Procura no nome da receita
      const nomeMatch = r.nome.toLowerCase().includes(termo);
      
      // Procura nos ingredientes
      const ingredientesMatch = r.ingredientes.some(i => 
        i.toLowerCase().includes(termo)
      );

      return nomeMatch || ingredientesMatch;
    });

    console.log('Receitas encontradas:', receitasEncontradas);
    return receitasEncontradas;
  },

  // Mostra uma receita no modal
  mostrarReceitaNoModal: function(receita) {
    if (!receita) {
      console.error('Receita inválida');
      return;
    }
    
    const modal = document.getElementById('modal-receita');
    const modalTitulo = document.getElementById('modal-titulo');
    const ingredientes = document.getElementById('modal-ingredientes');
    const preparacao = document.getElementById('modal-preparacao');
    
    if (!modal || !modalTitulo || !ingredientes || !preparacao) {
      console.error('Elementos do modal não encontrados');
      return;
    }

    modalTitulo.textContent = receita.nome;
    
    // Limpar e adicionar ingredientes
    ingredientes.innerHTML = '';
    if (receita.ingredientes && Array.isArray(receita.ingredientes)) {
      receita.ingredientes.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        ingredientes.appendChild(li);
      });
    }

    // Limpar e adicionar preparação
    preparacao.innerHTML = '';
    if (receita.preparacao && Array.isArray(receita.preparacao)) {
      receita.preparacao.forEach(pass => {
        const li = document.createElement('li');
        li.textContent = pass;
        preparacao.appendChild(li);
      });
    }

    // Mostrar o modal
    modal.style.display = 'block';

    // Fechar o chat
    const chat = document.getElementById('tono-chat');
    if (chat) {
      chat.style.display = 'none';
    }
  },

// Função para buscar receita na internet via API local
buscarReceitaNaInternet: async function(ingrediente) {
  try {
    const response = await fetch("https://talho-nascente.onrender.com/api/receita", {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ingrediente })
    });
    
    if (!response.ok) throw new Error('Resposta inválida do servidor');

    const receita = await response.json();
    if (receita && receita.nome) {
      this.mostrarReceitaNoModal(receita);
      this.mostrarMensagem(`Encontrei esta receita online: ${receita.nome}`);
      // Fecha o chat
      const chat = document.getElementById('tono-chat');
      if (chat) chat.style.display = 'none';
    } else {
      this.mostrarMensagem("Desculpe, não consegui encontrar uma receita com esse ingrediente.");
    }
  } catch (error) {
    console.error("Erro ao buscar receita online:", error);
    this.mostrarMensagem("Ocorreu um erro ao procurar a receita online. 😢");
  }
},


  // Função para mostrar mensagem no chat
  mostrarMensagem: function(mensagem, tipo = 'tono') {
    const chatBody = document.getElementById('tono-chat-body');
    if (!chatBody) {
      console.error('Elemento tono-chat-body não encontrado');
      return;
    }
    
    const msgDiv = document.createElement('div');
    msgDiv.className = `chat-message ${tipo}`;
    msgDiv.innerHTML = mensagem;
        chatBody.appendChild(msgDiv)
        chatBody.scrollTop = chatBody.scrollHeigh    
    const chat = document.getElementById('tono-chat');
    if (chat) chat.classList.add('minimizado');
  },

  // Função para mostrar animação de carregamento
  mostrarLoading: function() {
    const chatBody = document.getElementById('tono-chat-body');
    if (!chatBody) return;

    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'tono-loading';
    loadingDiv.innerHTML = `
        <img src="images/cat-typing.gif" 
             alt="Gato digitando" 
             style="width: 200px; height: 200px; border-radius: 10px;">
    `;
    chatBody.appendChild(loadingDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
    return loadingDiv;
  },

  // Função para remover animação de carregamento
  removerLoading: function(loadingElement) {
    if (loadingElement && loadingElement.parentNode) {
        loadingElement.parentNode.removeChild(loadingElement);
    }
  },

  // Função para processar mensagem do usuário
  processarMensagem: async function(mensagem) {
    mensagem = mensagem.toLowerCase();
    
    if (mensagem.includes('sim') && this.ultimoIngredienteFalhado) {
        // Não mostrar a mensagem "sim" do usuário
        this.limparChat();
        this.mostrarMensagem("Vou procurar uma receita na internet... 🍳");
  
        try {
            // Mostrar animação de carregamento
            const loadingElement = this.mostrarLoading();
            
            const response = await fetch('https://talho-nascente.onrender.com/api/receita', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ingrediente: this.ultimoIngredienteFalhado })
            });

            // Remover animação de carregamento
            this.removerLoading(loadingElement);

            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }

            const receita = await response.json();
            
            if (receita.error) {
                throw new Error(receita.error);
            }

            this.mostrarReceitaNoModal(receita);
            this.mostrarMensagem(`Encontrei esta receita especial: ${receita.nome}`);
            this.ultimoIngredienteFalhado = null;

            // Fechar o chat
            const chat = document.getElementById('tono-chat');
            if (chat) chat.style.display = 'none';
        } catch (error) {
            console.error('Erro ao buscar receita:', error);
            this.mostrarMensagem("Desculpe, não consegui encontrar uma receita online. Tente outro ingrediente!");
        }
  
        return;
    } else if (this.ultimoIngredienteFalhado) {
        // Se não for "sim" e tiver um ingrediente falhado, fechar o chat
        this.ultimoIngredienteFalhado = null;
        const chat = document.getElementById('tono-chat');
        if (chat) chat.style.display = 'none';
        return;
    }
  
    // Para outras mensagens, mostrar a mensagem do usuário
    this.mostrarMensagem(mensagem, 'user');
  
    // Buscar nas receitas locais
    const receitasEncontradas = this.procuraReceita(mensagem);
    
    if (receitasEncontradas.length > 0) {
        const receita = receitasEncontradas[0];
        this.mostrarReceitaNoModal(receita);
        this.mostrarMensagem(`Encontrei esta receita: ${receita.nome}`);
        this.ultimoIngredienteFalhado = null;

        // Fechar o chat
        const chat = document.getElementById('tono-chat');
        if (chat) chat.style.display = 'none';
    } else {
        this.ultimoIngredienteFalhado = mensagem;
        this.mostrarMensagem("Não encontrei receitas com esse ingrediente. Quer que procure na internet? (Responda sim ou não)");
    }
}
};

// Inicializar o TONO quando o documento estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  TONO.init();
}); 