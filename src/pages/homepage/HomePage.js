import React from "react";
import "./HomePage.scss";
import hero from "../../assets/finance.jpg";
import News from "../../Components/News/News";

function HomePage() {
  return (
    <>
      <section className="home">
        <div className="home__hero">
          <img className="home__hero-img" src={hero} alt="Financial Journey" />
          <div className="home__hero-text">
            <h1 className="home__title">
              Empower Your Financial Journey with Summa
            </h1>
            <p className="home__subtitle">
              Dynamic charts and graphs to simplify your financial planning.
            </p>
          </div>
        </div>

        <p className="home__mission">
          Summa is a new way for people to prepare for financial endeavors by
          using dynamic charts and graphs to calculate financial goals.
        </p>

        <div className="home__features">
          <News />
        </div>
      </section>
    </>
  );
}

export default HomePage;
