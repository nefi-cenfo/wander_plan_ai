import { PlanAI } from '@/types/plan-ai'
import { Stack } from '@mui/material'
import ItineraryDayCard from './ItineraryDayCard'

export default function ItineraryTimeline({
  plannedDays,
}: {
  plannedDays: PlanAI[]
}) {
  return (
    <Stack spacing={3}>
      {plannedDays.map((plannedDay, index) => (
        <ItineraryDayCard
          key={`${plannedDay.dayNumber}-${index}`}
          plannedDay={plannedDay}
          index={index}
        />
      ))}
    </Stack>
  )
}
