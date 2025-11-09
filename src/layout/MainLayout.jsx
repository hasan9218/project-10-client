
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 lg:px-0 bg-[#F5F5F5]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
