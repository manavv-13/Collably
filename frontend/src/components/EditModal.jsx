import { useState, useEffect, useContext } from "react";
import alertContext from "../context/alert/alertContext";
import { motion } from "framer-motion";

const EditModal = ({ isOpen, field, value, onSave, setIsModalOpen }) => {
  const [newValue, setNewValue] = useState(value);
  const [selectedFile, setSelectedFile] = useState(null); // For image upload
  const aContext = useContext(alertContext);

  const { msg } = aContext;

  useEffect(() => {
    if (isOpen) {
      setNewValue(value);
      setSelectedFile(null);
    }
  }, [isOpen, value]);

  if (!isOpen) return null;

  const specialityOptions = [
    "Technology & Gadgets",
    "Fashion & Beauty",
    "Health & Fitness",
    "Food & Cooking",
    "Finance & Business",
    "Gaming & Esports",
    "Travel & Adventure",
    "Education & Motivation",
    "Lifestyle & Vlogs",
    "Entertainment & Comedy",
  ];

  const handleSave = () => {
    if (field === "profilePhoto") {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("profilePhoto", selectedFile);
      formData.append("field", field);
      onSave(field, formData);
    } else if(field==="coverPhoto"){
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("coverPhoto", selectedFile);
      formData.append("field", field);
      onSave(field, formData);
    }else {
      onSave(field, newValue);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      {msg && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-purple-500 text-white px-5 py-3 rounded-xl shadow-md border border-white"
        >
          <i className="fas fa-info-circle text-white text-lg"></i>
          <p className="text-sm md:text-base font-medium">{msg}</p>
        </motion.div>
      )}
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-semibold">Edit {field}</h2>

          {/* Conditional Inputs */}
          {field === "speciality" ? (
            <select
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full p-2 mt-2 border rounded-lg"
            >
              <option value="" disabled>
                Select a Speciality
              </option>
              {specialityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field === "profilePhoto" || field==="coverPhoto" ? (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="w-full p-2 mt-2 border rounded-lg"
            />
          ) : (
            <input
              type="text"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="w-full p-2 mt-2 border rounded-lg"
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-400 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModal;
