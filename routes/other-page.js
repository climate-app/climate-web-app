
import express from 'express';
export const otherPage = express.Router()

otherPage.get('/', (req, res) => {
  res.render('other-page');
})