
import { interpolateInferno } from 'd3';
import express from 'express';
export const route = express.Router()

route.get('/', (req, res) => {
  res.render('evidence');
})