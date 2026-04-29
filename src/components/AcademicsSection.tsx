import ParticlesBackground from './ParticlesBackground';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AcademicsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const programs = [
    {
      title: 'Foundational stage (Pre – Primary)',
      description: 'Where Little Minds Begin Their Big Journey',
      gradient: 'from-yellow-400 to-orange-500',
      features: [
        { icon: <span className="text-2xl">🎨</span>, text: 'Creative Expression' },
        { icon: <span className="text-2xl">🎶</span>, text: 'Music & Movement' },
        { icon: <span className="text-2xl">🤝</span>, text: 'Social Development' },
        { icon: <span className="text-2xl">🧩</span>, text: 'Play-Based Learning' },
      ],
    },
    {
      title: 'Primary School – Grades 1-5',
      description: 'Building Strong Foundations for Lifelong Learning',
      gradient: 'from-green-400 to-teal-500',
      features: [
        { icon: <span className="text-2xl">📖</span>, text: 'Core Academics' },
        { icon: <span className="text-2xl">📚</span>, text: 'Reading Programs' },
        { icon: <span className="text-2xl">⚽</span>, text: 'Sports & Activities' },
      ],
    },
    {
      title: 'Middle school – Grades 6 -8',
      description: 'Preparing Students for Future Success Highlights',
      gradient: 'from-blue-400 to-purple-500',
      features: [
        { icon: <span className="text-2xl">📊</span>, text: 'Advanced Curriculum' },
        { icon: <span className="text-2xl">🏆</span>, text: 'Competitive Exam Preparation' },
        { icon: <span className="text-2xl">🎯</span>, text: 'Career Guidance' },
        { icon: <span className="text-2xl">🌟</span>, text: 'Leadership Development' },
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % programs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + programs.length) % programs.length);
  };

  return (
    <section id="academics" className="relative overflow-hidden pt-0 mt-0 py-14 md:py-16">
      <ParticlesBackground />
      <div className="relative z-10 max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-5xl font-bold mb-6" style={{ color: '#1E3F8A' }}>Our Educational Programs</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive education for play school, pre school and primary school students with age-appropriate learning programs.
          </p>
        </div>

        <div className="relative">
          <h3 className="text-3xl font-bold text-center mb-8" style={{ color: '#1E3F8A' }}>Our Programs</h3>

          <div className="relative overflow-hidden rounded-3xl">
            <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {programs.map((program, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div
                    className="relative bg-white/60 border border-white/40 shadow-2xl rounded-3xl p-12 transition-transform duration-300 hover:scale-105 backdrop-blur-xl overflow-hidden group"
                    style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
                  >
                    <div className={`absolute inset-0 z-0 bg-gradient-to-br ${program.gradient} opacity-30 rounded-3xl pointer-events-none`} />
                    <div className="relative z-10">
                      <h4 className="text-4xl font-extrabold mb-6 text-gray-900">{program.title}</h4>
                      <p className="text-xl mb-8 opacity-90 text-gray-700">{program.description}</p>
                      <div className="grid md:grid-cols-2 gap-5">
                        {program.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-4 bg-white/70 rounded-2xl p-5 border border-white/40 shadow">
                            <div className="flex-shrink-0 text-3xl md:text-4xl">{feature.icon}</div>
                            <span className="font-semibold text-lg md:text-xl text-gray-800">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200 z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {programs.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-purple-600 w-8' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>

        <section className="mt-0 lg:mt-0">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div>
              <p className="uppercase tracking-[0.2em] text-sm font-semibold text-emerald-600 mb-3">Montessori Learning</p>
              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ color: '#1E3F8A' }}>
                Hands-On Discovery,
                <br />
                Joyful Growth
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Our Montessori environment empowers children to explore at their own pace through purposeful materials,
                movement, and practical life activities that build confidence, concentration, and independence.
              </p>

              <ul className="space-y-4 text-gray-700 text-base md:text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">✦</span>
                  <span>Child-led learning pathways with guided teacher support</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">✦</span>
                  <span>Sensorial activities that strengthen focus and coordination</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">✦</span>
                  <span>Practical life exercises that develop independence and responsibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-600 mt-1">✦</span>
                  <span>Mixed-age collaboration that builds empathy and leadership</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center items-center min-h-[320px]">
              <img
                src="/webp/montessorylearning1.webp"
                alt="Children engaged in Montessori activities"
                className="w-[88%] h-[300px] md:h-[340px] object-cover rounded-[2rem] shadow-2xl object-center"
                style={{ transform: 'none' }}
              />
            </div>
          </div>
        </section>

        <section className="mt-12 lg:mt-14">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center">
            <div>
              <p className="uppercase tracking-[0.2em] text-sm font-semibold text-sky-600 mb-3">Global Learning Pathway</p>
              <h3 className="text-4xl md:text-5xl font-extrabold leading-tight mb-5" style={{ color: '#1E3F8A' }}>
                Academic Excellence with
                <br />
                Global Perspective
              </h3>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                Our academic framework is designed to cultivate a passion for lifelong learning, combining strong foundational knowledge with global outlooks. We foster an environment where students are encouraged to think independently, explore deeply, and excel confidently in an ever-evolving world.
              </p>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                With a student-centric approach and progressive teaching methodologies, we ensure that every learner reaches their highest potential-academically, socially, and personally.
              </p>
            </div>

            <div className="relative min-h-[420px]">
              <div className="flex justify-center items-center min-h-[320px]">
                <img
                  src="/webp/globe.webp"
                  alt="Horse riding activity"
                  className="w-[88%] h-[300px] md:h-[340px] object-cover rounded-[2rem] shadow-2xl object-center"
                  style={{ transform: 'none' }}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AcademicsSection;
