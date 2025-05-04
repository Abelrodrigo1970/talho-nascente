const TONO = {
  // Busca uma receita pelo id
  getReceitaPorId: function(id) {
    return receitas.find(r => r.id === id);
  },

  // Sugere uma receita aleatória
  sugereReceita: function() {
    const idx = Math.floor(Math.random() * receitas.length);
    return receitas[idx];
  },

  // Procura receitas por nome (case insensitive)
  procuraReceita: function(termo) {
    termo = termo.toLowerCase();
    return receitas.filter(r => r.nome.toLowerCase().includes(termo));
  },

  // Mostra uma receita no modal
  mostrarReceitaNoModal: function(receita) {
    if (!receita) return;
    const modal = document.getElementById('modal-receita');
    document.getElementById('modal-titulo').textContent = receita.nome;
    const ingredientes = document.getElementById('modal-ingredientes');
    ingredientes.innerHTML = '';
    receita.ingredientes.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      ingredientes.appendChild(li);
    });
    const preparacao = document.getElementById('modal-preparacao');
    preparacao.innerHTML = '';
    receita.preparacao.forEach(pass => {
      const li = document.createElement('li');
      li.textContent = pass;
      preparacao.appendChild(li);
    });
    modal.style.display = 'block';
  }
}; 