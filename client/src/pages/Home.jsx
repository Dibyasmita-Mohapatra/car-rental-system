import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Categories from "../components/Categories";
import FeaturedCars from "../components/FeaturedCars";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Stats />

      <Categories />

      <FeaturedCars />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;