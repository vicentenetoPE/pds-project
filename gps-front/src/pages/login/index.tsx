import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Copyright } from '../../components/copyright';
import { useApi } from '../../hooks/useApi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth/AuthContext';

export default function Login() {
  const api = useApi();
  const navigate = useNavigate();
  const auth = React.useContext(AuthContext);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    // const user = {
    //   email: data.get('email') as string,
    //   password: data.get('password') as string
    // }
    // const response = await api.auth.Login(user);
    // if(response.data.access_token) {
    //   localStorage.setItem("access_token", response.data.access_token)
    //   navigate('/')
    // } 
    const data = new FormData(event.currentTarget);
    const user = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    const res = await auth.signin(user.email, user.password);
    console.log(res)
    if(res) navigate('/');
  };

  return (
      <Grid container component="main" sx={{ height: '100vh', zIndex:"1000", position:'absolute', top: 0, left:0 }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height={400} viewBox="0 0 128 128"><defs><linearGradient id="a" x1="6" x2="235" y1="33" y2="344" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#41d1ff"/><stop offset="1" stop-color="#bd34fe"/></linearGradient><linearGradient id="b" x1="194.651" x2="236.076" y1="8.818" y2="292.989" gradientTransform="translate(0 .937) scale(.3122)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#ffea83"/><stop offset=".083" stop-color="#ffdd35"/><stop offset="1" stop-color="#ffa800"/></linearGradient></defs><path fill="url(#a)" d="M124.766 19.52 67.324 122.238c-1.187 2.121-4.234 2.133-5.437.024L3.305 19.532c-1.313-2.302.652-5.087 3.261-4.622L64.07 25.187a3.09 3.09 0 0 0 1.11 0l56.3-10.261c2.598-.473 4.575 2.289 3.286 4.594Zm0 0"/><path fill="url(#b)" d="M91.46 1.43 48.954 9.758a1.56 1.56 0 0 0-1.258 1.437l-2.617 44.168a1.563 1.563 0 0 0 1.91 1.614l11.836-2.735a1.562 1.562 0 0 1 1.88 1.836l-3.517 17.219a1.562 1.562 0 0 0 1.985 1.805l7.308-2.223c1.133-.344 2.223.652 1.985 1.812l-5.59 27.047c-.348 1.692 1.902 2.614 2.84 1.164l.625-.968 34.64-69.13c.582-1.16-.421-2.48-1.69-2.234l-12.185 2.352a1.558 1.558 0 0 1-1.793-1.965l7.95-27.562A1.56 1.56 0 0 0 91.46 1.43Zm0 0"/></svg>
          <h1 style={{color: "#bd34fe", textAlign: "center", fontSize:"60px" }}>Planify</h1>
          </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Entrar
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de email"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Entrar
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/recuperarsenha" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/registrar" variant="body2">
                    {"Você não tem uma conta? Cadastre-se"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
}