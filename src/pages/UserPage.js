/* eslint-disable arrow-body-style */
import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
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
  { id: 'action', label: 'Action', alignRight: false },
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

  const [actionItem, setActionItem] = useState('Action');

  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = () => {
    axios
      .get(`${process.env.REACT_APP_URL}/admin/getUsers`, {})
      .then((data) => {
        console.log(data.data, 'DATA');
        setSubsUsers(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  const handleOpenMenu = (event, item) => {
    setOpen(event.currentTarget);
    setActionItem(item);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleSubscription = async (event,action) => {
    event.preventDefault()
    setOpen(null)
    if (action === 'Activate') {
      axios.patch(`${process.env.REACT_APP_URL}/admin/subscription/`, {
          params: {
            userId: actionItem._id,
            isSubscription : "Activated"
          },
        })
        .then((res) => {
          getUsers()
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
     axios
      .patch(`${process.env.REACT_APP_URL}/admin/subscription/`, {
        params: {
          userId: actionItem._id,
          isSubscription : "DeActivated"
        },
      })
      .then((res) => {
        getUsers()
      })
      .catch((err) => {
        console.log(err);
      });
    }
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
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {subsUsers.map((item) => {
                    return (
                      <TableRow hover key={item._id} tabIndex={-1}>
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
                          <Label
                            color={(item.isSubscription === "DeActivated" && 'error') || 'success'}
                          >
                            {(item.isSubscription === "DeActivated" && 'Inactive') || 'Active'}
                          </Label>
                        </TableCell>
                        <TableCell align="left">
                          {moment(item.subscriptionDate).diff(moment(), 'days') < 0
                            ? 'Expired'
                            : `${moment(item.subscriptionDate).diff(moment(), 'days')} days`}
                        </TableCell>
                        <TableCell align="center">
                          <IconButton size="large" color="inherit" onClick={(event) => handleOpenMenu(event, item)}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
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
        <MenuItem onClick={(event) => handleSubscription(event,'Activate')}>
          {/* <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} /> */}
          Activate
        </MenuItem>
        <MenuItem sx={{ color: 'error.main' }} onClick={(event) => handleSubscription(event,'DeActivate')}>
          {/* <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} /> */}
          DeActiavte
        </MenuItem>
      </Popover>
    </>
  );
}
