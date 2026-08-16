import { PlaceAutocompleteProps } from '@/types/place-autocomplete-props'
import { Box, FormHelperText } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { useMapsLibrary } from '@vis.gl/react-google-maps'
import { useEffect, useRef } from 'react'

export default function PlaceAutocomplete({
  error = false,
  helperText,
  onPlaceSelect,
}: PlaceAutocompleteProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const places = useMapsLibrary('places')

  useEffect(() => {
    if (!places || !containerRef.current) return

    const autocomplete = new places.PlaceAutocompleteElement({
      placeholder: 'Search for a place',
    })

    const handleSelect: EventListener = async (event) => {
      const selectEvent = event as google.maps.places.PlacePredictionSelectEvent
      const place = selectEvent.placePrediction.toPlace()

      await place.fetchFields({
        fields: ['id', 'displayName', 'formattedAddress', 'location'],
      })
      onPlaceSelect(place)
    }

    autocomplete.addEventListener('gmp-select', handleSelect)
    containerRef.current.replaceChildren(autocomplete)

    return () => {
      autocomplete.removeEventListener('gmp-select', handleSelect)
      autocomplete.remove()
    }
  }, [onPlaceSelect, places])

  return (
    <Box sx={{ flexGrow: 2, minWidth: 0 }}>
      <Box
        ref={containerRef}
        sx={(theme) => ({
          '& gmp-place-autocomplete': {
            width: '100%',
            minHeight: 56,
            boxSizing: 'border-box',
            colorScheme: theme.palette.mode,
            backgroundColor: theme.palette.background.default,
            border: `1px solid ${error ? theme.palette.error.main : theme.palette.divider}`,
            borderRadius: theme.spacing(2),
            color: theme.palette.text.primary,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.body1.fontSize,
            '--gmp-mat-color-primary': theme.palette.primary.main,
            '--gmp-mat-color-surface': theme.palette.background.paper,
            '--gmp-mat-color-on-surface': theme.palette.text.primary,
            '--gmp-mat-color-on-surface-variant': theme.palette.text.secondary,
            '--gmp-mat-color-outline-decorative': error
              ? theme.palette.error.main
              : theme.palette.divider,
            '--gmp-mat-font-family': theme.typography.fontFamily,
          },
          '& gmp-place-autocomplete:hover': {
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.text.primary,
          },
          '& gmp-place-autocomplete:focus-within': {
            borderColor: error
              ? theme.palette.error.main
              : theme.palette.primary.main,
            boxShadow: `0 0 0 1px ${error ? theme.palette.error.main : theme.palette.primary.main}`,
          },
          '& gmp-place-autocomplete::part(focus-ring)': {
            border: 0,
            outline: 0,
          },
          '& gmp-place-autocomplete::part(input)': {
            color: theme.palette.text.primary,
            caretColor: theme.palette.primary.main,
          },
          '& gmp-place-autocomplete::part(prediction-list)': {
            backgroundColor: theme.palette.background.paper,
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: theme.spacing(2),
            boxShadow: theme.shadows[8],
            color: theme.palette.text.primary,
          },
          '& gmp-place-autocomplete::part(prediction-item)': {
            color: theme.palette.text.secondary,
          },
          '& gmp-place-autocomplete::part(prediction-item-main-text)': {
            color: theme.palette.text.primary,
            fontWeight: theme.typography.fontWeightMedium,
          },
          '& gmp-place-autocomplete::part(prediction-item-secondary-text)': {
            color: theme.palette.text.secondary,
          },
          '& gmp-place-autocomplete::part(prediction-item-selected)': {
            backgroundColor: alpha(theme.palette.primary.main, 0.12),
            color: theme.palette.primary.main,
          },
          '& gmp-place-autocomplete::part(prediction-item-match)': {
            color: theme.palette.primary.main,
            fontWeight: theme.typography.fontWeightBold,
          },
        })}
      />
      {helperText && (
        <FormHelperText error={error} sx={{ mx: 1.75 }}>
          {helperText}
        </FormHelperText>
      )}
    </Box>
  )
}
