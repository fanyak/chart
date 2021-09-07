// initial data
const values = [];
const dataLabels = [];

// set config object
config = {
    type: 'bar',
    data: {
        labels: dataLabels,
        datasets: [{
            label: '',
            data: values,
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        plugins: {
            legend: {
              display: false
            },
            // tooltip: {
            //     callbacks: {
            //         label: function(context) {                      
            //             return context.parsed.x + ': ' + context.parsed.y;
            //         }
            //     }
            // }
        }    
    }
};

function buildChart(){
    const ctx = document.getElementById('chart').getContext('2d');
    const chart = new Chart(ctx, config);
    addDisplayOptions(chart);
    return chart;
}

function addDisplayOptions(chart) {
     // add or remove values
     const selectOption = document.getElementById('chartDisplayOptions');
     const [dataset] = chart.data.datasets; // we are working on the 1st dataset
     selectOption.addEventListener('change', (e) => {
         const indx = -Number(selectOption.value) // slice from the end
         dataset.data = values.slice(indx);
         chart.data.labels = dataLabels.slice(indx);
         chart.update();        
     })
}

const requestUrl = 'https://fanyak.github.io/chart/data/data.json';

fetch(requestUrl, {
    mode: 'cors',
    headers: {
    'Content-Type': 'application/json'
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
})
.then(({data}) => {

    // build the labels and the values from the data
    data.forEach((item) => {
        const [label, value] = item;
        dataLabels.push(label);
        values.push(Number(value)); // we are assuming the value will be numerical
    });
    // build the chart
   const chart =  buildChart();
})
.catch(console.error); // @TODO handle error response
