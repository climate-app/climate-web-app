
import express from 'express';
export const index = express.Router()

// define the home page route
index.get('/', (req, res) => {

  res.render('index');
})