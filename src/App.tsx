import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components for better performance
const DreamBoard = lazy(
  () => import("./components/dreamboard/DreamboardFeature"),
);
const TaskManagement = lazy(() => import("./components/tasks/TaskManagement"));
const NanoAIAgent = lazy(() => import("./components/nano/NanoAIAgent"));
const NanoResourcePage = lazy(
  () => import("./components/nano/NanoResourcePage"),
);
const NanoInsightsPage = lazy(
  () => import("./components/nano/NanoInsightsPage"),
);
const NanoLampDemo = lazy(() => import("./components/nano/NanoLampDemo"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="w-screen h-screen flex items-center justify-center bg-black text-white">
          <div className="text-center">
            <img
              src="https://gracious-chaplygin8-gtn6u.dev-2.tempolabs.ai/logo.png"
              alt="Dreamscape Logo"
              className="w-32 mx-auto mb-4 animate-pulse"
            />
            <p className="text-[#87CEEB]">Loading...</p>
          </div>
        </div>
      }
    >
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dreamboard" element={<DreamBoard />} />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="/nano" element={<NanoAIAgent />} />
          <Route path="/nano/resources" element={<NanoResourcePage />} />
          <Route path="/nano/insights" element={<NanoInsightsPage />} />
          <Route path="/nano/demo" element={<NanoLampDemo />} />
          {import.meta.env.VITE_TEMPO === "true" && (
            <Route path="/tempobook/*" />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
