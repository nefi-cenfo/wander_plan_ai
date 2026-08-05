import { Suggestion } from '@/types/suggestion'
import { Box, Button, Card, CardContent, Grid, Typography } from '@mui/material'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Destination } from '@/types/destination'
import { Link } from '@inertiajs/react'

export default function SuggestionList({
  suggestions,
  destination,
}: {
  suggestions: Suggestion[]
  destination: Destination
}) {
  return (
    <Box>
      <Box
        component="h5"
        sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}
      >
        <Typography sx={{ fontSize: '1.5rem', fontWeight: 700 }}>
          Discovery Results
        </Typography>
        <Typography variant="subtitle1">
          <InfoOutlinedIcon sx={{ mr: 1 }} />
          Showing {suggestions.length} tailored results
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {suggestions.map((suggestion) => (
          <Grid size={4} key={`${suggestion.name}-${suggestion.city}`}>
            <Card>
              <CardContent>
                <Typography variant="h6">{suggestion.name}</Typography>
                <Typography color="text.secondary">
                  <LocationOnOutlinedIcon />
                  {suggestion.city}, {suggestion.country}
                </Typography>
                <Typography sx={{ my: 1 }}>{suggestion.description}</Typography>
                <Button
                  variant="contained"
                  endIcon={<EastOutlinedIcon />}
                  sx={{ width: '100%', justifyContent: 'space-between' }}
                  LinkComponent={Link}
                  href={`/destinations/${destination?.id}/places/${encodeURIComponent(suggestion.name)}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
