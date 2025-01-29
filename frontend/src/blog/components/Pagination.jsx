import React from "react";
import { Box, Pagination as MuiPagination } from "@mui/material";
import "../styles/Pagination.css";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Box className="pagination-container">
      <MuiPagination
        count={pageCount}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
      />
    </Box>
  );
};

export default Pagination;
