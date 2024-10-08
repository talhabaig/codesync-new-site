"use client";
import React, { useState, useEffect } from 'react';
import CareerEditor from '@/app/components/blogEditor';
interface EditCareerProps {
  careerData: { id:string; position: string; date: string; lastDate: string; location: string; type: string;createdAt: string; totalPositions:string;salary:string; jobcontent: string; };
  handleUpdateCareer: (updatedCareer: { id:string; position: string; date: string; lastDate: string; location: string; type: string; createdAt: string; totalPositions:string; salary:string; jobcontent: string }) => void;
}

const EditCareer: React.FC<any> = ({ careerData, handleUpdateCareer }) => {
  const [editorContent, setEditorContent] = useState(careerData.jobcontent);
  const [isUploading, setIsUploading] = useState(false);
  const [updatedCareer, setUpdatedCareer] = useState(careerData);

  useEffect(() => {
    setUpdatedCareer(careerData);
  }, [careerData]);

  const handleEditorChange = (jobcontent: string) => {
    setEditorContent(jobcontent);
    setUpdatedCareer((prev: any) => ({ ...prev, jobcontent }));
  };
  const handleSubmit = async () => {
    if (!updatedCareer.position || !updatedCareer.location || !updatedCareer.type || !editorContent) {
      alert("All fields are required.");
      return;
    }
    setIsUploading(true)
      
    handleUpdateCareer({ ...updatedCareer });
    setIsUploading(false)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Position"
        value={updatedCareer.position}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, position: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Type"
        value={updatedCareer.type}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, type: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={updatedCareer.location}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, location: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Last Date"
        value={updatedCareer.lastDate}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, lastDate: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="No. of Positions"
        value={updatedCareer.totalPositions}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, totalPositions: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Salary Range"
        value={updatedCareer.salary}
        onChange={(e) => setUpdatedCareer({ ...updatedCareer, salary: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className='mb-20 md:mb-12'>
        <CareerEditor value={editorContent} onChange={handleEditorChange} />
      </div>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 my-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
        disabled={isUploading}
      >
        {isUploading ? 'Uploading...' : 'Update'}
      </button>
    </div>
  );
};

export default EditCareer;
