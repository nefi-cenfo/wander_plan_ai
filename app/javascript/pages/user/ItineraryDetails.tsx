import ItineraryTimeline from '@/components/itinerary/ItineraryTimeline'
import UserLayout from '@/components/shared/UserLayout'
import { Trip } from '@/types/trip'
import { menuItems } from '@/utils/user-navigation-items'
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined'
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined'
import {
  Alert,
  Box,
  Button,
  Chip,
  Paper,
  Stack,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import { ReactElement, useState } from 'react'

function ItineraryDetails({ trip }: { trip: Trip }) {
  const [downloadingPdf, setDownloadingPdf] = useState(false)
  const plannedDays = Array.isArray(trip.itinerary?.plannedDays)
    ? trip.itinerary.plannedDays
    : []

  const downloadPdf = async () => {
    setDownloadingPdf(true)

    try {
      const response = await fetch(`/trips/${trip.id}/itineraries/download_pdf`)

      if (!response.ok) {
        throw new Error('PDF download failed')
      }

      const pdfBlob = await response.blob()
      const downloadUrl = window.URL.createObjectURL(pdfBlob)
      const downloadLink = document.createElement('a')

      downloadLink.href = downloadUrl
      downloadLink.download = `WanderPlan_${trip.destination.location}_Itinerary.pdf`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      downloadLink.remove()
      window.URL.revokeObjectURL(downloadUrl)
    } finally {
      setDownloadingPdf(false)
    }
  }

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          p: { xs: 3, md: 5 },
          mb: 4,
          color: 'primary.contrastText',
          background:
            'linear-gradient(135deg, #0EA5A4 0%, #0F766E 48%, #2563EB 100%)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -60,
            width: 260,
            height: 260,
            borderRadius: '50%',
            backgroundColor: 'rgba(255,255,255,0.13)',
          }}
        />
        <Box sx={{ position: 'relative', maxWidth: 800 }}>
          <Chip
            icon={<ExploreOutlinedIcon />}
            label="AI day-by-day route"
            sx={{
              mb: 2,
              color: 'primary.contrastText',
              backgroundColor: 'rgba(255,255,255,0.18)',
              '& .MuiChip-icon': { color: 'primary.contrastText' },
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', md: '3.25rem' },
              fontWeight: 900,
              letterSpacing: '-0.04em',
              mb: 2,
            }}
          >
            Itinerary for {trip.destination.location}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: 'rgba(255,255,255,0.86)', maxWidth: 680, mb: 3 }}
          >
            Follow a structured daily plan with suggested places, activity
            notes, and estimated costs for each part of the day.
          </Typography>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <CalendarTodayOutlinedIcon fontSize="small" />
              <Typography variant="body1" sx={{ fontWeight: 800 }}>
                {dayjs(trip.startDate).format('MMM D')} -{' '}
                {dayjs(trip.endDate).format('MMM D, YYYY')}
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
              <LocationOnOutlinedIcon fontSize="small" />
              <Typography variant="body1" sx={{ fontWeight: 800 }}>
                {trip.numberDays} {trip.numberDays === 1 ? 'day' : 'days'}{' '}
                planned
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Button
          variant="contained"
          startIcon={<DownloadOutlinedIcon />}
          onClick={downloadPdf}
          disabled={downloadingPdf}
          sx={{
            position: { xs: 'relative', md: 'absolute' },
            top: { md: 32 },
            right: { md: 32 },
            mt: { xs: 3, md: 0 },
            color: 'primary.main',
            backgroundColor: 'common.white',
            fontWeight: 800,
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.9)',
            },
          }}
        >
          {downloadingPdf ? 'Preparing PDF...' : 'Download PDF'}
        </Button>
      </Paper>

      {plannedDays.length ? (
        <ItineraryTimeline plannedDays={plannedDays} />
      ) : (
        <Alert severity="info">
          Your itinerary is not available yet. Try opening this page again after
          the AI planner finishes generating your route.
        </Alert>
      )}
    </>
  )
}

ItineraryDetails.layout = (page: ReactElement<{ trip: Trip }>) => {
  const trip = page.props?.trip

  return (
    <UserLayout
      navigationItems={menuItems}
      breadcrumbs={[
        { label: 'Dashboard', href: '/' },
        { label: 'My Trips', href: '/trips' },
        { label: trip?.destination.location, href: `/trips/show/${trip?.id}` },
        { label: 'Itinerary' },
      ]}
    >
      {page}
    </UserLayout>
  )
}

export default ItineraryDetails
