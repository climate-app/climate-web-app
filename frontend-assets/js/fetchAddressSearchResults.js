function fetchAddressSearchResults(key, query, callback) {

    const host = 'https://www.myclimate.com.au'
    const url = `${host}/address/indexes/addresses2/search`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
            q: query,  // The user's query
            limit: 10  // Limit the results to the top 10 suggestions
        })
    })
        .then(response => response.json())
        .then(data => {
            // Format the results in a way that Selectize can consume
            const results = data.hits.map(hit => {
                //return hit
                return {
                    id: hit.id,       // Unique identifier
                    //name: hit.ADDRESS_LABEL // full string
                    name: joinAddressColumns(hit) // address in columns
                };
            });

            //console.log(results)

            callback(results); // Pass the results back to Selectize
        })
        .catch(error => {
            console.error('Error fetching results from Meilisearch:', error);
            callback(); // In case of error, provide an empty callback
        });
}
