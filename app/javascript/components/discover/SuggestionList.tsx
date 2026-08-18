import { Suggestion } from '@/types/suggestion'
import { Box, Chip, Grid, Stack, Typography } from '@mui/material'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Destination } from '@/types/destination'
import SuggestionCard from './SuggestionCard'

export default function SuggestionList({
  suggestions,
  destination,
  tripId,
}: {
  suggestions: Suggestion[]
  destination: Destination
  tripId?: number
}) {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          mb: 3,
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
            Discovery Results
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Curated places matched to your destination, timing, and travel
            context.
          </Typography>
        </Box>
        <Chip
          icon={<InfoOutlinedIcon />}
          label={`${suggestions.length} tailored results`}
          sx={{
            color: 'primary.dark',
            fontWeight: 700,
            backgroundColor: 'rgba(14, 165, 164, 0.1)',
            '& .MuiChip-icon': { color: 'primary.main' },
          }}
        />
      </Box>
      <Grid container spacing={3}>
        {suggestions.map((suggestion, index) => (
          <Grid
            size={{ xs: 12, sm: 6, lg: 4 }}
            key={`${suggestion.name}-${suggestion.city}`}
          >
            <Stack sx={{ height: '100%' }}>
              <SuggestionCard
                suggestion={suggestion}
                destination={destination}
                index={index}
                tripId={tripId}
              />
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
