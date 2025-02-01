import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Box,
  CardActionArea,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DateRange as DateRangeIcon,
  LocationOn as LocationOnIcon,
  AccessAlarm as AccessAlarmIcon,
} from '@mui/icons-material';
import { deleteEvent, updateEvent } from '../controllers/eventController';
import EventForm from './EventForm';

const EventCard = ({ event, isAuthor, onEventUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  if (!event) return null;

  const handleDelete = async () => {
    try {
      await deleteEvent(event.id);
      setSnackbar({ open: true, message: 'Event deleted successfully', severity: 'success' });
      if (onEventUpdated) onEventUpdated();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error deleting event: ' + error.message, severity: 'error' });
    }
    setDeleteDialogOpen(false);
  };

  const handleUpdate = async (updatedData) => {
    try {
      await updateEvent(event.id, updatedData);
      setSnackbar({ open: true, message: 'Event updated successfully', severity: 'success' });
      setIsEditing(false);
      if (onEventUpdated) onEventUpdated();
    } catch (error) {
      setSnackbar({ open: true, message: 'Error updating event: ' + error.message, severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const openLocationInMaps = () => {
    const { latitude, longitude, location } = event;
  
    if (latitude && longitude) {
      const query = `${latitude},${longitude}`;
      const label = encodeURIComponent(query); // Label from query
      window.open(`https://www.google.com/maps/place/${query}/@${query},17z?hl=en&q=${label}`, '_blank');
      return;
    }
  
    if (location) {
      const query = encodeURIComponent(location);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
    } else {
      console.warn("No valid location data available.");
    }
  };
  

  return isEditing ? (
    <EventForm
      defaultValues={event}
      onSubmit={handleUpdate}
      onCancel={() => setIsEditing(false)}
    />
  ) : (
    <Card 
      sx={{ 
        transition: 'all 0.2s ease-in-out',
        '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 }
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardActionArea>
          <CardContent>
            <Stack spacing={2}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5">{event.title}</Typography>
                {isAuthor && (
                  <Stack direction="row" spacing={1}>
                    <IconButton size="small" onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}>
                      <EditIcon />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={(e) => { e.stopPropagation(); setDeleteDialogOpen(true); }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Stack>
                )}
              </Stack>

              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>

              <Stack spacing={2} direction="row" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <DateRangeIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {new Date(event.startDate).toLocaleDateString()}
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Button
                    onClick={openLocationInMaps}
                    variant='secondary'
                    color='#fff'
                    sx={{ textTransform: 'none',
                          '&:hover': { color:"white", backgroundColor: '#D17564'}
                     }}
                  >
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                    {event.location}
                    </Typography>
                  </Button>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                  <AccessAlarmIcon fontSize="small" color="action" />
                  <Typography variant="body2">
                    {new Date(event.startDate).toLocaleTimeString()}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Box>

      {/* Delete Confirmation Dialog */}
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
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default EventCard;
