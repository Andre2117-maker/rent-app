import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Box,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface EquipmentProps {
  id: string;
  name: string;
  description?: string;
  status: 'Available' | 'Offline' | 'Maintenance' | 'Occupied';
  onReserve: () => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function EquipmentCard({
  id,
  name,
  description,
  status,
  onReserve,
  onEdit,
  onDelete,
}: EquipmentProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        position: 'relative',
        minWidth: 275,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
        <IconButton onClick={handleOpenMenu} aria-label="opções">
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <MenuItem
            onClick={() => {
              onEdit(id);
              handleCloseMenu();
            }}
          >
            <ListItemIcon>
              <EditIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Editar</ListItemText>
          </MenuItem>
          <MenuItem
            onClick={() => {
              onDelete(id);
              handleCloseMenu();
            }}
            sx={{ color: 'error.main' }}
          >
            <ListItemIcon>
              <DeleteIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Deletar</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" component="div" sx={{ pr: 4 }}>
          {name}
        </Typography>

        {description && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {description}
          </Typography>
        )}

        <Chip
          label={status}
          color={
            status === 'Available'
              ? 'success'
              : status === 'Occupied'
                ? 'warning'
                : 'default'
          }
          sx={{ mt: 2, mb: 2 }}
        />

        {/* MELHORIA: Botão "Reservar" agora fica SEMPRE ATIVO (disabled={false})
          para permitir agendamentos em outros horários, conforme feedback.
        */}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          onClick={onReserve}
          sx={{ mt: 'auto' }}
        >
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}
