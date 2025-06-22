import React, { useState, useEffect, useRef } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function WorkExperienceBullet({ workExperiences, setWorkExperiences }) {
  const [selectedExperienceId, setSelectedExperienceId] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const justSubmitted = useRef(false);
  const justModifiedRef = useRef(false);

  // useEffect to handle initial load or external changes to workExperiences
  // It will set the default selected experience and description
  useEffect(() => {
    if (justSubmitted.current) {
      justSubmitted.current = false;
      return;
    }

    if (justModifiedRef.current) {
      justModifiedRef.current = false;
      return;
    }
    // Only set default if nothing is currently selected AND there are experiences
    if (!selectedExperienceId && workExperiences.length > 0) {
      const firstExp = workExperiences[0];
      setSelectedExperienceId(firstExp.workExperiences_id);
      setJobDescription(firstExp.description || "");
    } else if (selectedExperienceId) {
      // If an ID is selected, ensure it still exists in the array
      const foundExp = workExperiences.find(
        (exp) => exp.workExperiences_id === selectedExperienceId
      );
      if (!foundExp) {
        // If selected experience was deleted, clear both states
        setSelectedExperienceId("");
        setJobDescription("");
      }
      // Note: We intentionally DO NOT update jobDescription here if selectedExperienceId exists
      // because handleSelectChange will handle it, or it was just submitted and cleared.
    } else if (
      workExperiences.length === 0 &&
      (selectedExperienceId || jobDescription)
    ) {
      // If workExperiences becomes empty and states are not already clear
      setSelectedExperienceId("");
      setJobDescription("");
    }
  }, [workExperiences]); // Only depend on workExperiences here

  const handleSelectChange = (e) => {
    const id = e.target.value;
    setSelectedExperienceId(id);

    // CRUCIAL: Immediately set the description based on the newly selected ID
    const selectedExp = workExperiences.find(
      (exp) => exp.workExperiences_id === id
    );
    setJobDescription(selectedExp ? selectedExp.description || "" : "");
  };

  const handleDescriptionChange = (e) => {
    setJobDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedExperienceId) {
      alert("Please select a work experience first.");
      return;
    }

    setWorkExperiences((prevExperiences) =>
      prevExperiences.map((exp) =>
        exp.workExperiences_id === selectedExperienceId
          ? { ...exp, description: jobDescription }
          : exp
      )
    );

    justSubmitted.current = true;
    justModifiedRef.current = true;

    // After updating the data, explicitly clear the form fields.
    // The useEffect won't interfere this time because selectedExperienceId is cleared.
    setJobDescription("");
    setSelectedExperienceId("");
  };

  const handleEdit = (id) => {
    const selected = workExperiences.find(
      (exp) => exp.workExperiences_id === id
    );

    if (selected) {
      justModifiedRef.current = true;
      setSelectedExperienceId(id);
      setJobDescription(selected.description || "");
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete the job description?"))
      return;

    setWorkExperiences((prev) =>
      prev.map((exp) =>
        exp.workExperiences_id === id ? { ...exp, description: "" } : exp
      )
    );

    if (selectedExperienceId === id) {
      justModifiedRef.current = true;
      setSelectedExperienceId("");
      jobDescription("");
    }
  };

  return (
    <div className="flex flex-col gap-2  p-5">
      <div className="flex flex-1 justify-center ">
        <p className="uppercase font-bold text-2xl">Work Description</p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <label htmlFor="work-experience">Select Work Experience</label>
        <select
          className=" bg-white/10 backdrop-blur-[50px]  border border-white p-3 rounded-md"
          name="work_experience"
          id="work_experience"
          value={selectedExperienceId}
          onChange={handleSelectChange}
        >
          {workExperiences.length === 0 ? (
            <option value="">No Experiences Available</option>
          ) : (
            <>
              {!selectedExperienceId && (
                <option value="">-- Select an Experience --</option>
              )}
              {workExperiences.map((exp) => (
                <option
                  value={exp.workExperiences_id}
                  key={exp.workExperiences_id}
                >
                  {exp.company_name} - {exp.position}
                </option>
              ))}
            </>
          )}
        </select>

        <label htmlFor="job-description">
          Job Description (e.g., bullet points)
        </label>
        <textarea
          id="job-description"
          name="description"
          rows="4"
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter job description bullet points here..."
          value={jobDescription}
          onChange={handleDescriptionChange}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Add Job Description
        </button>
      </form>

      <div className="flex flex-col gap-5">
        <h3>Added Work Descriptions:</h3>
        {workExperiences.length === 0 ? (
          <p className="text-gray-500">No work descriptions added yet.</p>
        ) : (
          workExperiences.map((exp) => (
            <div
              key={exp.workExperiences_id}
              className="flex flex-row justify-between gap-5  divide-x-2 divide-gray-400  bg-white/10 backdrop-blur-[50px]  border border-white p-5 rounded-2xl"
            >
              <div className="p-5">
                <p className="text-lg font-semibold">{exp.company_name}</p>
                <p className="font-light text-sm">
                  {exp.description || "No description added yet."}
                </p>
              </div>
              <div className="flex flex-col gap-2 justify-center items-center text-blue-500">
                <FaEdit
                  className="h-5 w-5 hover:text-black"
                  onClick={() => handleEdit(exp.workExperiences_id)}
                />
                <MdDelete
                  className="h-5 w-5 hover:text-black"
                  onClick={() => handleDelete(exp.workExperiences_id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WorkExperienceBullet;
