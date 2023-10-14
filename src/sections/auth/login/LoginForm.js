import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ToastContainer, toast } from 'react-toastify';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const submitForm = (e) => {
    e.preventDefault();
    setIsSubmitting(true)
    const newUserdetails = {
      email: user.email,
      password: user.password,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/admin/login`, newUserdetails)
      .then((res) => {
        console.log(res, "Admin Login");
        if (res.data.status === 'failed') {
        setIsSubmitting(false)
          toast.error(`${res.data.message}`, {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
        }
        if (res.data.status === 'Success') {
          setUser({
            email: '',
            password: '',
          });
          localStorage.setItem('token', res.data.token);
          navigate('/dashboard', { replace: true });
          setIsSubmitting(false)

        }
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false)

      });
  };

  const handleClick = () => {
    navigate('/dashboard', { replace: true });
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Stack spacing={3}>
        <TextField name="email" label="Email address" onChange={handleInput} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={handleInput}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        {/* <Checkbox name="remember" label="Remember me" /> */}
        {/* <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link> */}
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={submitForm} loading={isSubmitting}>  
        Login
      </LoadingButton>
    </>
  );
}
