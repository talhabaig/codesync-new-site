"use client";
import React, { useState } from 'react';
import CareerEditor from '@/app/components/careerEditor';
interface AddCareerProps {
  newCareer: { position: string; date: string; lastDate:string; location: string; type: string; totalPositions:string; salary:string; createdAt:string; };
  setNewCareer: React.Dispatch<React.SetStateAction<{ position: string; location: string; date: string; lastDate:string; type:string; totalPositions:string; salary:string; createdAt:string; }>>;
  handleAddCareer: () => void;
}

const AddCareer: React.FC<AddCareerProps> = ({ newCareer, setNewCareer, handleAddCareer }) => {
  const [editorContent, setEditorContent] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const handleEditorChange = (content: string) => {
    setEditorContent(content);
    setNewCareer((prev) => ({ ...prev, content }));
  };
  const handleSubmit = async () => {
    if (!newCareer.position || !newCareer.type || !newCareer.location || !newCareer.lastDate || !newCareer.totalPositions || !newCareer.salary) {
      alert("All fields are required.");
      return;
    }
    setIsUploading(true);
    await handleAddCareer();
    setIsUploading(false);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Position"
        value={newCareer?.position}
        onChange={(e) => setNewCareer({ ...newCareer, position: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Type"
        value={newCareer?.type}
        onChange={(e) => setNewCareer({ ...newCareer, type: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={newCareer?.location}
        onChange={(e) => setNewCareer({ ...newCareer, location: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Last Date"
        value={newCareer?.lastDate}
        onChange={(e) => setNewCareer({ ...newCareer, lastDate: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="No. of Positions"
        value={newCareer?.totalPositions}
        onChange={(e) => setNewCareer({ ...newCareer, totalPositions: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Salary Range"
        value={newCareer?.salary}
        onChange={(e) => setNewCareer({ ...newCareer, salary: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className='mb-20 md:mb-12'>
        <CareerEditor value={editorContent} onChange={handleEditorChange} />
      </div>
      <div className='flex justify-end'>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          disabled={isUploading}
        >
          {isUploading ? 'Uploading...' : 'Add Career'}
        </button>
      </div>
    </div>
  );
};

export default AddCareer;
