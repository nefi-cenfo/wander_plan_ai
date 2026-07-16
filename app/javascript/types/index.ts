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
}

export type SharedProps = {
  auth: {
    user: User | null
  }
}
