import {Typography} from '@mui/material'

export default function FooterSection() {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <Typography
        variant="body2"
        className="text-center"
        sx={{marginY: '1rem'}}
      >
        &copy; {currentYear} WanderPlan. Built for travelers, by travelers.
      </Typography>
    </footer>
  )
}
