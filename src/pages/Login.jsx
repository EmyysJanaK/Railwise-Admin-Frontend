
import trainImage from "../assets/trainImage.png"; 
import TextInput from "../components/TextInput";
import PasswordInput from "../components/PasswordInput";
import useFormInput from "../hooks/useFormInput";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { loginUser, error } = useAuth();
  const username = useFormInput("");
  const password = useFormInput("");



  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser({
      username: username.value,
      password: password.value,
    });
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="absolute inset-0 bg-[#1976D2] opacity-75"></div>
      <div className="relative z-10 w-full max-w-md p-8 mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex justify-center mb-8">
          <img
            src={trainImage}
            alt="Railwise Logo"
            className="w-20 h-20"
          />
        </div>
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Railwise  Admin Login
        </h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <form onSubmit={handleLogin}>
          
          <TextInput label="Username" {...username} />
          <PasswordInput label="Password" {...password} />


          <button
            type="submit"
            className="w-full py-2 text-white transition duration-300 bg-black rounded-full hover:bg-gray-800"
          >
            Login
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
