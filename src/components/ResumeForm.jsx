import React from "react";
import CollapsibleContainer from "./CollapsibleContainer";
import PersonalInfoInput from "./PersonalInfoInput";
import WorkExperienceInput from "./WorkExperienceInput";
import WorkExperienceBullet from "./WorkExperienceBullet";
import Education from "./Education";
import Skills from "./Skills";

function ResumeForm({
  info,
  setInfo,
  workExperiences,
  setWorkExperiences,
  educAttainment,
  setEducAttainment,
  skills,
  setSkills,
  isActive,
}) {
  return (
    <div className="w-full h-full rounded-3xl shadow-lg bg-white/60 backdrop-blur-[50px]  border border-white/60 ">
      {isActive === "personal" && (
        <PersonalInfoInput info={info} setInfo={setInfo} />
      )}

      {isActive === "work" && (
        <WorkExperienceInput
          workExperiences={workExperiences} // Pass workExperiences down
          setWorkExperiences={setWorkExperiences}
        />
      )}

      {isActive === "description" && (
        <WorkExperienceBullet
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
        />
      )}

      {isActive === "skills" && (
        <Skills skills={skills} setSkills={setSkills} />
      )}

      {isActive === "education" && (
        <Education
          educAttainment={educAttainment}
          setEducAttainment={setEducAttainment}
        />
      )}

      {/* <CollapsibleContainer title="Work Experience">
        <WorkExperienceInput
          workExperiences={workExperiences} // Pass workExperiences down
          setWorkExperiences={setWorkExperiences}
        />
      </CollapsibleContainer>

      <CollapsibleContainer title="Work Description">
        <WorkExperienceBullet
          workExperiences={workExperiences}
          setWorkExperiences={setWorkExperiences}
        />
      </CollapsibleContainer>

      <CollapsibleContainer title="Skills">
        <Skills skills={skills} setSkills={setSkills} />
      </CollapsibleContainer>

      <CollapsibleContainer title="Education">
        <Education
          educAttainment={educAttainment}
          setEducAttainment={setEducAttainment}
        ></Education>
      </CollapsibleContainer> */}
    </div>
  );
}

export default ResumeForm;
