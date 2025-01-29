import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/FullPageArticleView.css";
import { Box, Breadcrumbs, Link, Typography, } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const FullPageArticleView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const source = location.state?.source || "articles";
  const article = location.state?.article;

  const getBreadcrumbInfo = () => {
    switch(source) {
      case 'user-articles':
        return { path: '/user-articles', label: 'Your Articles' };
      case 'admin':
        return { path: '/admin', label: 'Admin Dashboard' };
      default:
        return { path: '/articles', label: 'Articles' };
    }
  };

  const breadcrumb = getBreadcrumbInfo();

  if (!article) {
    return (
      <div className="no-article">
        <p>No article data available!</p>
        <Box mb={3}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href={breadcrumb.path} color="inherit">
            {breadcrumb.label}
          </Link>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>
      </Box>
      </div>
    );
  }

  return (
    <div className="full-page-article">
      <Box mb={3}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link href={breadcrumb.path} color="inherit">
            {breadcrumb.label}
          </Link>
          <Typography color="text.primary">{article.title}</Typography>
        </Breadcrumbs>
      </Box>
      <div className="article-content">
        {article.thumbnail && (
          <img
            src={article.thumbnail}
            alt={article.title}
            className="article-thumbnail"
          />
        )}
        <h1 className="article-title">{article.title}</h1>
        {article.subtitle && <h3 className="article-subtitle">{article.subtitle}</h3>}
        {article.author &&(
          <div className="article-meta">
            <span className="article-author"> By {article.author}</span>
            {article.createdAt && (
              <span className="article-date">
                {new Date(article.createdAt).toLocaleDateString()}
              </span>
            )}
          </div>
        )}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        ></div>
      </div>
    </div>
  );
};

export default FullPageArticleView;
