import { 
  LayoutDashboard, 
  AlertCircle, 
  Building2, 
  BarChart3, 
  Settings, 
  User,
  ChevronLeft,
  ChevronRight 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'issues', label: 'Issues', icon: AlertCircle },
  { id: 'departments', label: 'Departments', icon: Building2 },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'profile', label: 'Profile', icon: User },
];

export function Sidebar({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }: SidebarProps) {
  return (
    <div className={`bg-white dark:bg-slate-900 h-screen shadow-lg transition-all duration-300 flex flex-col border-r border-gray-200 dark:border-slate-700 ${
      isCollapsed ? 'w-20' : 'w-64'  
    }`}>
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Civic Admin
          </h1>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-slate-300" />
          ) : (
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-slate-300" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center rounded-lg transition-colors ${
                    isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`${isCollapsed ? 'w-7 h-7' : 'w-5 h-5 mr-3'}`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}