import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addDays, format } from 'date-fns';
import '../styles/EventsCalendarPage.css';

const events = [
  { title: "Church Service", date: "2025-01-20", recurrence: "weekly" },
  { title: "Youth Bible Study", date: "2025-01-21" },
  { title: "Bible Study", date: "2025-01-22", recurrence: "weekly" },
  { title: "Prayer Meeting", date: "2025-01-23", recurrence: "weekly" },
  { title: "Discipleship Group", date: "2025-01-25", recurrence: "weekly" },
  { title: "Healing Hour Service", date: "2025-01-18", recurrence: "weekly" },
];

// Utility to generate recurring weekly events
const generateRecurringEvents = (event) => {
  if (event.recurrence !== 'weekly') return [event];

  const occurrences = [];
  const startDate = new Date(event.date);

  for (let i = 0; i < 10; i++) { // Generate 10 occurrences
    const nextDate = addDays(startDate, 7 * i);
    occurrences.push({
      ...event,
      date: format(nextDate, 'yyyy-MM-dd'),
    });
  }

  return occurrences;
};

// Process all events
const processedEvents = events.flatMap(generateRecurringEvents);

const EventsCalendarPage = () => {
  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  return (
    <div className="events-calendar-container">
      {/* Events List */}
      <div className="events-list">
        <h2 className="section-title">Upcoming Events</h2>
        <ul>
          {events.length ? (
            events.map((event, index) => (
              <li key={index} className="event-item">
                <strong>{event.title}</strong> - {new Date(event.date).toLocaleDateString()}
              </li>
            ))
          ) : (
            <p className="no-events">No upcoming events.</p>
          )}
        </ul>
      </div>

      {/* Calendar */}
      <div className="calendar-section">
        <h2 className="section-title">Event Calendar</h2>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={processedEvents}
          dateClick={handleDateClick}
          headerToolbar={{
            start: 'today prev,next', // controls the calendar navigation buttons
            center: 'title', // controls the title
            end: 'dayGridMonth,dayGridWeek', // controls the view options
          }}
          eventDisplay="block"
        />
      </div>
    </div>
  );
};

export default EventsCalendarPage;
