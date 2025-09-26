import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// import { chartData } from '../data/mockData';



export function Analytics() {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [chartData, setChartData] = useState({
    monthly: [],
    departments: [],
    categories: []
  });


  // Fetch issues from backend
  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/issues/get');
        const data = await res.json();
        if (data.success) {
          setIssues(data.data);
        }
      } catch (err) {
        console.error('Error fetching issues:', err);
      }
    };
    fetchIssues();
  }, []);
  useEffect(() => {
    if (!issues.length) return;

    // 1️⃣ Issues Over Time (Monthly)
    const monthlyMap: Record<string, number> = {};
    issues.forEach(issue => {
      const month = new Date(issue.createdAt).toLocaleString('default', { month: 'short', year: 'numeric' });
      monthlyMap[month] = (monthlyMap[month] || 0) + 1;
    });
    const monthly = Object.entries(monthlyMap)
      .map(([name, issues]) => ({ name, issues }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    // 2️⃣ Resolutions by Department
    const deptMap: Record<string, number> = {};
    issues.forEach(issue => {
      const deptName = issue.department?.name || 'Unassigned';
      if (issue.status === 'Resolved' || issue.status === 'Closed') {
        deptMap[deptName] = (deptMap[deptName] || 0) + 1;
      }
    });
    const departments = Object.entries(deptMap).map(([name, resolved]) => ({ name, resolved }));

    // 3️⃣ Issues by Category
    const catMap: Record<string, number> = {};
    issues.forEach(issue => {
      catMap[issue.category] = (catMap[issue.category] || 0) + 1;
    });
    const colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#0EA5E9', '#F43F5E', '#84CC16'];
    const categories = Object.entries(catMap).map(([name, value], index) => ({
      name,
      value,
      fill: colors[index % colors.length]
    }));

    setChartData({ monthly, departments, categories });
  }, [issues]);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Comprehensive insights and reporting
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues Over Time */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Issues Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Line type="monotone" dataKey="issues" stroke="#4F46E5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Resolutions by Department */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Resolutions by Department
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.departments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
              <Bar dataKey="resolved" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Categories Pie Chart - Full Width */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Issues by Category
        </h3>
        <div className="flex justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData.categories}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.categories.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '8px',
                  color: '#F3F4F6'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}