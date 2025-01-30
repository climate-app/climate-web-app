import { iwio } from '../functions/backend/indrawebIO.js';

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