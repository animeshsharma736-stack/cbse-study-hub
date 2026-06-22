import React, { useState, useEffect } from "react";
import { Plus, Trash2, CheckCircle2, Circle, Flame } from "lucide-react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function Focus() {
  const { user, login } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [streak, setStreak] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    try {
      const res = await api.get("/focus/tasks");
      setTasks(res.data.tasks || []);
      setStreak(res.data.streak || 0);
    } catch (e) {
      console.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    if (user) loadTasks();
  }, [user]);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    if (!user) {
      toast("Sign in to create tasks");
      login();
      return;
    }

    setLoading(true);
    try {
      await api.post("/focus/tasks", { title: newTask.trim() });
      setNewTask("");
      await loadTasks();
      toast.success("Task added!");
    } catch (e) {
      toast.error("Could not add task");
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = async (taskId, completed) => {
    try {
      await api.patch(`/focus/tasks/${taskId}`, { completed: !completed });
      await loadTasks();
    } catch (e) {
      toast.error("Could not update task");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/focus/tasks/${taskId}`);
      await loadTasks();
      toast.success("Task deleted");
    } catch (e) {
      toast.error("Could not delete task");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8" data-testid="focus-page">
      {/* Streak */}
      <div className="nb-card p-6 bg-[#FDE68A] text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Flame className="w-6 h-6" strokeWidth={2.5} fill="currentColor" />
          <div className="font-display font-black text-4xl">{streak}</div>
        </div>
        <p className="text-sm text-neutral-700">Day streak! Keep it going 🔥</p>
      </div>

      {/* Add task form */}
      <form onSubmit={addTask} className="flex gap-3" data-testid="add-task-form">
        <input
          type="text"
          className="nb-input flex-1"
          placeholder="What's on your study list today?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          disabled={!user}
          data-testid="task-input"
        />
        <button
          type="submit"
          disabled={loading || !user}
          className="nb-btn nb-btn-primary !px-4"
          data-testid="add-task-btn"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </form>

      {/* Tasks list */}
      <div className="space-y-3" data-testid="tasks-list">
        {tasks.length === 0 && (
          <div className="nb-card p-6 text-center text-neutral-600">
            <p className="mb-2">No tasks yet. Add one to get started!</p>
            {!user && (
              <button onClick={login} className="text-sm font-semibold text-blue-600">
                Sign in first
              </button>
            )}
          </div>
        )}

        {tasks.map((task) => (
          <div
            key={task.id}
            className="nb-card p-4 flex items-center gap-3"
            data-testid={`task-${task.id}`}
          >
            <button
              onClick={() => toggleTask(task.id, task.completed)}
              className="flex-shrink-0 p-1"
              data-testid={`toggle-task-${task.id}`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" strokeWidth={2.5} fill="currentColor" />
              ) : (
                <Circle className="w-6 h-6" strokeWidth={2.5} />
              )}
            </button>
            <span className={`flex-1 ${task.completed ? "line-through text-neutral-400" : ""}`}>
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="flex-shrink-0 p-1 text-red-600 hover:bg-red-50 rounded"
              data-testid={`delete-task-${task.id}`}
            >
              <Trash2 className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        ))}
      </div>

      {!user && (
        <div className="nb-card p-6 bg-[#A7F3D0] text-center">
          <p className="mb-3">Sign in to save your tasks and build your streak</p>
          <button onClick={login} className="nb-btn nb-btn-primary">
            Sign in with Google
          </button>
        </div>
      )}
    </div>
  );
}