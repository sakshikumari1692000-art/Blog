import { useState } from "react";
import Button from "./components/Button";
import Input from "./components/Input";
import Card from "./components/Card";
import type { Post } from "./types";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

const testPost: Post = {
  id: "1",
  title: "Test Post",
  content: "This is a test post content to demonstrate the Card component.",
  authorId: "1",
  authorName: "John Doe",
  createdAt: new Date().toISOString(),
}

function App() {
  const [email, setEmail] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  return (
    <BrowserRouter>
    <div className="min-h-screen bg-gray-50">
      <Navbar
        isLoggedIn={isLoggedIn}
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-6">
        <h2 className="text-2xl font-bold text-gray-800">Component Test</h2>
        <Input
          label="Email"
          type="email"
          placeholder="Enter your Email..."
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <div className="flex gap-3">
            <Button text="Primary" variant="primary" />
            <Button text="Secondary" variant="secondary" />
            <Button text="Danger" variant="danger" />
        </div>

        <Button 
          text="Toggle Login State"
          onClick={() => setIsLoggedIn(!isLoggedIn)} 
          fullWidth 
        />
        <Card post={testPost}/>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;