import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (event: React.ChangeEvent<unknown>, value: number) => void;
};

export default function Paginator({ totalItems, itemsPerPage, currentPage, onPageChange }: Props) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    <Stack spacing={2}>
      <Pagination
        count={pageCount}
        page={currentPage}
        onChange={onPageChange}
        color="primary"
      />
    </Stack>
  );
}
