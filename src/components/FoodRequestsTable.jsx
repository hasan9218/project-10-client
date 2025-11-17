import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const FoodRequestsTable = ({ foodId, foodOwnerEmail, user }) => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all requests for this food
  useEffect(() => {
    if (user?.email === foodOwnerEmail) {
      setLoading(true);
      axios
        .get(`https://plate-share-server-alpha.vercel.app/food-requests/${foodId}`)
        .then((res) => setRequests(res.data))
        .catch((err) => {
          console.error("Error fetching requests:", err);
          toast.error("Failed to load food requests");
        })
        .finally(() => setLoading(false));
    }
  }, [foodId, foodOwnerEmail, user]);

  // Handle Accept / Reject
  const handleAction = async (reqId, action) => {
    try {
      // Update status
      await axios.patch(`https://plate-share-server-alpha.vercel.app/food-requests/${reqId}`, {
        status: action,
      });

      
      if (action === "accepted") {
        await axios.patch(`https://plate-share-server-alpha.vercel.app/foods/${foodId}`, {
          status: "donated",
        });
      }

      setRequests((prev) =>
        prev.map((r) =>
          r._id === reqId ? { ...r, status: action } : r
        )
      );

      toast.success(
        action === "accepted"
          ? "Request accepted & donated!"
          : "Request rejected!"
      );
    } catch (err) {
      console.error("Error updating status:", err);
      toast.error("Something went wrong!");
    }
  };


  if (user?.email !== foodOwnerEmail) return null;

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-green-800 mb-3">
        Food Requests
      </h3>

      {loading ? (
        <p className="text-gray-600">Loading requests...</p>
      ) : requests.length === 0 ? (
        <p className="text-gray-500">No requests found for this food.</p>
      ) : (
        <table className="table-auto w-full border border-gray-300 text-left">
          <thead className="bg-green-100">
            <tr>
              <th className="p-2 border">User</th>
              <th className="p-2 border">Location</th>
              <th className="p-2 border">Reason</th>
              <th className="p-2 border">Contact</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((r) => (
              <tr key={r._id} className="border-t hover:bg-gray-50">
                <td className="p-2 border">{r.userName}</td>
                <td className="p-2 border">{r.location}</td>
                <td className="p-2 border">{r.reason}</td>
                <td className="p-2 border">{r.contact}</td>
                <td
                  className={`p-2 border font-medium capitalize ${
                    r.status === "accepted"
                      ? "text-green-600"
                      : r.status === "rejected"
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {r.status}
                </td>
                <td className="p-2 border text-center">
                  {r.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAction(r._id, "accepted")}
                        className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded mr-2"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handleAction(r._id, "rejected")}
                        className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="italic text-gray-500">No Action</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FoodRequestsTable;
