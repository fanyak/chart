let values = [12, 19, 3, 5, 2, 3];
const dataLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
config = {
    type: 'bar',
    data: {
        labels: dataLabels,
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
    appendClickCallback(myChart);

    // change values
    const form = document.forms['boxes'];
    const labels = myChart.data.labels;
    const [dataset] = myChart.data.datasets;

    Array.from(form.elements).forEach((input, indx) => input.value = values[indx]);

    form.addEventListener('keyup', (e)=> {    
        try {
           let labelIndx = labels.findIndex((label => label.toLowerCase() == e.target.name));
           let newValue =  Number(e.target.value);
           if(!isNaN(newValue)) {
                dataset.data.splice(labelIndx, 1, newValue);
                values = [...dataset.data];
                myChart.update();
           }
        } catch(e) {
            window.alert(e)
        }        
    });

    // toggle a line
    const lineButton = document.getElementById('line');
    lineButton.addEventListener('click', () => {
        if(myChart.data.datasets.length == 1) {
            myChart.data.datasets.push( {
                type: 'line',
                label: 'Line Dataset',
                data: [10, 20, 25, 15],
            });
            lineButton.innerText = 'Remove Line';
        } else {
            myChart.data.datasets.pop();
            lineButton.innerText = 'Add Line'
        }
        myChart.update();
    });

    // add or remove values
    const selectOption = document.getElementById('select');
    selectOption.addEventListener('change', (e) => {
        console.log(selectOption.value)
        dataset.data = values.slice(0, selectOption.value);
        myChart.data.labels = dataLabels.slice(0, selectOption.value)
        myChart.update();
        // UI hide also the inputs 
        if(selectOption.value == '4') {
            document.body.classList.add('four');
        } else {
            document.body.classList.remove('four');
        }
    })

});

function appendClickCallback(myChart) {
    const clb =   (evt) => {
        const points = myChart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    
        if (points.length) {
            const firstPoint = points[0];
            var label = myChart.data.labels[firstPoint.index];
            var value = myChart.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
            console.log(label, value)
            document.querySelector('textarea').innerHTML = `${label}: ${value}`;
        }
    }
    myChart.options.onClick = clb;
    myChart.update();
}
 