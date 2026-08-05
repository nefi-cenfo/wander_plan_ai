interface PlanTime {
  budgetEstimate: number
  place: string
  activity: {
    description: string
    specialNote: string
  }
}

export interface PlanAI {
  dayNumber: string
  morning: PlanTime
  afternoon: PlanTime
  evening: PlanTime
}
