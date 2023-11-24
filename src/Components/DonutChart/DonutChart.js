import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "./DonutChart.scss";

function Donut() {
  const chartRef = useRef(null);
  
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
  
      const data = {
        labels: ["Red", "Blue", "Yellow"],
        datasets: [
          {
            label: "My First Dataset",
            data: [3, 59, 100],
            backgroundColor: [
              "rgb(255, 99, 132)",
              "rgb(54, 162, 235)",
              "rgb(255, 205, 86)",
            ],
            hoverOffset: 4,
          },
        ],
      };
  
      // Check if there is an existing Chart instance
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      chartRef.current.chart = new Chart(ctx, {
        type: "doughnut",
        data: data,
      });
    }
  }, [chartRef]);
  

  return (
    <>
      <div className="donut">
        <canvas ref={chartRef}></canvas>
      </div>
    </>
  );
}

export default Donut;
