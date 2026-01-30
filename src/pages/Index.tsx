import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Highlights from "@/components/Highlights";
import WhyChooseUs from "@/components/WhyChooseUs";
import Courses from "@/components/Courses";
import Reviews from "@/components/Reviews";
import About from "@/components/About";
import Contact from "@/components/Contact";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Highlights />
      <WhyChooseUs />
      <Courses />
      <Reviews />
      <About />
      <CTASection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
