import React from 'react';

interface AddCareerProps {
  newCareer: { position: string; department: string; location: string };
  setNewCareer: React.Dispatch<React.SetStateAction<{ position: string; department: string; location: string }>>;
  handleAddCareer: () => void;
}

const AddCareer: React.FC<AddCareerProps> = ({ newCareer, setNewCareer, handleAddCareer }) => {
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
        placeholder="Department"
        value={newCareer?.department}
        onChange={(e) => setNewCareer({ ...newCareer, department: e.target.value })}
        className="block w-full mb-2 p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        placeholder="Location"
        value={newCareer?.location}
        onChange={(e) => setNewCareer({ ...newCareer, location: e.target.value })}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleAddCareer}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Add Career
      </button>
    </div>
  );
};

export default AddCareer;
