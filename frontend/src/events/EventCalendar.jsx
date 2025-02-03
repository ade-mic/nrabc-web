import React, { useState, useEffect } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  CircularProgress,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
  Pagination,
  useMediaQuery,
  Grid,
} from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  List as ListIcon,
  AccessTime as AccessTimeIcon,
  LocationOn as LocationOnIcon,
  ExpandMore as ExpandMoreIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllEvents } from '../controllers/eventController';
import EventCard from './EventCard';

const localizer = momentLocalizer(moment);

const CalendarInstructions = ({ onDownload }) => (
  <Box sx={{ p: { xs: 2, sm: 3 } }}>
    <Typography variant="h5" gutterBottom>
      Calendar Integration Instructions
    </Typography>

    <Typography variant="h6" sx={{ mt: 3 }}>
      Download Calendar (.ics file)
    </Typography>
    <Typography component="div" sx={{ mb: 2 }}>
      <ol>
        <li>Click the "Download Calendar" button below</li>
        <li>
          Open the downloaded .ics file with your preferred calendar application
        </li>
      </ol>
    </Typography>
    <Button
      variant="contained"
      startIcon={<DownloadIcon />}
      onClick={onDownload}
      sx={{ mb: 3 }}
    >
      Download Calendar
    </Button>

    <Typography variant="h6" sx={{ mt: 3 }}>
      Google Calendar
    </Typography>
    <Typography component="div" sx={{ mb: 2 }}>
      <ol>
        <li>Go to calendar.google.com</li>
        <li>Click the + next to "Other calendars"</li>
        <li>Select "Import"</li>
        <li>Choose the downloaded .ics file</li>
        <li>Select the calendar to import into</li>
        <li>Click "Import"</li>
      </ol>
    </Typography>

    <Typography variant="h6" sx={{ mt: 3 }}>
      Outlook Calendar
    </Typography>
    <Typography component="div" sx={{ mb: 2 }}>
      <ol>
        <li>Open Outlook</li>
        <li>
          Click "File" &gt; "Open & Export" &gt; "Import/Export"
        </li>
        <li>Select "Import an iCalendar (.ics) file"</li>
        <li>Choose the downloaded .ics file</li>
        <li>Click "Import"</li>
      </ol>
    </Typography>

    <Typography variant="h6" sx={{ mt: 3 }}>
      Apple Calendar
    </Typography>
    <Typography component="div">
      <ol>
        <li>Open Calendar app</li>
        <li>Click "File" &gt; "Import"</li>
        <li>Choose the downloaded .ics file</li>
        <li>Click "Import"</li>
      </ol>
    </Typography>
  </Box>
);

