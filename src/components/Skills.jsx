import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const Skills = ({ skills, setSkills }) => {
  const [currentSkill, setCurrentSkill] = useState({
    skill: "",
    skill_id: crypto.randomUUID(),
  });

  const [isEditing, setIsEditng] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentSkill((prevSkill) => ({
      ...prevSkill,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setSkills((prevSkill) =>
        prevSkill.map((skill) =>
          skill.skill_id === currentSkill.skill_id ? currentSkill : skill
        )
      );
      setIsEditng(false);
    } else {
      setSkills((prevSkill) => [...prevSkill, currentSkill]);
    }

    console.log(currentSkill.skill_id);

    setCurrentSkill({ skill: "", skill_id: crypto.randomUUID() });
  };

  const handleEdit = (idToEdit) => {
    setCurrentSkill(idToEdit);
    setIsEditng(true);
  };

  const handleCancelEdit = () => {
    setCurrentSkill({ skill: "", skill_id: crypto.randomUUID() });
    setIsEditng(false);
  };

  const handleDelete = (idToDelete) => {
    setSkills((prevSkill) =>
      prevSkill.filter((skill) => skill.skill_id !== idToDelete)
    );

    if (isEditing && currentSkill.skill_id === idToDelete) {
      handleCancelEdit();
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-2 p-5">
      <div className="flex flex-1 justify-center ">
        <p className="uppercase font-bold text-2xl">PERSONAL SKILL</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-2">
        <label htmlFor="skill">Skill</label>
        <input
          type="text"
          id="skill"
          name="skill"
          value={currentSkill.skill}
          onChange={handleInputChange}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button className="capitalize bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          {isEditing ? "Update skill" : "Add Skills"}
        </button>

        {isEditing && (
          <button
            onClick={handleCancelEdit}
            className="capitalize bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Cancel edit
          </button>
        )}
      </form>

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="capitilize">list of skills: </h3>

        {skills.length === 0 ? (
          <p className="capitalize text-gray-500 ">no skill added yet</p>
        ) : (
          <div className="flex flex-1 flex-col gap-6 rounded">
            {skills.map((skill) => (
              <div className="flex flex-1 flex-row justify-between items-center  bg-white/10 backdrop-blur-[50px]  border border-white p-5 rounded-2xl p-5">
                <p className="">{skill.skill}</p>
                <div className="flex flex-col gap-2 justify-center items-center text-blue-500">
                  <FaEdit
                    className="h-5 w-5 cursor-pointer hover:text-black
"
                    onClick={() => handleEdit(skill)}
                  />
                  <MdDelete
                    className="h-5 w-5 cursor-pointer hover:text-black
"
                    onClick={() => handleDelete(skill.skill_id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Skills;
