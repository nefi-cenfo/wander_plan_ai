import UserLayout from '@/components/shared/UserLayout'
import { Trip } from '@/types/trip'
import { menuItems } from '@/utils/user-navigation-items'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from '@mui/material'
import { ReactNode } from 'react'
import emptyPlaceholderImg from '@/assets/undraw_blank-canvas_a6x5.svg'
import AddIcon from '@mui/icons-material/Add'
import { Link } from '@inertiajs/react'
import TripCard from '@/components/trips/TripCard'

function Trips({ trips }: { trips: Trip[] }) {
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
            <Typography
              sx={{
                width: '30px',
                height: '22px',
                backgroundColor: '#F3F4F6FF',
                textAlign: 'center',
                fontWeight: 700,
                borderRadius: '15px',
              }}
            >
              {trips.length}
            </Typography>
          </Typography>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            {trips.map((trip, index) => (
              <Grid key={index} size={4}>
                <TripCard trip={trip} />
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
    </>
  )
}

Trips.layout = (page: ReactNode) => (
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default Trips
