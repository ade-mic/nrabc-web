import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stack,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Breadcrumbs,
  Link,
  Pagination,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Add as AddIcon, Search as SearchIcon } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getAllEvents, deleteEvent } from '../controllers/eventController';
import EventCard from './EventCard';

const AllEvents = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    setFilteredEvents(
      events.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      )
    );
    setPage(1);
  }, [search, events]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    } catch (err) {
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const paginatedEvents = filteredEvents.slice((page - 1) * eventsPerPage, page * eventsPerPage);

  return (
    <Box sx={{ p: 3, mx: 'auto', mt: '150px', mb: '50px', maxWidth: '900px' }}>
      {currentUser && (
        <>
          <Box mb={3}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
              <Link href="/admin" color="inherit">
                Dashboard
              </Link>
              <Typography color="text.primary">Events</Typography>
            </Breadcrumbs>
          </Box>
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            justifyContent="space-between" 
            alignItems="center"
            mb={3}
          >
            <Typography variant="h4">Events</Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />} 
              onClick={() => navigate('/create-event')}
            >
              Create Event
            </Button>
          </Stack>
        </>
      )}

      <Stack spacing={3}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />,
          }}
        />

        {error && <Alert severity="error">{error}</Alert>}
        
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Stack spacing={2}>
              {paginatedEvents.map(event => (
                <EventCard
                  key={event.id}
                  event={event}
                  isAuthor={currentUser?.uid === event.creatorId}
                  onEventUpdated={fetchEvents}  // Pass the callback to refresh events
                />
              ))}
            </Stack>

            {filteredEvents.length > eventsPerPage && (
              <Stack alignItems="center">
                <Pagination 
                  count={Math.ceil(filteredEvents.length / eventsPerPage)} 
                  page={page} 
                  onChange={(_, value) => setPage(value)} 
                />
              </Stack>
            )}
          </>
        )}
      </Stack>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AllEvents;
