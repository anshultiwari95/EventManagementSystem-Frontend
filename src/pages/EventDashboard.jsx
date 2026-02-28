import React, { useEffect } from "react";
import ProfileSelector from "../components/ProfileSelector";
import EventForm from "../components/EventForm";
import EventList from "../components/EventList";
import { useDispatch } from "react-redux";
import { fetchProfiles } from "../features/profiles/profilesSlice";
import { fetchEvents } from "../features/events/eventsSlice";

function EventDashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchEvents());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 px-10 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Event Management</h1>
          <p className="text-gray-500 mt-1">
            Create and manage events across multiple timezones
          </p>
        </div>

        <div className="w-64">
          <ProfileSelector />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[75vh]">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <EventForm />
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border flex flex-col h-[75vh]">
          <EventList />
        </div>
      </div>
    </div>
  );
}

export default EventDashboard;