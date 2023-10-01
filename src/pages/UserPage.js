import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment'
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Button,
  Popover,
  Checkbox,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  Container,
  Typography,
  IconButton,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'User Name', alignRight: false },
  { id: 'bank_name', label: 'Bank Name', alignRight: false },
  { id: 'subscription', label: 'Subscription Type', alignRight: false },
  { id: 'subscription_date', label: 'Subscription Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'expiresIn', label: 'ExpiresIn', alignRight: false },
  { id: 'expiresIn', label: 'Action', alignRight: false },
  // { id: '' },
];

// ----------------------------------------------------------------------


export default function UserPage() {
  const [open, setOpen] = useState(null);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [subsUsers, setSubsUsers] = useState([]);

  const [action, setAction] = useState('Action');

  useEffect(() => {
    axios
      // .get(`${process.env.REACT_APP_URL}/get-defaulters`, {
      .get(`http://localhost:8000/api/admin/getUsers`, {})
      .then((data) => {
        console.log(data.data, 'DATA');
        setSubsUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <Helmet>
        <title> Users</title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          {/* <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={USERLIST.length}
                  // numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {subsUsers.map((item) => {
                    
                    return (
                      <TableRow hover key={item.id} tabIndex={-1} >
                        <TableCell padding="checkbox">
                          {/* <Checkbox checked={item} onChange={(event) => handleClick(event, item.fullName)} /> */}
                        </TableCell>

                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            {/* <Avatar alt={name} src={avatarUrl} /> */}
                            <Typography variant="subtitle2" noWrap>
                              {item.fullName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{item.branchName}</TableCell>

                        <TableCell align="left">{item.subscriptionType}</TableCell>

                        <TableCell align="left">{item.subscriptionDate}</TableCell>

                        <TableCell align="left">
                          <Label color={(moment(item.subscriptionDate).diff(moment(), "days") < 0 && 'error') || 'success'}>{(moment(item.subscriptionDate).diff(moment(), "days") < 0 && 'Inactive') || 'Active'}</Label>
                        </TableCell>

                        <TableCell align="left">
                        {moment(item.subscriptionDate).diff(moment(), "days") < 0 ? "Expired" : `${moment(item.subscriptionDate).diff(moment(),"days")} days`}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
                </TableBody>

              </Table>
            </TableContainer>
          </Scrollbar>

          {/* <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem>
          {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
          Activate
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }}>
          {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
          DeActiavte
        </MenuItem>
      </Popover>
    </>
  );
}
