import ParticlesBackground from './ParticlesBackground';
import { MapPin, Phone, Mail } from 'lucide-react';
import { SiFacebook, SiInstagram, SiYoutube } from 'react-icons/si';

const ContactSection = () => {
  return (
    <section id="contact" className="relative overflow-hidden pt-0 mt-0 py-14 md:py-16">
      <ParticlesBackground />
      <div className="relative z-10 max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-4 md:mb-6">
          <h2 className="text-5xl font-bold mb-6" style={{ color: '#1E3F8A' }}>Get In Touch</h2>
          <p className="text-xl text-gray-600">We’re here to guide you every step of the way in your child’s learning journey. Whether you have questions about admissions, curriculum, or campus life — feel free to reach out to us anytime.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl p-8 shadow-xl flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <span role="img" aria-label="phone">📞</span> Let’s Connect
            </h3>
            <div className="mt-2">
              <p className="text-lg text-gray-700 mb-2">Have a query or need assistance?<br />Our team is always happy to help you.</p>
              <ul className="list-none space-y-2 text-base text-gray-700 mb-4">
                <li className="flex items-center gap-2"><span role="img" aria-label="location">📍</span> Visit our campus for a personalized experience</li>
                <li className="flex items-center gap-2"><span role="img" aria-label="phone">📞</span> Call us for quick support and information</li>
                <li className="flex items-center gap-2"><span role="img" aria-label="chat">💬</span> Connect with us online for instant assistance</li>
              </ul>
              <h4 className="text-xl font-semibold text-blue-900 mt-4 flex items-center gap-2">
                <span role="img" aria-label="mail">📩</span> We’d Love to Hear From You
              </h4>
              <p className="text-base text-gray-700">
                Fill out the form or reach out to us directly —<br />
                Let’s take the first step together towards a brighter future for your child.
              </p>
            </div>

            {/* Parent Testimonials Section */}
            <div className="w-full mt-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4 text-center">Parent Testimonials</h3>
              <div className="space-y-6">
                <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl text-gray-800">
                  <p className="mb-2">"Minervaa Vidhya Mandhir has provided a strong academic foundation for our child. The teachers are disciplined, caring and focused on concept clarity. We are happy with the progress and overall development."</p>
                  <footer className="text-sm text-blue-700">– Parent of Primary Grade Student</footer>
                </blockquote>
                <blockquote className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-xl text-gray-800">
                  <p className="mb-2">"The school maintains excellent discipline and communication. We appreciate the individual attention given to students and the structured academic approach followed throughout the year."</p>
                  <footer className="text-sm text-blue-700">– Parent of Upper Primary Student</footer>
                </blockquote>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Address</h4>
                    <p className="text-gray-600">Jothi Nagar, Pollachi-642001</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Phone</h4>
                    <p className="text-gray-600">+91 99949 59484</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                    <p className="text-gray-600">mvmofficepollachi@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t-2 border-gray-100">
                <h4 className="font-bold text-gray-800 mb-4">Follow Us</h4>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/minervaaschool"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white hover:bg-blue-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <SiFacebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.instagram.com/minervaa_vidhya_mandhir?igsh=ZzdqODNyajRiazhi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center text-white hover:shadow-lg transform hover:scale-110 transition-all duration-300"
                  >
                    <SiInstagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://youtube.com/@mvmschoolpollachi?si=HKpGdJQ9Lo2S9zN7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white hover:bg-red-700 transform hover:scale-110 transition-all duration-300"
                  >
                    <SiYoutube className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl h-80">
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
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
