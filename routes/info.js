
import { interpolateInferno } from 'd3';
import express from 'express';
export const info = express.Router()

info.get('/', (req, res) => {
  res.render(
    'info',
    {
      homeURL: req.config.home,
      hostURL: req.config.host
    }
  );
})