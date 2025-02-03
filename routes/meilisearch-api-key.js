
import express from 'express';
export const route = express.Router()
import 'dotenv/config';

route.get('/', (req, res) => {
    const apiKey = process.env.SEARCHKEY; // Access from .env
    if (!apiKey) {
      return res.status(500).send('API key not configured.'); // Handle missing key
    }
    res.json({ key: apiKey }); // Send the key as JSON
  });