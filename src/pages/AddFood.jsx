import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddFood = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [expireDate, setExpireDate] = useState(null);

  const handleAddFood = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const foodName = form.foodName.value;
    const foodQuantity = form.foodQuantity.value;
    const pickupLocation = form.pickupLocation.value;
    const additionalNotes = form.notes.value;
    const foodImage = form.foodImage.value;

    if (!foodImage) {
      toast.error("Please provide an image URL!");
      setLoading(false);
      return;
    }

    if (!expireDate) {
      toast.error("Please select an expiry date!");
      setLoading(false);
      return;
    }

    try {
      const newFood = {
        foodName,
        foodImage,
        foodQuantity,
        pickupLocation,
        expireDate,
        additionalNotes,
        donatorName: user.displayName,
        donatorEmail: user.email,
        donatorImage: user.photoURL,
        foodStatus: "Available",
        createdAt: new Date(),
      };

      const res = await fetch("http://localhost:3000/foods", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });

      const data = await res.json();
      console.log("Server response:", data);

      if (data.success || data.insertedId) {
        toast.success("Food added successfully!");
        form.reset();
        setExpireDate(null);
      } else {
        toast.error("Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred!");
    }

    setLoading(false);
  };

  return (
    <div className="bg-[#F0FDF4]">
      <div className="max-w-3xl mx-auto py-16 px-4">
        <form
          onSubmit={handleAddFood}
          className="space-y-5 bg-white p-6 rounded-2xl shadow"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
            Add Food
          </h2>

          {/* Food Name */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Food Name
            </label>
            <input
              type="text"
              name="foodName"
              className="input bg-[#eefcf2] text-green-700 border-green-700 focus:outline-0 w-full"
              required
            />
          </div>

          {/* Food Image */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Food Image (URL)
            </label>
            <input
              type="url"
              name="foodImage"
              placeholder="Enter image URL"
              className="input bg-[#eefcf2] text-green-700 border-green-700 focus:outline-0 w-full"
              required
            />
          </div>

          {/* Food Quantity */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Food Quantity
            </label>
            <input
              type="text"
              name="foodQuantity"
              placeholder="e.g., Serves 2 people"
              className="input bg-[#eefcf2] text-green-700 border-green-700 focus:outline-0 w-full"
              required
            />
          </div>

          {/* Pickup Location */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Pickup Location
            </label>
            <input
              type="text"
              name="pickupLocation"
              className="input bg-[#eefcf2] text-green-700 border-green-700 focus:outline-0 w-full"
              required
            />
          </div>

          {/* Expire Date */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Expire Date
            </label>
            <div className="relative flex items-center">
              <DatePicker
                selected={expireDate}
                onChange={(date) => setExpireDate(date)}
                className="input bg-[#eefcf2] text-green-700 border-green-700 focus:outline-0 w-full pr-10"
                dateFormat="yyyy-MM-dd"
                placeholderText="Select expiry date"
                required
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-green-700 font-semibold mb-1">
              Additional Notes
            </label>
            <textarea
              name="notes"
              rows="5"
              className="textarea bg-[#eefcf2] text-green-800 border-green-700 focus:outline-none w-full"
            ></textarea>
          </div>

          {/* Donator Info */}
          <div className="grid md:grid-cols-3 gap-4 items-center">
            <div>
              <label className="block text-green-700 font-semibold mb-1">
                Donator Name
              </label>
              <input
                type="text"
                value={user?.displayName || ""}
                disabled
                className="input text-green-700 w-full border-green-700 bg-[#eefcf2]"
              />
            </div>
            <div>
              <label className="block text-green-700 font-semibold mb-1">
                Donator Email
              </label>
              <input
                type="text"
                value={user?.email || ""}
                disabled
                className="input text-green-700 w-full border-green-700 bg-[#eefcf2]"
              />
            </div>

            {/* Donator Image Preview */}
            <div className="flex flex-col items-center">
              <label className="block text-green-700 font-semibold mb-1">
                Donator Image
              </label>
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Donator"
                  className="w-16 h-16 rounded-full border-2 border-green-600 object-cover"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                  N/A
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn bg-green-700 hover:bg-green-600 text-white border-0 py-7 w-full mt-4"
          >
            Add Food
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFood;
