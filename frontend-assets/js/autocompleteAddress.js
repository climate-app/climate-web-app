async function autocompleteAddress(id) {

    const host = 'https://www.myclimate.com.au/address'

    const client = new MeiliSearch({
        host: host,
        apiKey: await getMeiliKey()
    })

    const index = await client.index('addresses2')

    autocomplete({
        input: document.getElementById(id),
        debounceWaitMs: 500,
        fetch: async function (text, callback) {

            let results = await index.search(text, { limit: 5 })
            let suggestions = results.hits.map(hit => {
                return {
                    id: hit.id,
                    name: joinAddressColumns(hit)
                };
            });
            callback(suggestions)
        },
        render: function (item) {
            var div = document.createElement('div');
            div.textContent = item.name;
            return div;
        },
        onSelect: function (item, input) {
            document.getElementById("address_id").value = item.id
            input.value = item.name.trim().replace(/\s\s+/g, ' ')
        },
        click: function (e) {
            // Show preivous results on click
            e.fetch('', false)
        },
        disableAutoSelect: false
    });
}

