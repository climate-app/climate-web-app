import express from 'express';
import * as d3 from "d3";
import { getAddressMetadata } from '../assets/backend/getAddressMetadata.js'
import { iwio } from '../assets/backend/indrawebIO.js';
import { iww } from '../assets/backend/indrawebWrangle.js';
import { getMPJson } from '../assets/backend/getMPdata.js';

export const dataOverview = express.Router()

let homeURL = process.env.ENV == 'dev' ? process.env.HOME : ''

// define the home page route
dataOverview.get('/', (req, res) => {

  // GANSW705280118
  const address = req.query.address
  // {id, LATITUDE, LONGITUDE, MP_ID}
  let addressMetadata = getAddressMetadata(address)


  // Get the JSON data 
  let pObs = {
    lon: addressMetadata['LONGITUDE'],
    lat: addressMetadata['LATITUDE'],
    startYear: 1993,
    endYear: 2022,
  }

  let pHot = {
    threshold: 35,
    operator: ">="
  }

  let ffdi = {
    threshold: 25
  }

  let pProj = {
    lon: addressMetadata['LONGITUDE'],
    lat: addressMetadata['LATITUDE'],
    years: '2016-2045'
  }

  let envData = {
    tempAnnualObs: iwio.getAnnualObservations({ ...pObs, variable: 'tavg' }),
    tempAnnualProj45: iwio.getAnnualProjections({ ...pProj, variable: 'tavg', emission: 'rcp45' }),
    tempAnnualProj85: iwio.getAnnualProjections({ ...pProj, variable: 'tavg', emission: 'rcp85' }),
    tempThreshAnnualObs: iwio.getAnnualThresholdObservations({ ...pObs, variable: 'tmax', threshold: pHot.threshold, operator: pHot.operator }),
    tempThreshAnnualProj45: iwio.getAnnualThresholdProjections({ ...pProj, variable: 'tmax', emission: 'rcp45', threshold: pHot.threshold, operator: pHot.operator }),
    tempThreshAnnualProj85: iwio.getAnnualThresholdProjections({ ...pProj, variable: 'tmax', emission: 'rcp85', threshold: pHot.threshold, operator: pHot.operator }),
    /*rainAnnualObs: iwio.getAnnualObservations({ ...pObs, variable: 'precip' }),
    rainAnnualProj45: iwio.getAnnualProjections({ ...pProj, variable: 'precip', emission: 'rcp45' }),
    rainAnnualProj85: iwio.getAnnualProjections({ ...pProj, variable: 'precip', emission: 'rcp85' }),
    ffdiAnnualObs: iwio.getAnnualFFDIObservations({ ...pObs, threshold: ffdi.threshold }),
    ffdiAnnualProj45: iwio.getAnnualFFDIProjections({ ...pProj, emission: 'rcp45', threshold: ffdi.threshold }),
    ffdiAnnualProj85: iwio.getAnnualFFDIProjections({ ...pProj, emission: 'rcp85', threshold: ffdi.threshold })*/
  }

  // Create data objects and send to front end
  Promise.all(Object.values(envData))
    .then(resolvedPromises => {

      //[{data: ...}, {data: ...}]
      //console.log(resolvedPromises[0].data)

      // Map the results back to an object using the original keys
      //[tempAnnualObs: {data: ...}, tempAnnualProj45: {data: ...}]
      const iwData = iww.mapPromisesToKeys(Object.keys(envData), resolvedPromises)
   

      // Join emission scenario here
      iwData.tempAnnualProj = [iwData.tempAnnualProj45, iwData.tempAnnualProj85]
      iwData.tempThreshAnnualProj = [iwData.tempThreshAnnualProj45, iwData.tempThreshAnnualProj85]
      //iwData.rainAnnualProj = [iwData.rainAnnualProj45, iwData.rainAnnualProj85]
      //iwData.ffdiAnnualProj = [iwData.ffdiAnnualProj45, iwData.ffdiAnnualProj85]


      // Generate data elements
      let tempAnnual = iww.createDataOverviewBoxData('Annual Temperature', '°C', iwData.tempAnnualObs, iwData.tempAnnualProj)
      let tempThreshAnnual = iww.createDataOverviewBoxData('Annual Hot Days (above 35 °C)', 'days', iwData.tempThreshAnnualObs, iwData.tempThreshAnnualProj)
      //let rainAnnual = iww.createDataOverviewBoxData('Annual Rain', 'mm', iwData.rainAnnualObs, iwData.rainAnnualProj)
      //let ffdiAnnual = iww.createDataOverviewBoxData("Forest Fire Danger Index (above 'Very High')", 'days', iwData.ffdiAnnualObs, iwData.ffdiAnnualProj)

      let mpData = getMPJson(addressMetadata.MP_ID)


      // create ejs data
      let renderData = {
        homeURL: homeURL,
        addressMetadata: addressMetadata,
        //data: [tempAnnual, tempThreshAnnual, rainAnnual, ffdiAnnual],
        data: [tempAnnual, tempThreshAnnual],
        mpData: mpData
      }

      // render
      res.render("data-overview", renderData)
    })
    .catch(error => {
      console.error("Error in promises:", error);
    });

})