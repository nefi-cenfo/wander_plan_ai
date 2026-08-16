import { Box, Button, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import PlaceAutocomplete from './PlaceAutocomplete'
import { useForm } from '@inertiajs/react'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

export default function RecommendationsForm() {
  const { data, setData, post, processing, errors, setError, clearErrors } =
    useForm({
      trip: {
        start_date: '',
        end_date: '',
        location: '',
        latitude: 0,
        longitude: 0,
      },
    })
  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.Place | null>(null)
  const today = dayjs().startOf('day')
  const minimumEndDate = data.trip.start_date
    ? dayjs(data.trip.start_date).startOf('day')
    : today

  const datePickerSx = {
    flexGrow: 1,
  }

  const datePickerTextFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      backgroundColor: 'background.default',
    },
  }

  const validateForm = () => {
    let isValid = true

    clearErrors()

    if (selectedPlace?.displayName && selectedPlace.location) {
      setData('trip.location', selectedPlace.displayName)
      setData('trip.latitude', selectedPlace.location?.lat())
      setData('trip.longitude', selectedPlace.location?.lng())
    } else {
      setError('trip.location', ['Location is required.'])
      isValid = false
    }

    const startDate = dayjs(data.trip.start_date)
    const endDate = dayjs(data.trip.end_date)

    if (!data.trip.start_date.trim()) {
      setError('trip.start_date', ['Start date is required.'])
      isValid = false
    } else if (startDate.isBefore(today, 'day')) {
      setError('trip.start_date', ['Start date must be today or later.'])
      isValid = false
    }

    if (!data.trip.end_date) {
      setError('trip.end_date', ['End date is required.'])
      isValid = false
    } else if (endDate.isBefore(startDate, 'day')) {
      setError('trip.end_date', ['End date must be on or after start date.'])
      isValid = false
    }

    return isValid
  }

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()

    if (validateForm()) {
      post('/trips')
    }
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={(theme) => ({
        width: '100%',
        p: { xs: 2, md: 2.5 },
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 4,
        background:
          theme.palette.mode === 'dark'
            ? `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`
            : `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        boxShadow:
          theme.palette.mode === 'dark'
            ? '0 16px 42px rgba(0, 0, 0, 0.22)'
            : '0 16px 42px rgba(14, 165, 164, 0.1)',
      })}
    >
      <Stack spacing={2.5}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            Plan a new trip
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Select a destination and travel dates to generate personalized
            ideas.
          </Typography>
        </Box>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          sx={{ alignItems: { xs: 'stretch', md: 'flex-start' } }}
        >
          <PlaceAutocomplete
            onPlaceSelect={setSelectedPlace}
            error={!!errors['trip.location']}
            helperText={errors['trip.location']}
          />
          <DatePicker
            sx={datePickerSx}
            label="Start Date"
            value={data.trip.start_date ? dayjs(data.trip.start_date) : null}
            minDate={today}
            onChange={(date) =>
              setData('trip.start_date', date ? date.format('YYYY-MM-DD') : '')
            }
            slotProps={{
              textField: {
                error: !!errors['trip.start_date'],
                helperText: errors['trip.start_date'],
                sx: datePickerTextFieldSx,
              },
            }}
          />
          <DatePicker
            sx={datePickerSx}
            label="End Date"
            value={data.trip.end_date ? dayjs(data.trip.end_date) : null}
            minDate={minimumEndDate}
            onChange={(date) =>
              setData('trip.end_date', date ? date.format('YYYY-MM-DD') : '')
            }
            slotProps={{
              textField: {
                error: !!errors['trip.end_date'],
                helperText: errors['trip.end_date'],
                sx: datePickerTextFieldSx,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            startIcon={<AutoAwesomeIcon />}
            disabled={!selectedPlace}
            loading={processing}
            disableElevation
            sx={(theme) => ({
              minHeight: 56,
              px: 3,
              borderRadius: 2,
              whiteSpace: 'nowrap',
              fontWeight: 800,
              textTransform: 'none',
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              boxShadow: `0 12px 28px ${theme.palette.primary.main}30`,
              '&:hover': {
                boxShadow: `0 16px 34px ${theme.palette.primary.main}3D`,
              },
              '&.Mui-disabled': {
                background: theme.palette.action.disabledBackground,
                boxShadow: 'none',
              },
            })}
          >
            Start Planning
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}
