import { Box, Typography, Pagination } from "@mui/material";
import { useState } from "react";
import { MetaData } from "../models/metaData";

interface Props {
  metaData: MetaData;
  onPageChange: (page: number) => void;
}

export const AppPagination = ({ metaData, onPageChange }: Props) => {
  const { pageSize, currentPage, totalCount, totalPages } = metaData;
  const [pageNumber, setPageNumber] = useState(currentPage);
  function handlePageChange(page: number) {
    setPageNumber(page);
    onPageChange(page);
  }

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{ marginBottom: 3 }}
    >
      <Typography variant="body1">
        Mostrando {(currentPage - 1) * pageSize + 1}-
        {currentPage * pageSize > totalCount!
          ? totalCount
          : currentPage * pageSize}{" "}
        de {totalCount} ítems
      </Typography>

      <Pagination
        color="secondary"
        size="large"
        count={totalPages}
        page={pageNumber}
        onChange={(_e, page) => handlePageChange(page)}
      />
    </Box>
  );
};
