import { LineChart } from '@mui/x-charts/LineChart'
import { Box, Card, CardContent, Chip, Stack, Typography } from '@mui/material'
import { alpha, useTheme } from '@mui/material/styles'

export type UserGrowthChartData = {
  labels: string[]
  total_users: number[]
  premium_users: number[]
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center' }}>
      <Box
        sx={{
          bgcolor: color,
          borderRadius: '50%',
          height: 8,
          width: 8,
        }}
      />
      <Typography
        variant="body2"
        sx={{ color: 'text.primary', fontWeight: 700 }}
      >
        {label}
      </Typography>
    </Stack>
  )
}

export default function UserGrowthChart({
  data,
}: {
  data: UserGrowthChartData
}) {
  const theme = useTheme()
  const totalUsersColor = theme.palette.primary.main
  const premiumUsersColor = theme.palette.warning.main

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        boxShadow: `0 18px 42px ${alpha(theme.palette.secondary.main, 0.08)}`,
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, md: 3 }, '&:last-child': { pb: 3 } }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1.5}
          sx={{
            alignItems: { xs: 'flex-start', sm: 'center' },
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 950,
                letterSpacing: '-0.05em',
                lineHeight: 1.05,
              }}
            >
              User Acquisition & Growth
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: 'text.secondary', fontWeight: 600, mt: 0.5 }}
            >
              Monthly overview of free vs premium subscriptions.
            </Typography>
          </Box>

          <Chip
            label="LIVE"
            size="small"
            variant="outlined"
            sx={{
              borderColor: 'divider',
              color: 'text.primary',
              fontWeight: 900,
            }}
          />
        </Stack>

        <LineChart
          height={360}
          skipAnimation
          grid={{ horizontal: true }}
          margin={{ top: 20, right: 24, bottom: 40, left: 56 }}
          xAxis={[
            {
              data: data.labels,
              scaleType: 'point',
              tickLabelStyle: {
                fill: theme.palette.text.primary,
                fontSize: 12,
                fontWeight: 700,
              },
            },
          ]}
          yAxis={[
            {
              width: 54,
              tickLabelStyle: {
                fill: theme.palette.text.primary,
                fontSize: 12,
                fontWeight: 700,
              },
            },
          ]}
          series={[
            {
              data: data.total_users,
              color: totalUsersColor,
              curve: 'monotoneX',
              showMark: false,
            },
            {
              data: data.premium_users,
              color: premiumUsersColor,
              curve: 'monotoneX',
              showMark: false,
            },
          ]}
          sx={{
            '& .MuiChartsGrid-line': {
              stroke: alpha(theme.palette.text.secondary, 0.22),
              strokeDasharray: '6 6',
            },
            '& .MuiLineElement-root': {
              strokeWidth: 2.5,
            },
            '& .MuiChartsAxis-line': {
              stroke: 'transparent',
            },
            '& .MuiChartsAxis-tick': {
              stroke: 'transparent',
            },
          }}
        />

        <Stack
          direction="row"
          spacing={3}
          sx={{ justifyContent: 'center', mt: 1 }}
        >
          <LegendItem color={totalUsersColor} label="Total Users" />
          <LegendItem color={premiumUsersColor} label="Premium Users" />
        </Stack>
      </CardContent>
    </Card>
  )
}
