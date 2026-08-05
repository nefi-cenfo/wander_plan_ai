/// <reference types="google.maps" />

export interface PlaceAutocompleteProps {
  onPlaceSelect: (place: google.maps.places.Place | null) => void
}
