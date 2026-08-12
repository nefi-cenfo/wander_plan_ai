import { PlanTime } from '@/types/plan-ai'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import { ReactNode } from 'react'

const periodColors = {
  Morning: '#0EA5A4',
  Afternoon: '#2563EB',
  Evening: '#0F766E',
}

export default function ItineraryTimeBlock({
  label,
  time,
  icon,
  isLast = false,
}: {
  label: 'Morning' | 'Afternoon' | 'Evening'
  time: PlanTime
  icon: ReactNode
  isLast?: boolean
}) {
  const markerColor = periodColors[label]
  const budget = Number(time.budgetEstimate || 0)

  return (
    <Box sx={{ position: 'relative', display: 'flex', gap: 2.5 }}>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            display: 'grid',
            placeItems: 'center',
            borderRadius: '50%',
            color: 'common.white',
            backgroundColor: markerColor,
            boxShadow: `0 10px 24px ${markerColor}33`,
            zIndex: 1,
          }}
        >
          {icon}
        </Box>
        {!isLast && (
          <Box
            sx={{
              width: 2,
              flexGrow: 1,
              minHeight: 32,
              my: 1,
              background:
                'linear-gradient(180deg, rgba(14,165,164,0.45), rgba(37,99,235,0.16))',
            }}
          />
        )}
      </Box>

      <Paper
        elevation={0}
        sx={{
          flexGrow: 1,
          p: 2.5,
          mb: isLast ? 0 : 2,
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ justifyContent: 'space-between', gap: 1.5, mb: 1.5 }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
            <AccessTimeOutlinedIcon sx={{ color: markerColor, fontSize: 20 }} />
            <Typography
              variant="overline"
              sx={{ color: markerColor, fontWeight: 900 }}
            >
              {label}
            </Typography>
          </Stack>
          <Chip
            icon={<AttachMoneyOutlinedIcon />}
            label={budget === 0 ? 'Free' : `$${budget.toLocaleString()}`}
            size="small"
            sx={{
              alignSelf: { xs: 'flex-start', sm: 'center' },
              color: 'secondary.main',
              fontWeight: 800,
              backgroundColor: 'rgba(37, 99, 235, 0.08)',
              '& .MuiChip-icon': { color: 'secondary.main' },
            }}
          />
        </Stack>

        <Typography
          variant="h6"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            fontWeight: 800,
            mb: 1,
          }}
        >
          <PlaceOutlinedIcon color="primary" fontSize="small" />
          {time.place}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ lineHeight: 1.7 }}
        >
          {time.activity.description}
        </Typography>

        {time.activity.specialNote && (
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              mt: 2,
              p: 1.5,
              borderRadius: 2,
              color: 'primary.dark',
              backgroundColor: 'rgba(14, 165, 164, 0.08)',
            }}
          >
            <StickyNote2OutlinedIcon sx={{ fontSize: 19, mt: 0.2 }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              {time.activity.specialNote}
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  )
}
