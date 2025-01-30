
import express from 'express';
export const index = express.Router()
import 'dotenv/config';

// define the home page route
index.get('/', (req, res) => {

  res.render(
    'index',
    {
      homeURL: req.config.home,
      hostURL: req.config.host,
      dbSearchKey: req.config.dbSearchKey
    }
  );
})