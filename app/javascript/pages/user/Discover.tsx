import RecommendationsForm from '@/components/discover/RecommendationsForm'
import SuggestionList from '@/components/discover/SuggestionList'
import UserLayout from '@/components/shared/UserLayout'
import { Suggestion } from '@/types/suggestion'
import { menuItems } from '@/utils/user-navigation-items'
import { Box, Card, CardContent, Typography } from '@mui/material'
import { ReactNode, useEffect, useState } from 'react'
import travelPlaceholderImg from '@/assets/undraw_travel-destination_d2a9.svg'
import { Destination } from '@/types/destination'
import FlashSnackbar from '@/components/shared/FlashSnackbar'

function Discover({
  suggestion_list,
  destination,
}: {
  suggestion_list: Suggestion[]
  destination: Destination
}) {
  const [suggestionList, setSuggestionList] = useState<Suggestion[] | null>(
    null,
  )

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
  <UserLayout navigationItems={menuItems}>{page}</UserLayout>
)

export default Discover
