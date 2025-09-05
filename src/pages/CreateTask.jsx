import { Form, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import Select from "react-select"
import { useCollection } from "../hook/useCollection"

export default function CreateTask({ isOpen, onClose }) {
  const navigate = useNavigate()
  const { data } = useCollection("users")
  const [userOptions, setUserOptions] = useState([])

  useEffect(() => {
    if (data) {
      const users = data.map((user) => ({
        value: user.displayName,
        label: user.displayName,
        photoURL: user.photoUrl,
        uid: user.uid,
      }))
      setUserOptions(users)
    }
  }, [data])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-gray-900 rounded-2xl w-full max-w-lg p-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Task</h2>

        <Form
          method="post"
          className="space-y-6"
          onSubmit={() => {
            setTimeout(() => {
              onClose()
              navigate("/") // закрываем и возвращаемся домой
            }, 500)
          }}
        >
          <div>
            <label htmlFor="title" className="block text-sm text-gray-300 mb-2">
              Task Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm text-gray-300 mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="4"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label htmlFor="doeto" className="block text-sm text-gray-300 mb-2">
              Due Date
            </label>
            <input
              type="date"
              id="doeto"
              name="due-to"
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Assign to Team Members
            </label>
            <Select
              isMulti
              name="Users"
              options={userOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              placeholder="Select team members..."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold"
          >
            Create Task
          </button>
        </Form>
      </div>
    </div>
  )
}
