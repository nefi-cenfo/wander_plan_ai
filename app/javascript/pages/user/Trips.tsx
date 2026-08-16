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
  Stack,
  Typography,
} from '@mui/material'
import { ReactNode, useState } from 'react'
import emptyPlaceholderImg from '@/assets/undraw_blank-canvas_a6x5.svg'
import AddIcon from '@mui/icons-material/Add'
import TravelExploreIcon from '@mui/icons-material/TravelExplore'
import DeleteIcon from '@mui/icons-material/Delete'
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
          New Trip
        </Button>
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Manage your planned itineraries and bucket list destinations.
      </Typography>
      {trips.length > 0 && (
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
          <Card
            elevation={0}
            sx={(theme) => ({
              position: 'relative',
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              background:
                theme.palette.mode === 'dark'
                  ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
                  : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 18px 50px rgba(0, 0, 0, 0.24)'
                  : '0 18px 50px rgba(37, 99, 235, 0.1)',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -120,
                left: -80,
                width: 290,
                height: 290,
                borderRadius: '50%',
                background: `${theme.palette.secondary.main}1A`,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                right: -110,
                bottom: -130,
                width: 320,
                height: 320,
                borderRadius: '50%',
                background: `${theme.palette.primary.main}1F`,
              },
            })}
          >
            <CardContent
              sx={{
                position: 'relative',
                zIndex: 1,
                minHeight: { xs: 420, md: 560 },
                p: { xs: 3, sm: 4, md: 6 },
                '&:last-child': { pb: { xs: 3, sm: 4, md: 6 } },
              }}
            >
              <Stack
                spacing={3}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <Box
                  sx={(theme) => ({
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1.75,
                    py: 0.75,
                    borderRadius: 999,
                    color: 'secondary.main',
                    backgroundColor: `${theme.palette.secondary.main}14`,
                    border: `1px solid ${theme.palette.secondary.main}2E`,
                    fontSize: '0.8rem',
                    fontWeight: 800,
                  })}
                >
                  <TravelExploreIcon sx={{ fontSize: '1rem' }} />
                  Your travel board is ready
                </Box>

                <Box
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    placeItems: 'center',
                  }}
                >
                  <Box
                    sx={(theme) => ({
                      position: 'absolute',
                      width: { xs: 210, md: 280 },
                      height: { xs: 210, md: 280 },
                      borderRadius: '50%',
                      background: `radial-gradient(circle, ${theme.palette.secondary.main}24, ${theme.palette.primary.main}12 55%, transparent 70%)`,
                    })}
                  />
                  <Box
                    component="img"
                    src={emptyPlaceholderImg}
                    alt="Blank travel board illustration"
                    sx={{
                      position: 'relative',
                      width: '100%',
                      maxWidth: { xs: 260, md: 360 },
                    }}
                  />
                </Box>

                <Box sx={{ maxWidth: 560, textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                    No trips saved yet
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.8 }}
                  >
                    Start a new plan and WanderPlan will keep your itinerary
                    ideas organized here.
                  </Typography>
                </Box>

                <Button
                  LinkComponent={Link}
                  href="/trips/new"
                  variant="contained"
                  size="large"
                  startIcon={<TravelExploreIcon />}
                  disableElevation
                  sx={(theme) => ({
                    px: 3,
                    py: 1.25,
                    borderRadius: 2,
                    fontWeight: 800,
                    textTransform: 'none',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                    boxShadow: `0 12px 28px ${theme.palette.secondary.main}30`,
                    '&:hover': {
                      boxShadow: `0 16px 34px ${theme.palette.secondary.main}3D`,
                    },
                  })}
                >
                  Start Planning
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={() => handleDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        role="alertdialog"
        fullWidth
        maxWidth="xs"
        slotProps={{
          paper: {
            elevation: 0,
            sx: (theme) => ({
              borderRadius: 4,
              overflow: 'hidden',
              border: `1px solid ${theme.palette.divider}`,
              background:
                theme.palette.mode === 'dark'
                  ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
                  : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
              boxShadow:
                theme.palette.mode === 'dark'
                  ? '0 28px 80px rgba(0, 0, 0, 0.42)'
                  : '0 28px 80px rgba(239, 68, 68, 0.18)',
            }),
          },
        }}
      >
        <DialogTitle id="alert-dialog-title" sx={{ p: 3, pb: 1 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
            <Box
              sx={(theme) => ({
                display: 'grid',
                placeItems: 'center',
                width: 44,
                height: 44,
                borderRadius: 2.5,
                color: 'error.main',
                backgroundColor: `${theme.palette.error.main}14`,
                border: `1px solid ${theme.palette.error.main}2E`,
              })}
            >
              <DeleteIcon />
            </Box>
            <Box>
              <Typography
                variant="overline"
                sx={{ color: 'error.main', fontWeight: 800 }}
              >
                Permanent action
              </Typography>
              <Typography variant="h5" component="p" sx={{ fontWeight: 800 }}>
                Delete this trip?
              </Typography>
            </Box>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ px: 3, pb: 2 }}>
          <DialogContentText id="alert-dialog-description" component="div">
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ lineHeight: 1.8 }}
            >
              This will permanently remove your saved trip to
            </Typography>
            <Box
              sx={{
                mt: 1.5,
                px: 1.5,
                py: 1,
                borderRadius: 2,
                backgroundColor: 'background.default',
                color: 'text.primary',
                fontWeight: 800,
              }}
            >
              {tripToDelete?.destination.location}
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
              You can&apos;t undo this action.
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ gap: 1.5, p: 3, pt: 1 }}>
          <Button
            onClick={() => handleDialog(false)}
            autoFocus
            variant="outlined"
            sx={{ borderRadius: 2, fontWeight: 800, textTransform: 'none' }}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteTrip}
            variant="contained"
            color="error"
            startIcon={<DeleteIcon />}
            disableElevation
            sx={{ borderRadius: 2, fontWeight: 800, textTransform: 'none' }}
          >
            Delete trip
          </Button>
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
