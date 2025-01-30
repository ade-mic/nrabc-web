import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  Pagination,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { getAllEvents, deleteEvent } from '../controllers/eventController';

const AllEvents = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(search.toLowerCase()) ||
      event.description.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredEvents(filtered);
    setPage(1);
  }, [search, events]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, event) => {
    event.stopPropagation();
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await deleteEvent(id);
        fetchEvents();
      } catch (error) {
        setError(error.message);
      }
    }
  };

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, marginTop:"120px", marginLeft:"50px", marginRight:"50px" }}>
      <Stack spacing={3}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="h4">Events</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/events/new')}
          >
            Create Event
          </Button>
        </Stack>

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

        <Stack spacing={2}>
          {paginatedEvents.map((event) => (
            <Card
              key={event.id}
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography variant="h6">{event.title}</Typography>
                    <Stack direction="row" spacing={1}>
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/events/${event.id}/edit`);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={(e) => handleDelete(event.id, e)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {event.description}
                  </Typography>

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                    divider={<Box sx={{ borderRight: 1, borderColor: 'divider' }} />}
                  >
                    <Typography variant="body2">
                      {new Date(event.startDate).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body2">{event.location}</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
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
      </Stack>
    </Box>
  );
};

export default AllEvents;
