import * as d3 from "d3";

/**
 * Summarise observation and projection data and return a object for EJS templating
 * @param {*} name 
 * @param {*} units 
 * @param {*} observations 
 * @param {*} projections 
 * @returns 
 */
function createDataOverviewBoxData(name, units, observations, projections) {

    //let averageProjections = iww.averageProjections(projections)
    let averageProjections = projections.map(data => iww.averageProjections(data))
    let futureMeans = averageProjections.map(data => iww.summariseYearValues(data))

    let boxData = {
        name: name,
        units: units,
        past: iww.summariseYearValues(observations.data),
        future45: futureMeans[0],
        future85: futureMeans[1],
        data: [observations.data, averageProjections[0],  averageProjections[1]]
    }

    boxData.change45 = boxData.future45 - boxData.past
    boxData.change85 = boxData.future85 - boxData.past

    for (let x of ['change45', 'change85']) {
       const sign = boxData[x] > 0 ? "+" : ''       
       boxData[x] = `${sign}${d3.format(".1f")(boxData[x])}`
    }      

    return boxData
}

function mapPromisesToKeys(keys, promises) {
    return keys.reduce((acc, key, index) => {
        acc[key] = promises[index];
        return acc;
    }, {});
}

function averageProjections(data) {
    
    let rcp = data.data[0].rcp

    let modelYearValues = data.data
        .map(v => v.yearValue)
        .flat()
        .reduce(
            (acc, { year, value }) => {
                if (!acc[year]) { acc[year] = []; }
                acc[year].push(value);
                return acc;
            },
            {}
        )

    let yearValues =
        Object
            .entries(modelYearValues)
            .map(([year, values]) => (
                {
                    year: parseInt(year),
                    value: d3.format(".1f")(d3.mean(values)),
                    rcp: rcp
                }
            )
            );

    return yearValues

}

function summariseYearValues(data) {

    let values = data.map(v => v.value)
    return d3.format(".1f")(d3.mean(values))
}

export const iww = {
    mapPromisesToKeys: mapPromisesToKeys,
    createDataOverviewBoxData: createDataOverviewBoxData,
    averageProjections: averageProjections,
    summariseYearValues: summariseYearValues
}
