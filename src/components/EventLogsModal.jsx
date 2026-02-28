import React from "react";
import { XMarkIcon, ClockIcon } from "@heroicons/react/24/outline";
import { convertUTCToTimezone, formatDateTime } from "../utils/timezone";

const EventLogsModal = ({ event, viewTimezone, setShowLogs }) => {
  if (!event) return null;

  const logs = event.logs || [];

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
        <button
          onClick={() => setShowLogs(null)}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6">
          Event Update History
        </h2>

        {logs.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No updates yet.
          </p>
        ) : (
          <div className="space-y-4">
            {logs.map((log, index) => {
              const updatedAt = convertUTCToTimezone(
                log.updatedAtUTC,
                viewTimezone
              );

              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-4 border"
                >
                  <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                    <ClockIcon className="h-4 w-4" />
                    {formatDateTime(updatedAt)}
                  </div>

                  <p className="text-sm text-gray-700">
                    Start date/time updated
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventLogsModal;