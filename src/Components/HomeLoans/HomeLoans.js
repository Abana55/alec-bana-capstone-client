import "./HomeLoans.scss";

function HomeLoans() {
  return (
    <>
      <section className="input">
        <section className="input__">
          <div className="input__">
            <ul className="input__">
              <li className="input__">
                <button className="input__">Payment Breakdown</button>
              </li>
              <li className="input__">
                <button className="input__">Amortization chart</button>
              </li>
            </ul>
          </div>
        </section>
        <section className="input__box">
          <div className="input__">
            <label className="input__">Home Price</label>
            <div className="input__">
              <input className="input__" />$
            </div>
          </div>
          <div className="input__">
            <label className="input__">Down Payment</label>
            <div className="input__">
              <input className="input__" />$
            </div>
          </div>
          <div className="input__">
            {/*here is the dropdown to pick between 30/15/10/5 years */}
            <label className="input__">Loan Term</label>
            <div className="input__">
              <input className="input__" />$
            </div>
          </div>
          <div className="input__">
            <label className="input__">Interest Rate</label>
            <div className="input__">
              <input className="input__" />$
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default HomeLoans;
