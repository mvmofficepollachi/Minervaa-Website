import ParticlesBackground from './ParticlesBackground';
import { useEffect, useState } from 'react';
import { Monitor, TestTube, Dumbbell, Bus, BookOpen, Shield, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollFadeIn } from './useScrollFadeIn';
import { getPublicAssetUrl } from '../utils/publicAsset';

interface LabSection {
	title: string;
	image: string;
	description: string;
}

interface Facility {
	category: string;
	icon: JSX.Element;
	title: string;
	color: string;
	image: string;
	overview: string;
	technology: string;
	experience: string;
	access: string;
	viewAllImage?: string;
	labSections?: LabSection[];
}

const facilities: Facility[] = [
	{
		category: 'Facilities',
		icon: <Monitor className="w-12 h-12" />,
		title: 'Smart Classrooms',
		color: 'from-blue-500 to-cyan-500',
		image: '/webp/smartclassroom.webp',
		overview: '',
		technology: 'Air-conditioned classrooms equipped with modern technology to support interactive and engaging learning experiences.',
		experience: '',
		access: '',
		viewAllImage: '/webp/smartclassroom2.webp',
	},
	{
		category: 'Facilities',
		icon: <BookOpen className="w-12 h-12" />,
		title: 'Music & Arts',
		color: 'from-pink-500 to-purple-500',
		image: '/webp/musicandarts1.webp',
		overview: '',
		technology: 'Dedicated spaces for music, dance, and arts with expert instructors, fostering creativity, self-expression, and cultural appreciation among students.',
		experience: '',
		access: '',
		viewAllImage: '/webp/musicandarts2.webp',
	},
	{
		category: 'Facilities',
		icon: <BookOpen className="w-12 h-12" />,
		title: 'Library',
		color: 'from-yellow-500 to-orange-500',
		image: '/webp/library3.webp',
		overview: '',
		technology: 'A well-resourced library with a rich collection of books, journals, and digital materials to encourage reading and research habits.',
		experience: '',
		access: '',
		viewAllImage: '/webp/library2.webp',
	},
	{
		category: 'Facilities',
		icon: <TestTube className="w-12 h-12" />,
		title: 'Laboratories',
		color: 'from-green-500 to-emerald-500',
		image: '/webp/lab.webp',
		overview: '',
		technology: 'Fully equipped science and computer laboratories that promote practical learning and innovation.',
		experience: '',
		access: '',
		labSections: [
			{
				title: 'Chemistry Lab',
				image: '/webp/chemistry.webp',
				description:
					'A well-equipped chemistry laboratory with safe workstations, essential apparatus, and supervised experiments that help students understand chemical reactions through practical learning.',
			},
			{
				title: 'Biology Lab',
				image: '/webp/biology.webp',
				description:
					'A dedicated biology laboratory with models, charts, microscopes, and specimen-based activities that build scientific observation skills and concept clarity in life sciences.',
			},
			{
				title: 'Computer Lab',
				image: '/webp/lab3.webp',
				description:
					'A modern computer laboratory with guided digital learning, foundational coding exposure, and technology-enabled practice sessions to strengthen students\' computer literacy.',
			},
		],
	},
	{
		category: 'Health & Safety',
		icon: <Shield className="w-12 h-12" />,
		title: 'Safety & Security',
		color: 'from-blue-500 to-indigo-600',
		image: '/webp/safety.webp',
		overview: '',
		technology: '24/7 CCTV surveillance, GPS-enabled school transport, and trained security personnel to provide a safe campus environment.',
		experience: '',
		access: '',
		viewAllImage: '/webp/safety2.webp',
	},
	{
		category: 'Infrastructure',
		icon: <Dumbbell className="w-12 h-12" />,
		title: 'Playgrounds',
		color: 'from-orange-500 to-red-500',
		image: '/webp/sports.webp',
		overview: '',
		technology: 'Wide and well-maintained play areas that support sports, fitness, and outdoor learning.',
		experience: '',
		access: '',
		viewAllImage: '/webp/sports2.webp',
	},
	{
		category: 'Additional Facilities',
		icon: <Bus className="w-12 h-12" />,
		title: 'Transportation',
		color: 'from-purple-500 to-pink-500',
		image: '/webp/transportation.webp',
		overview: '',
		technology: 'A reliable fleet of school buses with experienced drivers, ensuring safe and comfortable travel for students.',
		experience: '',
		access: '',
		viewAllImage: '/webp/transportation2.webp',
	},
];

const resolveImageUrl = (value: string) => {
	if (!/^https?:\/\//i.test(value)) {
		return getPublicAssetUrl(value);
	}

	// Apply Cloudinary auto optimization for faster delivery when a direct URL is used.
	if (value.includes('res.cloudinary.com/') && value.includes('/image/upload/')) {
		return value.replace('/image/upload/', '/image/upload/f_auto,q_auto,w_1200/');
	}

	return value;
};

