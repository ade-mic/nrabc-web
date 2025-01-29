import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styling
import { updateArticle } from "../../controllers/articleController";
import "../styles/EditArticle.css";
import { useAuth } from "../../contexts/AuthContext";


const EditArticle = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article || {});
  const [formData, setFormData] = useState({
    title: article.title || "",
    content: article.content || "",
    author: currentUser?.displayName || currentUser?.name || currentUser?.email || "Anonymous",
    authorId: currentUser?.uid,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(article.thumbnail || null);

  useEffect(() => {
    if (!article || !article.id) {
      navigate("/articles");
    }
  }, [article, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      content,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setThumbnailPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateArticle(article.id, formData, thumbnail);
      alert("Article updated successfully!");
      navigate("/user-articles");
    } catch (error) {
      console.error("Error updating article:", error);
      alert("Failed to update article. Please try again.");
    }
  };


  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 
        'font': [
          'Arial',
          'Times New Roman',
          'Helvetica',
          'Courier New',
          'Georgia',
          'Verdana'
        ] 
      }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  };
  
  const quillFormats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'script',
    'blockquote',
    'code-block',
    'list',
    'bullet',
    'indent',
    'direction',
    'color',
    'background',
    'align',
    'link',
    'image'
  ];

  return (
    <div className="edit-article">
      <h1 className="edit-article-title">Edit Article</h1>
      <form className="edit-article-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <ReactQuill
            value={formData.content}
            onChange={handleContentChange}
            modules={quillModules}
            formats={quillFormats}
          />
        </div>

        <div className="form-group">
          <label htmlFor="thumbnail">Thumbnail Image</label>
          <input
            type="file"
            id="thumbnail"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          {thumbnailPreview && (
            <img
              src={thumbnailPreview}
              alt="Thumbnail preview"
              className="thumbnail-preview"
            />
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/user-articles")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditArticle;
