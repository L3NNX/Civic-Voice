import { useState, useEffect } from 'react';
import { Filter, Download, Eye } from 'lucide-react';
import { Issue } from '../types';
import { IssueModal } from './IssueModal';

export function Issues() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [filters, setFilters] = useState({
    status: 'All',
    priority: 'All',
    category: 'All',
    department: 'All',
  });

  const statusColors: Record<string, string> = {
    Open: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    'In Progress':
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Resolved: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Closed: 'bg-gray-200 text-gray-700 dark:bg-gray-600 dark:text-gray-300',
  };

  const priorityColors: Record<string, string> = {
    Low: 'text-green-600',
    Medium: 'text-yellow-600',
    High: 'text-orange-600',
    Critical: 'text-red-600',
  };

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/issues/get'); // adjust if proxy is set
        const data = await res.json();
        if (data.success) {
          setIssues(data.data);
          console.log(data);
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error('Error fetching issues:', err);
      }
    };
    fetchIssues();
  }, []);

  // 🔹 Collect unique departments for filter dropdown
  const departments = Array.from(
    new Set(issues.map((issue) => issue.department?.name).filter(Boolean))
  );

  useEffect(() => {
    if (issues.length > 0) {
      const uniqueCategories = Array.from(
        new Set(issues.map((issue) => issue.category).filter(Boolean))
      );
      setCategories(uniqueCategories);
    }
  }, [issues]);
  // 🔹 Apply filters
  const filteredIssues = issues.filter((issue) => {
    return (
      (filters.status === 'All' || issue.status === filters.status) &&
      (filters.priority === 'All' || issue.priority === filters.priority) &&
      (filters.department === 'All' || issue.department?.name === filters.department) &&
      (filters.category === 'All' || issue.category === filters.category)
    );
  });

  // export button logic/code
  const exportToCSV = () => {
    if (filteredIssues.length === 0) {
      alert("No issues available to export!");
      return;
    }

    // Define CSV headers
    const headers = [
      "Issue ID",
      "Title",
      "Category",
      "Priority",
      "Status",
      "Department",
      "Location",
      "Reporter Name",
      "Reporter Email",
      "Reporter Phone",
      "Created At"
    ];

    // Map issues into CSV rows
    const rows = filteredIssues.map(issue => [
      issue._id,
      issue.title,
      issue.category,
      issue.priority,
      issue.status,
      issue.department?.name || "N/A",
      issue.location?.address || "N/A",
      issue.reporter?.name || "N/A",
      issue.reporter?.email || "N/A",
      issue.reporter?.phone || "N/A",
      new Date(issue.createdAt).toLocaleString()
    ]);

    // Build CSV content
    const csvContent = [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");

    // Download as file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `issues_export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Issues Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and manage all civic issues
          </p>
        </div>

        <button
          onClick={exportToCSV}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4">
          <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters:</span>

          {/* Status filter */}
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="All">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          {/* Priority filter */}
          <select
            value={filters.priority}
            onChange={(e) =>
              setFilters({ ...filters, priority: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          {/* Department filter (dynamic from DB) */}
          <select
            value={filters.department}
            onChange={(e) =>
              setFilters({ ...filters, department: e.target.value })
            }
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="All">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
          >
            <option value="All">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Issues Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Assigned Dept
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredIssues.map((issue) => (
                <tr
                  key={issue._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {issue.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {issue.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {issue.location?.address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`font-semibold ${priorityColors[issue.priority]}`}
                    >
                      {issue.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${statusColors[issue.status]}`}
                    >
                      {issue.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {issue.department?.name || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(issue.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedIssue(issue)}
                      className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {selectedIssue && (
        <IssueModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}
    </div>
  );
}
