import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, CircularProgress,
  Stack, Dialog, DialogTitle, DialogContent,
  DialogContentText, DialogActions, Button, IconButton,
  Pagination
} from '@mui/material';
import { CalendarToday as CalendarTodayIcon, List as ListIcon,
   AccessTime as AccessTimeIcon, LocationOn as LocationOnIcon,
    ExpandMore as ExpandMoreIcon,
    Download as DownloadIcon,
}  from '@mui/icons-material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { getAllEvents } from '../controllers/eventController';
import EventCard from './EventCard';

const localizer = momentLocalizer(moment);

const EventCalendar = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [page, setPage] = useState(1);
  const EVENTS_PER_PAGE = 7;

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
    if (!event.recurrence || event.recurrence === 'None') {
      return [event]; // Return the original event if there's no recurrence
    }
  
    let startDate = new Date(event.startDate);
    let endDate = new Date(event.endDate);
    let occurrences = [];
  
    // Determine the end of the recurrence cycle (one year from start)
    let recurrenceEndDate = new Date(startDate);
    recurrenceEndDate.setFullYear(recurrenceEndDate.getFullYear() + 1); // 1 year from startDate
  
    let i = 0; // Counter for occurrences
    let newStart = new Date(startDate);
    let newEnd = new Date(endDate);
  
    // Generate recurrence events until we reach the 1-year mark
    while (newStart < recurrenceEndDate) {
      occurrences.push({
        ...event,
        id: `${event.id}-${i}`,
        startDate: newStart.toISOString(),
        endDate: newEnd.toISOString(),
      });
  
      // Increment start and end date based on recurrence type
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
  
      i++; // Increment counter
    }
  
    return occurrences;
  }

  // Add helper function to check if event is expired
  const isEventExpired = (event) => {
    const eventEnd = new Date(event.endDate);
    const now = new Date();
    return eventEnd < now;
  };

  const sortedEvents = events
  .map(event => ({
    ...event,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: event,
  }))
  .flatMap(expandRecurringEvent)
  .filter(event => !isEventExpired(event)) // Filter out expired events
  .sort((a, b) => {
    const aStart = new Date(a.startDate);
    const bStart = new Date(b.startDate);
    
    // Compare year, month, day
    const dateCompare = aStart.setHours(0,0,0,0) - bStart.setHours(0,0,0,0);
    if (dateCompare !== 0) return dateCompare;
    
    // If same day, compare hours, minutes
    const aTime = new Date(a.startDate).getTime();
    const bTime = new Date(b.startDate).getTime();
    return aTime - bTime;
  });

  const paginatedEvents = sortedEvents.slice((page - 1) * EVENTS_PER_PAGE, page * EVENTS_PER_PAGE);

  const handlePageChange = (_, newPage) => {
    setPage(newPage);
  };

  const eventList = (
    <Stack spacing={2}>
      {paginatedEvents.map(event => (
        <EventCard key={event.id} event={event} onClick={handleEventClick} />
      ))}
      {sortedEvents.length > EVENTS_PER_PAGE && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Pagination count={Math.ceil(sortedEvents.length / EVENTS_PER_PAGE)} page={page} onChange={handlePageChange} />
        </Box>
      )}
    </Stack>
  );

  const calendarEvents = events.map(event => ({
    ...event,
    start: new Date(event.startDate),
    end: new Date(event.endDate),
    resource: event,
  })).flatMap(expandRecurringEvent)
  .filter(event => !isEventExpired(event)) // Filter out expired events
  .map(event => ({
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
      style={{ height: 500 }}
      onSelectEvent={handleEventClick}
    />
  );

  // Calender export to ICS
  const generateICSContent = (events) => {
    const formatDate = (date) => {
      return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//NRABC Events//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach(event => {
      icsContent = icsContent.concat([
        'BEGIN:VEVENT',
        `UID:${event.id}`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(new Date(event.startDate))}`,
        `DTEND:${formatDate(new Date(event.endDate))}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description || ''}`,
        `LOCATION:${event.location || ''}`,
        'END:VEVENT'
      ]);
    });

    icsContent.push('END:VCALENDAR');
    return icsContent.join('\r\n');
  };

  const downloadCalendar = () => {
    const icsContent = generateICSContent(sortedEvents);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'events.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Calendar Instructions
  const CalendarInstructions = ({ onDownload }) => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>Calendar Integration Instructions</Typography>
      
      <Typography variant="h6" sx={{ mt: 3 }}>Download Calendar (.ics file)</Typography>
      <Typography >
        <ol>
          <li> Click the "Download Calendar" button below </li>
          <li>Open the downloaded .ics file with your preferred calendar application</li>
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
  
      <Typography variant="h6">Google Calendar</Typography>
      <Typography component="div">
        <ol>
          <li>Go to calendar.google.com</li>
          <li>Click the + next to "Other calendars"</li>
          <li>Select "Import"</li>
          <li>Choose the downloaded .ics file</li>
          <li>Select the calendar to import into</li>
          <li>Click "Import"</li>
        </ol>
      </Typography>
  
      <Typography variant="h6">Outlook Calendar</Typography>
      <Typography component="div">
        <ol>
          <li>Open Outlook</li>
          <li>Click "File" {'>'} "Open & Export" {">"} "Import/Export"</li>
          <li>Select "Import an iCalendar (.ics) file"</li>
          <li>Choose the downloaded .ics file</li>
          <li>Click "Import"</li>
        </ol>
      </Typography>
  
      <Typography variant="h6">Apple Calendar</Typography>
      <Typography component="div">
        <ol>
          <li>Open Calendar app</li>
          <li>Click "File" {'>'} "Import"</li>
          <li>Select the downloaded .ics file</li>
          <li>Click "Import"</li>
        </ol>
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3, mx: 'auto', mt: '150px', mb: '50px', maxWidth: '900px' }}>
      <Tabs value={tabIndex} onChange={handleTabChange} centered>
        <Tab icon={<CalendarTodayIcon />} label="Calendar View" />
        <Tab icon={<ListIcon />} label="All Events" />
        <Tab icon={<DownloadIcon />} label="Calendar Integration" />
      </Tabs>

      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Box mt={3}>
          {tabIndex === 0 ? calendarView : 
          tabIndex === 1 ? eventList : 
          <CalendarInstructions onDownload={downloadCalendar} />}
        </Box>
      )}

      {selectedEvent && (
        <Dialog open={Boolean(selectedEvent)} onClose={handleCloseDialog}>
          <DialogTitle>{selectedEvent.title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <AccessTimeIcon /> {new Date(selectedEvent.startDate).toLocaleString()}
            </DialogContentText>
            <DialogContentText>
              <LocationOnIcon /> {selectedEvent.location}
            </DialogContentText>
            <IconButton onClick={handleExpandClick}>
              <Typography>Details</Typography>
              <ExpandMoreIcon />
            </IconButton>
            {showDescription && (
              <Typography variant="body2">
                {selectedEvent.description}
              </Typography>
            )}
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
