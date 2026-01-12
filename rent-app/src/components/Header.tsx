import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function Header() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ flexGrow: 1, cursor: 'pointer' }}
          onClick={() => navigate('/dashboard')}
        >
          Equipment Rent
        </Typography>

        <Box display="flex" gap={2}>
          <Button color="inherit" onClick={() => navigate('/dashboard')}>
            Equipamentos
          </Button>

          <Button color="inherit" onClick={() => navigate('/reservations')}>
            Minhas Reservas
          </Button>

          <Button color="inherit" onClick={logout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
