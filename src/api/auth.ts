import axios from "axios"
import type { User } from "../types"

const BASE_URL = "http://localhost:3000"

export interface SignupData {
    name: string
    email: string
    password: string
}

export interface LoginData {
    email: string
    password: string
}

export async function signupUser(data: SignupData): 
Promise<User>{
  const response = await axios.post(`${BASE_URL}/users`, data)
  return response.data
}

export async function loginUser(data: LoginData):
Promise<User | null>{
    const response = await axios.get(`${BASE_URL}/users?email=${data.email}&password=${data.password}`)
    const users: User[] = response.data
    if(users.length === 0){
        return null
    }
    return users[0];
}