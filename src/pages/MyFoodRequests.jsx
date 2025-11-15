import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import Spinner from "../components/Spinner";

const MyFoodRequests = () => {
  const [user] = useAuthState(auth);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:3000/user-requests?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setRequests(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load your requests");
          setLoading(false);
        });
    }
  }, [user]);

  if (!user)
    return (
      <p className="text-center py-20 text-green-700 text-xl">
        Please login to see your requests
      </p>
    );


  if (loading) return <Spinner />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-16">
        <h2 className="text-4xl font-bold text-green-800 mb-8 text-center">
          My Food Requests
        </h2>

        {requests.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t requested any food yet.
          </p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-md border">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-green-700 text-white text-left">
                  <th className="p-3">Food Name</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Reason</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Requested At</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr
                    key={req._id}
                    className="border-b border-green-300 text-gray-600 hover:bg-gray-50"
                  >
                    <td className="p-3 text-xl capitalize font-medium text-green-700">
                      {req.foodName}
                    </td>
                    <td className="p-3 capitalize">{req.location}</td>
                    <td className="p-3 capitalize">{req.reason}</td>
                    <td className="p-3 capitalize">{req.contactNumber}</td>
                    <td
                      className={`p-3 capitalize font-semibold ${
                        req.status === "accepted"
                          ? "text-green-600"
                          : req.status === "rejected"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {req.status}
                    </td>
                    <td className="p-3">
                      {new Date(req.requestedAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFoodRequests;
