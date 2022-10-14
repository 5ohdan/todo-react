import { useEffect, useRef } from 'react';

export const EditingForm = ({ onEdit, onSave, initState }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <form onSubmit={onSave} className="flex flex-row min-w-full">
      <input
        className="border-2 rounded-l-lg border-blue-800 p-2 w-full"
        ref={inputRef}
        value={initState}
        onChange={(e) => onEdit(e.target.value)}
      />
      <button
        className="bg-blue-700 text-white p-2 border-2 border-blue-700 rounded-r-lg hover:bg-blue-800"
        onClick={() => onSave()}
      >
        Save
      </button>
    </form>
  );
};
