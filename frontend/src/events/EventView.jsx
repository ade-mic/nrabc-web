import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
  Divider // Add this import
} from '@mui/material';
import { EditOutlined, DeleteOutline } from '@mui/icons-material';
import { getEvent, updateEvent, deleteEvent } from '../controllers/eventController';
import EventForm from './EventForm';

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const eventData = await getEvent(id);
      if (eventData) {
        setEvent(eventData);
      } else {
        showSnackbar('Event not found', 'error');
        navigate('/events');
      }
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateEvent(id, updatedData);
      setEvent((prevEvent) => ({ ...prevEvent, ...updatedData })); // Use function to ensure state is updated correctly
      setIsEditing(false);
      showSnackbar('Event updated successfully', 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      showSnackbar('Event deleted successfully', 'success');
      navigate('/events');
    } catch (error) {
      showSnackbar(error.message, 'error');
    }
    setDeleteDialogOpen(false);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: true, message, severity })); // Use function to ensure state is updated correctly
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 10}}>
      {isEditing ? (
        <EventForm
          initialData={event}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Stack 
                direction="row" 
                justifyContent="space-between" 
                alignItems="center"
              >
                <Typography variant="h5" component="h1">
                  {event.title}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<EditOutlined />}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteOutline />}
                    color="error"
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    Delete
                  </Button>
                </Stack>
              </Stack>

              <Divider />

              <Stack spacing={1}>
                <Typography variant="body1">
                  {event.description}
                </Typography>
              </Stack>

              <Stack 
                direction={{ xs: 'column', sm: 'row' }} 
                spacing={3}
                divider={<Divider orientation="vertical" flexItem />}
              >
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Start Date:</Typography>
                  <Typography>
                    {event.startDate ? new Date(event.startDate).toLocaleString() : 'N/A'}
                  </Typography>
                </Stack>

                <Stack spacing={1}>
                  <Typography variant="subtitle1">End Date:</Typography>
                  <Typography>
                    {event.endDate ? new Date(event.endDate).toLocaleString() : 'N/A'}
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1}>
                <Typography variant="subtitle1">Location:</Typography>
                <Typography>{event.location}</Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Event</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prevSnackbar) => ({ ...prevSnackbar, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EventView;
