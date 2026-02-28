import React from "react";
import { useSelector } from "react-redux";
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { ZONE_OPTIONS } from "../utils/timezone";

const EditEventModal = ({
  editingEvent,
  setEditingEvent,
  handleUpdate,
}) => {
  const { profilesList: allProfiles } = useSelector(
    (state) => state.profiles
  );

  if (!editingEvent) return null;

  const selectedProfileIds = editingEvent.profiles?.map((p) =>
    typeof p === "string" ? p : p._id
  );

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">

        <button
          onClick={() => setEditingEvent(null)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">Edit Event</h2>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Profiles
          </label>

          <select
            multiple
            value={selectedProfileIds}
            onChange={(e) => {
              const selectedOptions = Array.from(
                e.target.selectedOptions
              ).map((option) => option.value);

              setEditingEvent({
                ...editingEvent,
                profiles: selectedOptions,
              });
            }}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 h-32"
          >
            {allProfiles.map((profile) => (
              <option key={profile._id} value={profile._id}>
                {profile.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Timezone
          </label>
          <select
            value={editingEvent.eventTimezone}
            onChange={(e) =>
              setEditingEvent({
                ...editingEvent,
                eventTimezone: e.target.value,
              })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50"
          >
            {ZONE_OPTIONS.map((zone) => (
              <option key={zone.value} value={zone.value}>
                {zone.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => setEditingEvent(null)}
            className="px-5 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={() => handleUpdate(editingEvent)}
            className="px-6 py-2 rounded-md bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
          >
            Update Event
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEventModal;