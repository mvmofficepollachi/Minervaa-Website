import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

type CareerFormData = {
  personName: string;
  dateOfBirth: string;
  emailId: string;
  phoneNumber: string;
  address: string;
  tenthSchoolCategory: string;
  twelfthSchoolCategory: string;
  tenthSchoolName: string;
  twelfthSchoolName: string;
  mediumOfStudying: string;
  tenthPercent: string;
  twelfthPercent: string;
  collegeName: string;
  qualification: string;
  collegePercent: string;
  bedCompleted: string;
  bedPercent: string;
  experience: string;
  extraSkills: string;
  coCurricularActivities: string;
  knownLanguages: string;
  maritalStatus: string;
  fatherOrHusbandName: string;
  kidsHaveOrNot: string;
  theirContactNo: string;
  whyChooseMinervaa: string;
};

const initialFormData: CareerFormData = {
  personName: '',
  dateOfBirth: '',
  emailId: '',
  phoneNumber: '',
  address: '',
  tenthSchoolCategory: '',
  twelfthSchoolCategory: '',
  tenthSchoolName: '',
  twelfthSchoolName: '',
  mediumOfStudying: '',
  tenthPercent: '',
  twelfthPercent: '',
  collegeName: '',
  qualification: '',
  collegePercent: '',
  bedCompleted: '',
  bedPercent: '',
  experience: '',
  extraSkills: '',
  coCurricularActivities: '',
  knownLanguages: '',
  maritalStatus: '',
  fatherOrHusbandName: '',
  kidsHaveOrNot: '',
  theirContactNo: '',
  whyChooseMinervaa: '',
};

