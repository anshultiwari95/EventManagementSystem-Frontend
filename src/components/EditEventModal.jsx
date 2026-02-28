import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Menu } from "@headlessui/react";
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { ZONE_OPTIONS } from "../utils/timezone";
import { createProfile } from "../features/profiles/profilesSlice";

const EditEventModal = ({
  editingEvent,
  setEditingEvent,
  handleUpdate,
}) => {
  const dispatch = useDispatch();

  const { profilesList: allProfiles } = useSelector(
    (state) => state.profiles
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [addingProfile, setAddingProfile] = useState(false);
  const [newProfileName, setNewProfileName] = useState("");

  if (!editingEvent) return null;

  const selectedProfileIds =
    editingEvent.profiles?.map((p) =>
      typeof p === "string" ? p : p._id
    ) || [];

  const toggleProfile = (profileId) => {
    if (selectedProfileIds.includes(profileId)) {
      setEditingEvent({
        ...editingEvent,
        profiles: selectedProfileIds.filter(
          (id) => id !== profileId
        ),
      });
    } else {
      setEditingEvent({
        ...editingEvent,
        profiles: [...selectedProfileIds, profileId],
      });
    }
  };

  const handleCreateProfile = async () => {
    if (!newProfileName.trim()) return;

    try {
      const result = await dispatch(
        createProfile({ name: newProfileName })
      ).unwrap();

      setEditingEvent({
        ...editingEvent,
        profiles: [...selectedProfileIds, result._id],
      });

      setNewProfileName("");
      setAddingProfile(false);
    } catch (err) {
      console.error("Profile creation failed:", err);
    }
  };

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

        {/* ================= PROFILES ================= */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-2">
            Profiles
          </label>

          <Menu as="div" className="relative">
            <Menu.Button className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-700">
                {selectedProfileIds.length > 0
                  ? `${selectedProfileIds.length} profiles selected`
                  : "Select profiles"}
              </span>
              <span className="text-gray-400">▾</span>
            </Menu.Button>

            <Menu.Items className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 p-2 space-y-1">

              {/* Search */}
              <div className="px-2 pb-2">
                <input
                  type="text"
                  placeholder="Search profiles..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>

              {/* Profiles List */}
              <div className="max-h-40 overflow-y-auto">
                {allProfiles
                  .filter((profile) =>
                    profile.name
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  )
                  .map((profile) => {
                    const isSelected =
                      selectedProfileIds.includes(
                        profile._id
                      );

                    return (
                      <Menu.Item key={profile._id}>
                        {({ active }) => (
                          <div
                            onClick={() =>
                              toggleProfile(profile._id)
                            }
                            className={`flex items-center justify-between px-4 py-2 text-sm rounded-md cursor-pointer transition
                              ${
                                isSelected
                                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                                  : active
                                  ? "bg-gray-100"
                                  : ""
                              }`}
                          >
                            <span>{profile.name}</span>
                            {isSelected && <span>✓</span>}
                          </div>
                        )}
                      </Menu.Item>
                    );
                  })}
              </div>

              {/* Add Profile Section */}
              <div className="border-t pt-2 mt-2">

                {!addingProfile ? (
                  <div
                    onClick={() => setAddingProfile(true)}
                    className="px-4 py-2 text-sm text-indigo-600 cursor-pointer hover:bg-gray-50 rounded-md"
                  >
                    + Add Profile
                  </div>
                ) : (
                  <div className="p-3 space-y-2">
                    <input
                      type="text"
                      placeholder="Enter profile name"
                      value={newProfileName}
                      onChange={(e) =>
                        setNewProfileName(e.target.value)
                      }
                      className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() =>
                          setAddingProfile(false)
                        }
                        className="text-sm text-gray-500"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={handleCreateProfile}
                        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </Menu.Items>
          </Menu>
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

        {/* Keep your existing Start / End UI exactly as before */}

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