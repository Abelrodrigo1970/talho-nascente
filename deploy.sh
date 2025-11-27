#!/bin/bash
# Script de deploy automático para cPanel
# Este script faz pull do repositório GitHub

cd /home/usuario/public_html || cd /home/usuario/talhonascente.pt || exit

# Fazer pull do repositório
git pull origin main

# Se houver node_modules, reinstalar dependências (opcional)
# cd server && npm install --production

echo "Deploy concluído em $(date)"

