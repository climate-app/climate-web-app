
import 'dotenv/config';
import express from 'express';
//import { concatFrontendJS } from './functions/backend/concatFrontendFunctions.js';

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

let dbSearchKey = process.env.SEARCHKEY;


// Routes/Pages 
import { index } from './routes/index.js';
import { dataOverview } from './routes/data-overview.js';
import { otherPage } from './routes/other-page.js';
import { about } from './routes/about.js';

// App
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use((req, res, next) => {
    req.config = {
        host: hostURL,
        home: homeURL,
        dbSearchKey: dbSearchKey
    }
    next();
});

app.use('/', index)
app.use('/data-overview', dataOverview)
app.use('/other-page', otherPage)
app.use('/about', about)

app.listen(PORT, () => {
    console.log(`Server started at localhost:${PORT}`)
})