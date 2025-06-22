import React from "react";

function ResumeDisplay({
  info,
  workExperiences,
  educAttainment,
  skills,
  isCollapsed,
}) {
  return (
    <div
      className={`shadow-2xl p-10 flex flex-col gap-5 h-auto  bg-white rounded-3xl shadow-xl ${
        isCollapsed ? "w-[794px]" : "w-full"
      } `}
    >
      {/* heading */}
      <div className="flex flex-col justify-center items-center gap-3">
        <p className="uppercase text-5xl font-semibold">
          {info.name || "Your Name"}
        </p>

        <div className="flex justify-center items-center divide-x-2 divide-gray-400">
          <p className="capitalize px-2">{info.address || "Address"}</p>
          <p className="px-2">{info.email || "Email"}</p>
          <p className="px-2">{info.phone || "Phone Number"}</p>
        </div>
      </div>
      {/* work experience */}
      <div className="uppercase bg-gray-200 px-5 font-semibold ">
        work experience
      </div>
      {workExperiences.length === 0 ? (
        <div className="px-5 text-gray-500 capitalize">
          No work experiences to display.
        </div>
      ) : (
        workExperiences.map((exp) => (
          <div
            key={exp.workExperiences_id}
            className="flex flex-col gap-5 px-5 py-5 border-b-4 border-gray-100"
          >
            <div className=" flex flex-row justify-between">
              <div className="">
                <p className="uppercase font-bold">
                  {exp.company_name || "Company name"}
                </p>
                <p className="Capitalize font-light">
                  {exp.position || "Position"}
                </p>
              </div>
              <div className="text-right capitalize">
                <p className="font-semibold">{exp.date || "date"}</p>
                <p className="font-light">{exp.location || "address"}</p>
              </div>
            </div>
            <u className="list-inside no-underline">
              <li>{exp.description}</li>
            </u>
          </div>
        ))
      )}
      {/* skills */}
      <div className="uppercase bg-gray-200 px-5 font-semibold">Skills</div>
      <div className="px-5">
        {skills.length === 0 ? (
          <p className="capitalize text-gray-500">no exprience added yet.</p>
        ) : (
          <div className="grid grid-cols-3 grid-flow-row grid-rows-3">
            {skills.map((skill) => (
              <ul className="list-disc px-5">
                <li>{skill.skill}</li>
              </ul>
            ))}
          </div>
        )}
      </div>

      {/* education  */}
      <div className="uppercase bg-gray-200 px-5 font-semibold">
        education attainment
      </div>

      {educAttainment.length === 0 ? (
        <p className="text-gray-500 px-5 capitalize">
          No educational attainment added yet.
        </p>
      ) : (
        <div>
          {educAttainment.map((edu) => (
            <div className="flex flex-col px-5">
              <p className="uppercase font-bold">{edu.university_name}</p>
              <p className="capitilize text-md ">{edu.university_degree}</p>
              <div className="flex flex-1 flex-row  divide-x-2 divide-gray-400 ">
                <p className="pr-2 text-sm font-light">
                  {edu.university_date}{" "}
                </p>
                <p className="pl-2 text-sm font-light">
                  {edu.university_location}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeDisplay;
