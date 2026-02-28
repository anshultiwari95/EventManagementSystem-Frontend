import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedProfile,
  createProfile,
} from "../features/profiles/profilesSlice";

const ProfileSelector = () => {
  const dispatch = useDispatch();
  const { profilesList, selectedProfile } = useSelector(
    (state) => state.profiles,
  );

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const dropdownRef = useRef(null);

  const filteredProfiles = profilesList.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateUser = async () => {
    if (!newUserName.trim()) return;

    const result = await dispatch(
      createProfile({ name: newUserName }),
    ).unwrap();

    dispatch(setSelectedProfile(result));

    setNewUserName("");
    setShowAddUser(false);
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowAddUser(false);
        setSearchTerm("");
        setNewUserName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full rounded-md px-4 py-2.5 text-sm font-medium transition
    ${
      isOpen
        ? "bg-indigo-500 text-white"
        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
    }`}
      >
        {selectedProfile ? selectedProfile.name : "Select current profile..."}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-full z-50 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder="Search current profile..."
              className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="max-h-40 overflow-y-auto">
            {filteredProfiles.length === 0 && !showAddUser && (
              <div className="p-3 text-sm text-gray-500">No profile found.</div>
            )}

            {!showAddUser &&
              filteredProfiles.map((profile) => (
                <div
                  key={profile._id}
                  onClick={() => {
                    dispatch(setSelectedProfile(profile));
                    setIsOpen(false);
                    setSearchTerm("");
                  }}
                  className={`px-3 py-2 cursor-pointer text-sm transition
                    ${
                      selectedProfile?._id === profile._id
                        ? "bg-indigo-500 text-white"
                        : "hover:bg-gray-100"
                    }`}
                >
                  {profile.name}
                </div>
              ))}

            {showAddUser && (
              <div className="p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Enter profile name"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => {
                      setShowAddUser(false);
                      setNewUserName("");
                    }}
                    className="text-sm text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
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
                onClick={() => setShowAddUser(true)}
                className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-gray-100"
              >
                + Add Profile
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileSelector;
