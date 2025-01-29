import React from "react";
import { TextField, Box } from "@mui/material";
import "../styles/FilterComponent.css"; // Import custom styles for the filter

const FilterComponent = ({ filter, onFilterChange }) => {
  return (
    <Box className="filter-container">
      <TextField
        label="Search Articles"
        variant="outlined"
        className="filter-input"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        fullWidth
      />
    </Box>
  );
};

export default FilterComponent;
