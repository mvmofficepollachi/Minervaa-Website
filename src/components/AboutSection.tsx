import ParticlesBackground from './ParticlesBackground';
import { useEffect, useState, useRef } from 'react';
import { Award, Users, GraduationCap, Heart, BookOpen, Trophy, Eye, Flag } from 'lucide-react';
import { getPublicAssetUrl } from '../utils/publicAsset';

const AboutSection = () => {
  const [counters, setCounters] = useState({ years: 0, students: 0, staff: 0, success: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const founderImageUrls = [
    '/webp/mam.webp',
  ];
  const visionBackground = getPublicAssetUrl('/webp/vision.webp');
  const missionBackground = getPublicAssetUrl('/webp/mission.webp');

  useEffect(() => {
    let hasAnimated = false;
    const node = sectionRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          animateCounters();
          hasAnimated = true;
        }
      },
      { threshold: 0.1 }
    );

    if (node) {
      observer.observe(node);
      // Fix: If already visible on mount (mobile), trigger immediately
      const rect = node.getBoundingClientRect();
      if (
        rect.top < window.innerHeight &&
        rect.bottom > 0 &&
        !hasAnimated
      ) {
        animateCounters();
        hasAnimated = true;
      }
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const targets = { years: 25, students: 250, staff: 20, success: 100 };

    let step = 0;
    setCounters({ years: 0, students: 0, staff: 0, success: 0 });
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        years: Math.floor(targets.years * progress),
        students: Math.floor(targets.students * progress),
        staff: Math.floor(targets.staff * progress),
        success: Math.floor(targets.success * progress),
      });

      if (step >= steps) {
        clearInterval(interval);
        setCounters(targets);
      }
    }, duration / steps);
  };

  const stats = [
    {
      value: counters.years,
      label: 'Years of Excellence',
      icon: <Award className="w-8 h-8" />, 
      suffix: '+',
      image: getPublicAssetUrl('/webp/excellence.webp'),
    },
    {
      value: counters.students,
      label: 'Happy Students',
      icon: <Users className="w-8 h-8" />, 
      suffix: '+',
      image: getPublicAssetUrl('/webp/250+happystudents.webp'),
    },
    {
      value: counters.staff,
      label: 'Dedicated Staff',
      icon: <GraduationCap className="w-8 h-8" />, 
      suffix: '+',
      image: getPublicAssetUrl('/webp/dedicatedstaffs.webp'),
    },
    {
      value: counters.success,
      label: 'Success Rate',
      icon: <Trophy className="w-8 h-8" />, 
      suffix: '%',
      image: getPublicAssetUrl('/webp/100%25successrate.webp'),
    },
  ];

  const features = [
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: 'Signature Teaching Approach',
      subtitle: 'Our classrooms are dynamic, interactive, and future-ready.',
      points: [
        'Smart digital classrooms',
        'Equal importance is given to all three languages (English, Tamil & Hindi).',
        'Activity & project-based learning',
        'Inquiry-based teaching methods',
        'Continuous assessment & feedback',
      ],
      color: 'from-blue-500 to-cyan-500',
      soft: 'from-blue-50 to-cyan-50',
      bullet: 'text-blue-600',
      emoji: '💡',
    },
    {
      icon: <GraduationCap className="w-10 h-10" />,
      title: 'Beyond Academics',
      subtitle: 'True education goes beyond books.',
      points: [
        'Leadership & personality development',
        'Value-based and life skills education',
        'Sports, arts, and cultural engagement',
      ],
      color: 'from-emerald-500 to-green-600',
      soft: 'from-emerald-50 to-green-50',
      bullet: 'text-emerald-600',
      emoji: '🌍',
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: 'What Sets Us Apart',
      subtitle: '',
      points: [
        'Structured CBSE-aligned curriculum',
        'Highly committed and skilled educators',
        'Focus on discipline with care',
        'Consistent academic monitoring',
        'Safe and motivating learning environment',
      ],
      color: 'from-amber-500 to-orange-600',
      soft: 'from-amber-50 to-orange-50',
      bullet: 'text-amber-600',
      emoji: '🏆',
    },
    {
      icon: <Heart className="w-10 h-10" />,
      title: 'Strong Student Support',
      subtitle: 'Every child matters, every step counts.',
      points: [
        'Individual mentoring and guidance',
        'Regular parent connect programs',
        'Remedial and enrichment sessions',
        'Encouragement for every learner to excel',
      ],
      color: 'from-fuchsia-500 to-pink-600',
      soft: 'from-fuchsia-50 to-pink-50',
      bullet: 'text-fuchsia-600',
      emoji: '🤝',
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Future-Ready Learning',
      subtitle: 'We prepare students for life, not just exams.',
      points: [
        'Confidence & communication',
        'Analytical and problem-solving skills',
        'Digital literacy and adaptability',
        'Strong values and responsibility',
      ],
      color: 'from-violet-500 to-indigo-600',
      soft: 'from-violet-50 to-indigo-50',
      bullet: 'text-violet-600',
      emoji: '🚀',
    },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-14 md:py-16" ref={sectionRef}>
      <ParticlesBackground />
      <div className="relative z-10 max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="mb-12 md:mb-14">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-start">
            {/* Founder Image and Details: On mobile, appears above message; on desktop, right side */}
            <div className="w-full flex flex-col items-center mx-auto order-1 lg:order-2 lg:max-w-[320px]">
              <img
                src={founderImageUrls[0]}
                onError={(e) => {
                  const target = e.currentTarget;
                  const nextIndex = Number(target.dataset.fallbackIndex || '0') + 1;
                  if (nextIndex < founderImageUrls.length) {
                    target.dataset.fallbackIndex = String(nextIndex);
                    target.src = founderImageUrls[nextIndex];
                  }
                }}
                alt="Founder and Correspondent Suganthi Jambulingam"
                className="w-full max-w-[280px] object-cover rounded-none"
              />
              <div className="mt-5 max-w-[320px] text-gray-700 leading-relaxed text-left">
                <p className="font-bold text-[#1E3F8A]">Founder & Correspondent</p>
                <p className="font-semibold">Suganthi Jambulingam M.Com., B.Ed.,</p>
                <p>A.P.J. Abdul Kalam Awadee,</p>
                <p>Therapist and Divine Mentor,</p>
                <p>Meditation Instruction,</p>
                <p>Organic Agriculturalist. </p>
              </div>
            </div>
            {/* Founder's Message: On mobile, appears below image; on desktop, left side */}
            <div className="order-2 lg:order-1 flex-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-5" style={{ color: '#1E3F8A' }}>
                Founder&apos;s Message
              </h3>

              <div className="space-y-5 text-gray-700 text-lg leading-relaxed">
                <p>
                  At Minervaa Vidhya Mandhir, we believe that education is not merely the acquisition of knowledge, but also laying way to wisdom by building character, confidence, and a meaningful future.
                </p>

                <p>
                  We started establishment since 2001, education that rooted, our vision has been clear — to provide quality education that rooted in strong values while nurturing both left and right brain of every child.  What began as a humble institution that has grown into a trusted center of learning, shaping young minds with dedication and purpose.
                </p>

                <p>
                  In today’s dynamic world, we embrace innovation and modern teaching methodologies. However, we firmly believe that technology should support education, not replace the human touch. True learning lies in the balance between knowledge, values, and emotional intelligence — a philosophy that guides our institution every day.
                </p>

                <p>
                  Our school provides a holistic learning environment where students are encouraged to explore, think critically, and grow confidently. Along with academic excellence, we focus on developing discipline, empathy, leadership, and social responsibility.
                </p>

                <p>
                  We take immense pride in our dedicated teachers, supportive parents, and enthusiastic students who together form the strong foundation of our school community.
                </p>

                <p>
                  As we move forward, we invite you to join us in this journey of excellence - to nurture confident learners, responsible citizens, and future leaders who will make a positive impact on society.
                </p>

                <p>Let us guide our children to</p>
                <p className="font-extrabold text-[#1E3F8A] text-xl md:text-2xl tracking-wide">
                  Dream Big • Think Clearly • Act Wisely • Lead with Empathy
                </p>

                <div className="pt-2">
                  <p className="font-semibold">Warm Regards,</p>
                  <p className="font-semibold">Suganthi Jambulingam</p>
                  <p>Founder & Correspondent</p>
                  <p>Minervaa Vidhya Mandhir</p>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="mt-2 mb-0 md:mb-0 pt-6 border-t-2 border-blue-100 max-w-6xl mx-auto">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700 mb-8 text-center">
            Our Educational Direction
          </p>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            <div className="relative overflow-hidden rounded-none border border-blue-100 min-h-[320px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${visionBackground})` }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9, 30, 66, 0.52) 0%, rgba(9, 30, 66, 0.62) 100%)' }} />
              <div className="relative z-10 p-6 md:p-7" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.55)' }}>
                <h4 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-blue-100">
                    <Eye className="w-5 h-5" />
                  </span>
                  Our Vision
                </h4>
                <ul className="space-y-3 text-blue-50 text-lg leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To achieve excellence in academic learning</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To nurture strong values, discipline, and integrity</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To develop confident and independent thinkers</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To build leadership qualities and a sense of responsibility</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To shape students into responsible and contributing citizens</span></li>
                </ul>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-none border border-blue-100 min-h-[320px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${missionBackground})` }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(9, 30, 66, 0.52) 0%, rgba(9, 30, 66, 0.62) 100%)' }} />
              <div className="relative z-10 p-6 md:p-7" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.55)' }}>
                <h4 className="text-2xl font-bold mb-4 text-white flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-blue-100">
                    <Flag className="w-5 h-5" />
                  </span>
                  Our Mission
                </h4>
                <ul className="space-y-3 text-blue-50 text-lg leading-relaxed">
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To provide quality education in a positive environment</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To promote activity-based and concept-oriented learning</span></li>
                  <li className="flex items-start gap-3"><span className="text-cyan-200 mt-0.5">•</span><span>To ensure overall development with strong values and life skill</span></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-0 md:mb-0">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group rounded-none overflow-hidden p-0 h-48 sm:h-56 flex items-stretch"
              style={{ backgroundImage: `url('${stat.image}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Overlay for readability */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors duration-300 z-0" />
              <div className="relative z-10 flex flex-col justify-center items-center w-full h-full p-6">
                <div className="bg-white/90 text-[#1E3F8A] w-16 h-16 rounded-none flex items-center justify-center mb-4 shadow-lg">{stat.icon}</div>
                <div className="text-4xl font-bold text-white text-center mb-2 drop-shadow-lg">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-white text-center font-medium drop-shadow">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-0">
          <h3 className="text-4xl font-bold text-center mb-8" style={{ color: '#1E3F8A' }}>Our Signature Learning Experience</h3>
          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {features.slice(0, 2).map((feature, index) => (
              <div
                key={`top-${index}-${feature.title}`}
                className={`relative overflow-hidden rounded-none border border-white/70 bg-gradient-to-br ${feature.soft} p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out`} />
                <div className="absolute inset-0 bg-white/92 group-hover:bg-white/0 transition-colors duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`bg-gradient-to-br ${feature.color} text-white w-16 h-16 rounded-none flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]`}>
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-2xl leading-none mb-1">{feature.emoji}</p>
                      <h4 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-500">{feature.title}</h4>
                    </div>
                  </div>

                  {feature.subtitle && <p className="text-gray-700 font-semibold mb-4 group-hover:text-white transition-colors duration-500">{feature.subtitle}</p>}

                  <ul className="space-y-2.5">
                    {feature.points.map((point: string) => (
                      <li key={point} className="flex items-start gap-3 text-gray-700 group-hover:text-white transition-colors duration-500">
                        <span className={`${feature.bullet} mt-0.5 group-hover:text-white transition-colors duration-500`}>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.slice(2).map((feature, index) => (
              <div
                key={`bottom-${index}-${feature.title}`}
                className={`relative overflow-hidden rounded-none border border-white/70 bg-gradient-to-br ${feature.soft} p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 group`}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out`} />
                <div className="absolute inset-0 bg-white/92 group-hover:bg-white/0 transition-colors duration-700" />

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`bg-gradient-to-br ${feature.color} text-white w-16 h-16 rounded-none flex items-center justify-center transition-transform duration-700 group-hover:rotate-[360deg]`}>
                      {feature.icon}
                    </div>
                    <div>
                      <p className="text-2xl leading-none mb-1">{feature.emoji}</p>
                      <h4 className="text-2xl font-bold text-gray-800 group-hover:text-white transition-colors duration-500">{feature.title}</h4>
                    </div>
                  </div>

                  {feature.subtitle && <p className="text-gray-700 font-semibold mb-4 group-hover:text-white transition-colors duration-500">{feature.subtitle}</p>}

                  <ul className="space-y-2.5">
                    {feature.points.map((point: string) => (
                      <li key={point} className="flex items-start gap-3 text-gray-700 group-hover:text-white transition-colors duration-500">
                        <span className={`${feature.bullet} mt-0.5 group-hover:text-white transition-colors duration-500`}>•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="mt-12 md:mt-14 text-center animate-fade-in-up">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 rounded-none w-full p-12 shadow-2xl">
            <h3 className="text-4xl font-bold text-white mb-4 md:text-4xl text-2xl font-bold text-white mb-4">Join Our Learning Community</h3>
            <p className="text-xl text-white/90 mb-8 md:text-xl text-base text-white/90 mb-8">Experience the Minervaa difference. Schedule a visit to see our facilities and meet our dedicated team.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    const offset = 80;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg md:text-lg text-base hover:bg-yellow-400 hover:text-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Contact Us
              </button>
              <button
                onClick={() => {
                  window.dispatchEvent(new Event('openAdmission'));
                }}
                className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg md:text-lg text-base hover:bg-yellow-400 hover:text-purple-700 transform hover:scale-105 transition-all duration-300 shadow-xl"
              >
                Admission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
