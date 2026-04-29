import ParticlesBackground from './ParticlesBackground';
import { useState } from 'react';
import { Image, Video, Play } from 'lucide-react';
import { getPublicAssetUrl } from '../utils/publicAsset';

const resolveImageUrl = (value: string) =>
  /^https?:\/\//i.test(value) ? value : getPublicAssetUrl(value);

const HappeningsSection = () => {
  const [activeTab, setActiveTab] = useState<'images' | 'videos'>('images');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const defaultDriveLink = 'https://drive.google.com/drive/folders/1B3nLfQ-FCS7lAXOwag21_-wgHHcN3iCd?usp=sharing';

  const events = [
    {
      emoji: '🎉',
      title: 'Inauguration Day',
      subtitle: 'A Grand Beginning',
      thumbnail: '/webp/inagurationday.webp',
      driveLink: 'https://drive.google.com/drive/folders/1f5dM7vsviHAMJlMrT3CVV9wyY-nGNEt4?usp=sharing',
    },
    {
      emoji: '🇮🇳',
      title: 'Independence Day',
      subtitle: 'Pride of Freedom',
      thumbnail: '/webp/independence_day.webp',
      driveLink: defaultDriveLink,
    },
    {
      emoji: '🌈',
      title: 'Rainbow Day',
      subtitle: 'Colors of Joy',
      thumbnail: '/webp/rainbow_day.webp',
      driveLink: 'https://drive.google.com/drive/folders/10lahVHxNPCb0u6Im68Acli9PHxfarJLN?usp=sharing',
    },
    {
      emoji: '📜',
      title: 'Bharathiyar Day',
      subtitle: 'Spirit of Wisdom',
      thumbnail: '/webp/bharathiyar_celebration_day.webp',
      driveLink: 'https://drive.google.com/drive/folders/1URUjY_Ap-gg9ZjQT56oouMzyfefPpilg?usp=sharing',
    },
    {
      emoji: '🪔',
      title: 'Vijayadasami',
      subtitle: 'A New Beginning',
      thumbnail: '/webp/vijayadhasamy.webp',
      driveLink: 'https://drive.google.com/drive/folders/1sglvKputKPV5xNuoNOFk6l6DAQe_FaBe?usp=sharing',
    },
    {
      emoji: '🍲',
      title: 'Food Festival',
      subtitle: 'Taste & Celebrate',
      thumbnail: '/webp/food_festival.webp',
      driveLink: 'https://drive.google.com/drive/folders/1x0_OCCvbVp-JSYvwH4zcbu8W7EtZXdZQ?usp=sharing',
    },
    {
      emoji: '🏆',
      title: 'Award Day',
      subtitle: 'Celebrating Excellence',
      thumbnail: '/webp/award_day.webp',
      driveLink: 'https://drive.google.com/drive/folders/17-sIaYLUh_UPWGj5nX3Ex6TgT5GyFqt2?usp=sharing',
    },
    {
      emoji: '🌾',
      title: 'Pongal Festival',
      subtitle: 'Tradition & Happiness',
      thumbnail: '/webp/pongal_celebration.webp',
      driveLink: 'https://drive.google.com/drive/folders/15ysCMHTKh80jj0oE26I6SU5Rjv4fE2dp?usp=sharing',
    },
    {
      emoji: '🎭',
      title: 'Annual Day',
      subtitle: 'Talent Unleashed',
      thumbnail: '/webp/annual_day.webp',
      driveLink: 'https://drive.google.com/drive/folders/1fyXQJ27XvxKn8nH51TWlD-yGx1Zvco83?usp=sharing',
    },
  ];

  const videos = [
    {
      title: 'Gardening',
      videoId: 'o55qCxI3riI',
    },
    {
      title: 'Diwali Celebration',
      videoId: 'nv2Cb1IS9bA',
    },
    {
      title: 'Annual Day Celebration',
      videoId: 'TjIeZ4ZB2w8',
    },
    {
      title: 'School Overview',
      videoId: 'eATH9UUNlZM',
    },
    {
      title: 'Field Trip',
      videoId: 'sQj-mgkdhAk',
    },
    {
      title: 'Happy Independence Day',
      videoId: 'FrIs130k9oQ',
    },
  ];

  return (
    <section id="happenings" className="relative overflow-hidden py-14 md:py-16">
      <ParticlesBackground />
      <div className="relative z-10 max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-5xl font-bold mb-6" style={{ color: '#1E3F8A' }}>Happenings</h2>
          <p className="text-xl text-gray-600">Every moment at Minervaa is a memory of learning and celebration.</p>
        </div>

        <div className="flex justify-center mb-8 md:mb-10">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <button
              onClick={() => setActiveTab('images')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'images'
                  ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Image className="w-5 h-5" />
              <span>Images</span>
            </button>
          </div>
          <div className="bg-white rounded-full p-2 shadow-lg ml-4">
            <button
              onClick={() => setActiveTab('videos')}
              className={`px-8 py-3 rounded-full font-bold transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'videos'
                  ? 'bg-indigo-600 text-white shadow-lg hover:bg-indigo-700'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Video className="w-5 h-5" />
              <span>Videos</span>
            </button>
          </div>
        </div>

        {activeTab === 'images' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <a
                key={index}
                href={event.driveLink || '#'}
                target={event.driveLink ? "_blank" : undefined}
                rel={event.driveLink ? "noopener noreferrer" : undefined}
                className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={resolveImageUrl(event.thumbnail)}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 border-none rounded-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="text-3xl mb-1">{event.emoji}</div>
                    <h3 className="text-white font-bold text-lg leading-tight">{event.title}</h3>
                    <div className="text-white text-sm opacity-90">{event.subtitle}</div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, index) => (
              <div
                key={index}
                onClick={() => setSelectedVideo(video.videoId)}
                className="bg-white overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 border-none rounded-none"
                  />
                  <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-8 h-8 text-red-600 ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 text-center text-lg">{video.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 text-xl"
            >
              Close ✕
            </button>
            <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HappeningsSection;
