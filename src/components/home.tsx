import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 p-6 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto"
        >
          <img
            src="https://gracious-chaplygin8-gtn6u.dev-2.tempolabs.ai/logo.png"
            alt="Dreamscape Logo"
            className="w-64 md:w-80 mx-auto mb-8"
          />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[#87CEEB]">
            Welcome to Dreamscape UNLMTD
          </h1>
          <p className="text-xl mb-8">
            Visualize your dreams, manage your goals, and track your progress
            all in one place.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/dreamboard")}
              className="bg-[#87CEEB] text-black px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
            >
              Explore Dream Board
            </button>
            <button
              onClick={() => navigate("/tasks")}
              className="border border-[#87CEEB] text-[#87CEEB] px-6 py-3 rounded-lg font-semibold hover:bg-[#87CEEB] hover:bg-opacity-10 transition-colors"
            >
              Manage Tasks
            </button>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Home;
