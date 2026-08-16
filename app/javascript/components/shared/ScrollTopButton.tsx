import { Fab, useScrollTrigger, Zoom } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'

export default function ScrollTopButton() {
  const trigger = useScrollTrigger({ threshold: 600 })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <Zoom in={trigger}>
      <Fab
        color="primary"
        size="medium"
        aria-label="Back to top"
        onClick={scrollToTop}
        sx={(theme) => ({
          position: 'fixed',
          right: { xs: 20, md: 32 },
          bottom: { xs: 24, md: 32 },
          zIndex: theme.zIndex.speedDial,
          boxShadow: `0 18px 42px ${theme.palette.primary.main}45`,
        })}
      >
        <KeyboardArrowUpIcon />
      </Fab>
    </Zoom>
  )
}
