import React, { useState } from 'react';
import {
  Button,
  Container,
  TextField,
  Paper,
  Box,
  Typography,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
  MenuButtonBold,
  MenuButtonItalic,
  MenuControlsContainer,
  MenuDivider,
  MenuSelectHeading,
  RichTextEditor,
  RichTextEditorProvider,
  RichTextField,
} from 'mui-tiptap';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FileUploader from '../components/FileUploader';
import VerticalMenu from '../../components/VerticalMenu';
import '../styles/CreateArticle.css';

const CreateArticle = () => {
  // Initialize the editor
  const editor = useEditor({
    extensions: [StarterKit, Image],
    content: '<p>Start writing your article...</p>',
  });

  // State for title, image, and article status
  const [title, setTitle] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('draft'); // "draft" or "published"

  // Handlers for file upload
  const handleFilesAccepted = (files) => {
    setImages(files); // Store uploaded files
    console.log('Accepted files:', files);
  };

  // Handle saving as draft
  const handleSaveAsDraft = () => {
    const htmlContent = editor.getHTML();
    const articleData = {
      title,
      content: htmlContent,
      images,
      status: 'draft', // Save as draft
    };
    console.log('Draft Saved:', articleData);
    // TODO: Send this data to the backend (API call)
  };

  // Handle publishing the article
  const handlePublish = () => {
    const htmlContent = editor.getHTML();
    const articleData = {
      title,
      content: htmlContent,
      images,
      status: 'published', // Mark as published
    };
    console.log('Article Published:', articleData);
    // TODO: Send this data to the backend (API call)
  };

  // Handle updating the article
  const handleUpdate = () => {
    const htmlContent = editor.getHTML();
    const articleData = {
      title,
      content: htmlContent,
      images,
      status,
    };
    console.log('Article Updated:', articleData);
    // TODO: Send this data to the backend (API call)
  };

  // Handle deleting the article
  const handleDelete = () => {
    console.log('Article Deleted');
    // TODO: Trigger deletion logic via backend (API call)
  };

  return (
    <>
      <VerticalMenu />
      <Container
        sx={{
          marginLeft: '250px',
          marginBottom: '50px',
          minHeight: '900px',
          width: '1000px',
        }}
        className="create-article-container"
      >
        {/* Breadcrumbs */}
        <Box className="breadcrumbs">
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/admin" className="breadcrumb-link">
              Dashboard
            </Link>
            <Typography color="text.primary">Create Article</Typography>
          </Breadcrumbs>
        </Box>

        {/* Form container */}
        <Paper elevation={3} className="form-container">
          <Typography variant="h4" component="h1" className="form-title">
            Create New Article
          </Typography>

          {/* Article Title */}
          <TextField
            label="Article Title"
            fullWidth
            variant="outlined"
            className="text-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Rich Text Editor */}
          <Paper className="editor-container">
            <RichTextEditorProvider editor={editor}>
              <RichTextField
                controls={
                  <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                  </MenuControlsContainer>
                }
              />
            </RichTextEditorProvider>
          </Paper>

          {/* Image Upload Section */}
          <Paper style={{ marginTop: '20px', padding: '20px', height: '250px' }}>
            <Typography variant="h6" component="h2" className="image-upload-title">
              Upload Images
            </Typography>
            <FileUploader onFilesAccepted={handleFilesAccepted} />
          </Paper>

          {/* Action Buttons */}
          <Box className="action-buttons">
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveAsDraft}
              className="button-draft"
            >
               Save as Draft
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default CreateArticle;
