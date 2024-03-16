import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './News.scss';

function News() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const API_KEY = '313fdaab2a38cf9c235c9c69319c8dcc';

  const fetchArticles = async () => {
    const topic = 'finance'; 
    const response = await axios.get(`https://gnews.io/api/v4/top-headlines?topic=${topic}&token=${API_KEY}&lang=en&max=3`);
    setArticles(response.data.articles);
  };
  fetchArticles();

  return (
    <div className="news">
      <input
        className="news__search"
        type="text"
        placeholder="Search for news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="news__articles">
        {articles.map((article, index) => (
          <div key={index} className="news__article">
            {article.image && <div className="news__article-image" style={{ backgroundImage: `url(${article.image})` }}></div>}
            <div className="news__article-content">
              <h2 className="news__article-title">{article.title}</h2>
              <p className="news__article-description">{article.description}</p>
              <a className="news__article-link" href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default News;