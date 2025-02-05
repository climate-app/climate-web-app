// run using: node .\tests\test-indrawebIO.js

// If in testing mode, the app need be running in seperate shell
import 'dotenv/config';
let isTesting = process.env.USETESTDATA

import { iwio } from '../assets/backend/indrawebIO.js';

// Testing fetches locally
if (isTesting) {

  console.log('Ensure app is running in seperate shell')

  iwio.getAnnualProjections().then(v => console.log(v))

}

// Using the indraweb API
if (!isTesting) {

  let p = {
    lon: 150.363,
    lat: -33.515,
    startYear: 2000,
    endYear: 2022,
    years: '2016-2045'
  }

  console.log(
    iwio.getAnnualProjections({
      lon: p.lon,
      lat: p.lat,
      variable: 'tavg',
      years: p.years,
      emission: 'rcp85'
    }, false)
      .then(v => console.log(v)))
}

// console.log(
//     iwio.getAnnualProjections({
//         lon: p.lon,
//         lat: p.lat,
//         variable: 'tavg',
//         years: p.years,
//         emission: 'rcp45'
//     }, false)
//     .then(v => console.log(v)))

// console.log(
//     iwio.getAnnualObservations({
//         lon: p.lon,
//         lat: p.lat,
//         variable: 'tavg',
//         startYear: p.startYear,
//         endYear: p.endYear
//     }, true)
//     .then(v => console.log(v)))