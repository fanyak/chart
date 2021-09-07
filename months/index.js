const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
  let values = [1,3,5,7,3,6,8,9,11,12,20,15];
  
  config = {
    type: 'bar',
    data: {
        labels: MONTHS,
        datasets: [{
            label: '#',
            data: values,
            backgroundColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1
        },{
            type: 'line',
            label: 'Line Dataset',
            data: [10, 10, 10, 10,10,10,10,10,10,10,10,10],
            backgroundColor: [
                'red',
            ]
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
});
