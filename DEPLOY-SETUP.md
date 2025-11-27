# 🚀 Guia de Configuração de Deploy Automático

Este guia explica como configurar o deploy automático do GitHub para o cPanel.

## 📋 Pré-requisitos

1. Acesso ao cPanel
2. Git instalado no servidor cPanel
3. Repositório já configurado no cPanel

---

## 🔧 Método 1: Usando Webhook PHP (Recomendado)

### Passo 1: Configurar o ficheiro webhook.php

1. **Edite o ficheiro `webhook.php`**:
   - Altere `$secret = 'SEU_SECRET_TOKEN_AQUI';` para um token seguro (ex: `'meu_token_secreto_123'`)
   - Altere `$path = '/home/usuario/public_html';` para o caminho correto do seu site no cPanel
     - Normalmente é algo como: `/home/seu_usuario/public_html` ou `/home/seu_usuario/talhonascente.pt`

2. **Faça upload do `webhook.php`** para a raiz do seu site no cPanel (mesmo diretório onde está o `index.html`)

### Passo 2: Configurar Webhook no GitHub

1. Aceda ao seu repositório no GitHub: `https://github.com/Abelrodrigo1970/talho-nascente`

2. Vá em **Settings** → **Webhooks** → **Add webhook**

3. Configure:
   - **Payload URL**: `https://talhonascente.pt/webhook.php`
   - **Content type**: `application/json`
   - **Secret**: O mesmo token que colocou no `webhook.php`
   - **Events**: Selecione "Just the push event"
   - **Active**: ✅ Marcado

4. Clique em **Add webhook**

### Passo 3: Testar

1. Faça uma pequena alteração no código
2. Faça commit e push:
   ```bash
   git add .
   git commit -m "Teste de deploy automático"
   git push origin main
   ```
3. Verifique o ficheiro `deploy.log` no cPanel para ver se funcionou

---

## 🔧 Método 2: Usando Git Version Control do cPanel

### Passo 1: Configurar Git no cPanel

1. No cPanel, vá em **Git™ Version Control**
2. Clique em **Create**
3. Configure:
   - **Repository Name**: `talho-nascente`
   - **Repository URL**: `https://github.com/Abelrodrigo1970/talho-nascente.git`
   - **Repository Branch**: `main`
   - **Deploy Branch**: `main`
   - **Deploy Path**: `/home/seu_usuario/public_html` (ou o caminho do seu site)

4. Clique em **Create**

### Passo 2: Configurar Auto-Deploy

1. Após criar o repositório, clique em **Manage**
2. Configure o **Auto Deploy** para ativar automaticamente quando houver push

---

## 🔧 Método 3: Usando SSH + Script

Se tiver acesso SSH ao cPanel:

1. **Faça upload do `deploy.sh`** para o servidor
2. **Dê permissão de execução**:
   ```bash
   chmod +x deploy.sh
   ```
3. **Configure um cron job** no cPanel:
   - Vá em **Cron Jobs**
   - Configure para executar a cada X minutos (não recomendado)
   - Ou use webhook + script

---

## 🔒 Segurança

### Proteger o webhook.php

Adicione no início do `webhook.php` (antes de `<?php`):

```apache
# .htaccess
<Files "webhook.php">
    # Permitir apenas do GitHub
    <RequireAll>
        Require ip 140.82.112.0/20
        Require ip 143.55.96.0/20
    </RequireAll>
</Files>
```

Ou adicione autenticação básica no `.htaccess`:

```apache
<Files "webhook.php">
    AuthType Basic
    AuthName "Webhook Access"
    AuthUserFile /home/usuario/.htpasswd
    Require valid-user
</Files>
```

---

## 🐛 Troubleshooting

### O webhook não funciona

1. **Verifique os logs**:
   - No cPanel, veja o ficheiro `deploy.log`
   - Verifique os logs de erro do PHP

2. **Teste manualmente**:
   ```bash
   cd /caminho/do/site
   git pull origin main
   ```

3. **Verifique permissões**:
   - O utilizador do PHP precisa ter permissão para executar `git pull`
   - Pode precisar configurar SSH keys no servidor

### Erro de permissões

Se tiver erro de permissões, pode precisar:

1. Configurar SSH keys no servidor cPanel
2. Ou usar HTTPS com token de acesso pessoal do GitHub

---

## 📝 Notas Importantes

- ⚠️ **Nunca commite** o ficheiro `.env` com a API key
- ⚠️ O `webhook.php` deve estar na raiz do site, mas pode ser movido para um subdiretório
- ✅ Teste sempre em desenvolvimento antes de usar em produção
- ✅ Mantenha backups regulares

---

## 🔄 Fluxo de Trabalho Recomendado

1. **Fazer alterações localmente**
2. **Testar localmente**
3. **Commit e push para GitHub**:
   ```bash
   git add .
   git commit -m "Descrição das alterações"
   git push origin main
   ```
4. **O webhook atualiza automaticamente o site no cPanel**
5. **Verificar o site online**

---

## 📞 Suporte

Se tiver problemas, verifique:
- Logs do cPanel
- Logs do GitHub (Settings → Webhooks → Recent Deliveries)
- Ficheiro `deploy.log` no servidor

