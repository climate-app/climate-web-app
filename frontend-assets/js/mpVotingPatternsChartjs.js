/**
 * 
 * @param {string} id element to start the chartjs instance 
 * @param {*} data array of data ["policy_id": "285", "n": [32, 30, 64, 7, 14, 50, 25, 5]]
 */
function mpVotingPatternsChartjs(id, data, mpVoteCat) {

    const ctx = document.getElementById(id).getContext('2d');

    let labelsLong = ["consistently for", "almost always for", "generally for", "generally against", "almost always against", "consistently against", "No Vote"]
    let labelsMulti = [
        ["consistently", "for"], 
        ["almost", "always", "for"], 
        ["generally", "for"],
        ["generally", "against"],
        ["almost", "always", "against"], 
        ["consistently", "against"],
        "No Vote"]

    let viewWidth = document.body.clientWidth

    let labels = labelsMulti
    let maxRotation = 0
    let minRotation = 0

    if (viewWidth < 600){
        labels = labelsLong
        maxRotation = 90
        minRotation = 90
    }

    let colors = ["#18bc9c", "#f39c12", '#e74c3c'] // bootrap flatly colors

    let mpVoteCatNumb = Number(mpVoteCat) - 1

    let polData = {
        labels: labels ,
        datasets: [{
            //data: [12, 5, 9, 4, 2, 10],
            data: data.n,
            backgroundColor: labels.map(() => colors[0]),
            borderColor: labels.map((v,i) =>  i == mpVoteCatNumb ? colors[2] : colors[0]),
            borderWidth: labels.map((v,i) =>  i == mpVoteCatNumb ? 10 : 0),
        }]
    }

    new Chart(ctx, {
        type: 'bar',
        data: polData,
        options: {
            maintainAspectRatio: false,
            resizeDelay: 300,
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    ticks: {
                        maxRotation: maxRotation,
                        minRotation: minRotation,
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

}
