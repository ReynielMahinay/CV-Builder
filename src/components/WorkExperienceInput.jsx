// WorkExperienceInput.jsx
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function WorkExperienceInput({ workExperiences, setWorkExperiences }) {
  // State to manage the input for a single work experience entry
  const [currentExperience, setCurrentExperience] = useState({
    company_name: "",
    position: "",
    date: "",
    location: "",
    description: "",
    workExperiences_id: crypto.randomUUID(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentExperience((prevExperience) => ({
      ...prevExperience,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Corrected typo: preventDefualt to preventDefault

    if (isEditing) {
      // If in edit mode, update the existing experience in the array
      setWorkExperiences((prevExperience) =>
        prevExperience.map((exp) =>
          exp.workExperiences_id === currentExperience.workExperiences_id
            ? currentExperience
            : exp
        )
      ); // Replace the old object with the updated one

      setIsEditing(false);
    } else {
      // Add the current experience to the workExperiences array
      setWorkExperiences((prevExperiences) => [
        ...prevExperiences,
        currentExperience,
      ]);
    }

    // Clear the form fields after submission
    setCurrentExperience({
      company_name: "",
      position: "",
      date: "",
      location: "",
      workExperiences_id: crypto.randomUUID(),
    });

    console.log(currentExperience.workExperiences_id);
  };

  const handleEdit = (experienceToEdit) => {
    setCurrentExperience(experienceToEdit); // Populate the form with data of the selected experience
    setIsEditing(true); // Set editing mode to true
  };

  const handleDelete = (idToDelete) => {
    setWorkExperiences((prevExperience) =>
      prevExperience.filter((exp) => exp.workExperiences_id !== idToDelete)
    );
    if (isEditing && currentExperience.workExperiences_id === idToDelete) {
      handleCancelEdit();
    }
  };

  const handleCancelEdit = () => {
    setCurrentExperience({
      company_name: "",
      position: "",
      date: "",
      location: "",
      workExperiences_id: crypto.randomUUID(), // Reset with a new ID
    });
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="flex flex-1 flex-col gap-2  p-5 rounded-3xl shadow-md h-full w-full">
      <div className="flex flex-1 justify-center ">
        <p className="uppercase font-bold text-2xl">Work Experience</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="company-name">Company name</label>
        <input
          type="text"
          id="company-name"
          name="company_name"
          value={currentExperience.company_name}
          onChange={handleInputChange}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="company-position">Position</label>
        <input
          type="text"
          id="company-position"
          name="position"
          value={currentExperience.position}
          onChange={handleInputChange}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="company-date">
          Date (e.g., Month Year - Month Year)
        </label>
        <input
          type="text"
          id="company-date"
          name="date"
          value={currentExperience.date}
          onChange={handleInputChange}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <label htmlFor="company-location">Location</label>
        <input
          type="text"
          id="company-location"
          name="location"
          value={currentExperience.location}
          onChange={handleInputChange}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <div className="flex flex-row gap-5">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            {isEditing ? "Update Work Experience" : "Add work Experience"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {/* Display the list of added work experiences */}
      <div className="mt-5">
        <h3 className="font-semibold mb-2">Added Work Experiences:</h3>
        {workExperiences.length === 0 ? (
          <p className="text-gray-500">No work experiences added yet.</p>
        ) : (
          <ul className="divide-y divide-gray-200 flex flex-col gap-3">
            {workExperiences.map((exp) => (
              <li
                key={exp.workExperiences_id}
                className=" flex justify-between items-center  bg-white/10 backdrop-blur-[50px]  border border-white p-5 rounded-2xl px-5 py-7"
              >
                <div>
                  <p className="font-bold text-xl">{exp.company_name}</p>
                  <p className="text-md font-semibold">{exp.position}</p>
                  <p className="text-sm">
                    {exp.date} - {exp.location}
                  </p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-blue-500 ">
                  <FaEdit
                    className="h-5 w-5 hover:text-black"
                    onClick={() => handleEdit(exp)}
                  />
                  <MdDelete
                    className="h-6 w-6 hover:text-black"
                    onClick={() => handleDelete(exp.workExperiences_id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default WorkExperienceInput;
