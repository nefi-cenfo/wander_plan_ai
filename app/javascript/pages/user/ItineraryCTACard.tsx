import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import RouteOutlinedIcon from '@mui/icons-material/RouteOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { Trip } from '@/types/trip'
import { Link } from '@inertiajs/react'

export default function ItineraryCTACard({
  trip,
  isPremium,
}: {
  trip: Trip
  isPremium: boolean
}) {
  return (
    <>
      {isPremium ? (
        <Card
          elevation={0}
          sx={{
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'divider',
            background:
              'linear-gradient(135deg, rgba(14,165,164,0.12), rgba(37,99,235,0.08))',
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mb: 2, alignItems: 'center' }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2,
                  color: 'primary.contrastText',
                  backgroundColor: 'primary.main',
                }}
              >
                <RouteOutlinedIcon />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Itinerary
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Turn suggestions into a day-by-day route.
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              fullWidth
              endIcon={<ExploreOutlinedIcon />}
              LinkComponent={Link}
              href={`/trips/${trip.id}/itinerary`}
              sx={{ justifyContent: 'space-between' }}
            >
              Open Itinerary
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card
          elevation={0}
          sx={{
            overflow: 'hidden',
            border: '1px solid',
            borderColor: 'primary.main',
            background:
              'linear-gradient(135deg, rgba(14,165,164,0.14), rgba(37,99,235,0.1))',
          }}
        >
          <CardContent>
            <Stack
              direction="row"
              spacing={1.5}
              sx={{ mb: 2, alignItems: 'center' }}
            >
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 2,
                  color: 'primary.contrastText',
                  background: 'linear-gradient(135deg, #0EA5A4, #2563EB)',
                }}
              >
                <WorkspacePremiumOutlinedIcon />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  Unlock AI itineraries
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Upgrade to Premium to generate day-by-day routes and Pocket
                  Mode PDFs.
                </Typography>
              </Box>
            </Stack>
            <Button
              variant="contained"
              fullWidth
              endIcon={<ExploreOutlinedIcon />}
              LinkComponent={Link}
              href="/checkout"
              sx={{ justifyContent: 'space-between' }}
            >
              Upgrade to Premium
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  )
}
