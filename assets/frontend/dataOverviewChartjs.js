function makeDataOverviewChartjs(id, data) {

    const ctx = document.getElementById(id).getContext('2d');

    // data is [[],[]]
    labels = ['Historial', 'Low emissions (RCP 4.5)', 'High emissions (RCP 8.5)']
    colors = ["#18bc9c", "#f39c12", '#e74c3c'] // bootrap flatly colors
    const datasets = data.map((v, i) => {
        let dataset = {
            label: labels[i],
            borderColor: colors[i],
            showLine: true,
            radius: 1,
            hitRadius: 5,
            data: v.map(vv => { return { x: vv.year, y: vv.value } })
        }

        return dataset
    })

    new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: datasets
        },
        options: {
            maintainAspectRatio: false,
            resizeDelay: 300,
            plugins: {
                legend: {
                    onClick: null,
                    labels: {
                        boxHeight: 2,
                    }
                },
            },
            animation: {
                x: {
                    duration: 1000,
                    from: 250 // width is 100%
                },
                y: {
                    duration: 1000,
                    from: 150 // height is 300px
                }
            },
            scales: {
                x: {
                    type: 'linear',
                    min: 1990,
                    max: 2050,
                    ticks: {              
                        callback: function (value, index, values) {
                            if (value % 10 != 0){ return ''}
                            return value
                          
                        }
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.2,
                }
            },
        }
    });
}
