import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import emailjs from 'emailjs-com';

type AdmissionFormData = {
  childName: string;
  dateOfBirth: string;
  sex: string;
  bloodGroup: string;
  contactNumber: string;
  contactType: string;
  fatherName: string;
  fatherNationality: string;
  fatherOccupation: string;
  fatherOfficeAddressTel: string;
  fatherDistanceFromSchool: string;
  fatherPermanentAddress: string;
  fatherMonthlyIncome: string;
  motherName: string;
  motherNationality: string;
  motherOccupation: string;
  motherOfficeAddressTel: string;
  motherDistanceFromSchool: string;
  motherPermanentAddress: string;
  motherMonthlyIncome: string;
  guardianName: string;
  guardianNationality: string;
  guardianOccupation: string;
  guardianOfficeAddressTel: string;
  guardianDistanceFromSchool: string;
  guardianPermanentAddress: string;
  guardianMonthlyIncome: string;
  classAdmission: string;
  tcAttached: string;
  howKnow: string;
};

const initialFormData: AdmissionFormData = {
  childName: '',
  dateOfBirth: '',
  sex: '',
  bloodGroup: '',
  contactNumber: '',
  contactType: '',
  fatherName: '',
  fatherNationality: '',
  fatherOccupation: '',
  fatherOfficeAddressTel: '',
  fatherDistanceFromSchool: '',
  fatherPermanentAddress: '',
  fatherMonthlyIncome: '',
  motherName: '',
  motherNationality: '',
  motherOccupation: '',
  motherOfficeAddressTel: '',
  motherDistanceFromSchool: '',
  motherPermanentAddress: '',
  motherMonthlyIncome: '',
  guardianName: '',
  guardianNationality: '',
  guardianOccupation: '',
  guardianOfficeAddressTel: '',
  guardianDistanceFromSchool: '',
  guardianPermanentAddress: '',
  guardianMonthlyIncome: '',
  classAdmission: '',
  tcAttached: '',
  howKnow: '',
};

