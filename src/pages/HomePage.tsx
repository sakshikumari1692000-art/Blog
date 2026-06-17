import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import type { Post } from '../types'
import { getAllPosts } from '../api/posts'
import Card from '../components/Card'
import Button from '../components/Button'

function HomePage() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  const [posts, setPosts] = useState<Post[]>([]);
  const[loading, setLoading] = useState<boolean>();
  const[error, setError] = useState<string>("");

  useEffect(()=>{
    fetchPosts()
  },[])
  async function fetchPosts() {
    try{
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
    }catch(err){
      setError("Failed to load Posts. Please try again.")
    }finally{
      setLoading(false)
    }
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Latest Posts
          </h1>
          <p className="text-gray-500 mt-1">
            Welcome back, {currentUser?.name}! 👋
          </p>
        </div>
        <Button
          text="+ Write Post"
          onClick={() => navigate('/create')}
          variant="primary"
        />
      </div>

      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-blue-500
            border-t-transparent rounded-full animate-spin">
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl
          p-4 text-red-600 text-center">
          {error}
        </div>
      )}

      {!loading && !error && posts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">📝</p>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No posts yet
          </h2>
          <p className="text-gray-400 mb-6">
            Be the first one to write something!
          </p>
          <Button
            text="Write First Post"
            onClick={() => navigate('/create')}
          />
        </div>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {posts.map((post) => (
            <Card key={post.id} post={post} />
          ))}
        </div>
      )}

    </div>
  )
}

export default HomePage