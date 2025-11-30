# 📤 Como Atualizar o cPanel Manualmente

Guia passo a passo para atualizar o site no cPanel após fazer push para o GitHub.

---

## 🔧 Método 1: Usando Git Version Control (Mais Fácil)

### Passo 1: Aceder ao Git Version Control

1. Faça login no **cPanel**
2. Procure por **"Git™ Version Control"** ou **"Git Version Control"**
3. Clique para abrir

### Passo 2: Verificar se o Repositório está Configurado

- Se já tiver o repositório configurado:
  - Clique em **"Manage"** ao lado do repositório `talho-nascente`
  - Vá para a aba **"Pull or Deploy"**
  - Clique em **"Update from Remote"** ou **"Pull"**
  - Aguarde a confirmação

- Se **NÃO** tiver configurado ainda:
  - Clique em **"Create"**
  - Configure:
    - **Repository Name**: `talho-nascente`
    - **Repository URL**: `https://github.com/Abelrodrigo1970/talho-nascente.git`
    - **Repository Branch**: `main`
    - **Deploy Branch**: `main`
    - **Deploy Path**: `/home/seu_usuario/public_html` (ou o caminho do seu site)
  - Clique em **"Create"**

---

## 🔧 Método 2: Usando Terminal SSH (Avançado)

### Passo 1: Aceder ao Terminal SSH

1. No cPanel, procure por **"Terminal"** ou **"SSH Access"**
2. Abra o terminal

### Passo 2: Navegar para o Diretório do Site

```bash
cd public_html
# ou
cd talhonascente.pt
# (depende de onde está o seu site)
```

### Passo 3: Fazer Pull do GitHub

```bash
git pull origin main
```

### Passo 4: Verificar se Funcionou

```bash
git status
```

---

## 🔧 Método 3: Usando File Manager (Upload Manual)

Se não tiver Git configurado, pode fazer upload manual:

### Passo 1: Aceder ao File Manager

1. No cPanel, clique em **"File Manager"**
2. Navegue até ao diretório do seu site (geralmente `public_html`)

### Passo 2: Fazer Download do GitHub

1. Aceda a: https://github.com/Abelrodrigo1970/talho-nascente
2. Clique no botão verde **"Code"** → **"Download ZIP"**
3. Descompacte o ficheiro ZIP no seu computador

### Passo 3: Fazer Upload dos Ficheiros

1. No File Manager do cPanel:
   - Selecione os ficheiros que foram alterados:
     - `index.html`
     - `script.js`
   - Faça upload substituindo os ficheiros antigos

⚠️ **Atenção**: Não substitua o ficheiro `.env` se existir no servidor!

---

## 📋 Checklist de Atualização

Após atualizar, verifique:

- [ ] O site carrega corretamente
- [ ] Os novos preços aparecem corretamente
- [ ] As imagens carregam
- [ ] O assistente TARECO funciona
- [ ] Não há erros no console do navegador (F12)

---

## 🐛 Problemas Comuns

### Erro: "Permission denied"
- **Solução**: Verifique as permissões dos ficheiros no File Manager
- Normalmente devem ser: `644` para ficheiros, `755` para pastas

### Erro: "Repository not found"
- **Solução**: Verifique se o URL do repositório está correto
- Certifique-se de que o repositório é público ou que configurou acesso SSH

### Ficheiros não atualizam
- **Solução**: Limpe o cache do navegador (Ctrl+F5)
- Verifique se está a editar os ficheiros no diretório correto

---

## ⚡ Comando Rápido (SSH)

Se tiver SSH configurado, pode usar este comando único:

```bash
cd /home/seu_usuario/public_html && git pull origin main
```

Substitua `seu_usuario` pelo seu utilizador do cPanel.

---

## 📝 Notas Importantes

- ⚠️ **Sempre faça backup** antes de atualizar
- ✅ Use o **Método 1** (Git Version Control) se disponível - é o mais seguro
- ✅ O **Método 2** (SSH) é mais rápido se já tiver configurado
- ⚠️ O **Método 3** (Upload Manual) só deve ser usado se os outros não funcionarem

---

## 🔄 Frequência Recomendada

- **Após cada push para o GitHub**: Atualize o cPanel
- **Se configurar webhook automático**: Não precisa atualizar manualmente

---

## 📞 Precisa de Ajuda?

Se tiver problemas:
1. Verifique os logs do cPanel
2. Verifique se o repositório GitHub está atualizado
3. Contacte o suporte do seu hosting se necessário