const getFacilityTheme = (title: string) => {
	switch (title) {
		case 'Smart Classrooms':
			return {
				panel: 'bg-blue-50 border-blue-200',
				icon: 'bg-blue-600',
			};
		case 'Library':
			return {
				panel: 'bg-amber-50 border-amber-200',
				icon: 'bg-amber-600',
			};
		case 'Laboratories':
			return {
				panel: 'bg-emerald-50 border-emerald-200',
				icon: 'bg-emerald-600',
			};
		case 'Safety & Security':
			return {
				panel: 'bg-indigo-50 border-indigo-200',
				icon: 'bg-indigo-600',
			};
		case 'Playgrounds':
			return {
				panel: 'bg-orange-50 border-orange-200',
				icon: 'bg-orange-600',
			};
		case 'Transportation':
			return {
				panel: 'bg-fuchsia-50 border-fuchsia-200',
				icon: 'bg-fuchsia-600',
			};
		default:
			return {
				panel: 'bg-slate-50 border-slate-200',
				icon: 'bg-slate-600',
			};
	}
};

// Helper component for animated facility card in View More modal
const AnimatedFacilityCard = ({ facility, index }: { facility: Facility; index: number }) => {
  const imageFade = useScrollFadeIn<HTMLDivElement>('up', 0.7, 0.05 * index);
  const textFade = useScrollFadeIn<HTMLDivElement>('down', 0.7, 0.1 + 0.05 * index);
	const theme = getFacilityTheme(facility.title);
  return (
    <div className="space-y-6">
      {(index === 0 || facilities[index - 1].category !== facility.category) && (
        <h4 className="text-2xl sm:text-3xl font-bold text-[#1E3F8A] border-l-4 border-[#1E3F8A] pl-4">
          {facility.category}
        </h4>
      )}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-8 rounded-2xl shadow-lg bg-white p-8">
        {index % 2 === 0 ? (
          <>
            {facility.title !== 'Laboratories' && (
              <div className="flex-1 flex items-center justify-center order-1" {...imageFade}>
										<img
											src={resolveImageUrl(facility.viewAllImage || facility.image)}
											alt={facility.title}
											className="rounded-none w-full object-cover shadow-lg"
											loading="lazy"
											decoding="async"
										/>
              </div>
            )}
						<div className={`flex-1 flex flex-col justify-center order-2 rounded-2xl border p-6 ${theme.panel}`} {...textFade}>
							<div className={`${theme.icon} text-white w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                {facility.icon}
              </div>
              <h4 className="text-3xl font-bold mb-4 text-gray-800">{facility.title}</h4>
              {renderFacilityDetails(facility)}
            </div>
          </>
        ) : (
          <>
						<div className={`flex-1 flex flex-col justify-center order-2 lg:order-1 rounded-2xl border p-6 ${theme.panel}`} {...textFade}>
							<div className={`${theme.icon} text-white w-20 h-20 rounded-2xl flex items-center justify-center mb-6`}>
                {facility.icon}
              </div>
              <h4 className="text-3xl font-bold mb-4 text-gray-800">{facility.title}</h4>
              {renderFacilityDetails(facility)}
            </div>
            {facility.title !== 'Laboratories' && (
              <div className="flex-1 flex items-center justify-center order-1 lg:order-2" {...imageFade}>
										<img
											src={resolveImageUrl(facility.viewAllImage || facility.image)}
											alt={facility.title}
											className="rounded-none w-full object-cover shadow-lg"
											loading="lazy"
											decoding="async"
										/>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const renderFacilityDetails = (facility: Facility) => (
  <div className="space-y-3">
    <div>
      <span className="font-semibold text-gray-700">Details:</span>{' '}
      <span className="text-gray-600">{facility.technology}</span>
    </div>
    {facility.title === 'Laboratories' && facility.labSections && facility.labSections.length > 0 && (
      <div>
        <p className="font-semibold text-gray-700 mb-4 text-lg">Laboratory Sections:</p>
        <div className="space-y-6">
          {facility.labSections.map((lab, index) => (
            <div
              key={lab.title}
              className={`rounded-2xl bg-white border border-gray-200 shadow-md p-4 sm:p-6 flex flex-col md:items-stretch gap-5 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
							<img
								src={resolveImageUrl(lab.image)}
								alt={lab.title}
								className="w-full md:w-[48%] h-56 sm:h-64 md:h-72 rounded-none object-cover"
								loading="lazy"
								decoding="async"
							/>
              <div className="flex-1 text-left flex flex-col justify-center">
                <p className="text-gray-900 font-bold text-2xl mb-3">{lab.title}</p>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">{lab.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
	</div>
);

const FacilitiesSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [isViewAllOpen, setIsViewAllOpen] = useState(false);

	useEffect(() => {
		if (isViewAllOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isViewAllOpen]);

	const goToSlide = (idx: number) => setCurrentSlide(idx);
	const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % facilities.length);
	const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + facilities.length) % facilities.length);

	const idx = (value: number) => (value + facilities.length) % facilities.length;
	const visibleCards = [
		idx(currentSlide - 2),
		idx(currentSlide - 1),
		currentSlide,
		idx(currentSlide + 1),
		idx(currentSlide + 2),
	];

	return (
		<section id="facilities" className="relative overflow-hidden pt-0 mt-0 py-14 md:py-16 pb-0">
			<ParticlesBackground />
			<div className="relative z-10 max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
				<div className="mb-8 sm:mb-10">
					<h2 className="text-5xl font-medium" style={{ color: '#3f3f46' }}>
						Facilities
					</h2>
				</div>

				<div className="relative max-w-full mx-auto py-4 sm:py-6">
					<div className="relative flex items-center justify-center py-4 sm:py-6 overflow-hidden">
						<button
							onClick={prevSlide}
							className="absolute left-0 sm:left-2 md:left-4 lg:left-5 z-20 bg-white border border-blue-600 text-blue-600 rounded-full p-2 sm:p-3 shadow-md hover:bg-blue-50 transition-colors"
							aria-label="Previous Facility"
							style={{ top: '50%', transform: 'translateY(-50%)' }}
						>
							<ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
						</button>

						<div className="w-full px-1 sm:px-10 md:px-14 lg:px-16">
							<div className="flex items-center justify-center w-full gap-1 sm:gap-3">
								{visibleCards.map((facilityIndex, position) => {
									const facility = facilities[facilityIndex];
									const isCenter = position === 2;
									const isNearSide = position === 1 || position === 3;

									return (
										<div
											key={`${facility.title}-${position}`}
											className={`relative rounded-lg bg-cover bg-center shadow-xl h-[300px] sm:h-[460px] md:h-[520px] transition-all duration-500 ${
												isCenter
												? 'w-[48vw] max-w-[240px] sm:w-[58vw] md:w-[60vw] lg:w-[62vw] sm:max-w-[780px] opacity-100'
												: isNearSide
													? 'w-[12vw] min-w-[44px] sm:w-[100px] md:w-[118px] lg:w-[125px] opacity-95 cursor-pointer hover:scale-105'
													: 'w-[9vw] min-w-[34px] lg:w-[88px] xl:w-[98px] opacity-85 cursor-pointer hover:scale-105'
											}`}
											onClick={!isCenter ? () => setCurrentSlide(facilityIndex) : undefined}
										>
											<img
												src={resolveImageUrl(facility.image)}
												alt={facility.title}
												className="absolute inset-0 w-full h-full object-cover rounded-lg"
												loading={isCenter ? 'eager' : 'lazy'}
												decoding="async"
											/>
											<div className="absolute inset-0 bg-black/30 rounded-lg" />

											<div className="absolute z-10 left-0 right-0 bottom-0 flex flex-col items-center px-2 pb-4 sm:pb-8 text-center">
												<div className="w-full flex flex-col items-center">
													<div
														className={`bg-gradient-to-br ${facility.color} text-white rounded-2xl flex items-center justify-center shadow-lg transition-all duration-500 ${
															isCenter
																? 'w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 scale-100 opacity-100'
																: 'w-10 h-10 sm:w-14 sm:h-14 scale-90 opacity-100'
														}`}
													>
														{facility.icon}
													</div>
													{isCenter && (
														<h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mt-3 drop-shadow-lg leading-tight">
															{facility.title}
														</h3>
													)}
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>

						<button
							onClick={nextSlide}
							className="absolute right-0 sm:right-2 md:right-4 lg:right-5 z-20 bg-white border border-blue-600 text-blue-600 rounded-full p-2 sm:p-3 shadow-md hover:bg-blue-50 transition-colors"
							aria-label="Next Facility"
							style={{ top: '50%', transform: 'translateY(-50%)' }}
						>
							<ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
						</button>
					</div>

					<div className="hidden justify-center gap-2 mt-6">
						{facilities.map((_, index) => (
							<button
								key={index}
								onClick={() => goToSlide(index)}
								className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'}`}
								aria-label={`Go to slide ${index + 1}`}
							/>
						))}
					</div>
				</div>

				<div className="mt-2 mb-0 text-center">
					<button
						onClick={() => setIsViewAllOpen(true)}
						className="px-10 py-3 bg-[#2f3f9f] text-white rounded-md font-bold hover:bg-[#2a3687] transition-colors duration-300"
					>
						View More
					</button>
				</div>
			</div>

			{isViewAllOpen && (
				<div className="fixed inset-0 z-50 bg-white overflow-y-auto overscroll-contain">
					<div className="max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4 py-8 sm:py-10">
						<div className="flex justify-between items-center mb-8 sticky top-0 bg-white/95 backdrop-blur-sm py-4 z-10">
							<h3 className="text-3xl sm:text-4xl font-bold text-gray-800">All Facilities</h3>
							<button
								onClick={() => setIsViewAllOpen(false)}
								className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-100 text-gray-700 rounded-full font-semibold hover:bg-gray-200 transition-colors"
							>
								<X className="w-5 h-5" />
								Exit
							</button>
						</div>
						<div className="space-y-16 pb-8">
							{facilities.map((facility, index) => (
								<AnimatedFacilityCard key={`view-all-${index}`} facility={facility} index={index} />
							))}
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default FacilitiesSection;
