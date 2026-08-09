import { Box, Button } from '@mui/material'
import { useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs'
import PlaceAutocomplete from './PlaceAutocomplete'
import { useForm } from '@inertiajs/react'
import AddIcon from '@mui/icons-material/Add'

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

  const validateForm = () => {
    let isValid = true

    clearErrors()

    if (selectedPlace?.displayName && selectedPlace.location) {
      setData('trip.location', selectedPlace.displayName)
      setData('trip.latitude', selectedPlace.location?.lat())
      setData('trip.longitude', selectedPlace.location?.lng())
    } else {
      setError('trip.location', ['Location is required.'])
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
      className="shadow-sm"
      sx={{
        display: 'flex',
        width: '100%',
        columnGap: '1rem',
        padding: '17px',
        backgroundColor: 'background.paper',
        border: '1px solid  #DEE1E6FF',
        borderRadius: '16px',
      }}
    >
      <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
      <DatePicker
        sx={{ flexGrow: 1 }}
        label="Start Date"
        value={dayjs(data.trip.start_date)}
        minDate={today}
        onChange={(date) =>
          setData('trip.start_date', date!.format('YYYY-MM-DD'))
        }
        slotProps={{
          textField: {
            error: !!errors['trip.start_date'],
            helperText: errors['trip.start_date'],
          },
        }}
      />
      <DatePicker
        sx={{ flexGrow: 1 }}
        label="End Date"
        value={dayjs(data.trip.end_date)}
        minDate={minimumEndDate}
        onChange={(date) =>
          setData('trip.end_date', date!.format('YYYY-MM-DD'))
        }
        slotProps={{
          textField: {
            error: !!errors['trip.end_date'],
            helperText: errors['trip.end_date'],
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        startIcon={<AddIcon />}
        disabled={!selectedPlace || processing}
      >
        Trip
      </Button>
    </Box>
  )
}
