import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StatCard } from "./StatCard";
import { mockStats, chartData } from "../data/mockData";
import { MapComponent } from "./Mapcomponent";

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-slate-400">
            Overview of civic issue reporting system
          </p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mockStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>

      {/* Main 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[700px]">
        {/* Left Column - Map */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-full overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Issue Locations
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time issue tracking across the city
            </p>
          </div>
          <div className="h-[calc(100%-80px)]">
            <MapComponent />
          </div>
        </div>

        {/* Middle Column - Stacked Charts */}
        <div className="flex flex-col gap-6 h-full">
          {/* Monthly Submissions */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm px-5 py-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Monthly Submissions
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke="#4F46E5"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10B981"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Response Time */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Average Response Time
            </h3>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Current
              </span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                2.3 hours
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 dark:text-slate-400 mt-2">
              Target: 3 hours
            </p>
          </div>
        </div>

        {/* Right Column - Bars + Trends */}
        <div className="flex flex-col gap-6 h-full">
          {/* Horizontal Bar Chart */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm px-2 py-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Department Performance
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData.departments}
                layout="vertical"
                margin={{ left: 40 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#6B7280" />
                <YAxis
                  dataKey="name"
                  type="category"
                  stroke="#6B7280"
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="resolved" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Resolution Trends */}
          <div className="flex-1 bg-white dark:bg-slate-800 rounded-xl shadow-sm px-2 py-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Resolution Trends
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.departments}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1F2937",
                    border: "none",
                    borderRadius: "8px",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="resolved" fill="#4F46E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
