import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';
import { getPublicAssetUrl } from '../utils/publicAsset';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const openAdmissionForm = () => {
    window.dispatchEvent(new Event('openAdmission'));
  };

  const quickLinks = [
    { name: 'Academics', onClick: () => scrollToSection('academics') },
    { name: 'Admission', onClick: openAdmissionForm },
    { name: 'Careers', onClick: () => scrollToSection('careers') },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      <div className="max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4 py-10 md:py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-6 inline-flex bg-white rounded-2xl shadow-md px-3 py-2">
              <img
                src={getPublicAssetUrl('/webp/logo.webp')}
                alt="Minervaa Vidhya Mandhir logo"
                className="h-24 sm:h-28 w-auto object-contain transition-all duration-300"
              />
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              Inspiring minds and building futures through quality education, care, and dedication.
            </p>
            <div className="flex space-x-3">
              <a
                href="https://www.facebook.com/minervaaschool"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
              >
                <SiFacebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/minervaa_vidhya_mandhir?igsh=ZzdqODNyajRiazhi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center hover:shadow-lg transform hover:scale-110 transition-all duration-300"
              >
                <SiInstagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@mvmschoolpollachi?si=HKpGdJQ9Lo2S9zN7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center hover:bg-red-700 transform hover:scale-110 transition-all duration-300"
              >
                <SiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={link.onClick}
                    className="text-gray-300 hover:text-white hover:translate-x-1 transform transition-all duration-200 inline-block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">Find Us</h4>
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl h-52">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3921.1145329945607!2d77.01541767480299!3d10.64820958949289!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba837645bed4889%3A0x97b7f04ee4177b85!2sMinerva%20School%2Cjothinagar%2Cpollachi!5e0!3m2!1sen!2sin!4v1770132946592!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="School Location"
              ></iframe>
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">School Hours</h4>
            <ul className="space-y-3 text-gray-300">
              <li>Monday - Saturday: 8:40 AM to 4:00 PM — UKG to 8th Standard</li>
              <li>Monday - Saturday: 8:40 AM to 3:00 PM — LKG</li>
              <li>Sunday: Holiday</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm">
              © {new Date().getFullYear()} It was made by Sayvai Software LLP.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
