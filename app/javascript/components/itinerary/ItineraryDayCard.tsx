import { PlanAI } from '@/types/plan-ai'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import WbTwilightOutlinedIcon from '@mui/icons-material/WbTwilightOutlined'
import { Box, Card, CardContent, Chip, Typography } from '@mui/material'
import ItineraryTimeBlock from './ItineraryTimeBlock'

export default function ItineraryDayCard({
  plannedDay,
  index,
}: {
  plannedDay: PlanAI
  index: number
}) {
  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background:
            'linear-gradient(90deg, rgba(14,165,164,0.12), rgba(37,99,235,0.08))',
        }}
      >
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 900 }}>
            {plannedDay.dayNumber}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            A balanced route for discovery, movement, and downtime.
          </Typography>
        </Box>
        <Chip
          label={`Day ${index + 1}`}
          sx={{
            color: 'primary.dark',
            fontWeight: 800,
            backgroundColor: 'rgba(14, 165, 164, 0.12)',
          }}
        />
      </Box>

      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <ItineraryTimeBlock
          label="Morning"
          time={plannedDay.morning}
          icon={<LightModeOutlinedIcon />}
        />
        <ItineraryTimeBlock
          label="Afternoon"
          time={plannedDay.afternoon}
          icon={<WbTwilightOutlinedIcon />}
        />
        <ItineraryTimeBlock
          label="Evening"
          time={plannedDay.evening}
          icon={<DarkModeOutlinedIcon />}
          isLast
        />
      </CardContent>
    </Card>
  )
}
