require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/receita", async (req, res) => {
  const { ingrediente } = req.body;

  const prompt = `Você é um chef de cozinha especializado em receitas portuguesas.
Sua tarefa é criar uma receita específica e completa.
IMPORTANTE: Você DEVE responder APENAS com um objeto JSON válido, sem nenhum texto adicional.
O JSON deve seguir EXATAMENTE este formato:
{
  "id": "receita-${ingrediente}",
  "nome": "Nome da Receita",
  "imagem": "images/default-recipe.jpg",
  "resumo": "Breve descrição da receita",
  "ingredientes": [
    "quantidade ingrediente 1",
    "quantidade ingrediente 2"
  ],
  "preparacao": [
    "Passo 1 da preparação",
    "Passo 2 da preparação"
  ]
}
Crie uma receita com o ingrediente: ${ingrediente}`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    });

    const jsonText = completion.choices[0].message.content.trim();

    const receita = JSON.parse(jsonText);
    res.json(receita);
  } catch (error) {
    console.error("Erro ao gerar receita:", error);
    res.status(500).json({ erro: "Falha ao gerar receita" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor a correr em http://localhost:${PORT}`);
});
