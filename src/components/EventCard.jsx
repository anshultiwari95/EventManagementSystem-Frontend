import React from "react";
import { convertUTCToTimezone, formatDateTime } from "../utils/timezone";

const EventCard = ({ event, viewTimezone, onEdit }) => {
  const logs = event.logs || [];

  const startConverted = convertUTCToTimezone(event.startTimeUTC, viewTimezone);

  const endConverted = convertUTCToTimezone(event.endTimeUTC, viewTimezone);

  return (
    <div className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      <p className="text-sm text-gray-500 mb-2">
        Event Timezone: {event.eventTimezone}
      </p>

      <p>Start: {formatDateTime(startConverted)}</p>
      <p>End: {formatDateTime(endConverted)}</p>

      <button
        onClick={() => onEdit(event)}
        className="mt-3 text-sm text-indigo-600"
      >
        ✏️ Edit
      </button>

      {logs.length > 0 && (
        <div className="mt-4 border-t pt-3">
          <p className="text-sm font-semibold mb-2">Update Logs</p>

          <div className="space-y-2">
            {logs.map((log, index) => {
              const updatedAt = convertUTCToTimezone(
                log.updatedAtUTC,
                viewTimezone,
              );

              return (
                <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                  <p className="text-gray-500">
                    Updated At: {formatDateTime(updatedAt)}
                  </p>

                  <p>
                    Previous Start:{" "}
                    {formatDateTime(
                      convertUTCToTimezone(
                        log.previousValues.startTimeUTC,
                        viewTimezone,
                      ),
                    )}
                  </p>

                  <p>
                    New Start:{" "}
                    {formatDateTime(
                      convertUTCToTimezone(
                        log.newValues.startTimeUTC,
                        viewTimezone,
                      ),
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
