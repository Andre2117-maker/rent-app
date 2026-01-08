import { Card, CardContent, Typography, Button, Chip } from '@mui/material';

interface Props {
  name: string;
  description?: string;
  status: 'Available' | 'Offline' | 'Maintenance' | 'Occupied';
  onReserve?: () => void;
}

export function EquipmentCard({ name, description, status, onReserve }: Props) {
  const isAvailable = status === 'Available';

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{name}</Typography>

        {description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}

        <Chip
          label={status}
          color={isAvailable ? 'success' : 'default'}
          sx={{ mt: 1, mb: 2 }}
        />

        <Button
          variant="contained"
          fullWidth
          disabled={!isAvailable}
          onClick={onReserve}
        >
          Reservar
        </Button>
      </CardContent>
    </Card>
  );
}
