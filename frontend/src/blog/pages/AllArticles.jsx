import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getArticles } from "../../controllers/articleController";
import FilterComponent from "../components/FilterComponent";
import Pagination from "../components/Pagination";
import "../styles/AllArticles.css";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const articlesPerPage = 6;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getArticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article, source: 'articles' } });
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="all-articles">
      <h1 className="article-view-title">All Articles</h1>
      
      <FilterComponent filter={filter} onFilterChange={handleFilterChange} />

      {loading ? (
        <p className="loading-message">Loading articles...</p>
      ) : currentArticles.length > 0 ? (
        <div className="article-grid">
          {currentArticles.map((article) => (
            <div
              className="article-card"
              key={article.id}
              onClick={() => handleArticleClick(article)}
            >
              <div className="article-thumbnail-container">
                {article.thumbnail ? (
                  <img
                    src={article.thumbnail}
                    alt={article.title}
                    className="article-thumbnail"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/placeholder-image.jpg';
                    }}
                  />
                ) : (
                  <div className="article-thumbnail-placeholder">
                    No Image Available
                  </div>
                )}
              </div>
              <div className="article-content">
                <h2 className="article-title">{article.title}</h2>
                <p
                  className="article-description"
                  dangerouslySetInnerHTML={{
                    __html:
                      article.content.length > 100
                        ? article.content.substring(0, 100) + "..."
                        : article.content,
                  }}
                ></p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-articles-message">No articles found!</p>
      )}

      <Pagination
        totalItems={filteredArticles.length}
        itemsPerPage={articlesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AllArticles;
