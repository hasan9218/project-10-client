import React, { useState } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-hot-toast";

const UpdateFood = () => {
  const food = useLoaderData();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    foodName: food.foodName || "",
    foodImage: food.foodImage || "",
    foodQuantity: food.foodQuantity || "",
    pickupLocation: food.pickupLocation || "",
    expireDate: food.expireDate || "",
    notes: food.notes || "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Submit 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://plate-share-server-alpha.vercel.app/foods/${food._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      toast.success("Food updated successfully!");
      navigate("/manage-my-foods");
    } else {
      toast.error("Failed to update food!");
    }
  };

  return (
    <div>
      <div className="py-16 bg-[#DBFCE7] px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Update Food Information
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 max-w-xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Food Name</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Food Image URL</label>
            <input
              type="text"
              name="foodImage"
              value={formData.foodImage}
              onChange={handleChange}
              placeholder="https://i.ibb.co/..."
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Food Quantity</label>
            <input
              type="text"
              name="foodQuantity"
              value={formData.foodQuantity}
              onChange={handleChange}
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Pickup Location</label>
            <input
              type="text"
              name="pickupLocation"
              value={formData.pickupLocation}
              onChange={handleChange}
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Expire Date</label>
            <input
              type="date"
              name="expireDate"
              value={formData.expireDate}
              onChange={handleChange}
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-green-700 text-xl mb-3">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border border-green-600 focus:outline-none text-gray-700 rounded-lg px-3 py-2 h-24"
              placeholder="Any extra notes..."
            ></textarea>
          </div>


          <button
            type="submit"
            className="bg-green-700 hover:bg-green-600 text-white px-6 py-2 rounded-lg w-full transition"
          >
            Update Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFood;
