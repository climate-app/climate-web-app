
import 'dotenv/config';
import express from 'express';
import minifyHTML from 'express-minify-html-2'

// Environment set up
let isTesting = process.env.USETESTDATA == 'true'

let PORT = process.env.ENV == 'prod' ? process.env.PORTPROD : process.env.PORTDEV

// Routes/Pages 
import { index } from './routes/index.js';
import { dataOverview } from './routes/data-overview.js';
import { otherPage } from './routes/other-page.js';
import { about } from './routes/about.js';
import { info } from './routes/info.js';
import { route as meilisearchKey } from "./routes/meilisearch-api-key.js"
import { route as testJsons } from "./routes/test-jsons.js"

// Middlewares
let allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:9876");
    res.header('Access-Control-Allow-Headers', "*");
    next();
}

let minifyHtmlOpts = {
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true
    }
}



// App
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(minifyHTML(minifyHtmlOpts))

if (process.env.ENV == 'dev') {
    app.use(allowCrossDomain)
}


app.use('/', index)
app.use('/data-overview', dataOverview)
app.use('/other-page', otherPage)
app.use('/about', about)
app.use('/info', info)
app.use('/meilikey', meilisearchKey)
app.use('/testjsons', testJsons)

app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`)
    if (isTesting) {
        console.log('In TESTING mode: using test data in ./data/test-data and not indraweb api')
    }
})