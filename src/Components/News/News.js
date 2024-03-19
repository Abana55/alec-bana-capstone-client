import React, { useState } from 'react';
import axios from 'axios';

function News() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const API_KEY = '313fdaab2a38cf9c235c9c69319c8dcc';

  const fetchArticles = async () => {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=${searchTerm}&token=${API_KEY}&lang=en&max=3`);
    setArticles(response.data.articles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className="investment-calculator__toggle">Search</button>
      </form>
      {articles.map((article, index) => (
        <div key={index}>
          <h2>{article.title}</h2>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
        </div>
      ))}
    </div>
  );
}

export default News;