import React, { useEffect, useState } from "react";
import { getArticles, getUserArticles, deleteArticle } from "../../controllers/articleController";
import "../styles/ArticleView.css";
import { useNavigate } from "react-router-dom";
import { Box, Breadcrumbs, Typography, Link } from "@mui/material";
import Pagination from "../components/Pagination";
import FilterComponent from "../components/FilterComponent";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useAuth } from "../../contexts/AuthContext";

const ArticleView = () => {
  const { currentUser } = useAuth();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const fetchedArticles = await getUserArticles(currentUser.uid);
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);
 
  const handleArticleClick = (article) => {
    navigate(`/article/${article.id}`, { state: { article }, source: 'user-articles' });
  };

  const handleEdit = (article) => {
    navigate(`/edit-article/${article.id}`, { state: { article } });
  };

  const handleDelete = async (articleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (!confirmDelete) return;

    try {
      await deleteArticle(articleId);
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== articleId));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  return (
    <div className="article-view">
      <Box mb={3}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href="/admin" color="inherit">
            Dashboard
          </Link>
          <Typography color="text.primary">Your Articles</Typography>
        </Breadcrumbs>
      </Box>
      <h1 className="article-view-title">Your Articles</h1>
      <div className="filter">
            <FilterComponent filter={filter} onFilterChange={handleFilterChange} />
      </div>
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
              <div className="article-actions">
                <button
                  className="edit-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(article);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(article.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-articles-message">No articles found!</p>
      )}
      <div className="pagination">
        <Pagination
        totalItems={filteredArticles.length}
        itemsPerPage={articlesPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ArticleView;
