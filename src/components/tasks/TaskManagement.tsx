import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  X,
  ArrowUp,
  ArrowDown,
  Filter,
} from "lucide-react";
import MainLayout from "../layout/MainLayout";
import ProgressCelebration from "../ui/progress-celebration";

type Priority = "high" | "medium" | "low";
type Status = "todo" | "in-progress" | "completed";

type Task = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: string;
  createdAt: string;
};

const TaskManagement = () => {
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState("");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Complete project proposal",
      description: "Finish the initial draft of the business plan",
      priority: "high",
      status: "in-progress",
      dueDate: "2023-12-15",
      createdAt: "2023-12-01",
    },
    {
      id: "2",
      title: "Research competitors",
      description: "Analyze top 5 competitors in the market",
      priority: "medium",
      status: "todo",
      dueDate: "2023-12-20",
      createdAt: "2023-12-02",
    },
    {
      id: "3",
      title: "Set up social media accounts",
      description: "Create profiles on Instagram, Twitter, and LinkedIn",
      priority: "low",
      status: "completed",
      dueDate: "2023-12-10",
      createdAt: "2023-12-03",
    },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState<Omit<Task, "id" | "createdAt">>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    dueDate: new Date().toISOString().split("T")[0],
  });
  const [filter, setFilter] = useState<{
    status: Status | "all";
    priority: Priority | "all";
  }>({
    status: "all",
    priority: "all",
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleAddTask = () => {
    if (!newTask.title) return;

    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split("T")[0],
    };

    setTasks([...tasks, task]);
    setShowAddTask(false);
    setNewTask({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      dueDate: new Date().toISOString().split("T")[0],
    });
  };

  const updateTaskStatus = (id: string, status: Status) => {
    const task = tasks.find((t) => t.id === id);

    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );

    // Show celebration when a task is completed
    if (status === "completed" && task) {
      setCelebrationMessage(`You completed: ${task.title}`);
      setShowCelebration(true);
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch =
      filter.status === "all" || task.status === filter.status;
    const priorityMatch =
      filter.priority === "all" || task.priority === filter.priority;
    return statusMatch && priorityMatch;
  });

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-green-500";
      default:
        return "";
    }
  };

  const getStatusIcon = (status: Status) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="text-green-500" size={18} />;
      case "in-progress":
        return <Clock className="text-yellow-500" size={18} />;
      case "todo":
        return <Circle className="text-gray-400" size={18} />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="w-full min-h-[calc(100vh-12rem)] bg-black p-6">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-[#87CEEB]">Task Management</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <Filter size={20} />
            </button>
            <button
              onClick={() => setShowAddTask(true)}
              className="bg-[#87CEEB] text-black px-4 py-2 rounded-lg hover:bg-opacity-80 transition-colors flex items-center gap-2"
            >
              <Plus size={20} />
              <span>Add Task</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-gray-900 rounded-lg"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={filter.status}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      status: e.target.value as Status | "all",
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                >
                  <option value="all">All</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">
                  Priority
                </label>
                <select
                  value={filter.priority}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      priority: e.target.value as Priority | "all",
                    })
                  }
                  className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                >
                  <option value="all">All</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid gap-4">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 bg-gray-900 rounded-lg">
              <p className="text-gray-400">
                No tasks found. Add a new task to get started!
              </p>
            </div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-gray-700 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => {
                        const nextStatus = {
                          todo: "in-progress",
                          "in-progress": "completed",
                          completed: "todo",
                        }[task.status] as Status;
                        updateTaskStatus(task.id, nextStatus);
                      }}
                      className="mt-1"
                    >
                      {getStatusIcon(task.status)}
                    </button>
                    <div>
                      <h3
                        className={`font-semibold text-lg ${task.status === "completed" ? "line-through text-gray-500" : ""}`}
                      >
                        {task.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs">
                          <Calendar size={14} />
                          <span>{task.dueDate}</span>
                        </div>
                        <div
                          className={`flex items-center gap-1 text-xs ${getPriorityColor(task.priority)}`}
                        >
                          {task.priority === "high" ? (
                            <ArrowUp size={14} />
                          ) : task.priority === "low" ? (
                            <ArrowDown size={14} />
                          ) : null}
                          <span className="capitalize">{task.priority}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      <AnimatePresence>
        {showAddTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#87CEEB]">
                  Add New Task
                </h2>
                <button
                  onClick={() => setShowAddTask(false)}
                  className="p-1 hover:bg-gray-800 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    placeholder="Task title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    className="w-full bg-gray-800 border border-gray-700 rounded-md p-2 min-h-[80px]"
                    placeholder="Task description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Due Date
                    </label>
                    <input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Priority
                    </label>
                    <select
                      value={newTask.priority}
                      onChange={(e) =>
                        setNewTask({
                          ...newTask,
                          priority: e.target.value as Priority,
                        })
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-md p-2"
                    >
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="px-4 py-2 border border-gray-700 rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddTask}
                    className="px-4 py-2 bg-[#87CEEB] text-black rounded-md hover:bg-opacity-80 transition-colors"
                    disabled={!newTask.title}
                  >
                    Add Task
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration component */}
      <ProgressCelebration
        show={showCelebration}
        message={celebrationMessage}
        onClose={() => setShowCelebration(false)}
      />
    </MainLayout>
  );
};

export default TaskManagement;
