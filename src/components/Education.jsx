import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Education({ educAttainment, setEducAttainment }) {
  const [currentEducInfo, setCurrentEducInfo] = useState({
    university_name: "",
    university_date: "",
    university_degree: "",
    university_location: "",
    education_id: crypto.randomUUID(),
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    setCurrentEducInfo((prevEduc) => ({
      ...prevEduc,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      setEducAttainment((prevEdu) =>
        prevEdu.map((edu) =>
          edu.education_id === currentEducInfo.education_id
            ? currentEducInfo
            : edu
        )
      );
      setIsEditing(false);
    } else {
      setEducAttainment((prevEduc) => [...prevEduc, currentEducInfo]);
    }

    console.log(currentEducInfo.education_id);

    setCurrentEducInfo({
      university_name: "",
      university_date: "",
      university_degree: "",
      university_location: "",
      education_id: crypto.randomUUID(),
    });
  };

  const handleDelete = (idToDelete) => {
    setEducAttainment((prevEdu) =>
      prevEdu.filter((edu) => edu.education_id !== idToDelete)
    );

    if (isEditing && currentEducInfo.education_id === idToDelete) {
      handCancelleEdit();
    }
  };

  const handleEdit = (eduToEdit) => {
    setCurrentEducInfo(eduToEdit);
    setIsEditing(true);
  };
  const handCancelleEdit = () => {
    setCurrentEducInfo({
      university_name: "",
      university_date: "",
      university_degree: "",
      university_location: "",
      education_id: crypto.randomUUID(),
    });
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-2  p-5 ">
      <div className="flex flex-1 justify-center ">
        <p className="uppercase font-bold text-2xl">education</p>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label htmlFor="university_name">University Name</label>
        <input
          type="text"
          id="university_name"
          name="university_name"
          value={currentEducInfo.university_name}
          onChange={handleInputChanges}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <label htmlFor="university-university_date">Date</label>
        <input
          type="text"
          id="university-university_date"
          name="university_date"
          value={currentEducInfo.university_date}
          onChange={handleInputChanges}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <label htmlFor="university-university_degree">Degree</label>
        <input
          type="text"
          id="university-university_degree"
          name="university_degree"
          value={currentEducInfo.university_degree}
          onChange={handleInputChanges}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <label htmlFor="university-university_location">Location</label>
        <input
          type="text"
          id="university-university_location"
          name="university_location"
          value={currentEducInfo.university_location}
          onChange={handleInputChanges}
          className=" bg-white/10 backdrop-blur-[50px]  border border-white w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          {isEditing
            ? "Update Education Attainment"
            : "Add Education Attainment"}
        </button>

        {isEditing && (
          <button
            type="button"
            onClick={handCancelleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Cancel edit
          </button>
        )}
      </form>
      <div className="flex flex-1 flex-col gap-5">
        <h3>Eduications attainment: </h3>

        {educAttainment.length === 0 ? (
          <p className="text-gray-500 capitalize">
            No educational attainment added yet.
          </p>
        ) : (
          <div>
            {educAttainment.map((edu) => (
              <div
                className="flex flex-1 flex-row justify-between items-center  bg-white/10 backdrop-blur-[50px]  border border-white p-5 rounded-2xl"
                key={edu.education_id}
              >
                <div>
                  <p className="font-bold text-xl">{edu.university_name}</p>
                  <p className="font-light text-sm">{edu.university_degree}</p>
                </div>
                <div className="flex flex-col justify-center items-center gap-2 text-blue-500 ">
                  <FaEdit
                    className="h-5 w-5 hover:text-black"
                    onClick={() => handleEdit(edu)}
                  />
                  <MdDelete
                    className="h-5 w-5 hover:text-black"
                    onClick={() => handleDelete(edu.education_id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Education;
