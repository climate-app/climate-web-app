
import concat from "concat-files";
import { readdirSync } from 'fs';
import { join } from "path";

const folderPath = 'frontend-assets/js';
const outputFile = 'frontend-assets/tmp/frontend-functions.js';

const files = readdirSync(folderPath)
    .filter(file => file.endsWith('.js'))
    .map(file => join(folderPath, file));

concat(files, outputFile, (err) => {
    if (err) throw err;
    console.log(`All function files have been concatenated into ${outputFile}`);
});