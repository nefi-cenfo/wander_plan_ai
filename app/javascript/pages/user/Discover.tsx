import RecommendationsForm from '@/components/discover/RecommendationsForm'
import SuggestionList from '@/components/discover/SuggestionList'
import UserLayout from '@/components/shared/UserLayout'
import { Suggestion } from '@/types/suggestion'
import { menuItems } from '@/utils/user-navigation-items'
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import travelPlaceholderImg from '@/assets/undraw_travel-destination_d2a9.svg'
import { Destination } from '@/types/destination'
import FlashSnackbar from '@/components/shared/FlashSnackbar'
import { Link, usePage } from '@inertiajs/react'

function Discover({
  suggestion_list,
  destination,
  active_trips_count,
  active_trips_limit,
}: {
  suggestion_list: Suggestion[]
  destination: Destination
  active_trips_count: number
  active_trips_limit: number
}) {
  const { auth } = usePage().props
  const [suggestionList, setSuggestionList] = useState<Suggestion[] | null>(
    null,
  )
  const isPremium = auth.user?.subscription.premium ?? false
  const hasReachedBasicLimit = active_trips_count >= active_trips_limit

  useEffect(() => {
    setSuggestionList(suggestion_list?.length ? suggestion_list : null)
  }, [suggestion_list])
  return (
    <>
      <FlashSnackbar />
      <Typography
        variant="h2"
        sx={{
          fontSize: '2rem',
          fontWeight: 'bold',
        }}
      >
        AI Recommendations
      </Typography>
      <Typography variant="body1" sx={{ marginBlock: 2 }}>
        Based on a location given and selected days.
      </Typography>
      {!isPremium && (
        <Alert
          severity={hasReachedBasicLimit ? 'info' : 'success'}
          icon={false}
          sx={{
            mb: 3,
            border: '1px solid',
            borderColor: hasReachedBasicLimit ? 'primary.main' : 'divider',
            color: 'text.primary',
            background: hasReachedBasicLimit
              ? 'linear-gradient(135deg, rgba(14, 165, 164, 0.12), rgba(37, 99, 235, 0.08))'
              : 'rgba(14, 165, 164, 0.08)',
            '& .MuiAlert-message': { width: '100%' },
          }}
        >
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={2}
            sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <Box>
              <AlertTitle sx={{ fontWeight: 900, color: 'text.primary' }}>
                Basic plan trip usage
              </AlertTitle>
              <Typography variant="body2" color="text.secondary">
                You have used {active_trips_count} of {active_trips_limit}{' '}
                active trips. Current and upcoming trips count toward your Basic
                plan limit.
              </Typography>
            </Box>
            {hasReachedBasicLimit && (
              <Button
                variant="contained"
                size="small"
                LinkComponent={Link}
                href="/checkout"
                sx={{ whiteSpace: 'nowrap' }}
              >
                Upgrade to Premium
              </Button>
            )}
          </Stack>
        </Alert>
      )}
      <Box sx={{ marginBottom: 3 }}>
        <RecommendationsForm />
      </Box>
      {suggestionList?.length && (
        <SuggestionList
          suggestions={suggestionList}
          destination={destination}
        />
      )}
      {!suggestionList && (
        <Box>
          <Card>
            <CardContent className="h-[700px] flex flex-col justify-center items-center">
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                Please select a location and dates to start your journey.
              </Typography>
              <img src={travelPlaceholderImg} alt="vacation" />
            </CardContent>
          </Card>
        </Box>
      )}
    </>
  )
}

Discover.layout = (page: ReactNode) => (
  <UserLayout
    navigationItems={menuItems}
    breadcrumbs={[{ label: 'Dashboard', href: '/' }, { label: 'Discover' }]}
  >
    {page}
  </UserLayout>
)

export default Discover
