import React from "react";

const EditEventModal = ({
  editingEvent,
  setEditingEvent,
  handleUpdate,
}) => {
  if (!editingEvent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96 space-y-4">
        <h3 className="text-lg font-semibold">Edit Event</h3>

        <input
          type="datetime-local"
          value={editingEvent.startTime}
          onChange={(e) =>
            setEditingEvent({
              ...editingEvent,
              startTime: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
        />

        <input
          type="datetime-local"
          value={editingEvent.endTime}
          onChange={(e) =>
            setEditingEvent({
              ...editingEvent,
              endTime: e.target.value,
            })
          }
          className="w-full border p-2 rounded"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setEditingEvent(null)}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={() => handleUpdate(editingEvent)}
            className="px-4 py-2 bg-indigo-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;