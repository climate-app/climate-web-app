
import 'dotenv/config';
import express from 'express';

// Environment set up
let homeURL, hostURL, PORT

if (process.env.ENV == 'prod') {
    homeURL = process.env.HOMEPROD
    hostURL = process.env.HOSTPROD
    PORT = process.env.PORTPROD;

}

if (process.env.ENV == 'dev') {
    //concatFrontendJS();
    homeURL = process.env.HOMEDEV
    hostURL = process.env.HOSTDEV
    PORT = process.env.PORTDEV;
}

// Routes/Pages 
import { index } from './routes/index.js';
import { dataOverview } from './routes/data-overview.js';
import { otherPage } from './routes/other-page.js';
import { about } from './routes/about.js';
import { info } from './routes/info.js';
import { route as meilisearchKey } from "./routes/meilisearch-api-key.js"
import { route as testJsons } from "./routes/test-jsons.js"


// App
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use((req, res, next) => {
    req.config = {
        host: hostURL,
        home: homeURL
    }
    next();
});

app.use('/', index)
app.use('/data-overview', dataOverview)
app.use('/other-page', otherPage)
app.use('/about', about)
app.use('/info', info)
app.use('/meilikey', meilisearchKey)
app.use('/testjsons', testJsons)

app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`)
    if (process.env.USETESTDATA){
        console.log('In TESTING mode: using test data in ./data/test-data and not indraweb api')
    }
})