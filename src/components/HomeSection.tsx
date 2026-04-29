import ParticlesBackground from './ParticlesBackground';
import { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Sparkles } from 'lucide-react';
import { getPublicAssetUrl } from '../utils/publicAsset';

const HOME_GROUP_IMAGE_CLOUDINARY_URL = '/webp/group.webp';
const HERO_VIDEO_FALLBACK_URL = 'https://res.cloudinary.com/dscbcyysb/video/upload/f_auto,q_auto/Video_jw75gz.mp4';
const HERO_VIDEO_MOBILE_FALLBACK_URL = 'https://res.cloudinary.com/dscbcyysb/video/upload/f_auto,q_auto:low,w_720/Video_jw75gz.mp4';

const HomeSection = () => {
  const [showAdmissionsCard, setShowAdmissionsCard] = useState(true);
  const [cardAnim, setCardAnim] = useState('');
  const heroVideoMp4Url = (import.meta.env.VITE_HERO_VIDEO_MP4_URL || HERO_VIDEO_FALLBACK_URL).trim();
  const heroVideoMobileMp4Url = (import.meta.env.VITE_HERO_VIDEO_MP4_MOBILE_URL || HERO_VIDEO_MOBILE_FALLBACK_URL).trim();
  const groupImageSrc = HOME_GROUP_IMAGE_CLOUDINARY_URL || getPublicAssetUrl('/webp/group.webp');
  return (
    <>
      <section id="home" className="min-h-screen">
        <div className="relative h-screen flex items-center justify-center overflow-hidden">
          <ParticlesBackground />
          {/* Full-bleed hero video background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={heroVideoMobileMp4Url} media="(max-width: 768px)" type="video/mp4" />
              <source src={heroVideoMp4Url} type="video/mp4" />
            </video>
          </div>

          <div className="relative z-10 text-center px-2 md:px-4 animate-fade-in-up">
            <h1 className="hero-title text-5xl md:text-8xl text-white mb-6 leading-tight">
              <span
                className="font-extrabold text-white text-5xl md:text-7xl tracking-normal drop-shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
                style={{ fontFamily: "Georgia, 'Times New Roman', Times, serif", letterSpacing: '-0.02em' }}
              >
                Minervaa Vidhya Mandhir
              </span>
            </h1>
            <div className="mb-12 flex items-center justify-center gap-3 text-white">
              <span className="inline-block">
                <Sparkles className="w-7 h-7 text-yellow-400 drop-shadow-md" />
              </span>
              <span className="inline-block">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-purple-500 drop-shadow-md" style={{ verticalAlign: 'middle' }}>
                  <path d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21l1.18-6.86-5-4.87 5.91-1.01L12 2z" fill="currentColor" />
                </svg>
              </span>
              <p className="hero-subtitle text-2xl md:text-4xl font-bold text-white tracking-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.18)]" style={{ letterSpacing: '-0.01em' }}>
                Inspiring young Minds
              </p>
              <span className="inline-block">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="text-yellow-400 drop-shadow-md" style={{ verticalAlign: 'middle' }}>
                  <path d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21l1.18-6.86-5-4.87 5.91-1.01L12 2z" fill="currentColor" />
                </svg>
              </span>
              <span className="inline-block">
                <Sparkles className="w-7 h-7 text-yellow-400 drop-shadow-md" />
              </span>
            </div>
          </div>

          {/* Animated, colorful, fixed admissions card with minimize functionality */}
          <div className="fixed right-0 top-0 bottom-0 z-50 flex items-center pointer-events-none">
            {showAdmissionsCard ? (
              <div className={`pointer-events-auto animate-fade-in-up flex items-center justify-center w-10 md:w-12 h-[180px] md:h-[220px] transition-transform duration-700 ${cardAnim === 'out' ? 'translate-x-full' : cardAnim === 'in' ? 'translate-x-0' : ''}`}>
                <div
                  className="absolute origin-center rotate-90 w-[180px] md:w-[220px] h-[44px] md:h-[52px] rounded-t-2xl bg-indigo-600 border-2 border-b-0 border-white shadow-2xl flex flex-row items-center justify-start gap-2 cursor-pointer hover:bg-indigo-700 transition-all px-2"
                  onClick={() => window.dispatchEvent(new Event('openAdmission'))}
                >
                  <button
                    className="bg-[#00094B] hover:bg-[#00094B] text-white rounded-full p-1.5 shadow-md flex items-center justify-center -rotate-90"
                    aria-label="Minimize admissions card"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCardAnim('out');
                      setTimeout(() => {
                        setShowAdmissionsCard(false);
                        setCardAnim('');
                      }, 700);
                    }}
                  >
                    <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                  </button>
                  <span className="flex items-center w-full h-full">
                    <p className="mr-auto text-left text-xs md:text-sm font-extrabold uppercase tracking-wide text-white drop-shadow-lg whitespace-nowrap">
                      Admissions open
                    </p>
                  </span>
                </div>
              </div>
            ) : (
              <div className={`pointer-events-auto animate-fade-in-up transition-transform duration-700 ${cardAnim === 'in' ? 'translate-x-full' : 'translate-x-0'}`}>
                <button
                  className="rounded-l-2xl bg-[#00094B] border-2 border-r-0 border-white shadow-2xl p-2 flex items-center justify-center w-10 md:w-12 h-20 md:h-24 hover:brightness-110 transition-all"
                  aria-label="Show admissions card"
                  onClick={() => {
                    setShowAdmissionsCard(true);
                    setCardAnim('in');
                    setTimeout(() => setCardAnim(''), 700);
                  }}
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="p-0">
        <div className="max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="w-full h-full md:h-[420px] md:min-h-[420px] flex md:block justify-center md:justify-start">
              <img
                src={groupImageSrc}
                alt="Students group"
                className="w-full h-full md:h-[420px] md:min-h-[420px] rounded-3xl shadow-xl object-cover object-center md:rounded-3xl md:shadow-xl md:object-cover md:object-center"
                style={{ minHeight: '320px', minWidth: '100%', maxWidth: '100%', objectFit: 'cover', objectPosition: 'center' }}
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-[#1E3F8A] leading-tight">
                MVM is a premier co-educational institution located in the heart of Pollachi, offering quality education through the CBSE curriculum with a strong focus on academic excellence, character building, and holistic development.
              </h2>
              <p className="mt-4 text-gray-700 text-lg md:text-xl leading-relaxed">
                We believe learning extends beyond textbooks. Our approach emphasizes the development of nine intelligence skills, along with strong human values and social awareness from an early stage. Through a balanced blend of structured academics, discipline, creativity and real-world exposure, we nurture students into confident, responsible and future-ready individuals.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeSection;
