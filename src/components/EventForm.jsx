import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../features/events/eventsSlice";
import { createProfile } from "../features/profiles/profilesSlice";
import { ZONE_OPTIONS } from "../utils/timezone";
import dayjs from "dayjs";

const EventForm = () => {
  const dispatch = useDispatch();
  const { profilesList } = useSelector((state) => state.profiles);

  const dropdownRef = useRef(null);

  const [selectedProfiles, setSelectedProfiles] = useState([]);
  const [eventTimezone, setEventTimezone] = useState("America/New_York");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUserName, setNewUserName] = useState("");

  const filteredProfiles = profilesList.filter((profile) =>
    profile.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = async () => {
    if (!newUserName.trim()) return;

    const resultAction = await dispatch(
      createProfile({ name: newUserName })
    );

    if (resultAction.payload) {
      setSelectedProfiles([
        ...selectedProfiles,
        resultAction.payload._id,
      ]);
    }

    setNewUserName("");
    setShowAddUser(false);
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startTime || !endTime) {
      alert("Please select start and end time");
      return;
    }

    if (dayjs(endTime).isBefore(dayjs(startTime))) {
      alert("End time must be after start time");
      return;
    }

    if (selectedProfiles.length === 0) {
      alert("Please select at least one profile");
      return;
    }

    const startUTC = dayjs
      .tz(startTime, eventTimezone)
      .utc()
      .toISOString();

    const endUTC = dayjs
      .tz(endTime, eventTimezone)
      .utc()
      .toISOString();

    const newEvent = {
      profiles: selectedProfiles,
      eventTimezone,
      startTimeUTC: startUTC,
      endTimeUTC: endUTC,
    };

    dispatch(createEvent(newEvent));

    // Reset
    setSelectedProfiles([]);
    setStartTime("");
    setEndTime("");
    setIsOpen(false);
    setSearchTerm("");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setShowAddUser(false);
        setSearchTerm("");
        setNewUserName("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Create Event</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profiles Dropdown */}
        <div className="relative w-full" ref={dropdownRef}>
          <label className="block text-sm font-medium mb-1">
            Profiles
          </label>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full rounded-md px-3 py-2 text-left text-sm transition 
              ${
                isOpen
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 border border-gray-300"
              }`}
          >
            {selectedProfiles.length === 0
              ? "Select profiles..."
              : `${selectedProfiles.length} profile(s) selected`}
          </button>

          {isOpen && (
            <div className="absolute left-0 z-50 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
              {/* Search */}
              <div className="p-2 border-b">
                <input
                  type="text"
                  placeholder="Search profiles..."
                  className="w-full border rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                />
              </div>

              {/* Profile List */}
              <div className="max-h-48 overflow-y-auto">
                {filteredProfiles.length === 0 &&
                  !showAddUser && (
                    <div className="p-3 text-sm text-gray-500">
                      No profile found.
                    </div>
                  )}

                {!showAddUser &&
                  filteredProfiles.map((profile) => {
                    const isSelected =
                      selectedProfiles.includes(
                        profile._id
                      );

                    return (
                      <div
                        key={profile._id}
                        onClick={() => {
                          if (isSelected) {
                            setSelectedProfiles(
                              selectedProfiles.filter(
                                (id) =>
                                  id !== profile._id
                              )
                            );
                          } else {
                            setSelectedProfiles([
                              ...selectedProfiles,
                              profile._id,
                            ]);
                          }
                        }}
                        className={`px-3 py-2 cursor-pointer text-sm transition
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

                {/* Add Profile Mode */}
                {showAddUser && (
                  <div className="p-3 space-y-2 border-t">
                    <input
                      type="text"
                      placeholder="Enter profile name"
                      value={newUserName}
                      onChange={(e) =>
                        setNewUserName(
                          e.target.value
                        )
                      }
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

              {/* Add Profile Button */}
              {!showAddUser && (
                <div className="border-t">
                  <button
                    type="button"
                    onClick={() =>
                      setShowAddUser(true)
                    }
                    className="w-full text-left px-3 py-2 text-sm text-indigo-600 hover:bg-gray-100"
                  >
                    + Add Profile
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Timezone */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Timezone
          </label>
          <select
            value={eventTimezone}
            onChange={(e) =>
              setEventTimezone(e.target.value)
            }
            className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
          >
            {ZONE_OPTIONS.map((zone) => (
              <option
                key={zone.value}
                value={zone.value}
              >
                {zone.label}
              </option>
            ))}
          </select>
        </div>

        {/* Start Date & Time */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Start Date & Time
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              min={dayjs().format("YYYY-MM-DD")}
              value={startTime.split("T")[0] || ""}
              onChange={(e) =>
                setStartTime(
                  e.target.value +
                    "T" +
                    (startTime.split("T")[1] ||
                      "09:00")
                )
              }
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
            <input
              type="time"
              min={
                startTime.split("T")[0] === dayjs().format("YYYY-MM-DD")
                  ? dayjs().format("HH:mm")
                  : undefined
              }
              value={startTime.split("T")[1] || ""}
              onChange={(e) =>
                setStartTime(
                  (startTime.split("T")[0] ||
                    "") +
                    "T" +
                    e.target.value
                )
              }
              className="w-32 border border-gray-300 rounded-md p-2 bg-gray-50"
            />
          </div>
        </div>

        {/* End Date & Time */}
        <div>
          <label className="block text-sm font-medium mb-1">
            End Date & Time
          </label>
          <div className="flex gap-3">
            <input
              type="date"
              min={dayjs().format("YYYY-MM-DD")}
              value={endTime.split("T")[0] || ""}
              onChange={(e) =>
                setEndTime(
                  e.target.value +
                    "T" +
                    (endTime.split("T")[1] ||
                      "09:00")
                )
              }
              className="w-full border border-gray-300 rounded-md p-2 bg-gray-50"
            />
            <input
              type="time"
              min={
                endTime.split("T")[0] === dayjs().format("YYYY-MM-DD")
                  ? dayjs().format("HH:mm")
                  : undefined
              }
              value={endTime.split("T")[1] || ""}
              onChange={(e) =>
                setEndTime(
                  (endTime.split("T")[0] ||
                    "") +
                    "T" +
                    e.target.value
                )
              }
              className="w-32 border border-gray-300 rounded-md p-2 bg-gray-50"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-md font-medium hover:opacity-90 transition"
        >
          + Create Event
        </button>
      </form>
    </div>
  );
};

export default EventForm;