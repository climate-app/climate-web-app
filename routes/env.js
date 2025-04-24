import express from 'express';
export const route = express.Router()
import 'dotenv/config';

route.get('/', (req, res) => {

    console.log(process)

});