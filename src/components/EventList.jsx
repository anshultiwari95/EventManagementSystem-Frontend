import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import dayjs from "dayjs";
import { ZONE_OPTIONS } from "../utils/timezone";
import EventCard from "./EventCard";
import EditEventModal from "./EditEventModal";
import EventLogsModal from "./EventLogsModal";
import { fetchEvents, updateEvent } from "../features/events/eventsSlice";

const EventList = () => {
  const dispatch = useDispatch();
  const { eventsList } = useSelector((state) => state.events);
  const { selectedProfile } = useSelector((state) => state.profiles);

  const [viewTimezone, setViewTimezone] = useState("America/New_York");
  const [editingEvent, setEditingEvent] = useState(null);
  const [showLogs, setShowLogs] = useState(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (!selectedProfile) {
    return <div className="text-gray-500">Select profile first.</div>;
  }

  const filteredEvents = eventsList.filter((event) =>
    event.profiles?.some((profile) =>
      typeof profile === "string"
        ? profile === selectedProfile._id
        : profile?._id === selectedProfile._id
    )
  );

  const handleEdit = (event) => {
    setEditingEvent({
      ...event,
      startTime: dayjs
        .utc(event.startTimeUTC)
        .tz(event.eventTimezone)
        .format("YYYY-MM-DDTHH:mm"),
      endTime: dayjs
        .utc(event.endTimeUTC)
        .tz(event.eventTimezone)
        .format("YYYY-MM-DDTHH:mm"),
    });
  };

  const handleUpdate = (event) => {
    const startUTC = dayjs
      .tz(event.startTime, event.eventTimezone)
      .utc()
      .toISOString();

    const endUTC = dayjs
      .tz(event.endTime, event.eventTimezone)
      .utc()
      .toISOString();

    dispatch(
      updateEvent({
        id: event._id,
        startTimeUTC: startUTC,
        endTimeUTC: endUTC,
        profiles: event.profiles,
      })
    );

    setEditingEvent(null);
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-xl font-semibold mb-4">Events</h2>
      <h3 className="text-lg font-normal mb-2">View in Timezone</h3>

      <select
        value={viewTimezone}
        onChange={(e) => setViewTimezone(e.target.value)}
        className="w-full border border-gray-300 rounded-md p-2 bg-gray-50 mb-4"
      >
        {ZONE_OPTIONS.map((zone) => (
          <option key={zone.value} value={zone.value}>
            {zone.label}
          </option>
        ))}
      </select>

      <div className="flex-1 overflow-y-auto pr-2">
        {filteredEvents.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            No events found
          </div>
        ) : (
          <div className="space-y-4">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                viewTimezone={viewTimezone}
                onEdit={handleEdit}
                onViewLogs={(ev) => {
                  console.log("Logs:", ev.logs);
                  setShowLogs(ev);
                }}
              />
            ))}
          </div>
        )}
      </div>

      <EditEventModal
        editingEvent={editingEvent}
        setEditingEvent={setEditingEvent}
        handleUpdate={handleUpdate}
      />

      <EventLogsModal
        event={showLogs}
        viewTimezone={viewTimezone}
        setShowLogs={setShowLogs}
      />
    </div>
  );
};

export default EventList;