const EventCalendar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [page, setPage] = useState(1);
  const EVENTS_PER_PAGE = 7;
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const fetchedEvents = await getAllEvents();
      setEvents(fetchedEvents);
    } catch (err) {
      setError('Failed to load events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event.resource);
  };

  const handleCloseDialog = () => {
    setSelectedEvent(null);
    setShowDescription(false);
  };

  const handleExpandClick = () => {
    setShowDescription((prev) => !prev);
  };

  function expandRecurringEvent(event) {
    if (!event.recurrence || event.recurrence === 'None') return [event];

    let startDate = new Date(event.startDate);
    let endDate = new Date(event.endDate);
    const occurrences = [];
    const recurrenceEndDate = new Date(startDate);
    recurrenceEndDate.setFullYear(recurrenceEndDate.getFullYear() + 1);

    let i = 0;
    let newStart = new Date(startDate);
    let newEnd = new Date(endDate);

    while (newStart < recurrenceEndDate) {
      occurrences.push({
        ...event,
        id: `${event.id}-${i}`,
        startDate: newStart.toISOString(),
        endDate: newEnd.toISOString(),
      });

      if (event.recurrence === 'daily') {
        newStart.setDate(newStart.getDate() + 1);
        newEnd.setDate(newEnd.getDate() + 1);
      } else if (event.recurrence === 'weekly') {
        newStart.setDate(newStart.getDate() + 7);
        newEnd.setDate(newEnd.getDate() + 7);
      } else if (event.recurrence === 'monthly') {
        newStart.setMonth(newStart.getMonth() + 1);
        newEnd.setMonth(newEnd.getMonth() + 1);
      }
      i++;
    }
    return occurrences;
  }

  const isEventExpired = (event) => new Date(event.endDate) < new Date();

  const sortedEvents = events
    .map((event) => ({
      ...event,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      resource: event,
    }))
    .flatMap(expandRecurringEvent)
    .filter((event) => !isEventExpired(event))
    .sort((a, b) => {
      const aStart = new Date(a.startDate).setHours(0, 0, 0, 0);
      const bStart = new Date(b.startDate).setHours(0, 0, 0, 0);
      return aStart !== bStart
        ? aStart - bStart
        : new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
    });

  const paginatedEvents = sortedEvents.slice(
    (page - 1) * EVENTS_PER_PAGE,
    page * EVENTS_PER_PAGE
  );

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const eventList = (
    <Stack spacing={2}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      {paginatedEvents.map((event) => (
        <EventCard key={event.id} event={event} onClick={handleEventClick} />
      ))}
      {sortedEvents.length > EVENTS_PER_PAGE && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Pagination
            count={Math.ceil(sortedEvents.length / EVENTS_PER_PAGE)}
            page={page}
            onChange={handlePageChange}
          />
        </Box>
      )}
    </Stack>
  );

  const calendarEvents = events
    .map((event) => ({
      ...event,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      resource: event,
    }))
    .flatMap(expandRecurringEvent)
    .filter((event) => !isEventExpired(event))
    .map((event) => ({
      ...event,
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      resource: event,
    }));

  const calendarView = (
    <Calendar
      localizer={localizer}
      events={calendarEvents}
      startAccessor="start"
      endAccessor="end"
      style={{
        height: 500,
        minWidth: '300px',
        fontSize: isSmallScreen ? '0.75rem' : '1rem',
      }}
      onSelectEvent={handleEventClick}
    />
  );

  const generateICSContent = (events) => {
    const formatDate = (date) =>
      date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NRABC Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
    ];

    events.forEach((event) => {
      icsContent = icsContent.concat([
        'BEGIN:VEVENT',
        `UID:${event.id}`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(new Date(event.startDate))}`,
        `DTEND:${formatDate(new Date(event.endDate))}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ''}`,
        `LOCATION:${event.location || ''}`,
        'END:VEVENT',
      ]);
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  const downloadCalendar = () => {
    const icsContent = generateICSContent(sortedEvents);
    const blob = new Blob([icsContent], {
      type: 'text/calendar;charset=utf-8',
    });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'events.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, sm: 3 },
        mx: 'auto',
        mt: { xs: '100px', sm: '150px' },
        mb: { xs: '30px', sm: '50px' },
        maxWidth: { xs: '100%', sm: '900px' },
      }}
    >
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        variant="fullWidth"
        textColor="primary"
        indicatorColor="primary"
        sx={{
          mb: 2,
          '& .MuiTab-root': {
            fontSize: { xs: '0.75rem', sm: '1rem' },
          },
        }}
      >
        <Tab icon={<CalendarTodayIcon />} label="Calendar View" />
        <Tab icon={<ListIcon />} label="All Events" />
        <Tab icon={<DownloadIcon />} label="Calendar Integration" />
      </Tabs>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box sx={{ mt: 3 }}>
          {tabIndex === 0
            ? calendarView
            : tabIndex === 1
            ? eventList
            : <CalendarInstructions onDownload={downloadCalendar} />}
        </Box>
      )}

      {selectedEvent && (
        <Dialog
          open={Boolean(selectedEvent)}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ fontSize: { xs: '1rem', sm: '1.25rem' } }}>
            {selectedEvent.title}
          </DialogTitle>
          <DialogContent>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs>
                <DialogContentText>
                  {new Date(selectedEvent.startDate).toLocaleString()}
                </DialogContentText>
              </Grid>
            </Grid>
            <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <Grid item>
                <LocationOnIcon />
              </Grid>
              <Grid item xs>
                <DialogContentText>
                  {selectedEvent.location}
                </DialogContentText>
              </Grid>
            </Grid>
            <Box sx={{ mt: 2 }}>
              <IconButton onClick={handleExpandClick}>
                <Typography variant="body2">Details</Typography>
                <ExpandMoreIcon />
              </IconButton>
              {showDescription && (
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {selectedEvent.description}
                </Typography>
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default EventCalendar;
