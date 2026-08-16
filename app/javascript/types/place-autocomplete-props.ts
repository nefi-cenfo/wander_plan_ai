/// <reference types="google.maps" />

export interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.Place | null) => void
  error?: boolean
  helperText?: string | string[]
}
