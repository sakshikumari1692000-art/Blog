import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/Input'
import Button from '../components/Button'
import { signupUser } from '../api/auth'

interface FormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  general?: string
}

function SignupPage() {
  const navigate = useNavigate()

  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState<boolean>(false)

  function handleChange(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [field]: e.target.value })
      setErrors({ ...errors, [field]: "" })
    }
  }

  function validate(): boolean {
    const newErrors: FormErrors = {}

    if (!form.name.trim()) {
      newErrors.name = "Name is required"
    }
    if (!form.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!form.email.includes("@")) {
      newErrors.email = "Enter a valid email"
    }
    if (!form.password) {
      newErrors.password = "Password is required"
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password"
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSignup() {
    if (!validate()) return

    setLoading(true)

    try {
      await signupUser({
        name: form.name,
        email: form.email,
        password: form.password
      })
      navigate('/login')
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200
        p-8 w-full max-w-md">

        <h1 className="text-2xl font-bold text-gray-800 mb-1">
          Create account
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Join BlogApp and start writing
        </p>

        <div className="flex flex-col gap-4">

          <Input
            label="Full Name"
            placeholder="Rahul Singh"
            value={form.name}
            onChange={handleChange("name")}
            error={errors.name}
          />

          <Input
            label="Email"
            type="email"
            placeholder="rahul@email.com"
            value={form.email}
            onChange={handleChange("email")}
            error={errors.email}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Min 6 characters"
            value={form.password}
            onChange={handleChange("password")}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Repeat your password"
            value={form.confirmPassword}
            onChange={handleChange("confirmPassword")}
            error={errors.confirmPassword}
          />

          {errors.general && (
            <p className="text-red-500 text-sm text-center">
              {errors.general}
            </p>
          )}

          <Button
            text={loading ? "Creating account..." : "Sign Up"}
            onClick={handleSignup}
            fullWidth
            disabled={loading}
          />

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <span
              onClick={() => navigate('/login')}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </div>
  )
}

export default SignupPage