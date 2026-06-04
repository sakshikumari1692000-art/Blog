import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { generateFakeToken, saveToken, saveUser } from "../utils/token";
import Button from "../components/Button";

interface FormData{
    email: string;
    password: string;
}

interface FormErrors{
    email?: string;
    password?: string;
    general?: string;
}

interface LoginPageProps {
    onLogin: () => void;
}
const LoginPage = (props : LoginPageProps) =>{
    const navigate = useNavigate();
    const [form, setForm] =  useState<FormData>({
        email: "",
        password: ""
    })
    const [error, setError] = useState<FormErrors>({})
    const [loading, setLoading] = useState<boolean>(false);

    function handleChange(field: keyof FormData){
        return (e:React.ChangeEvent<HTMLInputElement>) =>{
            setForm({...form, [field] : e.target.value})
            setError({...error,[field]: ""})
        }
    }

    function validate() : boolean {
        const newErrors : FormErrors ={}

        if(!form.email){
            newErrors.email = "Email is required"
        }
        if(!form.password){
            newErrors.password = "Password is required"
        }

        setError(newErrors)
        return Object.keys(newErrors).length === 0;
    }

    async function handleLogin () {
        if(!validate()){
            return
        }
        setLoading(true);
        try{
            const user = await loginUser({
                email: form.email,
                password: form.password
            })
            if(!user){
                setError({general: "Invalid email or password"})
                return
            }
            const token = generateFakeToken(user.id, user.email);
            saveToken(token);
            saveUser(user);
            props.onLogin();
            navigate("/")
        }catch(error){
            setError({general: "An error occurred during login"})
        }finally{
            setLoading(false);
        }
    }
    return(
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 w-full max-w-md">
    
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
                Welcome back
            </h1>
            <p className="text-gray-500 text-sm mb-6">
                Login to your BlogApp account
            </p>
    
                <form className="flex flex-col gap-4" onSubmit={(e) => {
                    e.preventDefault()
                    handleLogin()
                }}>
                <Input
                    label="Email"
                    type = "email"
                    value= {form.email}
                    placeholder="Enter your email..."
                    onChange={handleChange("email")}
                    error={error.email}
                    />
                    <Input
                        label="Password"
                        type = "password"
                        value= {form.password}
                        placeholder="Enter your password..." 
                        onChange={handleChange("password")}
                        error={error.password}
                    />
                    {error.general && (
                        <p className="text-red-500 text-sm text-center">
                           {error.general}
                        </p>
                    )}
                    <Button
                       text={loading ? "Logging in..." : "Login"}
                       type="submit"
                       fullWidth
                       disabled={loading} 
                    />
                    <p className="text-center text-sm text-gray-500">
                        <span onClick={() => navigate('/signup')}
                            className="text-blue-600 cursor-pointer hover:underline">
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;