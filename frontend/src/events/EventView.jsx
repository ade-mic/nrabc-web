import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Snackbar, Alert, Stack } from '@mui/material';
import { getEvent } from '../controllers/eventController';
import EventCard from './EventCard';
import { useAuth } from '../contexts/AuthContext';

const EventView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const eventData = await getEvent(id);
      setEvent(eventData);
    } catch (error) {
      setSnackbar({ open: true, message: error.message, severity: 'error' });
      navigate('/events');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, mx: 'auto', mt: '150px', mb: '50px', maxWidth: '900px' }}>
      {isLoading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={3}>
          <EventCard
            event={event}
            isAuthor={currentUser?.uid === event?.creatorId}
          />
        </Stack>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default EventView;
