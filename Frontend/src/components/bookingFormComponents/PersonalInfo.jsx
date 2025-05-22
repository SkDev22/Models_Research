import { motion } from "framer-motion";

const PersonalInfo = ({ data, onChange, errors }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">
            Emergency Contact Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.emergencyContactName || ""}
            onChange={(e) => onChange({ emergencyContactName: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 ${
              errors.emergencyContactName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Parent or guardian name"
          />
          {errors.emergencyContactName && (
            <p className="text-red-500 text-sm mt-1">{errors.emergencyContactName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Emergency Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            value={data.emergencyContactNumber || ""}
            onChange={(e) => onChange({ emergencyContactNumber: e.target.value })}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-200 focus:border-amber-500 ${
              errors.emergencyContactNumber ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Emergency contact number"
          />
          {errors.emergencyContactNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.emergencyContactNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Medical Conditions</label>
          <textarea
            value={data.medicalConditions || ""}
            onChange={(e) => onChange({ medicalConditions: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:ring-2 focus:ring-amber-200 focus:border-amber-500"
            placeholder="Any medical conditions we should be aware of? (Optional)"
          />
        </div>

        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <p className="text-sm text-amber-800">
            <span className="font-semibold text-amber-900">Privacy Notice:</span> Your information will be handled securely and only used for accommodation and emergency purposes.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalInfo;
