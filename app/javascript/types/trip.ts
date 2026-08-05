import { Destination } from './destination'
import { Itinerary } from './itinerary'

export interface Trip {
  id: number
  startDate: string
  endDate: string
  numberDays: number
  itinerary: Itinerary | null
  destination: Destination
}
