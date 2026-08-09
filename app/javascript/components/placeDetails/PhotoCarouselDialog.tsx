import { GalleryPhoto } from '@/types/gallery'
import CloseIcon from '@mui/icons-material/Close'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import {
  Box,
  Dialog,
  IconButton,
  MobileStepper,
  Stack,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'

export default function PhotoCarouselDialog({
  open,
  photos,
  initialIndex,
  onClose,
}: {
  open: boolean
  photos: GalleryPhoto[]
  initialIndex: number
  onClose: () => void
}) {
  const [activeStep, setActiveStep] = useState(initialIndex)
  const maxSteps = photos.length
  const activePhoto = photos[activeStep]

  useEffect(() => {
    if (open) {
      setActiveStep(initialIndex)
    }
  }, [initialIndex, open])

  const handleNext = () => {
    setActiveStep((currentStep) => (currentStep + 1) % maxSteps)
  }

  const handleBack = () => {
    setActiveStep((currentStep) =>
      currentStep === 0 ? maxSteps - 1 : currentStep - 1,
    )
  }

  if (!activePhoto) {
    return null
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            overflow: 'hidden',
            borderRadius: 3,
            backgroundColor: 'background.paper',
          },
        },
      }}
    >
      <Box sx={{ position: 'relative', backgroundColor: '#020617' }}>
        <IconButton
          aria-label="Close gallery"
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 2,
            color: 'common.white',
            backgroundColor: 'rgba(15,23,42,0.56)',
            '&:hover': { backgroundColor: 'rgba(15,23,42,0.78)' },
          }}
        >
          <CloseIcon />
        </IconButton>

        {maxSteps > 1 && (
          <IconButton
            aria-label="Previous photo"
            onClick={handleBack}
            sx={{
              position: 'absolute',
              top: '50%',
              left: { xs: 8, sm: 16 },
              zIndex: 2,
              color: 'common.white',
              backgroundColor: 'rgba(14,165,164,0.82)',
              transform: 'translateY(-50%)',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
        )}

        <Box
          component="img"
          src={activePhoto.photoSource}
          alt={activePhoto.caption || 'TripAdvisor photo'}
          sx={{
            width: '100%',
            height: { xs: '58vh', md: '72vh' },
            display: 'block',
            objectFit: 'contain',
          }}
        />

        {maxSteps > 1 && (
          <IconButton
            aria-label="Next photo"
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: { xs: 8, sm: 16 },
              zIndex: 2,
              color: 'common.white',
              backgroundColor: 'rgba(14,165,164,0.82)',
              transform: 'translateY(-50%)',
              '&:hover': { backgroundColor: 'primary.dark' },
            }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        )}
      </Box>

      <Stack sx={{ px: { xs: 2, md: 3 }, py: 2, gap: 1 }}>
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 2 }}
        >
          <Typography variant="body1" sx={{ fontWeight: 700 }}>
            {activePhoto.caption || 'TripAdvisor photo'}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {activeStep + 1} / {maxSteps}
          </Typography>
        </Stack>

        {maxSteps > 1 && (
          <MobileStepper
            variant="dots"
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            nextButton={null}
            backButton={null}
            sx={{
              p: 0,
              backgroundColor: 'transparent',
              justifyContent: 'center',
              '& .MuiMobileStepper-dotActive': {
                backgroundColor: 'primary.main',
              },
            }}
          />
        )}
      </Stack>
    </Dialog>
  )
}
