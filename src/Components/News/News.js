import React, { useState } from 'react';
import axios from 'axios';
import './News.scss'; // Make sure to import your SCSS file

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
    <div className="news">
      <form onSubmit={handleSubmit} className="news__search">
        <input
          type="text"
          placeholder="Search for news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="news__articles">
        {articles.map((article, index) => (
          <div key={index} className="news__article">
            <div
              className="news__article-image"
              style={{ backgroundImage: `url(${article.image})` }}
            />
            <div className="news__article-content">
              <h3 className="news__article-title">{article.title}</h3>
              <p className="news__article-description">{article.description}</p>
              <p className="news__article-date">Published on: {new Date(article.publishedAt).toLocaleDateString()}</p>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news__article-link"
              >
                Read more
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;