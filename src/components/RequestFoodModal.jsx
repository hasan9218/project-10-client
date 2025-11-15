import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const RequestFoodModal = ({ foodId, foodOwnerEmail, user, closeModal }) => {
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contact: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRequest = {
      ...formData,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      foodId,
      foodOwnerEmail,
      status: "pending",
      createdAt: new Date(),
    };

    await axios.post("/api/requests", newRequest);
    toast.success("Food request submitted!");
    closeModal();
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit} className="p-4 space-y-3">
        <input name="location" placeholder="Your Location" onChange={handleChange} required />
        <textarea name="reason" placeholder="Why do you need this food?" onChange={handleChange} required />
        <input name="contact" placeholder="Contact Number" onChange={handleChange} required />
        <button type="submit" className="btn btn-primary w-full">Submit Request</button>
      </form>
    </div>
  );
};

export default RequestFoodModal;
