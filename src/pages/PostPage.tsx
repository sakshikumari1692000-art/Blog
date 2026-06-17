import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import type { Post } from "../types";
import { getAllPostById } from "../api/posts";
import Button from "../components/Button";

const PostPage = () =>{
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const[post, setPost] = useState<Post | null>(null)
  const[loading, setLoading] = useState<boolean>(true)
  const[error, setError] = useState<string>("")
  const[deleting, setDeleting] = useState<boolean>(false)

  useEffect(()=>{
    if(id) fetchPost()
  },[id])

async function fetchPost() {
    try{
      setLoading(true)
      const data = await getAllPostById(id!)
      setPost(data)
    }catch(err){
      setError("Post not found.")
    }finally{
      setLoading(false)
    }
}

async function handleDelete() {
    if(!confirm("Are you sure you want to delete this post?"))  return

    try{
        setLoading(true)
        const data = await getAllPostById(id!)
        setPost(data)
    }catch(err){
    setError("Post not found.")
    }finally{
    setDeleting(false)
    }
}

if(loading) return(
    <div className="flex justify-center py-20">
      <div className="w-8 h-8 border-4 border-blue-500
        border-t-transparent rounded-full animate-spin">
      </div>
    </div>
)
if (error) return (
    <div className="max-w-3xl mx-auto px-4 py-10 text-center">
      <p className="text-red-500 text-lg">{error}</p>
      <Button text="Go Home" onClick={() => navigate('/')} />
    </div>
  )
if (!post) return null

const isAuthor = currentUser?.id === post.authorId

return (
    <div className="max-w-3xl mx-auto px-4 py-10">

      <button
        onClick={() => navigate('/')}
        className="text-gray-400 hover:text-gray-600 text-sm mb-6
          flex items-center gap-1"
      >
        ← Back to posts
      </button>

      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        {post.title}
      </h1>

      <div className="flex justify-between items-center mb-8
        pb-4 border-b border-gray-200">
        <div className="text-sm text-gray-500">
          By <span className="font-medium">{post.authorName}</span>
          {" · "}
          {new Date(post.createdAt).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {isAuthor && (
          <div className="flex gap-2">
            <Button
              text="Edit"
              variant="secondary"
              onClick={() => navigate(`/edit/${post.id}`)}
            />
            <Button
              text={deleting ? "Deleting..." : "Delete"}
              variant="danger"
              onClick={handleDelete}
              disabled={deleting}
            />
          </div>
        )}
      </div>

      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>

    </div>
  )

}

export default PostPage;