const CareersSection = () => {
  const [formData, setFormData] = useState<CareerFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  const [showCareerForm, setShowCareerForm] = useState(false);

  useEffect(() => {
    if (showCareerForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showCareerForm]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_CAREER;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS environment variables are missing.');
      }

      emailjs.init(publicKey);

      // Map form fields to EmailJS template variables for career form
      const templateParams = {
        person_name: formData.personName,
        dob: formData.dateOfBirth,
        email: formData.emailId,
        phone: formData.phoneNumber,
        address: formData.address,
        schooling_10th: formData.tenthSchoolCategory,
        school_name_10th: formData.tenthSchoolName,
        medium_10th: formData.mediumOfStudying,
        percent_10th: formData.tenthPercent,
        schooling_12th: formData.twelfthSchoolCategory,
        school_name_12th: formData.twelfthSchoolName,
        medium_12th: formData.mediumOfStudying,
        percent_12th: formData.twelfthPercent,
        college_name: formData.collegeName,
        qualification: formData.qualification,
        college_percent: formData.collegePercent,
        bed_completed: formData.bedCompleted,
        bed_percent: formData.bedPercent,
        experience: formData.experience,
        extra_skills: formData.extraSkills,
        co_curricular: formData.coCurricularActivities,
        known_languages: formData.knownLanguages,
        marital_status: formData.maritalStatus,
        father_husband_name: formData.fatherOrHusbandName,
        kids: formData.kidsHaveOrNot,
        contact_number: formData.theirContactNo,
        why_minervaa: formData.whyChooseMinervaa,
      };

      await emailjs.send(serviceId, templateId, templateParams);

      setSubmitStatus({
        type: 'success',
        message: 'Your application has been received successfully! We will contact you soon.',
      });
      setFormData(initialFormData);
    } catch (error) {
      console.error('Career form email failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit the form. Please try again or contact us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="careers" className="py-14 md:py-16 bg-gradient-to-b from-indigo-50 to-white">
      <div className="max-w-[95rem] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="text-center mb-10 md:mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight" style={{ color: '#1E3F8A' }}>
            Careers at Minervaa
            <span className="inline-block align-middle ml-2">
              {/* Sparkles icon for shining effect, use lucide-react Sparkles if available */}
              <svg className="w-7 h-7 text-yellow-400 drop-shadow-md animate-spin-slow" fill="none" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 4.87L16.18 21 12 17.77 7.82 21l1.18-6.86-5-4.87 5.91-1.01L12 2z" fill="currentColor"/></svg>
            </span>
          </h2>
          <div className="w-24 h-1.5 bg-indigo-500 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Build your career in a supportive and inspiring school environment.
Be part of a journey that shapes both educators and learners.

          </p>
        </div>

        <div className="flex justify-center animate-fade-in-up delay-100">
          <button
            type="button"
            onClick={() => setShowCareerForm(true)}
            className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all"
          >
            Open Career Form
          </button>
        </div>

        {showCareerForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
            <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-indigo-100 relative max-h-[90vh] overflow-y-auto overscroll-contain">
              <div className="sticky top-0 z-10 -mt-4 mb-2 flex justify-end bg-white/95 pt-2 pb-3 backdrop-blur-sm">
                <button
                  type="button"
                  onClick={() => setShowCareerForm(false)}
                  className="text-2xl leading-none text-gray-500 hover:text-red-500"
                  aria-label="Close career form"
                >
                  x
                </button>
              </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="personName" className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    required
                    id="personName"
                    name="personName"
                    value={formData.personName || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Enter your name"
                    autoComplete="name"
                  />
                </div>
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-semibold text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    required
                    id="dateOfBirth"
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    autoComplete="bday"
                  />
                </div>
                <div>
                  <label htmlFor="emailId" className="block text-sm font-semibold text-gray-700 mb-1">Email ID *</label>
                  <input
                    required
                    id="emailId"
                    type="email"
                    name="emailId"
                    value={formData.emailId || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="your.email@example.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    required
                    id="phoneNumber"
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Your contact number"
                    autoComplete="tel"
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">Address *</label>
                  <textarea
                    required
                    id="address"
                    name="address"
                    value={formData.address || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                    placeholder="Your full address"
                    autoComplete="street-address"
                  />
                </div>
              </div>
            </div>

            {/* Schooling */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">
                Schooling Background
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Medium of Studying *</label>
                  <select
                    required
                    name="mediumOfStudying"
                    value={formData.mediumOfStudying}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Medium</option>
                    <option value="ENGLISH">English</option>
                    <option value="TAMIL">Tamil</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 md:col-span-3 font-medium text-gray-800 border-b pb-1">10th Standard Details</div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    name="tenthSchoolCategory"
                    value={formData.tenthSchoolCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="MATRICULATION">Matriculation</option>
                    <option value="CBSE">CBSE</option>
                    <option value="STATEBOARD">Stateboard</option>
                    <option value="ICSE">ICSE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School Name *</label>
                  <input
                    required
                    name="tenthSchoolName"
                    value={formData.tenthSchoolName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Name of school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Percentage Scored (%) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="tenthPercent"
                    value={formData.tenthPercent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 85.5"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="col-span-1 md:col-span-3 font-medium text-gray-800 border-b pb-1">12th Standard Details</div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Category *</label>
                  <select
                    required
                    name="twelfthSchoolCategory"
                    value={formData.twelfthSchoolCategory}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Category</option>
                    <option value="MATRICULATION">Matriculation</option>
                    <option value="CBSE">CBSE</option>
                    <option value="STATEBOARD">Stateboard</option>
                    <option value="ICSE">ICSE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">School Name *</label>
                  <input
                    required
                    name="twelfthSchoolName"
                    value={formData.twelfthSchoolName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Name of school"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Percentage Scored (%) *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="twelfthPercent"
                    value={formData.twelfthPercent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 88.0"
                  />
                </div>
              </div>
            </div>

            {/* Higher Education */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">
                College & Higher Education
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Name of the College *</label>
                  <input
                    required
                    name="collegeName"
                    value={formData.collegeName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="College Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Qualification (Degree) *</label>
                  <input
                    required
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. B.A. English, M.Sc. Maths"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1"> Percentage Scored *</label>
                  <input
                    required
                    type="number"
                    step="0.01"
                    name="collegePercent"
                    value={formData.collegePercent}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. 75.0"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-indigo-50 rounded-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">B.Ed Completed? *</label>
                  <select
                    required
                    name="bedCompleted"
                    value={formData.bedCompleted}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Option</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                    <option value="PURSUING">Currently Pursuing</option>
                  </select>
                </div>
                {formData.bedCompleted === 'YES' && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">B.Ed Percentage (%) *</label>
                    <input
                      required={formData.bedCompleted === 'YES'}
                      type="number"
                      step="0.01"
                      name="bedPercent"
                      value={formData.bedPercent}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                      placeholder="e.g. 80.0"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Experience & Skills */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">
                Professional Background & Skills
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Experience Level *</label>
                  <select
                    required
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Experience</option>
                    <option value="FRESHER">Fresher</option>
                    <option value="EXPERIENCED">Experienced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Known Languages *</label>
                  <input
                    required
                    name="knownLanguages"
                    value={formData.knownLanguages}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. English, Tamil, Hindi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Skills</label>
                  <textarea
                    name="extraSkills"
                    value={formData.extraSkills}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Computer programming, Art, Music"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Co-curricular Activities</label>
                  <textarea
                    name="coCurricularActivities"
                    value={formData.coCurricularActivities}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="e.g. Sports, Debate, Drama"
                  />
                </div>
              </div>
            </div>

            {/* Family Details */}
            <div>
              <h3 className="text-2xl font-bold text-indigo-900 border-b border-indigo-100 pb-2 mb-6">
                Family Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Marital Status *</label>
                  <select
                    required
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Status</option>
                    <option value="UNMARRIED">Unmarried</option>
                    <option value="MARRIED">Married</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Do you have kids? *</label>
                  <select
                    required
                    name="kidsHaveOrNot"
                    value={formData.kidsHaveOrNot}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select Option</option>
                    <option value="NO">No</option>
                    <option value="YES">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Father or Husband's Name *</label>
                  <input
                    required
                    name="fatherOrHusbandName"
                    value={formData.fatherOrHusbandName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label htmlFor="theirContactNo" className="block text-sm font-semibold text-gray-700 mb-1">Contact Number *</label>
                  <input
                    required
                    id="theirContactNo"
                    type="tel"
                    name="theirContactNo"
                    value={formData.theirContactNo || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                    placeholder="Contact number"
                    autoComplete="tel"
                  />
                </div>
              </div>
            </div>

            {/* Why Choose */}
            <div>
              <label className="block text-base font-bold text-indigo-900 mb-2">
                Why do you choose Minervaa Vidhya Mandhir? *
              </label>
              <textarea
                required
                name="whyChooseMinervaa"
                value={formData.whyChooseMinervaa}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                placeholder="Kindly explain why you are interested in joining our institution..."
              />
            </div>

            {submitStatus.type && (
              <div
                className={`p-4 rounded-lg font-medium text-center ${
                  submitStatus.type === 'success'
                    ? 'bg-green-100 text-green-800 border border-green-200'
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Career Application'}
              </button>
            </div>
          </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default CareersSection;