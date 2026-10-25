// import NavbarComp from "../components/NavbarComp";
import HeroComp from "../components/HeroComp";
import AboutComp from "../components/AboutComp";
import BannerComp from "../components/BannerComp";
import FeaturedRoomComp from "../components/FeaturedRoomComp";
import FacilityComp from "../components/FacilityComp";
import TestimonialComp from "../components/TestimonialComp";
import AvailabilityComp from "../components/AvailabilityComp";
// import FooterComp from "../components/FooterComp";
function Home() {
  return (
    <div>
      {/* <NavbarComp /> */}
      <HeroComp />
      <AboutComp />
      <BannerComp />
      <FeaturedRoomComp />
      <FacilityComp />
      <TestimonialComp />
      <AvailabilityComp/>
      {/* <FooterComp/> */}
    </div>
  );
}

export default Home;
