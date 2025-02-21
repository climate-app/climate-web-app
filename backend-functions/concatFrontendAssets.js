
import concat from "concat-files";
import { readdirSync } from 'fs';
import { join } from "path";

function concatFolder(folderPath, outputFile) {

    const files = readdirSync(folderPath)
        //.filter(file => file.endsWith('.js'))
        .map(file => join(folderPath, file));

    concat(files, outputFile, (err) => {
        if (err) throw err;
        console.log(`${outputFile} created`);
    });
}

// js
concatFolder('frontend-assets/js', 'frontend-assets/tmp/frontend-functions.js')
concatFolder('frontend-assets/css', 'frontend-assets/tmp/frontend-styles.css')

