const TOKEN_KEY = "blog_token"
const USER_KEY = "blog_user"

export function generateFakeToken(userId: string, email: string): string{
  return btoa(`${userId}:${email}:${Date.now()}`)
}
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function saveUser(user: object): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export function getUser(): object | null {
  const user = localStorage.getItem(USER_KEY)
  return user ? JSON.parse(user) : null
}

export function removeUser(): void {
  localStorage.removeItem(USER_KEY)
}