
import express from 'express';
export const about = express.Router()

about.get('/', (req, res) => {
  res.render(
    'about',
    {
      homeURL: req.config.home,
      hostURL: req.config.host
    }
  );
})