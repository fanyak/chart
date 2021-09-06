const values = [12, 19, 3, 5, 2, 3];
config = {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '#',
            data: values,
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
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
            }
        }      
    }
};

function buildChart(){
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, config);
    return myChart;
}

window.addEventListener('load', () => {
    const myChart = buildChart();

    // change values
    const form = document.forms['boxes'];
    const labels = myChart.data.labels;
    const [dataset] = myChart.data.datasets;

    Array.from(form.elements).forEach((input, indx) => input.value = values[indx]);

    form.addEventListener('keyup', (e)=> {    
        try {
           const labelIndx = labels.findIndex((label => label.toLowerCase() == e.target.name));
           const newValue =  Number(e.target.value);
           if(!isNaN(newValue)) {
                dataset.data.splice(labelIndx, 1, newValue);
                myChart.update();
           }
        } catch(e) {
            window.alert(e)
        }        
    });

    const lineButton = document.getElementById('line');
    lineButton.addEventListener('click', () => {
        myChart.data.datasets.push( {
            type: 'line',
            label: 'Line Dataset',
            data: [10, 20, 25, 15],
        });
        myChart.update();
    });

});
 