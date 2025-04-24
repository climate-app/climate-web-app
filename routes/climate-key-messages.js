
import fs from 'fs';
import express from 'express';
export const route = express.Router()

route.get('/', (req, res) => {

    fs.readFile(`./data/climate-key-messages-subcluster.json`, (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});