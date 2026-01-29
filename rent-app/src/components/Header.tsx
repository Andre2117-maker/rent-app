import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : {};
  const initial = user.name ? user.name[0].toUpperCase() : 'U';

  function handleLogout(): void {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2', boxShadow: 2 }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo / Título */}
        <Typography
          variant="h6"
          component={Link}
          to="/dashboard"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            fontWeight: '800',
            letterSpacing: 1,
          }}
        >
          SISTEMA DE RESERVAS
        </Typography>

        {/* Menu de Navegação Centro/Direita */}
        <Box display="flex" alignItems="center" gap={1}>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            DASHBOARD
          </Button>

          <Button color="inherit" onClick={() => navigate('/reservations')}>
            RESERVAS
          </Button>

          <Button color="inherit" onClick={() => navigate('/commands')}>
            COMANDOS
          </Button>

          {/* Botão NOVO - Destaque em Verde */}
          <Button
            variant="contained"
            color="success"
            size="small"
            onClick={() => navigate('/new-equipment')}
            sx={{
              fontWeight: 'bold',
              ml: 2,
              borderRadius: '8px',
              boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
            }}
          >
            + NOVO
          </Button>

          {/* Divisória visual leve */}
          <Box
            sx={{
              width: '1px',
              height: '24px',
              bgcolor: 'rgba(255,255,255,0.3)',
              mx: 1,
            }}
          />

          {/* Botão de Perfil */}
          <Button
            onClick={() => navigate('/profile')}
            sx={{
              color: 'white',
              textTransform: 'none',
              borderRadius: '20px',
              px: 1.5,
              '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
            }}
          >
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: '0.9rem',
                bgcolor: 'white',
                color: '#1976d2',
                mr: 1,
                fontWeight: 'bold',
              }}
            >
              {initial}
            </Avatar>
            PERFIL
          </Button>

          {/* Sair */}
          <Button
            onClick={handleLogout}
            sx={{
              color: 'white',
              fontSize: '0.8rem',
              opacity: 0.8,
              '&:hover': { opacity: 1, color: '#ffcdd2' },
            }}
          >
            SAIR
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
