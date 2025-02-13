async function selectizeAddress(id) {

    let idData = document.querySelector(id).dataset
    let host = idData.apiUrl
    let key = await getMeiliKey();

    $(id).selectize({
        valueField: 'id',    // The field from the Meilisearch results to use as the value
        labelField: 'name',  // The field to display in the dropdown
        searchField: 'name', // The field to search in Meilisearch
        maxOptions: 10,      // limit max options shown (limited at 10 in Meilisearch)
        loadThrottle: 400,  // How long to wait before searching
        maxItems: 1,
        closeAfterSelect: true,
        load: function (query, callback) {
            // Clear the existing options before making a new request
            this.clearOptions();

            // If text box is clear, close options
            if (!query.length) {
                this.close();
                return;
            }
            
            //this.clearOptions();
            fetchAddressSearchResults(host, key, query, callback);
        },
        onType: function(str){
            if (!str.length){
                this.clearOptions();
                this.close();
            }
        },
        onDelete: function () {
            // only when a selection is made then deleted
            this.clearOptions();
        },
        sortField: null,
        score: function (search) {
            var score = this.getScoreFunction(search);
            return function (item) {
                return 1 + score(item);
            };
        }
    });
}



