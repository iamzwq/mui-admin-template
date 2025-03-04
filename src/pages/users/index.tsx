import { useMemo, useState } from 'react';
import { Box } from '@mui/material';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  MaterialReactTable,
  type MRT_ColumnDef,
  type MRT_RowSelectionState,
  useMaterialReactTable,
} from 'material-react-table';
import { fetchUsers } from './api';

export default function UsersPage() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 20,
  });
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});

  const { data: users, isFetching } = useQuery({
    queryKey: ['GET_USERS', pagination],
    queryFn: () => fetchUsers(pagination.pageSize),
    placeholderData: keepPreviousData,
  });

  const columns = useMemo<MRT_ColumnDef<User>[]>(() => {
    return [
      {
        // accessorKey: 'name.title',
        accessorFn: row => `${row.name.first} ${row.name.last}`,
        id: 'name',
        header: 'Name',
        // Cell: ({ row }) => row.original.name.first + ' ' + row.original.name.last,
      },
      {
        accessorKey: 'gender',
        header: 'Gender',
      },
      {
        accessorKey: 'phone',
        header: 'Phone',
      },
      {
        accessorKey: 'email',
        header: 'Email',
      },
      {
        accessorKey: 'location.city',
        header: 'City',
      },
      {
        accessorKey: 'location.country',
        header: 'Country',
      },
      {
        accessorKey: 'location.state',
        header: 'State',
      },
      {
        accessorKey: 'location.street.name',
        header: 'Street',
      },
      {
        accessorKey: 'nat',
        header: 'Nat',
      },
      {
        accessorKey: 'picture.thumbnail',
        header: 'Picture',
        Cell: ({ cell, row }) => <img src={cell.getValue<string>()} alt={row.original.name.first} />,
      },
    ];
  }, []);

  const table = useMaterialReactTable({
    data: users ?? [],
    columns,
    enableColumnPinning: true,
    initialState: { showColumnFilters: true, columnPinning: { left: ['mrt-row-select', 'name'] } },
    enableStickyHeader: true,
    muiTableContainerProps: { sx: { maxHeight: 'calc(100vh - 160px)' } },
    enableTopToolbar: false,
    enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableRowSelection: true,
    getRowId: row => row.email!,
    onRowSelectionChange: setRowSelection,
    // renderEmptyRowsFallback: ({ table }) => {
    //   console.log('table 👉：', table);
    //   return <div>No data found</div>;
    // },
    // enableColumnFilters: false,
    manualPagination: true,
    muiPaginationProps: {
      // showRowsPerPage: false,
      // rowsPerPageOptions: [20, 50, 100],
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined',
    },
    onPaginationChange: pagination => {
      setPagination(pagination);
    },
    paginationDisplayMode: 'pages',
    rowCount: 300,
    state: {
      pagination,
      isLoading: isFetching,
      density: 'compact',
      rowSelection,
    },
    muiTablePaperProps: {
      elevation: 0,
      sx: {
        borderRadius: '4px',
        border: '1px solid var(--border-color)',
      },
    },
  });

  return (
    <Box p={2}>
      <MaterialReactTable table={table} />
    </Box>
  );
}
