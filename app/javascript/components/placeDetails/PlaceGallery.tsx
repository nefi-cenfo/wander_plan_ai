import { TripadvisorPhoto } from '@/types/tripadvisor-data'
import { Box } from '@mui/material'

export default function PlaceGallery({
  locationPhotos,
}: {
  locationPhotos: TripadvisorPhoto[]
}) {
  const photoPlaceholderSource =
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="420" viewBox="0 0 600 420"><rect width="600" height="420" rx="18" fill="%23f0eff7"/><circle cx="250" cy="170" r="30" fill="%23b9b6d0"/><path d="M135 300l95-105c12-13 33-13 45 1l38 44 40-52c12-16 36-16 48 1l85 111H135z" fill="%23b9b6d0"/></svg>'
  const photoPlaceholder = {
    photoSource: photoPlaceholderSource,
    caption: 'No image',
  }
  const photos = locationPhotos.map((item) => ({
    photoSource: item.photo.original_size_url,
    caption: item.caption,
  }))
  const heroPhoto = photos[0] || photoPlaceholder
  const thumbnailPhotos = [...photos.slice(1, 5)]

  while (thumbnailPhotos.length < 4) {
    thumbnailPhotos.push(photoPlaceholder)
  }

  return (
    <Box sx={{ mb: 4 }}>
      <Box
        component="img"
        src={heroPhoto.photoSource}
        alt={heroPhoto.caption}
        sx={{
          width: '100%',
          height: { xs: 240, md: 340 },
          display: 'block',
          objectFit: 'cover',
          borderRadius: 2,
          mb: 2,
        }}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(4, 1fr)',
          },
          gap: 2,
        }}
      >
        {thumbnailPhotos.map((photo, index) => (
          <Box
            component="img"
            key={`${photo.caption}-${index}`}
            src={photo.photoSource}
            alt={photo.caption}
            sx={{
              width: '100%',
              aspectRatio: '1 / 1',
              display: 'block',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
