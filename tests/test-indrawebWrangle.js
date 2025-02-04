// run using: node .\tests\test-indraewebWrangle

import fs from 'fs'; // for data import
import { iww } from '../assets/backend/indrawebWrangle.js' // the function we're testing


// Setup import of data
function parseJson(path){
    let rawData = fs.readFileSync(path)
    let jsonObj = JSON.parse(rawData)
    return(jsonObj)
}

let data = {
    yearObservtions: parseJson('data/test-data/getAnnualObservations.json'),
    yearProjections: parseJson('data/test-data/getAnnualProjections.json')
}

//console.log(data)

//console.log('Mean of observation years:', iww.summariseYearValues(data.yearObservtions.data))
//console.log(iww.averageProjections(data.yearProjections))
//console.log(iww.summariseYearValues(iww.averageProjections(data.yearProjections)))

// Testing
let result
result = iww.summariseYearValues(data.yearObservtions.data)
console.log(result == '14.0')

result = iww.averageProjections(data.yearProjections)
console.log(
    result[0].year == '2036',
    result[0].value == '15.4',
    result[0].rcp == 'rcp45',
)

result = iww.summariseYearValues(iww.averageProjections(data.yearProjections))
console.log(result == '15.2')



