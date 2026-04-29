import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getPublicAssetUrl } from '../utils/publicAsset';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About Us', id: 'about' },
    { name: 'Academics', id: 'academics' },
    { name: 'Facilities', id: 'facilities' },
    { name: 'Happenings', id: 'happenings' },
    { name: 'Careers', id: 'careers' },
    { name: 'Contact Us', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            setActiveSection(item.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="flex justify-between items-center h-24 sm:h-28">
          <div className="flex items-center space-x-3">
            <img
              src={getPublicAssetUrl('/webp/logo.webp')}
              alt="Minervaa Vidhya Mandhir logo"
              className="h-20 sm:h-24 w-auto object-contain flex-shrink-0 transition-all duration-300"
            />
          </div>

          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-4 py-2 font-medium transition-all duration-300 rounded-lg ${
                    isActive
                      ? 'bg-[#1E3F8A] text-white shadow-lg scale-105'
                      : 'text-gray-700 hover:text-[#1E3F8A] hover:bg-[#e6ecfa]'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>

          <button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block w-full text-left px-4 py-3 font-medium rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-[#1E3F8A] text-white shadow-lg'
                      : 'text-gray-700 hover:bg-[#e6ecfa] hover:text-[#1E3F8A]'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