const AdmissionPopup = () => {
  const [showForm, setShowForm] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AdmissionFormData>(initialFormData);

  useEffect(() => {
    const handleOpen = () => {
      setShowForm(true);
    };

    window.addEventListener('openAdmission', handleOpen);
    return () => window.removeEventListener('openAdmission', handleOpen);
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showForm]);

  const closeAll = () => {
    setShowForm(false);
    setShowThankYou(false);
  };

  const clearForm = () => {
    setFormData(initialFormData);
    setShowThankYou(false);
    setShowForm(false);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    const normalizedValue =
      type === 'date' || type === 'tel' ? value : value.toUpperCase();

    setFormData((prev) => ({
      ...prev,
      [name]: normalizedValue,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ADMISSION;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error('Missing one or more EmailJS environment values');
      }

      const allDetails = [
        `Child Name: ${formData.childName || '-'}`,
        `Date of Birth: ${formData.dateOfBirth || '-'}`,
        `Sex: ${formData.sex || '-'}`,
        `Blood Group: ${formData.bloodGroup || 'NOT PROVIDED'}`,
        `Contact Type: ${formData.contactType || '-'}`,
        `Contact Number: ${formData.contactNumber || '-'}`,
        `Class for Admission: ${formData.classAdmission || '-'}`,
        `Transfer Certificate Attached: ${formData.tcAttached || '-'}`,
        `How do you know about MVM?: ${formData.howKnow || '-'}`,
        '',
        `Father Name: ${formData.fatherName || '-'}`,
        `Father Nationality: ${formData.fatherNationality || '-'}`,
        `Father Occupation: ${formData.fatherOccupation || '-'}`,
        `Father Office Address & Tel: ${formData.fatherOfficeAddressTel || '-'}`,
        `Father Distance from School: ${formData.fatherDistanceFromSchool || '-'}`,
        `Father Permanent Address: ${formData.fatherPermanentAddress || '-'}`,
        `Father Monthly Income: ${formData.fatherMonthlyIncome || '-'}`,
        '',
        `Mother Name: ${formData.motherName || '-'}`,
        `Mother Nationality: ${formData.motherNationality || '-'}`,
        `Mother Occupation: ${formData.motherOccupation || '-'}`,
        `Mother Office Address & Tel: ${formData.motherOfficeAddressTel || '-'}`,
        `Mother Distance from School: ${formData.motherDistanceFromSchool || '-'}`,
        `Mother Permanent Address: ${formData.motherPermanentAddress || '-'}`,
        `Mother Monthly Income: ${formData.motherMonthlyIncome || '-'}`,
        '',
        `Guardian Name: ${formData.guardianName || '-'}`,
        `Guardian Nationality: ${formData.guardianNationality || '-'}`,
        `Guardian Occupation: ${formData.guardianOccupation || '-'}`,
        `Guardian Office Address & Tel: ${formData.guardianOfficeAddressTel || '-'}`,
        `Guardian Distance from School: ${formData.guardianDistanceFromSchool || '-'}`,
        `Guardian Permanent Address: ${formData.guardianPermanentAddress || '-'}`,
        `Guardian Monthly Income: ${formData.guardianMonthlyIncome || '-'}`,
      ].join('\n');

      const templateParams = {
        to_email: 'mvmofficepollachi@gmail.com',
        from_name: formData.childName || 'ADMISSION ENQUIRY',
        name: formData.childName || '-',
        email: '-',
        phone: formData.contactNumber || '-',
        message: allDetails,
        all_details: allDetails,
        child_name: formData.childName,
        date_of_birth: formData.dateOfBirth,
        sex: formData.sex,
        blood_group: formData.bloodGroup || 'NOT PROVIDED',
        contact_number: formData.contactNumber,
        contact_type: formData.contactType,
        class_admission: formData.classAdmission,
        tc_attached: formData.tcAttached,
        how_know: formData.howKnow,
        father_name: formData.fatherName || '-',
        father_nationality: formData.fatherNationality || '-',
        father_occupation: formData.fatherOccupation || '-',
        father_office_address_tel: formData.fatherOfficeAddressTel || '-',
        father_distance_from_school: formData.fatherDistanceFromSchool || '-',
        father_permanent_address: formData.fatherPermanentAddress || '-',
        father_monthly_income: formData.fatherMonthlyIncome || '-',
        mother_name: formData.motherName || '-',
        mother_nationality: formData.motherNationality || '-',
        mother_occupation: formData.motherOccupation || '-',
        mother_office_address_tel: formData.motherOfficeAddressTel || '-',
        mother_distance_from_school: formData.motherDistanceFromSchool || '-',
        mother_permanent_address: formData.motherPermanentAddress || '-',
        mother_monthly_income: formData.motherMonthlyIncome || '-',
        guardian_name: formData.guardianName || '-',
        guardian_nationality: formData.guardianNationality || '-',
        guardian_occupation: formData.guardianOccupation || '-',
        guardian_office_address_tel: formData.guardianOfficeAddressTel || '-',
        guardian_distance_from_school: formData.guardianDistanceFromSchool || '-',
        guardian_permanent_address: formData.guardianPermanentAddress || '-',
        guardian_monthly_income: formData.guardianMonthlyIncome || '-',
        submission_date: new Date().toLocaleString(),
      };

      try {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      } catch (sendError) {
        const fallbackResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,
            template_params: templateParams,
          }),
        });

        if (!fallbackResponse.ok) {
          const fallbackText = await fallbackResponse.text();
          throw new Error(`EmailJS fallback failed (${fallbackResponse.status}): ${fallbackText || 'Unknown error'}`);
        }

        console.warn('EmailJS SDK request failed, but REST fallback succeeded:', sendError);
      }

      setShowThankYou(true);
    } catch (error) {
      console.error('Admission form email failed:', error);
      alert('Failed to submit form. If Tracking Prevention or Ad Blocker is enabled, allow emailjs.com and try again, or call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {showForm && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm"
            onClick={closeAll}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="fixed inset-0 z-[91] flex items-center justify-center p-4"
          >
            <div
              className="relative max-h-[94vh] w-full max-w-5xl overflow-y-auto overscroll-contain rounded-2xl bg-white shadow-2xl"
            >
              <div className="sticky top-0 z-10 rounded-t-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
                <button
                  onClick={closeAll}
                  className="absolute right-4 top-4 rounded-full bg-white/20 p-2 hover:bg-white/30"
                  aria-label="Close admission form"
                >
                  <X size={18} />
                </button>
                <h3 className="text-center text-2xl font-bold">Admission Enquiry Form</h3>
              </div>

              {showThankYou ? (
                <div className="p-10 text-center">
                  <div className="mb-3 text-5xl">✅</div>
                  <h4 className="mb-3 text-2xl font-bold text-green-700">Thank you! Your enquiry has been submitted.</h4>
                  <p className="mb-6 text-gray-600">Our team will contact you shortly.</p>
                  <button
                    onClick={clearForm}
                    className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 p-6">
                  <div className="rounded-xl bg-blue-50 p-5">
                    <h4 className="mb-4 text-lg font-bold text-blue-900">Child Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Child Name *</label>
                        <input
                          name="childName"
                          value={formData.childName}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Date of Birth *</label>
                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Gender *</label>
                        <select
                          name="sex"
                          value={formData.sex}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select</option>
                          <option value="MALE">Male</option>
                          <option value="FEMALE">Female</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Blood Group</label>
                        <select
                          name="bloodGroup"
                          value={formData.bloodGroup}
                          onChange={handleInputChange}
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select Blood Group</option>
                          <option value="A+">A+</option>
                          <option value="A-">A-</option>
                          <option value="B+">B+</option>
                          <option value="B-">B-</option>
                          <option value="AB+">AB+</option>
                          <option value="AB-">AB-</option>
                          <option value="O+">O+</option>
                          <option value="O-">O-</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Contact Type *</label>
                        <select
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select</option>
                          <option value="FATHER">Father</option>
                          <option value="MOTHER">Mother</option>
                          <option value="GUARDIAN">Guardian</option>
                        </select>
                      </div>
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Contact Number *</label>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-purple-50 p-5">
                    <h4 className="mb-4 text-lg font-bold text-purple-900">Details of Parents/Guardian</h4>
                    <div className="overflow-x-auto rounded-xl border border-purple-200">
                      <table className="min-w-[860px] w-full border-collapse text-sm">
                        <thead>
                          <tr className="bg-purple-200/70">
                            <th className="border border-purple-200 px-3 py-3 text-left font-bold text-gray-800"> </th>
                            <th className="border border-purple-200 px-3 py-3 text-left font-bold text-gray-800">Father</th>
                            <th className="border border-purple-200 px-3 py-3 text-left font-bold text-gray-800">Mother</th>
                            <th className="border border-purple-200 px-3 py-3 text-left font-bold text-gray-800">Guardian</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Name (Capital)</td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="fatherName"
                                value={formData.fatherName}
                                onChange={handleInputChange}
                                placeholder="NAME"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="motherName"
                                value={formData.motherName}
                                onChange={handleInputChange}
                                placeholder="NAME"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="guardianName"
                                value={formData.guardianName}
                                onChange={handleInputChange}
                                placeholder="NAME"
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Nationality</td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="fatherNationality"
                                value={formData.fatherNationality}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="motherNationality"
                                value={formData.motherNationality}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="guardianNationality"
                                value={formData.guardianNationality}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Occupation</td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="fatherOccupation"
                                value={formData.fatherOccupation}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="motherOccupation"
                                value={formData.motherOccupation}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="guardianOccupation"
                                value={formData.guardianOccupation}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Office Address & Tel</td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="fatherOfficeAddressTel"
                                value={formData.fatherOfficeAddressTel}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="motherOfficeAddressTel"
                                value={formData.motherOfficeAddressTel}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="guardianOfficeAddressTel"
                                value={formData.guardianOfficeAddressTel}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Distance from School</td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="fatherDistanceFromSchool"
                                value={formData.fatherDistanceFromSchool}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="motherDistanceFromSchool"
                                value={formData.motherDistanceFromSchool}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="guardianDistanceFromSchool"
                                value={formData.guardianDistanceFromSchool}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Permanent Address</td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="fatherPermanentAddress"
                                value={formData.fatherPermanentAddress}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="motherPermanentAddress"
                                value={formData.motherPermanentAddress}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <textarea
                                name="guardianPermanentAddress"
                                value={formData.guardianPermanentAddress}
                                onChange={handleInputChange}
                                rows={2}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>

                          <tr className="bg-white/70">
                            <td className="border border-purple-200 px-3 py-3 font-semibold text-gray-800">Monthly Income</td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="fatherMonthlyIncome"
                                value={formData.fatherMonthlyIncome}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="motherMonthlyIncome"
                                value={formData.motherMonthlyIncome}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                            <td className="border border-purple-200 p-2">
                              <input
                                name="guardianMonthlyIncome"
                                value={formData.guardianMonthlyIncome}
                                onChange={handleInputChange}
                                className="w-full rounded-md border border-gray-300 px-3 py-2"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="rounded-xl bg-indigo-50 p-5">
                    <h4 className="mb-4 text-lg font-bold text-indigo-900">Academic & Transfer Information</h4>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Class for Admission *</label>
                        <select
                          name="classAdmission"
                          value={formData.classAdmission}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select Class</option>
                          <option value="NURSERY">Nursery</option>
                          <option value="LKG">LKG</option>
                          <option value="UKG">UKG</option>
                          <option value="CLASS 1">Class 1</option>
                          <option value="CLASS 2">Class 2</option>
                          <option value="CLASS 3">Class 3</option>
                          <option value="CLASS 4">Class 4</option>
                          <option value="CLASS 5">Class 5</option>
                          <option value="CLASS 6">Class 6</option>
                          <option value="CLASS 7">Class 7</option>
                          <option value="CLASS 8">Class 8</option>
                        </select>
                      </div>

                      <div>
                        <label className="mb-1 block text-sm font-semibold text-gray-700">Transfer Certificate Attached? *</label>
                        <select
                          name="tcAttached"
                          value={formData.tcAttached}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select</option>
                          <option value="YES">Yes</option>
                          <option value="NO">No</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <label className="mb-1 block text-sm font-semibold text-gray-700">How do you know about MVM? *</label>
                        <select
                          name="howKnow"
                          value={formData.howKnow}
                          onChange={handleInputChange}
                          required
                          className="w-full rounded-lg border border-gray-300 px-3 py-2"
                        >
                          <option value="">Select</option>
                          <option value="SOCIAL MEDIA">Social media</option>
                          <option value="NEIGHBOUR HOOD/ FAMILY">Neighbour Hood/ Family</option>
                          <option value="ADVERTISEMENT">Advertisement</option>
                          <option value="BY OWN">By own</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-end gap-3">
                    <button
                      type="button"
                      onClick={clearForm}
                      className="rounded-lg border-2 border-gray-400 px-6 py-2 font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Clear
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdmissionPopup;
