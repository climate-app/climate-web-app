# Climate app ( ... myclimate.com.au )

An node express app for the display of local historical and projected climate conditions, and politician voting trends for climate related policies.

## Installation

1. Clone the repo
2. `yarn` install the dependencies
3. Populate the data folder with files ...
4. Populate the .env file ... 
5. Test the app starts using using `yarn start`

## On the server

Use `pm2` to run on server. There will be dev and prod versions running, thus in the root folder, clone the repos into `dev/` and `prod/` folders/.

 - pm2 start --name dev-climate-app "yarn --cwd dev/ start"
 - pm2 start --name prod-climate-app "yarn --cwd prod/ start"

Use nginx to point to the different instances

## Notes about the app

### .env

Should contain

```
ENV=               # "prod" or "dev"
PORTPROD=8080
PORTDEV=8081
INDRAKEY=          # indra API key
SEARCHKEY=         # meiliseach db key
USETESTDATA=false  # use test data instead of indra API
```

### data/

Should have

 - `address-id-coordinates-mp-id-gnaf-core-columns.csv` - from [adddress-gnaf-ced-mp-data-wrangling repo](https://github.com/climate-app/adddress-gnaf-ced-mp-data-wrangling)
 - `theyvoteforyou/persons/*.json` - MP persons jsons from https://theyvoteforyou.org.au/

### Build

#### Templating

- Uses EJS templating

#### Frontend things

Frontend assests such as JS and CSS files live in `frontend-assets`. 

 - We keep each javascript function in a separate file, and concatente + minify on build
 - See package.json scripts for concatente + minify details

#### Testing

See `tests/`

 - Can test backend functions with `.js`
 - Can test visualisation using `.html` and `live-server`




