import Input from "../components/Input";

const LoginPage = () =>{
    return(
        <div>
            <form className="flex flex-col gap-4">
               <Input
                  label="email"
                  type = "email"
                  placeholder="Enter your email..."
                />
            </form>
        </div>
    );
}

export default LoginPage;