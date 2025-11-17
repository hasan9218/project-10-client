import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { toast } from "react-hot-toast";
import { Link } from "react-router";
import Spinner from "../components/Spinner";

const ManageMyFoods = () => {
  const [user] = useAuthState(auth);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`https://plate-share-server-alpha.vercel.app/foods?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setFoods(data);
          setLoading(false);
        })
        .catch(() => {
          toast.error("Failed to load your foods");
          setLoading(false);
        });
    }
  }, [user]);


  const handleDelete = (id) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <p className="text-gray-700">Are you sure you want to delete this food?</p>
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={async () => {
                const res = await fetch(`https://plate-share-server-alpha.vercel.app/foods/${id}`, { method: "DELETE" });
                if (res.ok) {
                  toast.success("Food deleted successfully!");
                  setFoods((prev) => prev.filter((f) => f._id !== id));
                } else {
                  toast.error("Failed to delete food!");
                }
                toast.dismiss(t.id);
              }}
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Confirm
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  if (loading) return <Spinner />;

  return (
    <div className="max-w-3xl mx-auto px-3">
      <div className="py-16">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Manage My Foods
        </h2>

        {foods.length === 0 ? (
          <p className="text-center text-gray-600">
            You haven’t added any food yet.
          </p>
        ) : (
          <div className="bg-white rounded-xl shadow-md border p-4">

           
            <div className="grid md:hidden gap-4">
              {foods.map((food) => (
                <div
                  key={food._id}
                  className="rounded-xl p-4 bg-green-50 shadow-sm"
                >
                  {/* Image */}
                  <img
                    src={food.foodImage}
                    alt=""
                    className="w-full h-40 object-cover rounded-lg border mb-3"
                  />

                  {/* Details */}
                  <h3 className="text-lg font-semibold text-green-700">{food.foodName}</h3>

                  <p className="text-gray-700 mt-1">
                    <span className="font-semibold">Quantity:</span> {food.foodQuantity}
                  </p>

                  <p
                    className={`mt-1 font-semibold capitalize ${food.status === "donated" ? "text-green-600" : "text-yellow-500"
                      }`}
                  >
                    Status: {food.status || "available"}
                  </p>

                
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/update-food/${food._id}`}
                      className="flex-1 text-center bg-green-700 text-white py-2 rounded-md hover:bg-green-600"
                    >
                      Update
                    </Link>

                    <button
                      onClick={() => handleDelete(food._id)}
                      className="flex-1 bg-red-600 text-white py-2 rounded-md hover:bg-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-green-700 text-white text-base text-left">
                    <th className="p-3">Image</th>
                    <th className="p-3">Food Name</th>
                    <th className="p-3">Quantity</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {foods.map((food) => (
                    <tr
                      key={food._id}
                      className="border-b border-green-300 hover:bg-gray-50"
                    >
                      <td className="p-3">
                        <img
                          src={food.foodImage}
                          alt=""
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                      </td>

                      <td className="p-3 text-base font-medium text-green-700">
                        {food.foodName}
                      </td>

                      <td className="p-3 text-base text-gray-600">
                        {food.foodQuantity}
                      </td>

                      <td
                        className={`p-3 font-semibold capitalize ${food.status === "donated"
                            ? "text-green-600"
                            : "text-yellow-500"
                          }`}
                      >
                        {food.status || "available"}
                      </td>

                      <td className="p-3 text-center space-x-2">
                        <Link
                          to={`/update-food/${food._id}`}
                          className="bg-green-700 text-white px-3 py-1 rounded-md hover:bg-green-600"
                        >
                          Update
                        </Link>

                        <button
                          onClick={() => handleDelete(food._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default ManageMyFoods;
