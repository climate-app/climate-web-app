
import express from 'express';
export const about = express.Router()

about.get('/', (req, res) => {
  res.render('about');
})