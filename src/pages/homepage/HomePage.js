import React from 'react';
import './HomePage.scss';

function HomePage() {
  return (
    <>
      <section className="home">
        <div className="home__hero">
          <h1 className="home__title">Empower Your Financial Journey with Summa</h1>
          <p className="home__subtitle">Dynamic charts and graphs to simplify your financial planning.</p>
          <button className="home__cta">Get Started</button>
        </div>

        <p className="home__mission">
          Summa is a new way for people to prepare for financial endeavors by using dynamic charts and graphs to calculate loans.
        </p>

        <div className="home__features">
          {/* Add featured services or content here */}
        </div>

        <div className="home__testimonials">
          {/* Add testimonials or reviews here */}
        </div>
      </section>
    </>
  );
}

export default HomePage;