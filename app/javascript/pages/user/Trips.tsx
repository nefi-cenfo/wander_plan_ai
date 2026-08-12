import UserLayout from '@/components/shared/UserLayout'
import { Trip } from '@/types/trip'
import { menuItems } from '@/utils/user-navigation-items'
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { ReactNode, useState } from 'react'
import emptyPlaceholderImg from '@/assets/undraw_blank-canvas_a6x5.svg'
import AddIcon from '@mui/icons-material/Add'
import { Link, router } from '@inertiajs/react'
import TripCard from '@/components/trips/TripCard'

function Trips({ trips }: { trips: Trip[] }) {
  const [openDialog, handleDialog] = useState<boolean>(false)
  const [tripToDelete, setTripToDelete] = useState<Trip | null>(null)

  const showDialog = (trip: Trip) => {
    setTripToDelete(trip)
    handleDialog(true)
  }

  const deleteTrip = () => {
    router.delete(`/trips/${tripToDelete?.id}`)
    handleDialog(false)
    setTripToDelete(null)
  }

  return (
    <>
      <Typography
        variant="h2"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Typography
          sx={{
            fontSize: '2rem',
            fontWeight: 'bold',
          }}
        >
          My Saved Trips
        </Typography>
        <Button
          LinkComponent={Link}
          href="/trips/new"
          variant="contained"
          startIcon={<AddIcon />}
          size="large"
        >
          Trip
        </Button>
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Manage your planned itineraries and bucket list destinations.
      </Typography>
      {trips.length && (
        <Box>
          <Typography
            variant="h3"
            sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}
          >
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                mr: 2,
              }}
            >
              Current Itineraries
            </Typography>
            <Chip label={trips.length} />
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {trips.map((trip, index) => (
              <Grid key={index} size={4}>
                <TripCard trip={trip} onDelete={showDialog} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {trips.length === 0 && (
        <Box>
          <Card>
            <CardContent className="h-[700px] flex flex-col justify-center items-center">
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                There are no trips scheduled. Set up a new trip for discovering
                new places.
              </Typography>
              <img
                src={emptyPlaceholderImg}
                alt="no-trips"
                className="h-[400px]"
              />
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={handleDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
      >
        <DialogTitle id="alert-dialog-title">
          My trip to {tripToDelete?.destination.location}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the trip to{' '}
            {tripToDelete?.destination.location}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialog(false)} autoFocus>
            Cancel
          </Button>
          <Button onClick={deleteTrip}>Delete</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

Trips.layout = (page: ReactNode) => (
  <UserLayout
    navigationItems={menuItems}
    breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'My Trips' }]}
  >
    {page}
  </UserLayout>
)

export default Trips
