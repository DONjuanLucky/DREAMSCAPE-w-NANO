import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Image,
  Quote,
  BarChart,
  X,
  Move,
  Search,
  Star,
  Moon,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";
import ProgressCelebration from "../ui/progress-celebration";

type ItemType = "image" | "quote" | "progress" | "goal";
type DreamItem = {
  id: string;
  type: ItemType;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
};

const DreamboardFeature = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");
  const [showImageSearch, setShowImageSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  const [items, setItems] = useState<DreamItem[]>([
    {
      id: "1",
      type: "image",
      content:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
      position: { x: 100, y: 100 },
      size: { width: 250, height: 200 },
    },
    {
      id: "2",
      type: "quote",
      content:
        "The future belongs to those who believe in the beauty of their dreams.",
      position: { x: 400, y: 150 },
      size: { width: 300, height: 150 },
    },
    {
      id: "3",
      type: "progress",
      content: "Learn Spanish:70",
      position: { x: 200, y: 350 },
      size: { width: 250, height: 100 },
    },
    {
      id: "4",
      type: "goal",
      content: "Travel to Japan:2024",
      position: { x: 500, y: 350 },
      size: { width: 250, height: 150 },
    },
  ]);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showAddMenu, setShowAddMenu] = useState(false);

  const handleDrag = (id: string, position: { x: number; y: number }) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, position } : item)),
    );
  };

  const addItem = (type: ItemType) => {
    const newItem: DreamItem = {
      id: Date.now().toString(),
      type,
      content:
        type === "image"
          ? "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80"
          : type === "quote"
            ? "Add your inspirational quote here"
            : type === "goal"
              ? "New Goal:2024"
              : "New Progress:0",
      position: { x: 250, y: 250 },
      size: { width: 250, height: type === "quote" ? 150 : 200 },
    };
    setItems([...items, newItem]);
    setShowAddMenu(false);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItemContent = (id: string, content: string) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, content } : item)),
    );

    // Check if it's a progress item and if it reached 100%
    const item = items.find((item) => item.id === id);
    if (item && item.type === "progress") {
      const [label, valueStr] = content.split(":");
      const value = parseInt(valueStr) || 0;

      if (value === 100) {
        setCelebrationMessage(`Congratulations! You've completed: ${label}`);
        setShowCelebration(true);
      }
    }
  };

  const handleImageSearch = () => {
    if (!searchQuery.trim()) return;

    // Simulate image search results
    const mockResults = [
      `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&q=80`,
      `https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80`,
      `https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=600&q=80`,
      `https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600&q=80`,
      `https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80`,
      `https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80`,
    ];

    setSearchResults(mockResults);
  };

  const addImageFromSearch = (imageUrl: string) => {
    const newItem: DreamItem = {
      id: Date.now().toString(),
      type: "image",
      content: imageUrl,
      position: { x: 250, y: 250 },
      size: { width: 250, height: 200 },
    };

    setItems([...items, newItem]);
    setShowImageSearch(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <MainLayout>
      <div className="relative w-full h-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#87CEEB]">My Dream Board</h1>
          <button
            onClick={() => setShowAddMenu(!showAddMenu)}
            className="bg-[#87CEEB] text-black p-2 rounded-full hover:bg-opacity-80 transition-colors"
          >
            <Plus size={24} />
          </button>
        </div>

        <AnimatePresence>
          {showAddMenu && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute right-6 top-20 bg-gray-900 p-4 rounded-lg shadow-lg z-10 border border-gray-800"
            >
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setShowImageSearch(true);
                    setShowAddMenu(false);
                  }}
                  className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Search size={18} className="text-[#87CEEB]" />
                  <span>Search Images</span>
                </button>
                <button
                  onClick={() => addItem("image")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Image size={18} className="text-[#87CEEB]" />
                  <span>Add Default Image</span>
                </button>
                <button
                  onClick={() => addItem("quote")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Quote size={18} className="text-[#87CEEB]" />
                  <span>Add Quote</span>
                </button>
                <button
                  onClick={() => addItem("progress")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <BarChart size={18} className="text-[#87CEEB]" />
                  <span>Add Progress Tracker</span>
                </button>
                <button
                  onClick={() => addItem("goal")}
                  className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded-md transition-colors"
                >
                  <Star size={18} className="text-[#87CEEB]" />
                  <span>Add Goal</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showImageSearch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
            >
              <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#87CEEB]">
                    Search Inspirational Images
                  </h2>
                  <button
                    onClick={() => setShowImageSearch(false)}
                    className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for images (e.g. mountains, success, ocean)"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-md p-2"
                    onKeyDown={(e) => e.key === "Enter" && handleImageSearch()}
                  />
                  <button
                    onClick={handleImageSearch}
                    className="bg-[#87CEEB] text-black px-4 py-2 rounded-md hover:bg-opacity-80 transition-colors"
                  >
                    Search
                  </button>
                </div>

                {searchResults.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {searchResults.map((url, index) => (
                      <div
                        key={index}
                        className="relative aspect-video rounded-md overflow-hidden border border-gray-800 hover:border-[#87CEEB] transition-colors cursor-pointer group"
                        onClick={() => addImageFromSearch(url)}
                      >
                        <img
                          src={url}
                          alt="Search result"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center transition-all">
                          <Plus
                            size={24}
                            className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    {searchQuery
                      ? "No results found. Try a different search term."
                      : "Enter a search term to find inspirational images."}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative w-full h-[calc(100vh-16rem)] bg-gray-950 rounded-lg overflow-hidden">
          {items.map((item) => (
            <motion.div
              key={item.id}
              drag
              dragMomentum={false}
              dragElastic={0}
              onDragStart={() => setActiveItem(item.id)}
              onDragEnd={() => setActiveItem(null)}
              onDrag={(_, info) =>
                handleDrag(item.id, {
                  x: item.position.x + info.delta.x,
                  y: item.position.y + info.delta.y,
                })
              }
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                x: item.position.x,
                y: item.position.y,
                zIndex: activeItem === item.id ? 10 : 1,
              }}
              className={`absolute cursor-move bg-gray-900 rounded-lg overflow-hidden backdrop-blur-sm bg-opacity-70 border ${activeItem === item.id ? "border-[#87CEEB]" : "border-gray-800"}`}
              style={{ width: item.size.width, height: item.size.height }}
            >
              <div className="absolute top-2 right-2 flex gap-1 z-10">
                <button
                  className="p-1 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                  onClick={() => removeItem(item.id)}
                >
                  <X size={14} />
                </button>
                <div className="p-1 rounded-full bg-gray-800 cursor-move">
                  <Move size={14} />
                </div>
              </div>

              {item.type === "image" && (
                <div className="w-full h-full">
                  <img
                    src={item.content}
                    alt="Dream visualization"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {item.type === "quote" && (
                <div className="w-full h-full p-4 flex items-center justify-center">
                  <textarea
                    value={item.content}
                    onChange={(e) => updateItemContent(item.id, e.target.value)}
                    className="w-full h-full bg-transparent text-center resize-none focus:outline-none text-white"
                    placeholder="Enter an inspirational quote"
                  />
                </div>
              )}

              {item.type === "progress" && (
                <div className="w-full h-full p-4 flex flex-col justify-center">
                  {(() => {
                    const [label, valueStr] = item.content.split(":");
                    const value = parseInt(valueStr) || 0;

                    return (
                      <>
                        <input
                          value={label}
                          onChange={(e) =>
                            updateItemContent(
                              item.id,
                              `${e.target.value}:${value}`,
                            )
                          }
                          className="bg-transparent mb-2 focus:outline-none text-[#87CEEB] font-medium"
                          placeholder="Goal name"
                        />
                        <div className="w-full bg-gray-800 rounded-full h-2.5 mb-2">
                          <div
                            className="bg-[#87CEEB] h-2.5 rounded-full transition-all duration-500"
                            style={{ width: `${value}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            {value}% complete
                          </span>
                          <div className="flex gap-1">
                            <button
                              onClick={() =>
                                updateItemContent(
                                  item.id,
                                  `${label}:${Math.max(0, value - 10)}`,
                                )
                              }
                              className="px-2 py-1 text-xs bg-gray-800 rounded hover:bg-gray-700"
                            >
                              -
                            </button>
                            <button
                              onClick={() =>
                                updateItemContent(
                                  item.id,
                                  `${label}:${Math.min(100, value + 10)}`,
                                )
                              }
                              className="px-2 py-1 text-xs bg-gray-800 rounded hover:bg-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}

              {item.type === "goal" && (
                <div className="w-full h-full p-4 flex flex-col justify-center">
                  {(() => {
                    const [label, target] = item.content.split(":");

                    return (
                      <>
                        <div className="flex items-center mb-2">
                          <Star size={16} className="text-yellow-400 mr-2" />
                          <input
                            value={label}
                            onChange={(e) =>
                              updateItemContent(
                                item.id,
                                `${e.target.value}:${target}`,
                              )
                            }
                            className="bg-transparent focus:outline-none text-[#87CEEB] font-medium flex-1"
                            placeholder="Goal name"
                          />
                        </div>
                        <div className="flex items-center mb-3">
                          <Moon size={14} className="text-purple-400 mr-2" />
                          <input
                            value={target}
                            onChange={(e) =>
                              updateItemContent(
                                item.id,
                                `${label}:${e.target.value}`,
                              )
                            }
                            className="bg-transparent focus:outline-none text-white text-sm"
                            placeholder="Target date or milestone"
                          />
                        </div>
                        <div className="bg-gray-800 p-2 rounded-md text-xs text-gray-300">
                          <p>Steps to achieve this goal:</p>
                          <ul className="list-disc pl-4 mt-1 space-y-1">
                            <li>Research and plan</li>
                            <li>Set milestones</li>
                            <li>Track progress regularly</li>
                          </ul>
                        </div>
                      </>
                    );
                  })()}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Celebration component */}
      <ProgressCelebration
        show={showCelebration}
        message={celebrationMessage}
        onClose={() => setShowCelebration(false)}
      />
    </MainLayout>
  );
};

export default DreamboardFeature;
