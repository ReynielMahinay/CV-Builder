import "./App.css";
import React, { use, useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumeDisplay from "./components/ResumeDisplay";
import NavInput from "./components/NavInput";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [info, setInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [workExperiences, setWorkExperiences] = useState([]);
  const [educAttainment, setEducAttainment] = useState([]);
  const [skills, setSkills] = useState([]);

  const [isActive, setIsActive] = useState("personal");

  return (
    <div className="flex flex-1 flex-rows w-full h-full">
      {/* Sidebar */}
      <div
        className={`transition-all duration-300 min-h-screen max-h-autos text-black p-4 flex flex-col gap-2 
       ${
         isCollapsed ? "w-20 flex justify-center items-center" : "w-2/5"
       } bg-transparent `}
      >
        <div
          className={`text-white flex flex-row gap-2 items-center justify-between ${
            isCollapsed ? "hidden" : "block"
          }`}
        >
          {/* <p
            className={`text-5xl uppercase font-bold ${
              isCollapsed ? "hidden" : "block"
            } `}
          >
            Resume Builder
          </p> */}

          <NavInput isCollapsed={isCollapsed} setIsActive={setIsActive} />

          <span
            className={`font-bold border-none `}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              ""
            ) : (
              <div className=" bg-white/60 backdrop-blur-[50px]  border border-white/60 p-2.5 rounded-3xl ">
                <MdOutlineKeyboardDoubleArrowLeft className="w-10 h-10 text-black hover:text-[#06439F] " />
              </div>
            )}
          </span>
        </div>

        {!isCollapsed && (
          <ResumeForm
            info={info}
            setInfo={setInfo}
            workExperiences={workExperiences} // Pass workExperiences
            setWorkExperiences={setWorkExperiences}
            educAttainment={educAttainment}
            setEducAttainment={setEducAttainment}
            skills={skills}
            setSkills={setSkills}
            isActive={isActive}
          />
        )}

        {/* button to open the editor */}
        <span
          className={`font-bold  bg-white/60 backdrop-blur-[50px]  border border-white/60 flex flex-col items-center justify-center p-2.5 rounded-3xl  ${
            isCollapsed ? "h-full" : "h-auto hidden"
          }`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <MdOutlineKeyboardDoubleArrowRight className="w-10 h-10 text-black hover:text-black" />
          ) : (
            ""
          )}
        </span>
      </div>
      {/* Main Content */}
      <div
        className={`flex justify-center items-start p-5  ${
          isCollapsed ? "w-full" : "w-3/5"
        }`}
      >
        <div className="flex justify-center items-start bg-white/60 backdrop-blur-[50px] rounded-3xl border border-white/60 p-2 w-full shadow-xl">
          <ResumeDisplay
            info={info}
            workExperiences={workExperiences}
            educAttainment={educAttainment}
            skills={skills}
            isCollapsed={isCollapsed}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
