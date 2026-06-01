export interface User {
    id: string
    name: string
    email: string
    password: string
  }
  
  export interface Post {
    id: string
    title: string
    content: string
    authorId: string
    authorName: string
    createdAt: string
  }
  
  export interface AuthResponse {
    user: User
    token: string
  }