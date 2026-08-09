import { Destination } from '@/types/destination'
import { Suggestion } from '@/types/suggestion'
import EastOutlinedIcon from '@mui/icons-material/EastOutlined'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import { Link } from '@inertiajs/react'
import { Box, Button, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { useState } from 'react'

export default function SuggestionCard({
  suggestion,
  destination,
  index,
}: {
  suggestion: Suggestion
  destination: Destination
  index: number
}) {
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const canExpandDescription = suggestion.description.length > 180

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'primary.main',
          boxShadow: '0 18px 40px rgba(15, 118, 110, 0.14)',
        },
      }}
    >
      <Box
        sx={{
          height: 6,
          background: 'linear-gradient(90deg, #0EA5A4 0%, #2563EB 100%)',
        }}
      />
      <CardContent
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 3,
        }}
      >
        <Stack direction="row" sx={{ justifyContent: 'space-between', gap: 2 }}>
          <Chip
            label={`#${String(index + 1).padStart(2, '0')}`}
            size="small"
            sx={{
              color: 'primary.dark',
              fontWeight: 800,
              backgroundColor: 'rgba(14, 165, 164, 0.1)',
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <LocationOnOutlinedIcon sx={{ fontSize: 18 }} />
            {suggestion.city}, {suggestion.country}
          </Typography>
        </Stack>

        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
            {suggestion.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: descriptionExpanded ? 'block' : '-webkit-box',
              overflow: descriptionExpanded ? 'visible' : 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: descriptionExpanded ? 'unset' : 3,
            }}
          >
            {suggestion.description}
          </Typography>
          {canExpandDescription && (
            <Button
              size="small"
              variant="text"
              onClick={() =>
                setDescriptionExpanded((currentValue) => !currentValue)
              }
              sx={{ alignSelf: 'flex-start', mt: 0.5, px: 0, fontWeight: 700 }}
            >
              {descriptionExpanded ? 'Show less' : 'See more'}
            </Button>
          )}
        </Box>

        <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'rgba(37, 99, 235, 0.06)',
            }}
          >
            <Typography
              variant="caption"
              color="secondary.main"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontWeight: 800, mb: 0.5 }}
            >
              <LightbulbOutlinedIcon sx={{ fontSize: 17 }} />
              Local tip
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {suggestion.tips}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              backgroundColor: 'rgba(14, 165, 164, 0.07)',
            }}
          >
            <Typography
              variant="caption"
              color="primary.dark"
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontWeight: 800, mb: 0.5 }}
            >
              <StickyNote2OutlinedIcon sx={{ fontSize: 17 }} />
              Good to know
            </Typography>
            <Typography
              variant="body2"
              sx={{
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}
            >
              {suggestion.specialNotes}
            </Typography>
          </Box>
        </Stack>

        <Button
          variant="contained"
          endIcon={<EastOutlinedIcon />}
          sx={{ width: '100%', justifyContent: 'space-between', mt: 'auto' }}
          LinkComponent={Link}
          href={`/destinations/${destination?.id}/places/${encodeURIComponent(suggestion.name)}`}
        >
          Explore Place
        </Button>
      </CardContent>
    </Card>
  )
}
