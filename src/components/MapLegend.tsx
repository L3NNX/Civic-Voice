import React from 'react';

export function MapLegend() {
  const legendItems = [
    { priority: 'Critical', color: '#ef4444', count: 1 },
    { priority: 'High', color: '#f97316', count: 2 },
    { priority: 'Medium', color: '#eab308', count: 1 },
    { priority: 'Low', color: '#22c55e', count: 2 }
  ];

  const statusItems = [
    { status: 'Open', color: '#ef4444', count: 3 },
    { status: 'In Progress', color: '#f59e0b', count: 2 },
    { status: 'Resolved', color: '#10b981', count: 1 }
  ];

  return (
    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-[1000] border border-gray-200 dark:border-gray-700">
      <div className="space-y-4">
        {/* Priority Legend */}
        <div>
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Priority Levels
          </h4>
          <div className="space-y-1">
            {legendItems.map((item) => (
              <div key={item.priority} className="flex items-center text-xs">
                <div
                  className="w-3 h-3 rounded-full mr-2 border-2 border-white shadow-sm"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 dark:text-gray-300 mr-1">
                  {item.priority}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Status Legend */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Status
          </h4>
          <div className="space-y-1">
            {statusItems.map((item) => (
              <div key={item.status} className="flex items-center text-xs">
                <div
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-gray-700 dark:text-gray-300 mr-1">
                  {item.status}
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  ({item.count})
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}