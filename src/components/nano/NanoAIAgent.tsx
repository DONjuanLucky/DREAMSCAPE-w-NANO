import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  MicOff,
  Brain,
  Sparkles,
  Calendar,
  Target,
  Lightbulb,
  X,
  ChevronRight,
  Clock,
  Hourglass,
  Star,
  Zap,
  BookOpen,
  Compass,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";

type GoalTimeframe = "short-term" | "long-term";
type GoalDifficulty = "easy" | "medium" | "hard";

type Goal = {
  id: string;
  title: string;
  description: string;
  timeframe: GoalTimeframe;
  difficulty: GoalDifficulty;
  createdAt: string;
  resources?: Resource[];
};

type Resource = {
  id: string;
  title: string;
  type: "article" | "video" | "book" | "course";
  url: string;
};

type NanoMessage = {
  id: string;
  text: string;
  sender: "user" | "nano";
  timestamp: Date;
};

const NanoAIAgent = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Learn Spanish",
      description: "Become conversational in Spanish within 6 months",
      timeframe: "long-term",
      difficulty: "medium",
      createdAt: new Date().toISOString(),
      resources: [
        {
          id: "r1",
          title: "Duolingo Spanish Course",
          type: "course",
          url: "https://www.duolingo.com/course/es/en/Learn-Spanish",
        },
        {
          id: "r2",
          title: "Spanish Conversation Practice",
          type: "video",
          url: "https://www.youtube.com/watch?v=example",
        },
      ],
    },
    {
      id: "2",
      title: "Complete Project Proposal",
      description: "Finish the business plan draft by Friday",
      timeframe: "short-term",
      difficulty: "hard",
      createdAt: new Date().toISOString(),
    },
  ]);

  const [activeGoal, setActiveGoal] = useState<Goal | null>(null);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState<Omit<Goal, "id" | "createdAt">>({
    title: "",
    description: "",
    timeframe: "short-term",
    difficulty: "medium",
  });

  const [messages, setMessages] = useState<NanoMessage[]>([
    {
      id: "1",
      text: "Hello! I'm Nano, your AI assistant. How can I help you with your goals today?",
      sender: "nano",
      timestamp: new Date(),
    },
  ]);

  const [userInput, setUserInput] = useState("");
  const [isNanoThinking, setIsNanoThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Simulate voice recognition
  useEffect(() => {
    if (isListening) {
      const timer = setTimeout(() => {
        setTranscript("I want to improve my public speaking skills");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isListening]);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (isListening) {
      // If we were listening and now stopping, use the transcript
      if (transcript) {
        handleSendMessage(transcript);
        setTranscript("");
      }
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: NanoMessage = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsNanoThinking(true);

    // Simulate Nano's response after a delay
    setTimeout(() => {
      let response = "";

      if (text.toLowerCase().includes("public speaking")) {
        response =
          "Improving public speaking is a great goal! Would you like me to create a goal for tracking your public speaking progress? I can also suggest some resources to help you get started.";
      } else if (text.toLowerCase().includes("goal")) {
        response =
          "I can help you set up and track your goals. Would you like to add a new goal or review your existing ones?";
      } else {
        response =
          "I'm here to help you achieve your dreams. Tell me more about what you'd like to accomplish, and I can provide guidance and resources.";
      }

      const nanoMessage: NanoMessage = {
        id: Date.now().toString(),
        text: response,
        sender: "nano",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, nanoMessage]);
      setIsNanoThinking(false);
    }, 1500);
  };

  const handleAddGoal = () => {
    if (!newGoal.title) return;

    const goal: Goal = {
      ...newGoal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    setGoals([...goals, goal]);
    setShowAddGoal(false);
    setNewGoal({
      title: "",
      description: "",
      timeframe: "short-term",
      difficulty: "medium",
    });

    // Add a message from Nano about the new goal
    const nanoMessage: NanoMessage = {
      id: Date.now().toString(),
      text: `I've added your new goal: "${goal.title}". I'll help you track your progress and provide resources to achieve it.`,
      sender: "nano",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, nanoMessage]);
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

  const getDifficultyIcon = (difficulty: GoalDifficulty) => {
    switch (difficulty) {
      case "easy":
        return <Star className="text-green-400" size={16} />;
      case "medium":
        return <Star className="text-yellow-400" size={16} />;
      case "hard":
        return <Star className="text-red-400" size={16} />;
      default:
        return null;
    }
  };

  const getTimeframeIcon = (timeframe: GoalTimeframe) => {
    return timeframe === "short-term" ? (
      <Clock className="text-purple-400" size={16} />
    ) : (
      <Hourglass className="text-blue-400" size={16} />
    );
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "article":
        return <BookOpen size={16} className="text-blue-400" />;
      case "video":
        return <Zap size={16} className="text-red-400" />;
      case "book":
        return <BookOpen size={16} className="text-green-400" />;
      case "course":
        return <Compass size={16} className="text-yellow-400" />;
      default:
        return <Lightbulb size={16} className="text-purple-400" />;
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
          {/* Left Column - Goals List */}
          <div className="lg:col-span-1 bg-gray-950 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="p-2 border-b border-gray-800 flex justify-center gap-2 bg-gray-900">
              <a
                href="/nano/resources"
                className="flex-1 py-1.5 px-3 rounded-md text-center text-sm text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Resources
              </a>
              <a
                href="/nano/insights"
                className="flex-1 py-1.5 px-3 rounded-md text-center text-sm text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Insights
              </a>
              <a
                href="/nano/demo"
                className="flex-1 py-1.5 px-3 rounded-md text-center text-sm text-gray-300 hover:bg-gray-800 transition-colors"
              >
                Demo
              </a>
            </div>
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gradient-to-r from-[#1a1a2e] to-[#16213e]">
              <h2 className="text-xl font-bold text-[#87CEEB] flex items-center">
                <Target className="mr-2" size={20} />
                Your Goals
              </h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="p-2 rounded-full bg-[#87CEEB] bg-opacity-20 hover:bg-opacity-30 text-[#87CEEB] transition-all"
              >
                <Sparkles size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {goals.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="mx-auto mb-2 text-gray-600" size={24} />
                  <p>No goals yet. Add your first goal to get started!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {goals.map((goal) => (
                    <motion.div
                      key={goal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setActiveGoal(goal)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${activeGoal?.id === goal.id ? "bg-[#87CEEB] bg-opacity-20 border border-[#87CEEB] border-opacity-40" : "bg-gray-900 border border-gray-800 hover:border-gray-700"}`}
                    >
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-white">{goal.title}</h3>
                        <div className="flex space-x-1">
                          {getTimeframeIcon(goal.timeframe)}
                          {getDifficultyIcon(goal.difficulty)}
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
                        {goal.description}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-gray-500">
                          {new Date(goal.createdAt).toLocaleDateString()}
                        </span>
                        <div className="flex items-center">
                          <span
                            className={`text-xs capitalize ${goal.timeframe === "short-term" ? "text-purple-400" : "text-blue-400"}`}
                          >
                            {goal.timeframe.replace("-", " ")}
                          </span>
                          <span className="mx-1 text-gray-600">•</span>
                          <span
                            className={`text-xs capitalize ${getDifficultyColor(goal.difficulty)}`}
                          >
                            {goal.difficulty}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Chat with Nano */}
          <div className="lg:col-span-2 bg-gray-950 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center bg-gradient-to-r from-[#16213e] to-[#0f3460]">
              <div className="w-10 h-10 rounded-full bg-[#87CEEB] bg-opacity-20 flex items-center justify-center mr-3">
                <Brain className="text-[#87CEEB]" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#87CEEB]">Nano</h2>
                <p className="text-xs text-gray-400">AI Voice Assistant</p>
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, rgba(135, 206, 235, 0.05) 0%, rgba(0, 0, 0, 0) 70%)",
              }}
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${message.sender === "user" ? "bg-[#87CEEB] bg-opacity-20 text-white rounded-tr-none" : "bg-gray-900 text-gray-100 rounded-tl-none"}`}
                  >
                    <p>{message.text}</p>
                    <span className="text-xs text-gray-500 block mt-1">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isNanoThinking && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                        className="w-2 h-2 bg-[#87CEEB] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.2,
                        }}
                        className="w-2 h-2 bg-[#87CEEB] rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          delay: 0.4,
                        }}
                        className="w-2 h-2 bg-[#87CEEB] rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-800 bg-gray-950">
              {isListening && transcript && (
                <div className="mb-2 p-2 bg-gray-900 rounded-lg text-gray-300 text-sm">
                  <p className="italic">"...{transcript}"</p>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-full ${isListening ? "bg-red-500 text-white animate-pulse" : "bg-[#87CEEB] bg-opacity-20 text-[#87CEEB]"} transition-all`}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleSendMessage(userInput)
                  }
                  placeholder="Ask Nano anything..."
                  className="flex-1 bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                />

                <button
                  onClick={() => handleSendMessage(userInput)}
                  disabled={!userInput.trim()}
                  className="p-3 rounded-full bg-[#87CEEB] text-black disabled:opacity-50 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Goal Modal */}
      <AnimatePresence>
        {showAddGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#87CEEB] flex items-center">
                  <Sparkles className="mr-2" size={20} />
                  Add New Goal
                </h2>
                <button
                  onClick={() => setShowAddGoal(false)}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Goal Title
                  </label>
                  <input
                    type="text"
                    value={newGoal.title}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, title: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                    placeholder="What do you want to achieve?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={newGoal.description}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, description: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white min-h-[80px] focus:outline-none focus:border-[#87CEEB] transition-colors"
                    placeholder="Describe your goal in detail"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Timeframe
                    </label>
                    <select
                      value={newGoal.timeframe}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          timeframe: e.target.value as GoalTimeframe,
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                    >
                      <option value="short-term">Short Term</option>
                      <option value="long-term">Long Term</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">
                      Difficulty
                    </label>
                    <select
                      value={newGoal.difficulty}
                      onChange={(e) =>
                        setNewGoal({
                          ...newGoal,
                          difficulty: e.target.value as GoalDifficulty,
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-white focus:outline-none focus:border-[#87CEEB] transition-colors"
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddGoal(false)}
                    className="px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 text-gray-300 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddGoal}
                    disabled={!newGoal.title}
                    className="px-4 py-2 bg-[#87CEEB] text-black rounded-lg hover:bg-opacity-80 disabled:opacity-50 transition-colors"
                  >
                    Add Goal
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Goal Details Modal */}
      <AnimatePresence>
        {activeGoal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h2 className="text-2xl font-bold text-white">
                      {activeGoal.title}
                    </h2>
                    <div className="flex space-x-1">
                      {getTimeframeIcon(activeGoal.timeframe)}
                      {getDifficultyIcon(activeGoal.difficulty)}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <span
                      className={`capitalize ${activeGoal.timeframe === "short-term" ? "text-purple-400" : "text-blue-400"}`}
                    >
                      {activeGoal.timeframe.replace("-", " ")}
                    </span>
                    <span>•</span>
                    <span
                      className={`capitalize ${getDifficultyColor(activeGoal.difficulty)}`}
                    >
                      {activeGoal.difficulty} difficulty
                    </span>
                    <span>•</span>
                    <span>
                      Created{" "}
                      {new Date(activeGoal.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveGoal(null)}
                  className="p-1 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X size={18} className="text-gray-400" />
                </button>
              </div>

              <div className="mb-6 p-4 bg-gray-950 rounded-lg border border-gray-800">
                <p className="text-gray-300">{activeGoal.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#87CEEB] mb-3 flex items-center">
                  <Lightbulb className="mr-2" size={18} />
                  Nano's Insights
                </h3>
                <div className="p-4 bg-[#16213e] rounded-lg border border-[#87CEEB] border-opacity-20">
                  <p className="text-gray-300">
                    {activeGoal.timeframe === "short-term"
                      ? "This short-term goal is perfect for building momentum. Try breaking it down into daily tasks and celebrate small wins along the way."
                      : "For long-term success with this goal, consistency is key. Consider setting monthly milestones to track your progress over time."}
                  </p>
                  <p className="text-gray-300 mt-2">
                    {activeGoal.difficulty === "easy"
                      ? "This should be relatively straightforward to achieve. Use it to build confidence for more challenging goals."
                      : activeGoal.difficulty === "medium"
                        ? "This goal has a balanced challenge level. Stay motivated by connecting with others working on similar goals."
                        : "This challenging goal will require dedication. Remember to be patient with yourself and focus on progress, not perfection."}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-[#87CEEB] mb-3 flex items-center">
                  <Compass className="mr-2" size={18} />
                  Recommended Resources
                </h3>

                {activeGoal.resources && activeGoal.resources.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {activeGoal.resources.map((resource) => (
                      <motion.a
                        key={resource.id}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        className="p-3 bg-gray-950 rounded-lg border border-gray-800 hover:border-[#87CEEB] hover:border-opacity-50 transition-all flex items-start"
                      >
                        <div className="mr-3 mt-1">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">
                            {resource.title}
                          </h4>
                          <span className="text-xs text-gray-500 capitalize">
                            {resource.type}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 bg-gray-950 rounded-lg border border-gray-800">
                    <p className="text-gray-500">
                      Ask Nano to recommend resources for this goal!
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
};

export default NanoAIAgent;
