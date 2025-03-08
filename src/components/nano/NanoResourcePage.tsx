import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Video,
  Compass,
  Lightbulb,
  Search,
  Filter,
  ArrowUpRight,
  Star,
  Clock,
  Hourglass,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";

type ResourceType = "article" | "video" | "book" | "course" | "tool";
type GoalTimeframe = "short-term" | "long-term";
type GoalDifficulty = "easy" | "medium" | "hard";

type Resource = {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  tags: string[];
  recommendedFor: {
    timeframe: GoalTimeframe;
    difficulty: GoalDifficulty;
  };
  rating: number;
};

const NanoResourcePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedTimeframe, setSelectedTimeframe] = useState<
    GoalTimeframe | "all"
  >("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    GoalDifficulty | "all"
  >("all");
  const [showFilters, setShowFilters] = useState(false);

  const resources: Resource[] = [
    {
      id: "1",
      title: "The Power of Habit: Why We Do What We Do in Life and Business",
      description:
        "A book about how habits work and how to transform them in your life and business.",
      type: "book",
      url: "https://example.com/power-of-habit",
      tags: ["habits", "productivity", "psychology"],
      recommendedFor: {
        timeframe: "long-term",
        difficulty: "medium",
      },
      rating: 4.5,
    },
    {
      id: "2",
      title: "How to Set SMART Goals",
      description:
        "A comprehensive guide to setting Specific, Measurable, Achievable, Relevant, and Time-bound goals.",
      type: "article",
      url: "https://example.com/smart-goals",
      tags: ["goals", "planning", "productivity"],
      recommendedFor: {
        timeframe: "short-term",
        difficulty: "easy",
      },
      rating: 4.2,
    },
    {
      id: "3",
      title: "Public Speaking Masterclass",
      description:
        "Learn the art of public speaking from world-renowned experts.",
      type: "course",
      url: "https://example.com/public-speaking",
      tags: ["communication", "career", "confidence"],
      recommendedFor: {
        timeframe: "long-term",
        difficulty: "hard",
      },
      rating: 4.8,
    },
    {
      id: "4",
      title: "How to Learn Any Language in 6 Months",
      description: "Practical techniques for rapid language acquisition.",
      type: "video",
      url: "https://example.com/language-learning",
      tags: ["languages", "learning", "education"],
      recommendedFor: {
        timeframe: "short-term",
        difficulty: "medium",
      },
      rating: 4.3,
    },
    {
      id: "5",
      title: "Pomodoro Timer",
      description:
        "A simple tool to boost productivity using the Pomodoro Technique.",
      type: "tool",
      url: "https://example.com/pomodoro",
      tags: ["productivity", "time-management", "focus"],
      recommendedFor: {
        timeframe: "short-term",
        difficulty: "easy",
      },
      rating: 4.0,
    },
    {
      id: "6",
      title: "Mindfulness Meditation for Beginners",
      description:
        "A gentle introduction to mindfulness practices for stress reduction and mental clarity.",
      type: "video",
      url: "https://example.com/mindfulness",
      tags: ["meditation", "wellness", "mental-health"],
      recommendedFor: {
        timeframe: "long-term",
        difficulty: "easy",
      },
      rating: 4.6,
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesType =
      selectedType === "all" || resource.type === selectedType;

    const matchesTimeframe =
      selectedTimeframe === "all" ||
      resource.recommendedFor.timeframe === selectedTimeframe;

    const matchesDifficulty =
      selectedDifficulty === "all" ||
      resource.recommendedFor.difficulty === selectedDifficulty;

    return (
      matchesSearch && matchesType && matchesTimeframe && matchesDifficulty
    );
  });

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "article":
        return <BookOpen size={20} className="text-blue-400" />;
      case "video":
        return <Video size={20} className="text-red-400" />;
      case "book":
        return <BookOpen size={20} className="text-green-400" />;
      case "course":
        return <Compass size={20} className="text-yellow-400" />;
      case "tool":
        return <Lightbulb size={20} className="text-purple-400" />;
      default:
        return <Lightbulb size={20} className="text-[#87CEEB]" />;
    }
  };

  const getTimeframeIcon = (timeframe: GoalTimeframe) => {
    return timeframe === "short-term" ? (
      <Clock size={16} className="text-purple-400" />
    ) : (
      <Hourglass size={16} className="text-blue-400" />
    );
  };

  const getDifficultyColor = (difficulty: GoalDifficulty) => {
    switch (difficulty) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
      default:
        return "";
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#87CEEB] mb-2">
              Nano's Resource Library
            </h1>
            <p className="text-gray-400">
              Discover curated resources to help you achieve your goals
            </p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white hover:bg-gray-800 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
            </button>
          </div>

          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-gray-900 rounded-lg border border-gray-800"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Resource Type
                  </label>
                  <select
                    value={selectedType}
                    onChange={(e) =>
                      setSelectedType(e.target.value as ResourceType | "all")
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                  >
                    <option value="all">All Types</option>
                    <option value="article">Articles</option>
                    <option value="video">Videos</option>
                    <option value="book">Books</option>
                    <option value="course">Courses</option>
                    <option value="tool">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Goal Timeframe
                  </label>
                  <select
                    value={selectedTimeframe}
                    onChange={(e) =>
                      setSelectedTimeframe(
                        e.target.value as GoalTimeframe | "all",
                      )
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                  >
                    <option value="all">All Timeframes</option>
                    <option value="short-term">Short Term</option>
                    <option value="long-term">Long Term</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Goal Difficulty
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) =>
                      setSelectedDifficulty(
                        e.target.value as GoalDifficulty | "all",
                      )
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {filteredResources.length === 0 ? (
            <div className="text-center py-16 bg-gray-900 rounded-lg border border-gray-800">
              <Lightbulb size={48} className="mx-auto mb-4 text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-400 mb-2">
                No resources found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <motion.a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-[#87CEEB] hover:shadow-lg hover:shadow-[#87CEEB]/10 transition-all duration-300"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center">
                        <div className="mr-3">
                          {getResourceIcon(resource.type)}
                        </div>
                        <span className="text-sm text-gray-400 capitalize">
                          {resource.type}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 mr-1" />
                        <span className="text-sm text-gray-400">
                          {resource.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-white mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {getTimeframeIcon(resource.recommendedFor.timeframe)}
                          <span className="ml-1 text-xs capitalize text-gray-400">
                            {resource.recommendedFor.timeframe.replace(
                              "-",
                              " ",
                            )}
                          </span>
                        </div>
                        <span className="text-gray-600">•</span>
                        <span
                          className={`text-xs capitalize ${getDifficultyColor(resource.recommendedFor.difficulty)}`}
                        >
                          {resource.recommendedFor.difficulty}
                        </span>
                      </div>

                      <div className="text-[#87CEEB] flex items-center text-sm font-medium">
                        <span className="mr-1">View</span>
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NanoResourcePage;
