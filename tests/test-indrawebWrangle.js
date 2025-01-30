import { iww } from '../functions/backend/indrawebWrangle.js'
import AnnualProjectionsExample  from '../data/AnnualProjectionsExample.json' assert { type: 'json' }
import AnnualObservationsExample  from '../data/AnnualObservationsExample.json' assert { type: 'json' }

console.log(iww.averageProjections(AnnualProjectionsExample))
//console.log(iww.summariseYearValues(iww.averageProjections(AnnualProjectionsExample)))
//console.log(iww.summariseYearValues(AnnualObservationsExample.data))

//let aa = AnnualObservationsExample.data
//let bb = iww.averageProjections(AnnualProjectionsExample)


