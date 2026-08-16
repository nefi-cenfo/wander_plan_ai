import { Trip } from '@/types/trip'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
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
      const firstPhoto = location_photos?.[0]

      if (!firstPhoto?.photo?.original_size_url) return

      setPlacePhoto({
        photoSource: firstPhoto.photo.original_size_url,
        caption: firstPhoto.caption || suggestion.name,
      })
    }
  }

  useEffect(() => {
    getTripadvisorDetails()
  }, [])

  return (
    <Card
      elevation={0}
      sx={(theme) => ({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        border: `1px solid ${theme.palette.divider}`,
        backgroundColor: 'background.paper',
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 16px 42px rgba(0, 0, 0, 0.22)'
            : '0 16px 42px rgba(14, 165, 164, 0.08)',
        transition: theme.transitions.create(['box-shadow', 'transform'], {
          duration: theme.transitions.duration.short,
        }),
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 22px 54px rgba(0, 0, 0, 0.32)'
              : '0 22px 54px rgba(37, 99, 235, 0.14)',
        },
        '&:hover .trip-card-media': {
          transform: 'scale(1.04)',
        },
      })}
    >
      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
        <CardMedia
          className="trip-card-media"
          sx={{
            height: 230,
            backgroundColor: 'background.default',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
            transition: (theme) =>
              theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard,
              }),
          }}
          image={placePhoto?.photoSource}
          title={placePhoto?.caption}
        />
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.08) 20%, rgba(0,0,0,0.35) 58%, rgba(0,0,0,0.82) 100%)',
            borderTopLeftRadius: 'inherit',
            borderTopRightRadius: 'inherit',
          }}
        />
        <Box
          sx={(theme) => ({
            position: 'absolute',
            top: 14,
            right: 14,
            px: 1.5,
            py: 0.75,
            borderRadius: 999,
            backgroundColor: 'background.paper',
            color: 'primary.main',
            fontSize: '0.875rem',
            fontWeight: 700,
            lineHeight: 1,
            boxShadow: `0 10px 24px ${theme.palette.primary.main}24`,
          })}
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
            maxWidth: 'calc(100% - 32px)',
            color: 'common.white',
            fontWeight: 700,
            textShadow: '0 1px 2px rgba(0,0,0,0.45)',
          }}
        >
          <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
          <Box
            component="span"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {suggestion?.name ?? trip.destination.location}
          </Box>
        </Typography>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 2.5, '&:last-child': { pb: 2.5 } }}>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{ fontWeight: 800, lineHeight: 1.2 }}
        >
          {trip.destination.location}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: 'fit-content',
            px: 1.25,
            py: 0.75,
            borderRadius: 2,
            backgroundColor: 'background.default',
            color: 'text.secondary',
          }}
        >
          <CalendarTodayIcon sx={{ fontSize: 17 }} />
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {`${startDateFormatted} - ${endDateFormatted}`}
          </Typography>
        </Stack>
      </CardContent>
      <CardActions sx={{ gap: 1.25, p: 2.5, pt: 0 }}>
        <Button
          LinkComponent={Link}
          href={`/trips/show/${trip.id}`}
          variant="contained"
          startIcon={<VisibilityOutlinedIcon />}
          disableElevation
          sx={(theme) => ({
            flexGrow: 1,
            borderRadius: 2,
            fontWeight: 800,
            textTransform: 'none',
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            boxShadow: `0 10px 24px ${theme.palette.primary.main}24`,
            '&:hover': {
              boxShadow: `0 14px 30px ${theme.palette.primary.main}30`,
            },
          })}
        >
          View Trip
        </Button>
        <Button
          variant="text"
          startIcon={<DeleteIcon />}
          sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
          color="error"
          onClick={() => onDelete(trip)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}
