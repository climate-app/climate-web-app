// run using: node .\tests\{file}
// The app need be running in seperate shell

let host = "http://localhost:8081"
let endpoint = "/climatekeymessages"

async function getJson(){
    const res = await fetch(`${host}${endpoint}`)
    const data = await res.json()
    return data;
}

getJson().then(d => {
    
    //console.log(d)

    let extract = d.filter(d => d.key == 'WTC')

    console.log(extract)

    // console.log(
    //     'Correct length =', d.length == 26
    // )
    
})

