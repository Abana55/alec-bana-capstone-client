import Chart from "chart.js/auto";
import "./DonutChart.scss";

function Donut() {
  const config = {
    type: "doughnut",
    data: data,
  };
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 59, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return(
    <>
    </>
  ) 
};

export default Donut;
