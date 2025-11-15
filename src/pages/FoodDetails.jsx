import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";

import { FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

const FoodDetails = () => {
  const food = useLoaderData();
  const [user] = useAuthState(auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    contactNumber: "",
  });

  useEffect(() => {
    if (user?.email === food?.donatorEmail) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/food-requests/${food._id}`)
        .then((res) => setRequests(res.data))
        .catch((err) => console.error("Error fetching requests:", err))
        .finally(() => setLoading(false));
    }
  }, [food, user]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please log in to request food!");

    const requestData = {
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      foodId: food._id,
      foodName: food.foodName,
      foodOwnerEmail: food.donatorEmail,
      location: formData.location,
      reason: formData.reason,
      contact: formData.contactNumber,
      status: "pending",
    };

    try {
      const res = await axios.post("http://localhost:3000/food-requests", requestData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Request submitted successfully!");
        setIsModalOpen(false);
        setFormData({ location: "", reason: "", contactNumber: "" });
      } else {
        toast.error("Failed to submit request!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  const handleAction = async (reqId, action) => {
    try {
      await axios.patch(`http://localhost:3000/food-requests/${reqId}`, {
        status: action,
      });

      if (action === "accepted") {
        await axios.patch(`http://localhost:3000/foods/${food._id}`, {
          status: "donated",
        });
      }

      setRequests((prev) =>
        prev.map((r) => (r._id === reqId ? { ...r, status: action } : r))
      );

      toast.success(
        action === "accepted"
          ? "Request accepted"
          : "Request rejected!"
      );
    } catch (err) {
      console.error(err);
      toast.error("Error");
    }
  };

  if (!food) return <p>Food not found!</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="py-16">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
          <img
            src={food.foodImage}
            alt={food.foodName}
            className="w-full h-64 object-cover"
          />
          <div className="p-6 space-y-4">
            <h2 className="text-3xl capitalize font-bold text-green-700">{food.foodName}</h2>
            <p className="text-green-700 font-semibold">
              Current Status: {food.foodStatus || food.status}
            </p>

            <div className="flex items-center gap-3">
              <img
                src={food.donatorImage}
                alt={food.donatorName}
                className="w-10 h-10 rounded-full border"
              />
              <span className="flex items-center gap-2 text-gray-700">
                 {food.donatorName}
              </span>
            </div>

            <p className="flex items-center gap-2 text-gray-600">
              <FaMapMarkerAlt className="text-green-600" /> {food.pickupLocation}
            </p>

            <p className="flex items-center gap-2 text-gray-600">
              <FaCalendarAlt className="text-green-600" />
              Expires on:{" "}
              <span className="text-red-600 font-medium">
                {new Date(food.expireDate).toLocaleDateString()}
              </span>
            </p>

            <p className="text-gray-700">
              Quantity: <span className="font-semibold">{food.foodQuantity}</span>
            </p>

            <p className="text-gray-600">
              <span className="font-semibold">Notes:</span>{" "}
              {food.additionalNotes || "No additional notes"}
            </p>

            {user?.email !== food.donatorEmail && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-green-700 cursor-pointer hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                Request Food
              </button>
            )}
          </div>
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
              <h3 className="text-2xl font-bold text-green-800 mb-4">
                Request Food
              </h3>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Your Location"
                  required
                  className="w-full border rounded p-2 text-green-600 focus:outline-green-600"
                />
                <textarea
                  name="reason"
                  value={formData.reason}
                  onChange={handleChange}
                  placeholder="Why do you need this food?"
                  required
                  className="w-full border rounded p-2 h-24 text-green-600 focus:outline-green-600"
                />
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  required
                  className="w-full border rounded p-2 text-green-600 focus:outline-green-600"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 cursor-pointer border border-green-600 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 cursor-pointer bg-green-700 text-white rounded-lg hover:bg-green-600"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {user?.email === food.donatorEmail && (
          <div className="mt-20 border-t-2 border-green-200">
            <h3 className="text-5xl font-semibold text-green-700 my-4">
              Food Requests
            </h3>

            {loading ? (
              <p className="text-gray-600">Loading requests...</p>
            ) : requests.length === 0 ? (
              <p className="text-gray-500">No requests yet.</p>
            ) : (
              <table className="w-full border border-green-100 my-7 rounded-lg overflow-hidden">
                <thead className="bg-green-100 text-base text-green-700">
                  <tr>
                    <th className="p-2 text-left">User</th>
                    <th className="p-2 text-left">Location</th>
                    <th className="p-2 text-left">Reason</th>
                    <th className="p-2 text-left">Contact</th>
                    <th className="p-2 text-left">Status</th>
                    <th className="p-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((req) => (
                    <tr key={req._id} className="border-t text-green-700 hover:bg-gray-100">
                      <td className="p-2 text-green-700 font-medium flex items-center gap-5">
                        <img
                          src={req.userPhoto}
                          alt={req.userName}
                          className="w-8 h-8 rounded-full"
                        />
                        {req.userName}
                      </td>
                      <td className="p-2 capitalize text-gray-600">{req.location}</td>
                      <td className="p-2 capitalize text-gray-600">{req.reason}</td>
                      <td className="p-2 capitalize text-gray-600">{req.contact}</td>
                      <td
                        className={`p-2 capitalize font-medium ${req.status === "accepted"
                            ? "text-green-600"
                            : req.status === "rejected"
                              ? "text-red-500"
                              : "text-gray-600"
                          }`}
                      >
                        {req.status}
                      </td>
                      <td className="p-2">
                        {req.status === "pending" && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleAction(req._id, "accepted")}
                              className="px-3 py-1 bg-green-600 cursor-pointer hover:bg-green-700 text-white rounded"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() => handleAction(req._id, "rejected")}
                              className="px-3 py-1 bg-red-500 cursor-pointer hover:bg-red-600 text-white rounded"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
