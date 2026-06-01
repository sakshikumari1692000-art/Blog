import { useNavigate } from "react-router-dom";
import Button from "./Button";

interface NavbarProps{
    isLoggedIn : boolean
    onLogout : () => void
}
const Navbar = (props: NavbarProps) => {
    const navigate = useNavigate()
  return(
    <nav className="bg-white border-b border-gray-200 px-6 py-3
       flex justify-between items-center sticky top-0 z-10">
      <h1 onClick={() => navigate('/')}>📝 BlogApp</h1>
      <div className="flex items-center gap-3">{props.isLoggedIn ? (
          <>
          <Button
            text= "Write Post"
            onClick={() => navigate('/create')}
            variant="secondary"
          />
          <Button
            text="Logout"
            onClick={props.onLogout}
            variant="danger"
          />
          </>
      ) : (
          <>
          <Button 
            text="Login"
            onClick={() => navigate('/login')}
            variant = "secondary"
          />
          <Button
            text="Sign Up"
            onClick={() => navigate('/signup')}
            variant="primary" 
          />
          </>
      )}</div>
    </nav>
  );
}

export default Navbar;