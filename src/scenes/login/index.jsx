import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth';
import { getUsers } from '../../api_usage';

const Copyright = props => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Toktik App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};

// TODO remove, this demo shouldn't need to reset the theme.

const SignInSide = () => {
  // 初始化组件的状态，默认为空数组
  const [data, setData] = React.useState([]);

  // 使用 useEffect 在组件加载时获取数据
  React.useEffect(() => {
    const getData = async () => {
      try {
        const jsonData = await getUsers();
        const dataArray = Array.isArray(jsonData) ? jsonData : [];
        const mappedRows = dataArray.map((item, index) => ({
          id: item.userID,
          ...item,
        }));

        setData(mappedRows); // 确保为数组类型
      } catch (error) {
        console.error('Error fetching data:', error);
        setData([]); // 在出错时设置一个空数组
      }
    };

    getData();
  }, []);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (email, password) => {
    const user = data.find(
      user => user.email === email && user.password === password
    );
    if (user) {
      console.log('Login successful for:', user.username);
      return true;
    } else {
      console.error('Login failed: Incorrect email or password');
      return false;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData = {
      email: data.get('email'),
      password: data.get('password'),
    };
    console.log(userData);
    if (handleLogin(userData.email, userData.password)) {
      login(userData);
      navigate('/');
      window.alert('成功登录!');
    } else {
      window.alert('用户名/邮箱或密码错误，请重试!');
    }
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://source.unsplash.com/random?wallpapers)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: t =>
            t.palette.mode === 'light'
              ? t.palette.grey[100]
              : t.palette.grey[500],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
      >
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
            欢迎来到Toktik后台管理系统
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="邮箱地址/账户名/手机号"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="密码"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="记住我的账号"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              登录
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  忘记密码？
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {'还没有账号？在此注册'}
                </Link>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInSide;
