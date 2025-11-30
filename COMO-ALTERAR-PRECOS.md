# 💰 Como Alterar Preços no Site

Agora é muito fácil alterar os preços! Basta editar o ficheiro `precos.json`.

## 📝 Passos para Alterar Preços

### 1. Editar o ficheiro `precos.json`

Abra o ficheiro `precos.json` e altere os valores:

```json
{
  "promocoes": [
    {
      "nome": "Costeletas da Rilada",
      "preco": "€ 5,99/kg"
    },
    {
      "nome": "Frango Panado",
      "preco": "€ 3,99/kg"
    },
    ...
  ],
  "produtos": [
    {
      "nome": "Picanha",
      "preco": "€ 17,95/kg"
    },
    ...
  ]
}
```

### 2. Fazer Upload para o cPanel

Após alterar o `precos.json`:

**Opção A - Via Git (Recomendado):**
```bash
git add precos.json
git commit -m "Atualizar preços"
git push origin main
```
Depois faça pull no cPanel (veja `ATUALIZAR-CPANEL-MANUAL.md`)

**Opção B - Upload Manual:**
1. No cPanel, vá em **File Manager**
2. Navegue até ao diretório do site
3. Faça upload do `precos.json` atualizado (substitua o antigo)

### 3. Verificar no Site

- Limpe o cache do navegador (Ctrl+F5)
- Verifique se os novos preços aparecem

## ⚠️ Importante

- **Mantenha o formato**: `"€ X,XX/kg"` ou `"€ X.XX/kg"`
- **Nomes devem corresponder exatamente** aos nomes no código
- **Ordem das promoções**: A ordem no JSON deve corresponder à ordem no HTML
- **Não apague campos**: Mantenha todos os produtos e promoções

## 📋 Lista de Nomes dos Produtos

Certifique-se de usar exatamente estes nomes no JSON:

**Promoções:**
- `Costeletas da Rilada`
- `Frango Panado`
- `Carne para Rojões`
- `Almondegas de Bife`

**Produtos:**
- `Picanha`
- `Bife do Vazio`
- `Bife do Rolo`
- `Carne Bocadinhos`
- `Feveras de Porco ` (com espaço no final)
- `Lombo S/ Osso`
- `Entrecosto`
- `Bifanas de Porco`
- `Frango`
- `Asas de Frango`
- `Coxas de Frango`
- `Perninhas de Frango`

## 🔄 Como Funciona

1. O site carrega o ficheiro `precos.json` quando abre
2. Os preços são aplicados automaticamente aos produtos e promoções
3. Se o JSON não carregar, aparece "Preço não disponível" (fallback)

## 🐛 Problemas Comuns

### Preços não atualizam
- **Solução**: Limpe o cache do navegador (Ctrl+F5)
- Verifique se o `precos.json` está no diretório correto
- Verifique o console do navegador (F12) para erros

### Erro "Preço não disponível"
- **Solução**: Verifique se o nome do produto no JSON corresponde exatamente ao nome no código
- Verifique se o JSON está bem formatado (sem erros de sintaxe)

### JSON não carrega
- **Solução**: Verifique se o ficheiro está acessível via URL: `https://talhonascente.pt/precos.json`
- Verifique as permissões do ficheiro no cPanel (deve ser 644)

## 💡 Dica

Use um editor JSON online (como jsonlint.com) para validar o ficheiro antes de fazer upload!

