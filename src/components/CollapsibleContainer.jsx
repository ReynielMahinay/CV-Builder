import React, { useState } from "react";

function CollapsibleContainer({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" rounded p-4 mb-4 w-full  flex flex-col gap-5 bg-[#8CCDEB] shadow-lg">
      <div
        onClick={toggleSection}
        className="flex flex-row justify-between items-center cursor-pointer"
      >
        <p className="text-xl font-semibold">{title}</p>
        <span
          className={`relative  transition-transform duration-300 ${
            isOpen ? "rotate-90" : "rotate-0"
          }`}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${
              isOpen ? "rotate-90" : "rotate-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {!isOpen && <line x1="12" y1="5" x2="12" y2="19" />}
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </span>
      </div>
      {isOpen && (
        <div
          className={`
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "opacity-100" : "max-h-0 opacity-0"}
        `}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default CollapsibleContainer;
