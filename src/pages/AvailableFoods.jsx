import { useLoaderData } from "react-router";
import FoodCard from "../pages/FoodCard";
import MyContainer from "../components/MyContainer";

const AvailableFoods = () => {
  const data = useLoaderData();
  console.log("Foods from loader:", data);


  if (!data || !Array.isArray(data)) {
    return (
      <MyContainer>
        <div className="py-20 text-center text-red-500">
          <h2 className="text-2xl font-semibold">
             No foods found or failed to load data.
          </h2>
        </div>
      </MyContainer>
    );
  }

  return (
    <MyContainer>
      <div className="py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-16">
          Available Foods
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
          {data.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      </div>
    </MyContainer>
  );
};

export default AvailableFoods;

