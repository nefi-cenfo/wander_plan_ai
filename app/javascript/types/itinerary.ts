import { PlanAI } from './plan-ai'
import { Suggestion } from './suggestion'

export interface Itinerary {
  id: number
  suggestions: Suggestion[]
  plannedDays: PlanAI[] | null
}
