
import express from 'express';
export const route = express.Router()

// define the home page route
route.get('/', (req, res) => {
  res.render('index');
})