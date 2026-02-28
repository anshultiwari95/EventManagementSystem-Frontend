import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  CheckIcon,
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

  const [profilesOpen, setProfilesOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setProfilesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ❗ Hooks must come before conditional return
  if (!editingEvent) return null;

  // Normalize selected IDs
  const selectedProfileIds =
    editingEvent.profiles?.map((p) =>
      typeof p === "string" ? p : p._id
    ) || [];

  const toggleProfile = (profileId) => {
    if (selectedProfileIds.includes(profileId)) {
      setEditingEvent({
        ...editingEvent,
        profiles: selectedProfileIds.filter((id) => id !== profileId),
      });
    } else {
      setEditingEvent({
        ...editingEvent,
        profiles: [...selectedProfileIds, profileId],
      });
    }
  };

  const selectedNames = allProfiles
    .filter((p) => selectedProfileIds.includes(p._id))
    .map((p) => p.name)
    .join(", ");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">

        {/* Close */}
        <button
          onClick={() => setEditingEvent(null)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Edit Event
        </h2>

        {/* ================= PROFILES DROPDOWN ================= */}
        <div className="mb-6 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-2">
            Profiles
          </label>

          <div
            onClick={() => setProfilesOpen(!profilesOpen)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 cursor-pointer flex justify-between items-center hover:bg-gray-100 transition"
          >
            <span className="text-sm text-gray-700 truncate">
              {selectedNames || "Select profiles"}
            </span>

            <span className="text-gray-400 text-xs">
              {profilesOpen ? "▲" : "▼"}
            </span>
          </div>

          {profilesOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-52 overflow-y-auto">
              {allProfiles.map((profile) => {
                const isSelected =
                  selectedProfileIds.includes(profile._id);

                return (
                  <div
                    key={profile._id}
                    onClick={() => toggleProfile(profile._id)}
                    className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition
                      ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-gray-100 text-gray-700"
                      }`}
                  >
                    <span>{profile.name}</span>

                    {isSelected && (
                      <CheckIcon className="h-4 w-4" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ================= TIMEZONE ================= */}
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

        {/* ================= BUTTONS ================= */}
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