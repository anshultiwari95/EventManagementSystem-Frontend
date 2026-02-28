import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  XMarkIcon,
  CalendarDaysIcon,
  ClockIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  CheckIcon,
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

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");
  const dropdownRef = useRef(null);

  const filteredProfiles = allProfiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async () => {
    if (!newUserName.trim()) return;

    const resultAction = await dispatch(
      createProfile({ name: newUserName })
    );

    if (resultAction.payload) {
      const currentIds =
        editingEvent.profiles?.map((p) =>
          typeof p === "string" ? p : p._id
        ) || [];
      setEditingEvent({
        ...editingEvent,
        profiles: [...currentIds, resultAction.payload._id],
      });
    }

    setNewUserName("");
    setShowAddUser(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
        setShowAddUser(false);
        setSearchTerm("");
        setNewUserName("");
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () =>
      document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!editingEvent) return null;

  const selectedProfileIds =
    editingEvent.profiles?.map((p) =>
      typeof p === "string" ? p : p._id
    ) || [];

  const toggleProfile = (id) => {
    let updated;

    if (selectedProfileIds.includes(id)) {
      updated = selectedProfileIds.filter((pid) => pid !== id);
    } else {
      updated = [...selectedProfileIds, id];
    }

    setEditingEvent({
      ...editingEvent,
      profiles: updated,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">

        <button
          onClick={() => setEditingEvent(null)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Edit Event
        </h2>

        <div className="mb-5 relative" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-2">
            Profiles
          </label>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-50 text-sm cursor-pointer flex justify-between items-center"
          >
            <span>
              {selectedProfileIds.length === 0
                ? "Select profiles..."
                : `${selectedProfileIds.length} profile(s) selected`}
            </span>
            <span className="text-gray-400">⌄</span>
          </div>

          {isOpen && (
            <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              <div className="p-2 border-b">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search profiles..."
                    className="w-full border rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="max-h-40 overflow-y-auto">
                {filteredProfiles.length === 0 && !showAddUser && (
                  <div className="p-3 text-sm text-gray-500">
                    No profile found.
                  </div>
                )}

                {!showAddUser &&
                  filteredProfiles.map((profile) => {
                    const isSelected =
                      selectedProfileIds.includes(profile._id);

                    return (
                      <div
                        key={profile._id}
                        onClick={() => toggleProfile(profile._id)}
                        className={`px-4 py-2 text-sm cursor-pointer transition flex items-center justify-between gap-2
                          ${
                            isSelected
                              ? "bg-indigo-500 text-white"
                              : "hover:bg-gray-100"
                          }`}
                      >
                        <span>{profile.name}</span>
                        {isSelected && (
                          <CheckIcon className="h-4 w-4 shrink-0" />
                        )}
                      </div>
                    );
                  })}

                {showAddUser && (
                  <div className="p-3 space-y-2 border-t">
                    <input
                      type="text"
                      placeholder="Enter profile name"
                      value={newUserName}
                      onChange={(e) => setNewUserName(e.target.value)}
                      className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddUser(false);
                          setNewUserName("");
                        }}
                        className="text-sm text-gray-500"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleCreateUser}
                        className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {!showAddUser && (
                <div className="border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddUser(true)}
                    className="w-full text-left px-4 py-2 text-sm text-indigo-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Add Profile
                  </button>
                </div>
              )}
            </div>
          )}
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