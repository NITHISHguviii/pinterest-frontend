// src/components/PortTypePieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PortTypePieChart = ({ data }) => {
  const chartData = prepareChartData(data);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className='w-1/3 h-1/3'>
        <Pie data={chartData} />
      </div>
    </div>
  );
};

const prepareChartData = (data) => {
  const typeCounts = data.reduce((acc, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  return {
    labels: Object.keys(typeCounts),
    datasets: [
      {
        data: Object.values(typeCounts),
        backgroundColor: [
          '#FF6384', 
          '#36A2EB', 
          '#FFCE56', 
          '#4BC0C0', 
          '#9966FF', 
          '#FF9F40'
        ],
      },
    ],
  };
};

export default PortTypePieChart;
