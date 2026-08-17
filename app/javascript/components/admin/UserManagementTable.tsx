import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { router } from '@inertiajs/react'
import {
  Avatar,
  Box,
  Card,
  Chip,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'
import { useDeferredValue, useEffect, useRef, useState } from 'react'

type SortKey = 'user' | 'plan' | 'trips_saved' | 'join_date' | 'status'
type SortDirection = 'asc' | 'desc'
type PlanFilter = 'all' | 'basic' | 'premium'
type TableQuery = Partial<UserManagementUsersTable['filters']> & {
  page?: number
  per_page?: number
}

export type UserManagementTableRow = {
  id: number
  name: string
  lastname: string
  email: string
  plan: 'Basic' | 'Premium'
  trips_saved: number
  join_date: string
  status: string
}

export type UserManagementUsersTable = {
  rows: UserManagementTableRow[]
  pagination: {
    page: number
    per_page: number
    total_count: number
  }
  filters: {
    search: string
    plan: PlanFilter
    sort: SortKey
    direction: SortDirection
  }
}

type Column = {
  id: SortKey
  label: string
  align?: 'left' | 'right'
}

const columns: Column[] = [
  { id: 'user', label: 'User' },
  { id: 'plan', label: 'Plan' },
  { id: 'trips_saved', label: 'Trips Saved', align: 'right' },
  { id: 'join_date', label: 'Join Date' },
  { id: 'status', label: 'Status' },
]

const MIN_SEARCH_LENGTH = 3

function formatJoinDate(value: string) {
  return new Intl.DateTimeFormat('en', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(`${value}T00:00:00`))
}

function initials(user: UserManagementTableRow) {
  return `${user.name.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase()
}

function normalizeStatus(status: string) {
  return status.trim().toLowerCase()
}

function displayStatus(status: string) {
  const normalizedStatus = normalizeStatus(status)

  return normalizedStatus.charAt(0).toUpperCase() + normalizedStatus.slice(1)
}

export default function UserManagementTable({
  table,
}: {
  table: UserManagementUsersTable
}) {
  const theme = useTheme()
  const [search, setSearch] = useState(table.filters.search)
  const deferredSearch = useDeferredValue(search)
  const skipNextSearchSync = useRef(false)

  const updateTable = (updates: TableQuery) => {
    router.get(
      '/admin/user-management',
      {
        search: table.filters.search,
        plan: table.filters.plan,
        sort: table.filters.sort,
        direction: table.filters.direction,
        page: table.pagination.page,
        per_page: table.pagination.per_page,
        ...updates,
      },
      {
        only: ['users_table'],
        preserveScroll: true,
        preserveState: true,
        replace: true,
      },
    )
  }

  useEffect(() => {
    setSearch(table.filters.search)
  }, [table.filters.search])

  useEffect(() => {
    const trimmedSearch = deferredSearch.trim()

    if (skipNextSearchSync.current && deferredSearch === '') {
      skipNextSearchSync.current = false
      return
    }

    if (deferredSearch === table.filters.search) return

    if (trimmedSearch.length === 0 && table.filters.search.length > 0) {
      updateTable({ search: '', page: 1 })
      return
    }

    if (trimmedSearch.length < MIN_SEARCH_LENGTH) return

    updateTable({ search: trimmedSearch, page: 1 })
  }, [deferredSearch])

  const sortDirection = table.filters.direction
  const clearSearch = () => {
    if (search.length === 0) return

    skipNextSearchSync.current = true
    setSearch('')
    updateTable({ search: '', page: 1 })
  }

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        boxShadow: `0 18px 42px ${alpha(theme.palette.secondary.main, 0.08)}`,
        overflow: 'hidden',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={2}
        sx={{
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
          p: { xs: 2, md: 3 },
        }}
      >
        <TextField
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by name, email, or user ID..."
          size="small"
          sx={{ maxWidth: { md: 460 }, width: '100%' }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: search.length > 0 && (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear search"
                    edge="end"
                    onClick={clearSearch}
                    size="small"
                    sx={{ color: 'text.secondary' }}
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <Tabs
            value={table.filters.plan}
            onChange={(_, value: PlanFilter) =>
              updateTable({ plan: value, page: 1 })
            }
            sx={{
              bgcolor: alpha(theme.palette.secondary.main, 0.04),
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2,
              height: 42,
              minHeight: 40,
              p: 0.5,
              '& .MuiTabs-indicator': { display: 'none' },
              '& .MuiTabs-scroller': { height: '100%' },
              '& .MuiTab-root': {
                borderRadius: 1.5,
                color: 'text.primary',
                fontSize: '0.8125rem',
                fontWeight: 800,
                minHeight: 32,
                minWidth: 72,
                px: 1.5,
                textTransform: 'none',
              },
              '& .Mui-selected': {
                bgcolor: 'background.paper',
                boxShadow: `0 8px 18px ${alpha(theme.palette.secondary.main, 0.08)}`,
                color: 'text.primary',
              },
            }}
          >
            <Tab label="All" value="all" />
            <Tab label="Basic" value="basic" />
            <Tab label="Premium" value="premium" />
          </Tabs>
          <Tooltip title="Clear filters">
            <IconButton
              aria-label="Clear user table filters"
              onClick={() => {
                setSearch('')
                updateTable({ search: '', plan: 'all', page: 1 })
              }}
              sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                color: 'text.primary',
                height: 42,
                width: 42,
              }}
            >
              <FilterListRoundedIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>

      <TableContainer>
        <Table sx={{ minWidth: 840 }}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sortDirection={
                    table.filters.sort === column.id ? sortDirection : false
                  }
                  sx={{
                    borderColor: 'divider',
                    color: 'text.secondary',
                    fontSize: '0.75rem',
                    fontWeight: 900,
                    letterSpacing: '0.04em',
                    py: 2,
                    textTransform: 'uppercase',
                  }}
                >
                  <TableSortLabel
                    active={table.filters.sort === column.id}
                    direction={
                      table.filters.sort === column.id ? sortDirection : 'asc'
                    }
                    onClick={() => {
                      const nextDirection =
                        table.filters.sort === column.id &&
                        sortDirection === 'asc'
                          ? 'desc'
                          : 'asc'

                      updateTable({
                        sort: column.id,
                        direction: nextDirection,
                        page: 1,
                      })
                    }}
                    sx={{
                      '&.Mui-active': { color: 'text.primary' },
                      '& .MuiTableSortLabel-icon': {
                        color: `${theme.palette.text.secondary} !important`,
                      },
                    }}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {table.rows.map((user) => {
              const active = normalizeStatus(user.status) === 'active'

              return (
                <TableRow
                  key={user.id}
                  hover
                  sx={{
                    '&:last-child td': { borderBottom: 0 },
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <TableCell sx={{ py: 2 }}>
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ alignItems: 'center', minWidth: 0 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.14),
                          color: 'primary.dark',
                          fontSize: '0.875rem',
                          fontWeight: 900,
                          height: 40,
                          width: 40,
                        }}
                      >
                        {initials(user)}
                      </Avatar>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontWeight: 900, lineHeight: 1.25 }}>
                          {user.name} {user.lastname}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{ color: 'text.secondary', fontWeight: 600 }}
                        >
                          {user.email}
                        </Typography>
                      </Box>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.plan}
                      size="small"
                      sx={{
                        bgcolor:
                          user.plan === 'Premium'
                            ? alpha(theme.palette.secondary.main, 0.14)
                            : alpha(theme.palette.text.secondary, 0.1),
                        color:
                          user.plan === 'Premium'
                            ? 'secondary.main'
                            : 'text.secondary',
                        fontWeight: 900,
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ fontWeight: 900 }}>
                    {user.trips_saved}
                  </TableCell>
                  <TableCell>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ alignItems: 'center' }}
                    >
                      <CalendarMonthRoundedIcon
                        sx={{ color: 'text.secondary', fontSize: 17 }}
                      />
                      <Typography
                        sx={{ color: 'text.secondary', fontWeight: 700 }}
                      >
                        {formatJoinDate(user.join_date)}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={displayStatus(user.status)}
                      size="small"
                      sx={{
                        bgcolor: active
                          ? alpha(theme.palette.success.main, 0.12)
                          : alpha(theme.palette.error.main, 0.12),
                        color: active ? 'success.main' : 'error.main',
                        fontWeight: 900,
                      }}
                    />
                  </TableCell>
                </TableRow>
              )
            })}

            {table.rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ py: 6 }}>
                  <Typography
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 800,
                      textAlign: 'center',
                    }}
                  >
                    No users match the current filters.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={table.pagination.total_count}
        page={table.pagination.page - 1}
        rowsPerPage={table.pagination.per_page}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, page) => updateTable({ page: page + 1 })}
        onRowsPerPageChange={(event) =>
          updateTable({
            page: 1,
            per_page: Number(event.target.value),
          })
        }
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          color: 'text.secondary',
          fontWeight: 700,
          '& .MuiTablePagination-toolbar': {
            px: { xs: 2, md: 3 },
          },
          '& .MuiTablePagination-displayedRows, & .MuiTablePagination-selectLabel':
            {
              fontWeight: 700,
            },
        }}
      />
    </Card>
  )
}
