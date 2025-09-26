import { useState } from 'react';
import { X, MapPin, User, Clock } from 'lucide-react';
import { Issue } from '../types';

interface IssueModalProps {
  issue: Issue | null;
  onClose: () => void;
}

export function IssueModal({ issue, onClose }: IssueModalProps) {
  // ✅ Explicit union type for state
  const [selectedStatus, setSelectedStatus] = useState<Issue['status']>(
    issue?.status || 'Open'
  );

  if (!issue) return null;

  // ✅ Added "Closed"
  const statusColors: Record<Issue['status'], string> = {
    Open: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'In Progress':
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Closed: 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
  };

  const priorityColors = {
    Low: 'text-green-600',
    Medium: 'text-yellow-600',
    High: 'text-orange-600',
    Critical: 'text-red-600',
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {/* ❌ was issue.id → ✅ use issue._id */}
            Issue Details - {issue._id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {/* Left Side - Images & Map */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Images
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {(issue.images ?? []).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Issue ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Location Map
              </h3>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  {/* ❌ was issue.location → ✅ use issue.location?.address */}
                  <p className="text-gray-500 dark:text-gray-400">
                    {issue.location?.address}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Issue Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Issue Information
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Category
                  </label>
                  <p className="text-gray-900 dark:text-white">{issue.category}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Priority
                  </label>
                  <p className={`font-semibold ${priorityColors[issue.priority]}`}>
                    {issue.priority}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Status
                  </label>
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColors[issue.status]}`}
                  >
                    {issue.status}
                  </span>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Description
                  </label>
                  <p className="text-gray-900 dark:text-white">
                    {issue.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Reporter Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Reporter Information
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-2">
                <div className="flex items-center">
                  <User className="w-4 h-4 text-gray-500 mr-2" />
                  <span className="text-gray-900 dark:text-white">
                    {issue.reporter.name}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {issue.reporter.email}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {issue.reporter.phone}
                </p>
              </div>
            </div>

            {/* Notes (Activity Log) */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Activity Log
              </h3>
              <div className="space-y-3 max-h-48 overflow-y-auto">
                {/* ❌ was issue.activities → ✅ use issue.notes */}
                {(issue.notes ?? []).map((note, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <div className="bg-indigo-100 dark:bg-indigo-900 rounded-full p-2">
                      <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-300" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900 dark:text-white">
                        {note.message}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        by {note.author} •{' '}
                        {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Update Form */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Update Status
              </h3>
              <div className="space-y-3">
                <select
                  value={selectedStatus}
                  // ✅ Cast value to Issue['status']
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as Issue['status'])
                  }
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>

                <textarea
                  placeholder="Add a comment..."
                  rows={3}
                  className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                />

                <div className="flex space-x-3">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                    Update Issue
                  </button>
                  <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
