export type FlashData = {
  notice?: string
  alert?: string
}

export type User = {
  id: number
  email: string
  role: string
  name: string
  lastname: string
  subscription: {
    premium: boolean
    status?: string
    plan_name: string
    ends_at?: string
    trial_ends_at?: string
  }
}

export type SharedProps = {
  auth: {
    user: User | null
  }
}
