import { useAuth } from '../context/AuthContext'

function HomePage() {
  const { currentUser } = useAuth()

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        Welcome back, {currentUser?.name}! 👋
      </h1>
      <p className="text-gray-500">
        Your blog posts will appear here.
      </p>
    </div>
  )
}

export default HomePage