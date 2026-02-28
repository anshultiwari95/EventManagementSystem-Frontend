import React, { useState, useRef, useEffect } from "react";
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

  const [profilesOpen, setProfilesOpen] = useState(false);
  const dropdownRef = useRef(null);

  if (!editingEvent) return null;

  // ✅ Normalize selected IDs
  const selectedProfileIds =
    editingEvent.profiles?.map((p) =>
      typeof p === "string" ? p : p._id
    ) || [];

  // ✅ Toggle profile selection
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

  // ✅ Close dropdown when clicking outside
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
        <div className="mb-5 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-2">
            Profiles
          </label>

          {/* Button */}
          <div
            onClick={() => setProfilesOpen(!profilesOpen)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 cursor-pointer flex justify-between items-center"
          >
            <span>
              {selectedProfileIds.length > 0
                ? `${selectedProfileIds.length} profile(s) selected`
                : "Select profiles"}
            </span>
          </div>

          {/* Dropdown */}
          {profilesOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-48 overflow-y-auto">
              {allProfiles.map((profile) => {
                const isSelected =
                  selectedProfileIds.includes(profile._id);

                return (
                  <div
                    key={profile._id}
                    onClick={() => toggleProfile(profile._id)}
                    className={`px-4 py-2 cursor-pointer text-sm transition
                      ${
                        isSelected
                          ? "bg-indigo-500 text-white"
                          : "hover:bg-gray-100"
                      }`}
                  >
                    {profile.name}
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

        {/* ================= START DATE ================= */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Start Date & Time
          </label>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 flex-1">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={editingEvent.startTime.split("T")[0]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    startTime:
                      e.target.value +
                      "T" +
                      editingEvent.startTime.split("T")[1],
                  })
                }
                className="outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 w-32">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <input
                type="time"
                value={editingEvent.startTime.split("T")[1]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    startTime:
                      editingEvent.startTime.split("T")[0] +
                      "T" +
                      e.target.value,
                  })
                }
                className="outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* ================= END DATE ================= */}
        <div className="mb-8">
          <label className="block text-sm font-medium mb-2">
            End Date & Time
          </label>

          <div className="flex gap-3">
            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 flex-1">
              <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={editingEvent.endTime.split("T")[0]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    endTime:
                      e.target.value +
                      "T" +
                      editingEvent.endTime.split("T")[1],
                  })
                }
                className="outline-none w-full"
              />
            </div>

            <div className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 w-32">
              <ClockIcon className="h-5 w-5 text-gray-400" />
              <input
                type="time"
                value={editingEvent.endTime.split("T")[1]}
                onChange={(e) =>
                  setEditingEvent({
                    ...editingEvent,
                    endTime:
                      editingEvent.endTime.split("T")[0] +
                      "T" +
                      e.target.value,
                  })
                }
                className="outline-none w-full"
              />
            </div>
          </div>
        </div>

        {/* ================= BUTTONS ================= */}
        <div className="flex justify-end gap-4">
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