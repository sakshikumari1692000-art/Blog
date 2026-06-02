import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";
import Button from "../components/Button";

interface FormData {
    name: string
    email: string
    password: string
    confirmPassword: string
}

interface Formerror {
    name?: string
    email?: string
    password?: string
    confirmPassword?: string
    general?: string
}

const SignupPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [error, setError] = useState<Formerror>({});
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange(field: keyof FormData) {
        //keyof FormData means "only allow name, email, password, or confirmPassword" — the exact keys of your FormData interface. TypeScript will error if you pass anything else.
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [field]: e.target.value });
            //...form copies all existing form values. Then [field]: e.target.value updates just the one field that changed. Without the spread, you'd lose the other field values.
        }
    }

    const validate = (): boolean => {
        const newerror: Formerror = {};

        if (!form.name.trim()) {
            newerror.name = "Name is required";
        }

        if (!form.email.trim()) {
            newerror.email = "Email is required";
        } else if (!form.email.includes("@")) {
            newerror.email = "Email must be valid";
        }

        if (!form.password) {
            newerror.password = "Password is required";
        } else if (form.password.length < 6) {
            newerror.password = "Password must be at least 6 characters";
        }

        if (!form.confirmPassword) {
            newerror.confirmPassword = "Confirm Password is required";
        } else if (form.confirmPassword !== form.password) {
            newerror.confirmPassword = "Passwords do not match";
        }

        setError(newerror);

        return Object.keys(newerror).length === 0;
    };

    async function handleSignup() {
        if (!validate()) return
        setLoading(true);
        try {
            await signupUser({
                name: form.name,
                email: form.email,
                password: form.password
            })
            navigate("/login");
        } catch (error) {
            setError({ general: "Something went wrong. Please try Again" })
        } finally {
            setLoading(false);
        }
    }
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
  
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Create account
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            Join BlogApp and start writing
          </p>
  
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault()
              handleSignup()
            }}
          >
            <Input
              label="Full Name"
              placeholder="Enter your Full Name..."
              value={form.name}
              onChange={handleChange("name")}
              error={error.name}
            />
  
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email..."
              value={form.email}
              onChange={handleChange("email")}
              error={error.email}
            />
  
            <Input
              label="Password"
              type="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange("password")}
              error={error.password}
            />
  
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={error.confirmPassword}
            />
  
            {error.general && (
              <p className="text-red-500 text-sm text-center">{error.general}</p>
            )}
  
            <Button
              text={loading ? "Creating account..." : "Sign Up"}
              type="submit"
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
  
          </form>
  
        </div>
      </div>
    )
}
export default SignupPage;