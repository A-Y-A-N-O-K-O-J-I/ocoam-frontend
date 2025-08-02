import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

async function handleLogin(formData){
  const baseURL = import.meta.env.VITE_API_URL;

  try{
    const response = await axios.post(`${baseURL}/auth/login`, formData,{
      withCredentials:true
    });
  return response.data;
  }
  catch(error){
  return error.response.data
  }
}
function Login(){
const [formData, setFormData] = useState({
  "username": "",
  "password": "",
})
const [error, setError] = useState({
  "username": "",
  "password": ""
})
const [loading, setLoading] = useState(false);
const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData((prev)=> ({
      ...prev,
      [e.target.name]: e.target.value,
  }))
    setError((prev)=> ({
      ...prev,
      [e.target.name]: "",
  }))
  }
  
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const tempError = {};
    
    if(formData.username === ""){
      tempError.username = "Username is required";
    }
    if(formData.password === ""){
      tempError.password = "Password is required";
    }
  
  
    if(Object.keys(tempError).length > 0){
      setError(tempError);
      return;
  }
  setLoading(true); // <-- Show loading
  const output = await handleLogin(formData);
  setLoading(false); // <-- Hide loading
  if(output.status===400){
    setError((prev=>({
      ...prev,
      password:output.message
    })));
    
  } else if(output.status === 403){
    setLoading(true)
    navigate("/verify-email");
  } 
   if(output.status === 200 && output.moderator){
    navigate("/moderator/dashboard");
   }
   if(output.status === 200 && !output.moderator){
    navigate("/dashboard")
   }

}
return (
<>
<div className = "flex justify-center items-center h-screen bg-gray-200 overflow-hidden">
  <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="bg-white rounded-lg shadow-lg p-6 w-96 h-96 flex flex-col justify-center mx-4"
>
  <div className="flex justify-center space-x-2 mt-6">
      {/* Logo Animation */}
      <motion.img
        src="/logo.png"
        className="w-8 h-8 rounded-full border select-none pointer-events-none"
        initial={{ x: 100, rotate: 0, opacity: 0 }}
        animate={{ x: 0, rotate: 360, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      {/* Text Reveal "coming out" from logo */}
      <motion.h1
        className="text-center select-none pointer-events-none font-bold mb-5 mt-1 text-2xl"
        initial={{ x: -30, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: "easeOut" }}
      >
        O.C.O.Y.A.M
      </motion.h1>
    </div>
    <p className="text-center"></p>
<form onSubmit={handleSubmit} className="space-y-6" >
  <div>
<input type="text" name="username" placeholder="username or email address" value={formData.username} onChange={handleChange} className = "rounded-full w-full border border-black transform transition duration-700 ease-in-out hover:scale-105 px-3 h-10"/>
  {error.username && (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-500 text-sm mt-1 px-3"
  >
    {error.username}
  </motion.p>
)}
</div>
  <div>
  <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleChange} className = "rounded-full w-full border border-black transform transition duration-700 ease-in-out hover:scale-105 px-3 h-10"/>
    {error.password && (
  <motion.p
    initial={{ opacity: 0, y: -5 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-red-500 text-sm mt-1 px-3"
  >
    {error.password}
  </motion.p>
)}
</div>
  <div className = "flex flex-col justify-center">
  <button type="submit" disabled={loading} className="rounded-full border border-black text-white bg-black p-1">
  {loading ? "Logging in..." : "Login"}
</button>

  </div>
  <div className = "flex justify-between">
    <p className = "text-sm text-blue-400"><a href="/signup">New here? Get started</a></p> 
    <p className = "text-sm text-blue-400"><a href="/forgot-password">Forgot password?</a></p>
    </div>
</form>

  </motion.div>
</div>
</>
  )
}
export default Login