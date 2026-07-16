import ExploreSection from '@/components/home/ExploreSection'
import Hero from '@/components/home/Hero'
import HomeHeader from '@/components/home/HomeHeader'
import PartnerSection from '@/components/home/PartnerSection'
import RatesSection from '@/components/home/RatesSection'
import ReadySection from '@/components/home/ReadySection'
import FooterSection from '@/components/home/FooterSection'

import { Box, Divider } from '@mui/material'

export default function Home() {
  return (
    <>
      <HomeHeader />
      <Hero />
      <Box sx={{ backgroundColor: '#f4f4fb' }}>
        <ExploreSection />
      </Box>
      <Divider />
      <PartnerSection />
      <Divider />
      <RatesSection />
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <ReadySection />
      </Box>
      <FooterSection />
    </>
  )
}
