import 'dotenv/config';

let isTesting = process.env.USETESTDATA

const apiConfig = {
    host: "https://dev.indraweb.io",
    apiKey: process.env.INDRAKEY
};

const indrawebApiCall = async (endpoint, queryParams = {}, options = {}, testMode = isTesting) => {

    if (testMode) {
        let fileId = endpoint.split('/').slice(-1)
        const response = await fetch(`http://localhost:8081/testjsons/${fileId}`);
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return await response.json();
    }

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


//const getAnnualObservations = async (queryParams) => {
async function getAnnualObservations(queryParams) {
    let endpoint = "observations/timeslice/annual/getAnnualObservations"
    // c('lon', 'lat','variable', 'startYear', 'endYear')  
    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualProjections(queryParams) {
    let endpoint = "projections/timeslice/annual/getAnnualProjections"
    //c('lon', 'lat','variable', 'years', 'emission')
    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualThresholdObservations(queryParams) {
    let endpoint = "observations/threshold/annual/getAnnualThresholdObservations"
    //  c('lon', 'lat','variable', 'startYear', 'endYear', 'threshold', 'operator')
    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualThresholdProjections(queryParams) {
    let endpoint = "projections/threshold/annual/getAnnualThresholdProjections"
    //c('lon', 'lat','variable', 'years', 'emission', 'threshold', 'operator')
    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualFFDIObservations(queryParams, test = isTesting) {
    let endpoint = "observations/ffdi/annual/getAnnualFFDI"
    //c('lon', 'lat', 'startYear', 'endYear', 'threshold')
    return indrawebApiCall(endpoint, queryParams);
}

async function getAnnualFFDIProjections(queryParams, test = isTesting) {
    let endpoint = "projections/ffdi/annual/getAnnualFFDIProjections"
    //c('lon', 'lat', 'years', 'emission', 'threshold')
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
