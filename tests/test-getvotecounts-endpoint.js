// run using: node .\tests\{file}
// The app need be running in seperate shell

let host = "http://localhost:8081"
let endpoint = "/getvotecounts"

async function getJson(){
    const res = await fetch(`${host}${endpoint}`)
    const data = await res.json()
    return data;
}

getJson().then(d => {
    //console.log(d)
    // console.log(
    //     'Correct length =', d.length == 26
    // )
    let jj = d.filter(d => d.policy_id == '268')
    console.log(jj)

    
})

