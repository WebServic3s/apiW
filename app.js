const cors = require('cors');
const axios = require('axios');
const express = require('express');
const app = express();  // Solo se declara 'app' una vez aquí

require('dotenv').config();

// Configura CORS para permitir solicitudes de cualquier origen
app.use(cors());

app.use(express.json()); // Middleware para analizar JSON en las solicitudes entrantes

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('WhatsApp Business API Integration');
});

app.post('/send-message', async (req, res) => {
  const { phoneNumberId, recipientNumber, message } = req.body;
  const url = `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`;

  try {
    const response = await axios.post(url, {
      messaging_product: "whatsapp",
      to: recipientNumber,
      text: { body: message }
    }, {
      headers: { 
        'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}` 
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Corregido para usar correctamente template literals
});
