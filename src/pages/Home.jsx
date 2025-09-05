import { useSelector } from "react-redux";
import { useLogOut } from "../hook/LogOut";
import { useCollection } from "../hook/useCollection";
import { Link } from "react-router-dom";
import CreateTask from "./CreateTask";
import { useState } from "react";


export default function Home() {
  const { ispending, logout } = useLogOut();
  const { user } = useSelector((store) => store.user);

  const { data: users } = useCollection("users");
  const { data: tasks } = useCollection("tasks");

  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Navigation */}
        <nav className="glass-effect rounded-2xl p-6 mb-8 animate-fade-in">
          <div className="relative">
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-secondary flex items-center space-x-2"
            >
              + Create Task
            </button>

            <CreateTask
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.displayName?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">
                  Welcome, {user.displayName}
                </h1>
                <p className="text-gray-400 text-sm">
                  Task Management Dashboard
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/create"
                className="btn-secondary flex items-center space-x-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span>Create Task</span>
              </Link>

              {!ispending ? (
                <button
                  className="btn-primary flex items-center space-x-2"
                  onClick={logout}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <button
                  className="btn-primary opacity-50 cursor-not-allowed"
                  disabled
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Loading...</span>
                  </div>
                </button>
              )}
            </div>
          </div>
        </nav>

        {/* Users Section */}
        <div className="animate-slide-up mb-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Team Members</h2>
            <p className="text-gray-400">Active users in your workspace</p>
          </div>

          {users && users.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((userData) => (
                <div key={userData.uid} className="card group">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <img
                        src={userData.photoUrl}
                        alt={userData.displayName}
                        className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 group-hover:border-gray-600 transition-colors duration-300"
                      />
                      <div
                        className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                          userData.online ? "bg-green-500" : "bg-gray-500"
                        }`}
                      ></div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-white truncate group-hover:text-gray-200 transition-colors duration-300">
                        {userData.displayName}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        {userData.email}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">
                No team members yet
              </h3>
              <p className="text-gray-400">
                Invite your team to start collaborating
              </p>
            </div>
          )}
        </div>

        {/* Tasks Section */}
        <div className="animate-slide-up">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">All Tasks</h2>
            <p className="text-gray-400">Every task in your workspace</p>
          </div>

          {tasks && tasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div key={task.id} className="card group">
                  <h3 className="text-lg font-semibold text-white">
                    {task.title}
                  </h3>
                  <p className="text-gray-400">{task.description}</p>
                  <p className="text-gray-500 text-sm mt-2">
                    Due: {task["due-to"]}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="card text-center py-12">
              <h3 className="text-xl font-semibold text-white mb-2">
                No tasks yet
              </h3>
              <p className="text-gray-400">Create a task to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
