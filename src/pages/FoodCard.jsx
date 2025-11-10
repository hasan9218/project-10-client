import React from "react";
import { useNavigate } from "react-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebase.config";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import MyContainer from "../components/MyContainer";

const FoodCard = ({ food }) => {
    const navigate = useNavigate();
    const [user] = useAuthState(auth);

    const handleViewDetails = () => {
        if (!user) {
            navigate("/login");
        } else {
            navigate(`/foods/${food._id}`);
        }
    };

    return (
        <div>
            <MyContainer>
                <div className="bg-white rounded-xl shadow-md border hover:shadow-lg transition overflow-hidden">
       
                <img
                    src={food.foodImage || "https://i.ibb.co/4V8s1Db/food-placeholder.jpg"}
                    alt={food.foodName}
                    className="w-full h-48 object-cover"
                />

         
                <div className="p-5">
                    <h3 className="text-xl font-semibold text-green-900 mb-2">
                        {food.foodName}
                    </h3>

         
                    <div className="flex items-center gap-3 mb-3">
                        <img
                            src={food.donatorImage || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
                            alt={food.donatorName}
                            className="w-10 h-10 rounded-full object-cover border"
                        />
                        <span className="text-gray-700 flex items-center gap-1">
                            <FaUser /> {food.donatorName}
                        </span>
                    </div>

       
                    <p className="text-gray-700">
                        Quantity: <span className="font-medium">{food.foodQuantity}</span>
                    </p>

                    <p className="text-gray-700 flex items-center gap-1">
                        <FaMapMarkerAlt className="text-green-600" />{" "}
                        {food.pickupLocation}
                    </p>

                    <p className="text-gray-700">
                        Expires On:{" "}
                        <span className="font-medium text-red-600">
                            {new Date(food.expireDate).toLocaleDateString()}
                        </span>
                    </p>

                
                    <button
                        onClick={handleViewDetails}
                        className="mt-4 w-full bg-green-700 hover:bg-green-600 text-white py-2 rounded-lg font-medium transition"
                    >
                        View Details
                    </button>
                </div>
            </div>
            </MyContainer>
        </div>
    );
};

export default FoodCard;
