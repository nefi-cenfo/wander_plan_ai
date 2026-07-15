import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Rating,
  Typography,
} from '@mui/material'
import Container from '@mui/material/Container'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'

export default function PartnerSection() {
  return (
    <Container
      fixed
      maxWidth="xl"
      className="flex flex-row justify-between my-30"
    >
      <Box sx={{width: '512px'}}>
        <Typography
          sx={{
            fontSize: '.8rem',
            fontWeight: '700',
            marginTop: '3rem',
            marginBottom: '1rem',
          }}
        >
          Partner Ecosystem
        </Typography>
        <Typography variant="h3" sx={{fontSize: '2rem', fontWeight: 700}}>
          Powered by TripAdvisor Data
        </Typography>
        <Typography variant="body1" sx={{marginY: '1rem'}}>
          Get authentic insights directly in your itinerary. We sync with
          TripAdvisor to ensure your stops are highly rated and verified by
          millions.
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <CheckCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText>Verified Ratings</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText>Real User Photos</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText>Live Availability Updates</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box
        sx={{
          width: '498px',
          height: '348px',
          backgroundColor: 'lightgreen',
          borderRadius: '15px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card sx={{width: '320px', height: '214px', padding: '12px'}}>
          <CardContent>
            <Box sx={{display: 'flex'}}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: '0.9rem',
                  fontWeight: '700',
                  color: 'text.secondary',
                  textTransform: 'uppercase',
                }}
              >
                TripAdvisor Highlight
              </Typography>
              <Rating name="read-only" value={5} readOnly size="small" />
            </Box>
            <Typography
              variant="h5"
              sx={{fontSize: '1.2rem', fontWeight: 700, marginY: '1rem'}}
            >
              La Sponda Restaurant
            </Typography>
            <Typography variant="body2" sx={{marginBottom: '0.5rem'}}>
              "The view is absolutely breathtaking. AI suggested this for sunset
              and it was perfectly timed..."
            </Typography>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: '24px',
                  height: '24px',
                  fontSize: '10px',
                  marginRight: '0.8rem',
                }}
              >
                JD
              </Avatar>
              <Typography sx={{fontSize: '0.8rem'}}>
                John D. • Local Guide
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  )
}
