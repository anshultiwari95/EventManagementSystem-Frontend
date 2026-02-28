import React from "react";
import {
  UsersIcon,
  CalendarDaysIcon,
  ClockIcon,
  PencilSquareIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";
import { convertUTCToTimezone, formatDateTime } from "../utils/timezone";

const EventCard = ({ event, viewTimezone, onEdit, onViewLogs }) => {
  // ✅ Safe profile handling
  const profileNames =
    event.profiles?.map((p) =>
      typeof p === "string" ? p : p?.name
    ) || [];

  const startConverted = convertUTCToTimezone(
    event.startTimeUTC,
    viewTimezone
  );

  const endConverted = convertUTCToTimezone(
    event.endTimeUTC,
    viewTimezone
  );

  const handleLogsClick = () => {
    console.log("Event Logs:", event.logs); // 🔎 IMPORTANT DEBUG
    onViewLogs(event);
  };

  return (
    <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">

      {/* Profiles */}
      <div className="flex items-center gap-2 text-indigo-600 font-medium mb-4">
        <UsersIcon className="h-5 w-5" />
        <span className="text-gray-800">
          {profileNames.length > 0
            ? profileNames.join(", ")
            : "No profiles"}
        </span>
      </div>

      {/* Start */}
      <div className="flex items-start gap-3 mb-4">
        <CalendarDaysIcon className="h-5 w-5 text-gray-400 mt-1" />
        <div>
          <p className="font-medium text-gray-800">
            Start: {formatDateTime(startConverted).split(",")[0]}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4" />
            {formatDateTime(startConverted).split(",")[1]}
          </div>
        </div>
      </div>

      {/* End */}
      <div className="flex items-start gap-3 mb-4">
        <CalendarDaysIcon className="h-5 w-5 text-gray-400 mt-1" />
        <div>
          <p className="font-medium text-gray-800">
            End: {formatDateTime(endConverted).split(",")[0]}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <ClockIcon className="h-4 w-4" />
            {formatDateTime(endConverted).split(",")[1]}
          </div>
        </div>
      </div>

      <div className="border-t my-4"></div>

      {/* Metadata */}
      <div className="text-sm text-gray-500 space-y-1">
        <p>
          Created:{" "}
          {formatDateTime(
            convertUTCToTimezone(event.createdAt, viewTimezone)
          )}
        </p>
        <p>
          Updated:{" "}
          {formatDateTime(
            convertUTCToTimezone(event.updatedAt, viewTimezone)
          )}
        </p>
      </div>

      <div className="border-t my-4"></div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onEdit(event)}
          className="flex items-center justify-center gap-2 flex-1 border rounded-md py-2 text-sm font-medium hover:bg-gray-50 transition"
        >
          <PencilSquareIcon className="h-4 w-4" />
          Edit
        </button>

        <button
          onClick={handleLogsClick}
          className="flex items-center justify-center gap-2 flex-1 border rounded-md py-2 text-sm font-medium hover:bg-gray-50 transition"
        >
          <DocumentTextIcon className="h-4 w-4" />
          View Logs
        </button>
      </div>
    </div>
  );
};

export default EventCard;