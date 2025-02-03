
import fs from 'fs';
import express from 'express';
export const route = express.Router()

route.get('/:file', (req, res) => {

    //req.params: { "file": "XXX", "bookId": "8989" }
    //console.log(req.params)
    let fileId = req.params.file

    fs.readFile(`./data/test-data/${fileId}.json`, (err, json) => {
        let obj = JSON.parse(json);
        res.json(obj);
    });

});