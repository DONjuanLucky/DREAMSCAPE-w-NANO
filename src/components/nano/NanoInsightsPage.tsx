import { useState } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Lightbulb,
  Target,
  TrendingUp,
  BarChart,
  Calendar,
  Clock,
  Zap,
  Award,
  Sparkles,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";

type InsightCategory =
  | "productivity"
  | "motivation"
  | "learning"
  | "wellness"
  | "career";

type Insight = {
  id: string;
  title: string;
  description: string;
  category: InsightCategory;
  actionSteps: string[];
};

const NanoInsightsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    InsightCategory | "all"
  >("all");

  const insights: Insight[] = [
    {
      id: "1",
      title: "The Power of Consistent Small Steps",
      description:
        "Research shows that consistent small actions lead to significant progress over time. Rather than setting overwhelming goals, focus on daily micro-habits that move you forward.",
      category: "productivity",
      actionSteps: [
        "Identify one small action you can take daily toward your goal",
        "Track your consistency using a habit tracker",
        "Celebrate small wins to maintain motivation",
      ],
    },
    {
      id: "2",
      title: "Overcoming Procrastination Through Visualization",
      description:
        "Visualization techniques can help overcome procrastination by creating a mental image of the completed task and the positive feelings associated with it.",
      category: "motivation",
      actionSteps: [
        "Spend 5 minutes visualizing yourself completing the task",
        "Focus on the feelings of accomplishment and relief",
        "Break the task into smaller, more manageable parts",
      ],
    },
    {
      id: "3",
      title: "The Feynman Technique for Deeper Learning",
      description:
        "Named after physicist Richard Feynman, this technique involves explaining concepts in simple terms to identify gaps in your understanding and reinforce learning.",
      category: "learning",
      actionSteps: [
        "Choose a concept you want to learn",
        "Explain it in simple terms as if teaching a child",
        "Identify gaps in your explanation and revisit the material",
        "Simplify technical language and create analogies",
      ],
    },
    {
      id: "4",
      title: "Mindfulness for Goal Achievement",
      description:
        "Practicing mindfulness can improve focus, reduce stress, and help maintain clarity about your goals and priorities.",
      category: "wellness",
      actionSteps: [
        "Start with 5 minutes of daily meditation",
        "Practice single-tasking instead of multitasking",
        "Take mindful breaks throughout your day",
      ],
    },
    {
      id: "5",
      title: "Strategic Networking for Career Growth",
      description:
        "Building meaningful professional relationships is often more valuable than technical skills alone for long-term career advancement.",
      category: "career",
      actionSteps: [
        "Identify 5 key people in your industry to connect with",
        "Schedule one coffee meeting or virtual chat per week",
        "Focus on providing value before asking for favors",
        "Maintain regular contact with your network",
      ],
    },
    {
      id: "6",
      title: "The 2-Minute Rule for Productivity",
      description:
        "If a task takes less than 2 minutes to complete, do it immediately rather than scheduling it for later. This prevents small tasks from accumulating.",
      category: "productivity",
      actionSteps: [
        "Identify quick tasks in your daily routine",
        "Complete them immediately when they arise",
        "Keep a list of completed 2-minute tasks to see your progress",
      ],
    },
  ];

  const filteredInsights =
    selectedCategory === "all"
      ? insights
      : insights.filter((insight) => insight.category === selectedCategory);

  const getCategoryIcon = (category: InsightCategory) => {
    switch (category) {
      case "productivity":
        return <Clock size={20} className="text-blue-400" />;
      case "motivation":
        return <Zap size={20} className="text-yellow-400" />;
      case "learning":
        return <Brain size={20} className="text-purple-400" />;
      case "wellness":
        return <Sparkles size={20} className="text-green-400" />;
      case "career":
        return <TrendingUp size={20} className="text-red-400" />;
      default:
        return <Lightbulb size={20} className="text-[#87CEEB]" />;
    }
  };

  const getCategoryColor = (category: InsightCategory) => {
    switch (category) {
      case "productivity":
        return "text-blue-400 border-blue-400";
      case "motivation":
        return "text-yellow-400 border-yellow-400";
      case "learning":
        return "text-purple-400 border-purple-400";
      case "wellness":
        return "text-green-400 border-green-400";
      case "career":
        return "text-red-400 border-red-400";
      default:
        return "text-[#87CEEB] border-[#87CEEB]";
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#87CEEB] mb-2">
              Nano's Insights
            </h1>
            <p className="text-gray-400">
              AI-powered wisdom to help you achieve your goals more effectively
            </p>
          </div>

          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 min-w-max pb-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full border transition-all ${selectedCategory === "all" ? "bg-[#87CEEB] bg-opacity-20 text-[#87CEEB] border-[#87CEEB]" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                All Insights
              </button>
              <button
                onClick={() => setSelectedCategory("productivity")}
                className={`px-4 py-2 rounded-full border transition-all flex items-center ${selectedCategory === "productivity" ? "bg-blue-400 bg-opacity-10 text-blue-400 border-blue-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                <Clock size={16} className="mr-1.5" />
                Productivity
              </button>
              <button
                onClick={() => setSelectedCategory("motivation")}
                className={`px-4 py-2 rounded-full border transition-all flex items-center ${selectedCategory === "motivation" ? "bg-yellow-400 bg-opacity-10 text-yellow-400 border-yellow-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                <Zap size={16} className="mr-1.5" />
                Motivation
              </button>
              <button
                onClick={() => setSelectedCategory("learning")}
                className={`px-4 py-2 rounded-full border transition-all flex items-center ${selectedCategory === "learning" ? "bg-purple-400 bg-opacity-10 text-purple-400 border-purple-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                <Brain size={16} className="mr-1.5" />
                Learning
              </button>
              <button
                onClick={() => setSelectedCategory("wellness")}
                className={`px-4 py-2 rounded-full border transition-all flex items-center ${selectedCategory === "wellness" ? "bg-green-400 bg-opacity-10 text-green-400 border-green-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                <Sparkles size={16} className="mr-1.5" />
                Wellness
              </button>
              <button
                onClick={() => setSelectedCategory("career")}
                className={`px-4 py-2 rounded-full border transition-all flex items-center ${selectedCategory === "career" ? "bg-red-400 bg-opacity-10 text-red-400 border-red-400" : "border-gray-700 text-gray-400 hover:border-gray-500"}`}
              >
                <TrendingUp size={16} className="mr-1.5" />
                Career
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredInsights.map((insight) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -5 }}
                className={`bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:shadow-lg hover:shadow-${insight.category === "productivity" ? "blue" : insight.category === "motivation" ? "yellow" : insight.category === "learning" ? "purple" : insight.category === "wellness" ? "green" : "red"}-400/10 transition-all duration-300`}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${getCategoryColor(insight.category)} bg-opacity-10 border border-opacity-30`}
                    >
                      {getCategoryIcon(insight.category)}
                    </div>
                    <span
                      className={`text-sm capitalize ${getCategoryColor(insight.category)}`}
                    >
                      {insight.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3">
                    {insight.title}
                  </h3>
                  <p className="text-gray-400 mb-5">{insight.description}</p>

                  <div className="bg-gray-950 rounded-lg p-4 border border-gray-800">
                    <h4 className="text-[#87CEEB] font-medium mb-3 flex items-center">
                      <Target size={16} className="mr-2" />
                      Action Steps
                    </h4>
                    <ul className="space-y-2">
                      {insight.actionSteps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-[#87CEEB] mr-2 mt-1">•</span>
                          <span className="text-gray-300 text-sm">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-[#16213e] to-[#0f3460] rounded-xl p-6 border border-[#87CEEB] border-opacity-20">
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-6">
                <div className="w-16 h-16 rounded-full bg-[#87CEEB] bg-opacity-20 flex items-center justify-center mx-auto md:mx-0">
                  <Brain className="text-[#87CEEB]" size={32} />
                </div>
              </div>
              <div className="text-center md:text-left md:flex-1">
                <h3 className="text-xl font-bold text-white mb-2">
                  Need Personalized Insights?
                </h3>
                <p className="text-gray-300 mb-4">
                  Ask Nano for advice tailored to your specific goals and
                  challenges.
                </p>
                <button
                  onClick={() => (window.location.href = "/nano")}
                  className="px-6 py-2 bg-[#87CEEB] text-black rounded-lg hover:bg-opacity-80 transition-colors inline-flex items-center"
                >
                  <Lightbulb size={18} className="mr-2" />
                  Chat with Nano
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default NanoInsightsPage;
