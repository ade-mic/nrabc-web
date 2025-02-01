import React, { useState, useRef, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  MenuItem,
  Button,
  FormControl,
  Select,
  Container,
  Box,
  Typography,
  Snackbar,
  Alert,
  CircularProgress,
  Stack,
  Breadcrumbs,
  Link
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { createEvent, updateEvent } from "../controllers/eventController";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const recurrenceOptions = [
  { label: "None", value: "none" },
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
];

const libraries = ["places"];

const EventForm = ({ defaultValues, onSubmit: propOnSubmit, onCancel }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  const autocompleteRef = useRef(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: defaultValues || {
      title: "",
      description: "",
      startDate: dayjs(),
      endDate: dayjs(),
      location: "",
      latitude: null,
      longitude: null,
      recurrence: "none",
      meetingLink: "",
      creatorId: currentUser?.uid
    }
  });

  const location = watch("location", "");

  useEffect(() => {
    if (defaultValues) {
      reset({
        ...defaultValues,
        startDate: dayjs(defaultValues.startDate),
        endDate: dayjs(defaultValues.endDate),
      });
    }
  }, [defaultValues, reset]);

  useEffect(() => {
    if (autocompleteRef.current) {
      autocompleteRef.current.addListener("place_changed", () => {
        const place = autocompleteRef.current.getPlace();
        if (place?.formatted_address) {
          setValue("location", place.formatted_address, { shouldValidate: true });
          setValue("latitude", place.geometry.location.lat(), { shouldValidate: true });
          setValue("longitude", place.geometry.location.lng(), { shouldValidate: true });
        }
      });
    }
  }, [isLoaded]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formattedData = {
        ...data,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
      };

      if (defaultValues) {
        await updateEvent(defaultValues.id, formattedData);
        setSnackbar({ open: true, message: "Event updated successfully!", severity: "success" });
      } else {
        await createEvent(formattedData);
        setSnackbar({ open: true, message: "Event created successfully!", severity: "success" });
      }

      reset();
      if (propOnSubmit) {
        propOnSubmit(formattedData);
      } else {
        setTimeout(() => navigate("/events"), 2000);
      }
    } catch (error) {
      setSnackbar({ open: true, message: error.message || "Error saving event", severity: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return <CircularProgress />;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="md" sx={{ marginTop: "150px" }}>
        <Box mb={3}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
            <Link href="/admin" color="inherit"> Dashboard </Link>
            <Typography color="text.primary">{defaultValues ? "Edit Event" : "Create Event"}</Typography>
          </Breadcrumbs>
        </Box>
        <Box sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {defaultValues ? "Edit Event" : "Create New Event"}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth label="Event Title" error={!!errors.title} helperText={errors.title?.message} />
                )}
              />

              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <TextField {...field} fullWidth multiline rows={4} label="Description" error={!!errors.description} helperText={errors.description?.message} />
                )}
              />

              <Controller
                name="startDate"
                control={control}
                rules={{ required: "Start date is required" }}
                render={({ field }) => (
                  <DateTimePicker {...field} label="Start Date & Time" slotProps={{ textField: { fullWidth: true, error: !!errors.startDate, helperText: errors.startDate?.message } }} />
                )}
              />

              <Controller
                name="endDate"
                control={control}
                rules={{ required: "End date is required" }}
                render={({ field }) => (
                  <DateTimePicker {...field} label="End Date & Time" slotProps={{ textField: { fullWidth: true, error: !!errors.endDate, helperText: errors.endDate?.message } }} />
                )}
              />

              <Autocomplete
                onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                onPlaceChanged={() => {
                  const place = autocompleteRef.current?.getPlace();
                  if (place?.formatted_address) {
                    setValue("location", place.formatted_address, { shouldValidate: true });
                    setValue("latitude", place.geometry.location.lat(), { shouldValidate: true });
                    setValue("longitude", place.geometry.location.lng(), { shouldValidate: true });
                  }
                }}
              >
                <TextField label="Location (Paste Link if virtual)" fullWidth value={location} onChange={(e) => setValue("location", e.target.value)} error={!!errors.location} helperText={errors.location?.message} />
              </Autocomplete>

              {location.toLowerCase() === "virtual" && (
                <Controller
                  name="meetingLink"
                  control={control}
                  render={({ field }) => <TextField {...field} fullWidth label="Meeting Link" error={!!errors.meetingLink} helperText={errors.meetingLink?.message} />}
                />
              )}

              <FormControl fullWidth>
                <Controller
                  name="recurrence"
                  control={control}
                  render={({ field }) => (
                    <Select {...field} label="Recurrence">
                      {recurrenceOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
                    </Select>
                  )}
                />
              </FormControl>

              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button variant="outlined" onClick={onCancel} disabled={isLoading}> Cancel </Button>
                <Button type="submit" variant="contained" disabled={isLoading}> {isLoading ? 'Saving...' : defaultValues ? 'Update Event' : 'Save Event'} </Button>
              </Box>
            </Stack>
          </form>
        </Box>
      </Container>
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>{snackbar.message}</Alert>
      </Snackbar>
    </LocalizationProvider>
  );
};

export default EventForm;
