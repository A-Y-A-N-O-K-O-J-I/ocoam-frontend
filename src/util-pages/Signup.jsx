import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CountrySelect from "./country";
import { Eye, EyeOff } from 'lucide-react';
import parsePhoneNumber from 'libphonenumber-js'
import { motion } from "framer-motion";


async function handleSignup(formData){
  const baseURL = import.meta.env.VITE_API_URL;

  try{
    const response = await axios.post(`${baseURL}/auth/signup`, formData);
  return response.data;
  }
  catch(error){
  return error.response.data
  }
}

function Signup() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  fullName:"",
  email: "",
  username: "",
  password: "",
  education_level: "",
  dob: "",
  address: "",
  gender: "",
  country: "",
  state: "",
  phone_number: ""
});

const [error, setError] = useState({
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  password: "",
  education_level: "",
  dob: "",
  address: "",
  gender: "",
  country: "",
  state: "",
  phone_number: ""
})
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false);

const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Reset error
  setError((prev) => ({
    ...prev,
    [name]: "",
  }));

  // Check age if it's the dob field
  if (name === "dob") {
    const selectedDate = new Date(value);
    const today = new Date();

    let age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      setError((prev) => ({
        ...prev,
        dob: "You must be at least 18 years old",
      }));
    }
  }

  if(name === "phone_number"){
    if(value.includes('+')){
      console.log(value)
     const phoneNumber = parsePhoneNumber(value)
     if(!phoneNumber?.isValid()){
      setError((prev) => ({
        ...prev,
        phone_number: "Please use a valid Phone number",
      }));
     }
     
    } else {
      setError((prev) => ({
        ...prev,
        phone_number: "Please add your country code e.g., +2348123456789",
      }));
    }
  }
  
};

const handleCountryChange = (selectedCountry) => {
    setFormData((prev) => ({ ...prev, "country": selectedCountry }));
  };

const handleSubmit = async (e) => {
  e.preventDefault()
  const tempError = {}
  const requiredFields = [
  "firstName",
  "lastName",
  "email",
  "username",
  "password",
  "education_level",
  "dob",
  "address",
  "gender",
  "country",
  "state",
  "phone_number"
];
requiredFields.forEach((field) => {
  if(!formData[field] || formData[field] === "") {
    tempError[field] = `${field.replace("_", " ")} is required`;
  }})

  if (Object.keys(tempError).length > 0) {
  setError(tempError);
  return;
}
  const fullName = `${formData.firstName || ""} ${formData.lastName || ""}`.trim();

const payload = {
  ...formData,
  fullName,
  firstName: "",
  lastName: "",
}

setLoading(true);
if(payload){
localStorage.setItem("email",payload.email)
}
const results = await handleSignup(payload)
if(results.status === 201){
setLoading(false)
navigate('/verify-email')
setLoading(true)
} else if(results.status === 409){
  setLoading(false)
  setError((prev=>({
    ...prev,
    email:results.message
  })));
} 
else {
  setLoading(false)
  let errorMessage = "Oops! Looks like An error Occured"
  setError((prev=>({
          ...prev,
          phone_number:errorMessage
        })));
}
}

  return (
  <div className="flex justify-center items-center min-h-screen bg-gray-200 overflow-hidden">
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1.2, ease: "easeInOut" }}
  className="bg-white rounded-lg shadow-lg p-6 w-[400px] flex flex-col justify-center mx-4 my-13"
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
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* First & Last Name */}
        <div className="flex gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="w-1/2 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="w-1/2 px-3 py-2 border rounded"
            />
        </div>
        <div className="flex">
            {error.firstName && <p className="text-red-500 text-sm mt-1 px-3">{error.firstName}</p>}
          {error.lastName && <p className="text-red-500 text-sm mt-1 px-3">{error.lastName}</p>}
        </div>
        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          />

          {error.email && <p className="text-red-500 text-sm mt-1 px-3">{error.email}</p>}
        {/* Username */}
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
{error.username && <p className="text-red-500 text-sm mt-1 px-3">{error.username}</p>}

        {/* Password */}
        <div className="relative w-full">
        <input
    type={showPassword ? "text" : "password"}
    name="password"
    value={formData.password}
    onChange={handleChange}
    placeholder="Enter your password"
    className="w-full px-3 py-2 border rounded pr-10"
  />
  <span
    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
  </span>
  </div>
{error.password && <p className="text-red-500 text-sm mt-1 px-3">{error.password}</p>}

        {/* Education Level */}
        <select
          name="education_level"
          value={formData.education_level}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Select Education Level</option>
          <option value="secondary school">Secondary School</option>
          <option value="first degree">First Degree</option>
          <option value="masters">Masters</option>
          <option value="phd">PhD</option>
          <option value="retiree">Retiree</option>
        </select>
{error.education_level && <p className="text-red-500 text-sm mt-1 px-3">{error.education_level}</p>}
        {/* Date of Birth */}
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
{error.dob && <p className="text-red-500 text-sm mt-1 px-3">{error.dob}</p>}

        {/* Address */}
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        />
{error.address && <p className="text-red-500 text-sm mt-1 px-3">{error.address}</p>}
        {/* Gender */}
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="none">I prefer not to say</option>
          
        </select>  
        {error.gender && <p className="text-red-500 text-sm mt-1 px-3">{error.gender}</p>}

        {/* Country */}
         <CountrySelect value={formData.country} onChange={handleCountryChange} />
          {error.country && <p className="text-red-500 text-sm mt-1 px-3">{error.country}</p>}

        {/* State */}
        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          />
          {error.state && <p className="text-red-500 text-sm mt-1 px-3">{error.state}</p>}

        {/* Phone Number */}
        <input
          type="tel"
          name="phone_number"
          placeholder="Phone Number"
          value={formData.phone_number}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          />
          {error.phone_number && <p className="text-red-500 text-sm mt-1 px-3">{error.phone_number}</p>}
        <div className="flex px-3 text-sm space-x-2 ">
    <input type="checkbox" name="terms" required/>
    <p className="relative top-3">By clicking this, you accept the <a href="/terms" className="text-blue-500">Terms and Conditions</a> of the website.</p>
    </div>
        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="rounded-full border border-black text-white w-full bg-black p-1"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <div className = "flex justify-between mt-5">
    <p className = "text-sm text-blue-400 "><a href="/login">Already Have An Account? Login here</a></p> 
    
    </div>
    </motion.div>
  </div>
);

}

export default Signup;
