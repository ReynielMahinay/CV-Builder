import React from "react";
import { ImProfile } from "react-icons/im";
import { MdOutlineWorkOutline } from "react-icons/md";
import { IoCodeWorkingSharp } from "react-icons/io5";
import { GrWorkshop } from "react-icons/gr";
import { LiaUniversitySolid } from "react-icons/lia";

const NavInput = ({ isCollapsed, setIsActive }) => {
  return (
    <div
      className={`flex flex-row gap-5 justify-center items-center bg-white/60 backdrop-blur-[50px]  border border-white/60  px-4 py-1 rounded-3xl w-full shadow-xl ${
        isCollapsed ? "hidden" : "block"
      }`}
    >
      <div
        className="group p-3 rounded-full hover:bg-[#06439F] transition-colors duration-200"
        onClick={() => setIsActive("personal")}
      >
        <ImProfile className="h-6 w-6 text-black group-hover:text-white transition-colors duration-200" />
      </div>

      <div
        className="group p-3 rounded-full hover:bg-[#06439F] transition-colors duration-200"
        onClick={() => setIsActive("work")}
      >
        <MdOutlineWorkOutline className="h-6 w-6 text-black group-hover:text-white transition-colors duration-200" />
      </div>

      <div
        className="group p-3 rounded-full hover:bg-[#06439F] transition-colors duration-200"
        onClick={() => setIsActive("description")}
      >
        <GrWorkshop className="h-6 w-6 text-black group-hover:text-white transition-colors duration-200" />
      </div>

      <div
        className="group p-3 rounded-full hover:bg-[#06439F] transition-colors duration-200"
        onClick={() => setIsActive("skills")}
      >
        <IoCodeWorkingSharp className="h-6 w-6 text-black group-hover:text-white transition-colors duration-200" />
      </div>

      <div
        className="group p-3 rounded-full hover:bg-[#06439F] transition-colors duration-200"
        onClick={() => setIsActive("education")}
      >
        <LiaUniversitySolid className="h-6 w-6 text-black group-hover:text-white transition-colors duration-200" />
      </div>
    </div>
  );
};

export default NavInput;
