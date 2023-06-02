const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 5500;

app.use(express.json());

app.post('/api/appointmentdata', async (req, res) => {
  try {
    const response = await axios.post('https://crudcrud.com/api/6a6fffbba3734ae28b8df57e1d19fc09/appointmentdata', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});
