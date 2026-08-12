import { Box } from '@mui/material'
import { AdvancedMarker, Map } from '@vis.gl/react-google-maps'

export default function PlaceMap({
  latitude,
  longitude,
}: {
  latitude: number
  longitude: number
}) {
  const position = { lat: latitude, lng: longitude }

  return (
    <Box sx={{ height: 360, width: '100%' }}>
      <Map
        mapId={'bf51a910020fa25a'}
        defaultZoom={15}
        defaultCenter={position}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={position} />
      </Map>
    </Box>
  )
}
