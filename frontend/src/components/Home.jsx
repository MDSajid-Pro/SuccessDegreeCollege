
import Hero from './Hero'
import PrincipalMessage from './PrincipalMessage'
import Gallery from './Gallery'
import FeaturedCourses from './FeaturedCourses'
import WhyChooseUs from './WhyChooseUs'
import Testimonials from './Testimonials'
import NoticeBoard from './NoticeBoard'
import Footer from './Footer'
import Banner from './Banner'

const Home = () => {
  return (
      <div>
      <Hero />
      <Banner />
      <PrincipalMessage />
      <FeaturedCourses />
      <WhyChooseUs/>
      <Gallery />
      <Testimonials />
      <NoticeBoard />
      <Footer/>
    </div>
  )
}

export default Home