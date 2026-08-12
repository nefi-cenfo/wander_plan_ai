import { Trip } from '@/types/trip'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import dayjs from 'dayjs'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import DeleteIcon from '@mui/icons-material/Delete'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import { Link } from '@inertiajs/react'
import { useEffect, useState } from 'react'
import { GalleryPhoto } from '@/types/gallery'

export default function TripCard({
  trip,
  onDelete,
}: {
  trip: Trip
  onDelete: (trip: Trip) => void
}) {
  const startDateFormatted = dayjs(trip.startDate).format('MMM DD')
  const endDateFormatted = dayjs(trip.endDate).format('MMM DD, YYYY')
  const suggestion = trip.itinerary?.suggestions[0]
  const [placePhoto, setPlacePhoto] = useState<GalleryPhoto>({
    photoSource: 'https://placehold.net/default.svg',
    caption: 'place attraction',
  })

  const getTripadvisorDetails = async () => {
    if (suggestion) {
      const params = new URLSearchParams({
        city: suggestion?.city,
      })
      const url = `/destinations/${trip.destination.id}/enriched-data/${encodeURIComponent(suggestion.name)}?${params}`

      const response = await fetch(url)
      const enrichedData = await response.json()
      const { location_photos } = enrichedData

      setPlacePhoto({
        photoSource: location_photos[0].photo.original_size_url,
        caption: location_photos[0].caption,
      })
    }
  }

  useEffect(() => {
    getTripadvisorDetails()
  }, [])

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          sx={{
            height: 230,
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
          image={placePhoto?.photoSource}
          title={placePhoto?.caption}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.1) 35%, rgba(0,0,0,0.72) 100%)',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 14,
            right: 14,
            px: 1.5,
            py: 0.5,
            borderRadius: 999,
            backgroundColor: 'background.paper',
            color: 'text.primary',
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {dayjs(trip.startDate).format('MMM')}
        </Box>
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            left: 16,
            bottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            color: 'common.white',
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.45)',
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          {suggestion?.name ?? trip.destination.location}
        </Typography>
      </Box>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 700 }}
        >
          {trip.destination.location}
        </Typography>
        <Typography variant="body2">
          <CalendarTodayIcon sx={{ mr: 1 }} />
          {`${startDateFormatted} - ${endDateFormatted}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          LinkComponent={Link}
          href={`/trips/show/${trip.id}`}
          variant="outlined"
          startIcon={<VisibilityOutlinedIcon />}
          sx={{ flexGrow: 1 }}
        >
          View Trip
        </Button>
        <Button
          variant="text"
          startIcon={<DeleteIcon />}
          sx={{ flexGrow: 1 }}
          color="error"
          onClick={() => onDelete(trip)}
        >
          Delete Adventure
        </Button>
      </CardActions>
    </Card>
  )
}
