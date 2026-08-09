import { BreadcrumbItem } from '@/types/breadcrumb'
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded'
import { Link as InertiaLink } from '@inertiajs/react'
import { Breadcrumbs, Typography } from '@mui/material'

export default function AppBreadcrumbs({
  items,
}: {
  items: BreadcrumbItem[]
}) {
  if (!items.length) {
    return null
  }

  return (
    <Breadcrumbs
      separator={<NavigateNextRoundedIcon fontSize="small" />}
      sx={{ mb: 3 }}
    >
      {items.map((item, index) => {
        const isCurrentPage = index === items.length - 1 || !item.href

        if (isCurrentPage) {
          return (
            <Typography
              key={`${item.label}-${index}`}
              variant="body2"
              color="text.primary"
              sx={{ fontWeight: 700 }}
            >
              {item.label}
            </Typography>
          )
        }

        return (
          <InertiaLink
            key={`${item.label}-${index}`}
            href={item.href}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontWeight: 600,
                '&:hover': {
                  color: 'primary.main',
                  textDecoration: 'underline',
                },
              }}
            >
              {item.label}
            </Typography>
          </InertiaLink>
        )
      })}
    </Breadcrumbs>
  )
}
