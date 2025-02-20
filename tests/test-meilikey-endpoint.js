// run using: node .\tests\{file}
// The app need be running in seperate shell

let host = "http://localhost:8080"
let endpoint = "/meilikey"

async function getJson(){
    const res = await fetch(`${host}${endpoint}`)
    const data = await res.json()
    return data;
}

getJson().then(d => {
    console.log(d)
})

