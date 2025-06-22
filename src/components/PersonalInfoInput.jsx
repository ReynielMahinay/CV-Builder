import React, { useState } from "react";

function PersonalInfoInput({ info, setInfo }) {
  const [emailError, setEmailError] = useState("");
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleInputedData = (e) => {
    const { name, value } = e.target; // ✅ Use name, not "data"

    if (name === "email") {
      if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
    setInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <div className="p-5 flex flex-1 flex-col gap-2">
      <div className="flex flex-1 justify-center">
        <p className="uppercase font-bold text-2xl">Personal Information</p>
      </div>
      <form className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={info.name}
          onChange={handleInputedData}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          value={info.address}
          onChange={handleInputedData}
          required
          className="bg-white/10 backdrop-blur-[50px]  border border-white/90 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={info.email}
          onChange={handleInputedData}
          required
          className={`bg-white/10 backdrop-blur-[50px]  border border-white/90 border ${
            emailError ? "border-red-500" : "border-gray-300 "
          } w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 ${
            emailError ? "focus:ring-red-400" : "focus:ring-blue-400"
          } `}
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={info.phone}
          required
          onChange={handleInputedData}
          className="bg-white/10 backdrop-blur-[50px]  border border-white/90 w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </form>
    </div>
  );
}

export default PersonalInfoInput;
