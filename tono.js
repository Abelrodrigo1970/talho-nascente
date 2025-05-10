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
    "Oi! Quer uma sugestão para o Almoço/Jantar?",
    "E aí! Precisa de ideias para o Almoço/Jantar?",
    "Olá! Que tal uma receita nova para o Almoço/Jantar?"
  ],

  // Inicialização
  init: function() {
    // Usar as receitas diretamente do arquivo receitas.js
    this.receitas = receitas; // receitas é a variável global definida em receitas.js
    // this.iniciarConversa();
  },

  // Função para iniciar conversa
  iniciarConversa: function() {
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

    modal.style.display = 'block';
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
    
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  },

  // Função para processar mensagem do usuário
  processarMensagem: async function(mensagem) {
    mensagem = mensagem.toLowerCase();
    
    // Mostrar a mensagem do usuário no chat
    this.mostrarMensagem(mensagem, 'user');
    
    if (mensagem.includes('sim') || mensagem.includes('s')) {
      this.mostrarMensagem("Vou buscar uma receita na internet para você...");
      // Aqui você pode implementar a busca na internet
      this.mostrarMensagem("Desculpe, essa funcionalidade ainda está em desenvolvimento!");
    } else {
      // Procura receitas que contenham o termo mencionado
      const receitasEncontradas = this.procuraReceita(mensagem);
      
      if (receitasEncontradas && receitasEncontradas.length > 0) {
        const receita = receitasEncontradas[0];
        this.mostrarReceitaNoModal(receita);
        this.mostrarMensagem(`Encontrei esta receita: ${receita.nome}`);
        this.mostrarMensagem("Quer que procure outra receita? (Responda sim ou não)");
      } else {
        this.mostrarMensagem("Não encontrei receitas com esse ingrediente. Quer que procure na internet? (Responda sim ou não)");
      }
    }
  }
};

// Inicialização do Tono quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
  // Inicializa o Tono
  TONO.init();
  
  // Adiciona evento de clique no mascote
  const tonoMascote = document.getElementById('tono-mascote');
  if (tonoMascote) {
    tonoMascote.addEventListener('click', function() {
      const chat = document.getElementById('tono-chat');
      if (chat) {
        chat.style.display = chat.style.display === 'none' ? 'block' : 'none';
        if (chat.style.display === 'block') {
          TONO.iniciarConversa();
        }
      }
    });
  }

  // Adiciona evento de envio de mensagem
  const chatForm = document.getElementById('tono-chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const input = document.getElementById('tono-chat-input');
      if (input && input.value.trim()) {
        TONO.processarMensagem(input.value.trim());
        input.value = '';
      }
    });
  }

  // Adiciona evento de fechar chat
  const closeButton = document.getElementById('tono-chat-close');
  if (closeButton) {
    closeButton.addEventListener('click', function() {
      const chat = document.getElementById('tono-chat');
      if (chat) {
        chat.style.display = 'none';
      }
    });
  }
}); 