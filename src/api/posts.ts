import axios from "axios"
import { getToken } from "../utils/token"
import type { Post } from "../types"

const BASE_URL = "http://localhost:3000"

function getHeaders () {
    const token = getToken ()
    return {
        Authorization: `Bearer ${token}` 
    }
}

export async function getAllPosts() : Promise<Post[]>{
    const response = await axios.get(`${BASE_URL}/posts`)
    return response.data
}

export async function getAllPostById(id:string): Promise<Post> {
    const response = await axios.get(`${BASE_URL}/posts/id`)
    return response.data
}

export async function createPost(data:Omit<Post, 'id' >) : Promise<Post> {
    const response = await axios.post(`${BASE_URL}/posts`, data,{
        headers: getHeaders()
    })
    return response.data
}

export async function updatePost(id:string, data: Partial<Post>):Promise<Post> {
    const response =  await axios.put(`${BASE_URL}/posts/${id}`, data,{
        headers : getHeaders()
    })
     return response.data
}

export async function deletePost(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/posts/${id}`, {
      headers: getHeaders()
    })
  }