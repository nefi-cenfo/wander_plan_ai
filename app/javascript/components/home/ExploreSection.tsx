import {Box, Card, CardContent, Container, Typography} from '@mui/material'

export default function ExploreSection() {
  const features = [
    {
      title: 'AI Smart Itineraries',
      description:
        'Our proprietary neural engine analyzes millions of data points to generate day-by-day plans tailored to your specific interests and pace.',
    },
    {
      title: 'TripAdvisor Integration',
      description:
        'Real-time access to millions of reviews and ratings. See exactly what fellow travelers are saying about every stop on your route.',
    },
    {
      title: 'Exclusive Pocket Mode',
      description:
        'Plan online, travel offline. Download your full itinerary, maps, and tickets for seamless access in areas with no connectivity.',
    },
    {
      title: 'Dynamic Budgeting',
      description:
        'Keep your finances in check with integrated expense tracking and cost estimates for flights, stays, and activities.',
    },
  ]
  return (
    <Container fixed maxWidth="xl">
      <Box className="flex flex-col items-center">
        <Typography
          variant="h3"
          className="text-center"
          sx={{fontWeight: '700', marginTop: '6rem', marginBottom: '1rem'}}
        >
          Everything You Need to Explore
        </Typography>
        <Typography
          variant="body1"
          className="w-2xl text-center"
          sx={{marginBottom: '3rem'}}
        >
          WanderPlan combines cutting-edge AI with trusted industry data to give
          you the ultimate travel planning toolkit.
        </Typography>
        <Box
          className="w-full max-w-7xl flex flex-row justify-between flex-wrap"
          sx={{marginBottom: '6rem'}}
        >
          {features.map((feature, index) => (
            <Card variant="outlined" sx={{width: '280px'}} key={index}>
              <CardContent>
                <Typography
                  variant="h4"
                  sx={{
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body1">{feature.description}</Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Container>
  )
}
