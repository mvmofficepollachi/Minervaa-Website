
import Navigation from './components/Navigation';
import LoadingAnimation from './components/LoadingAnimation';
import HomeSection from './components/HomeSection';
import AboutSection from './components/AboutSection';
import AcademicsSection from './components/AcademicsSection';
import FacilitiesSection from './components/FacilitiesSection.tsx';
import HappeningsSection from './components/GallerySection';
import CareersSection from './components/CareersSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdmissionPopup from './components/AdmissionPopup';
import { useEffect } from 'react';


function App() {
  useEffect(() => {
    // Always scroll to the top (hero section) on reload
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <>
      <LoadingAnimation />
      <AdmissionPopup />
      <div className="min-h-screen bg-white">
        <Navigation />
        <HomeSection />
        <AboutSection />
        <AcademicsSection />
        <FacilitiesSection />
        <HappeningsSection />
        <CareersSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}

export default App;

