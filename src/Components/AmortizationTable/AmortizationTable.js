import './AmortizationTable.scss';
import React, { useState } from "react";
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const lineChartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Yearly Payment Breakdown",
      },
    },
    scales: {
      x: {
        title: {
          color: "grey",
          display: true,
          text: "Years",
        },
      },
      y: {
        title: {
          color: "grey",
          display: true,
          text: "$ Amount",
        },
      },
    },
  };


function AmortizationTable() {
    // get function that retrieves from the backend
    // function to populate the line chart 

    return(
        <>
        <div className="table table__warehouse">
            <section>
                
                {/* line chart goes here */}
            </section>
            <table className="table__container table__container--warehouse">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Remaining Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {data.map((data) => (
                        <tr key={data.id}>
                            <td className="table__position1">
                                <NavLink to={`/Amortization/${data.id}`} className="blue-text"><p>Payment Breakdown</p>
                                    {data.}
                                </NavLink>
                            </td>
                            <td className="table__position2"><p>Date:</p>{data.date}</td>
                            <td className="table__position3"><p>Principal:</p>{data.principal}</td>
                            <td className="table__position4"><p>Interest:</p>{data.interest}</td>
                            <td className="table__position5"><p>Remaining Balance:</p>{data.remainingBalance}</td>
                        </tr>
                    ))} */}
                </tbody>
            </table>
            {/* <section className='table__modal'>
                {deleteModal && <DeleteWarehouse openDelete={setDeleteModal} warehouse={selectedWarehouse} />}
            </section> */}
        </div>
        </>
    )
}

export default AmortizationTable;