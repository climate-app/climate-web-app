import 'dotenv/config';
//import AnnualObservationsExample from '../../data/AnnualObservationsExample.json' assert { type: 'json' }
//import AnnualProjectionsExample from '../../data/AnnualProjectionsExample.json' assert { type: 'json' }
//import AnnualThresholdObservationsExample from '../../data/AnnualThresholdObservationsExample.json' assert { type: 'json' }
//import AnnualThresholdProjectionsExample from '../../data/AnnualThresholdProjectionsExample.json' assert { type: 'json' }

const apiConfig = {
    host: "https://dev.indraweb.io",
    apiKey: process.env.INDRAKEY
};

const indrawebApiCall = async (endpoint, queryParams = {}, options = {}) => {

    // Construct the query string from the queryParams object
    const queryString = new URLSearchParams(queryParams).toString();
    const url = `${apiConfig.host}/${endpoint}${queryString ? `?${queryString}` : ''}`;

    // Merge custom options with default headers
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': `${apiConfig.apiKey}`
        },
        ...options,
    };

    //console.log(url)
    //console.log(config)

    try {
        const response = await fetch(url, config);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error in API call:", error);
        throw error;
    }
};

function testWith(data, timeout) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, timeout, data);
    })
}

//const getAnnualObservations = async (queryParams) => {
async function getAnnualObservations(queryParams, test = false) {
    let endpoint = "observations/timeslice/annual/getAnnualObservations"
    // c('lon', 'lat','variable', 'startYear', 'endYear')  

    if (test) {
        console.log('testing getAnnualObservations')
        return testWith(AnnualObservationsExample, 1500);
    }

    return indrawebApiCall(endpoint, queryParams);

}

async function getAnnualProjections(queryParams, test = false) {
    let endpoint = "projections/timeslice/annual/getAnnualProjections"
    //c('lon', 'lat','variable', 'years', 'emission')

    if (test) {
        console.log('testing with AnnualProjectionsExample')
        return testWith(AnnualProjectionsExample, 1000)
    }

    return indrawebApiCall(endpoint, queryParams);

}

async function getAnnualThresholdObservations(queryParams, test = false) {
    let endpoint = "observations/threshold/annual/getAnnualThresholdObservations"
    //required_params <-
    //  c('lon', 'lat','variable', 'startYear', 'endYear', 'threshold', 'operator')

    if (test) {
        console.log('testing with AnnualThresholdObservationsExample')
        return testWith(AnnualThresholdObservationsExample, 1100)
    }

    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualThresholdProjections(queryParams, test = false) {
    let endpoint = "projections/threshold/annual/getAnnualThresholdProjections"
    //c('lon', 'lat','variable', 'years', 'emission', 'threshold', 'operator')

    if (test) {
        console.log('testing with AnnualThresholdProjectionsExample')
        return testWith(AnnualThresholdProjectionsExample, 900)
    }

    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualFFDIObservations(queryParams, test = false) {

    let endpoint = "observations/ffdi/annual/getAnnualFFDI"
    //c('lon', 'lat', 'startYear', 'endYear', 'threshold')

    if (test) {
        console.log('No test data!')
        return [{data: null}]
    }

    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualFFDIProjections(queryParams, test = false) {
    let endpoint = "projections/ffdi/annual/getAnnualFFDIProjections"
    //c('lon', 'lat', 'years', 'emission', 'threshold',)

    if (test) {
        console.log('No test data!')
        return [{data: null}]
    }

    return indrawebApiCall(endpoint, queryParams);
}

export const iwio = {
    getAnnualObservations: getAnnualObservations,
    getAnnualProjections: getAnnualProjections,
    getAnnualThresholdObservations: getAnnualThresholdObservations,
    getAnnualThresholdProjections: getAnnualThresholdProjections,
    getAnnualFFDIObservations: getAnnualFFDIObservations,
    getAnnualFFDIProjections: getAnnualFFDIProjections
}
