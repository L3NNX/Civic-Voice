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
    <div className={`bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl h-screen shadow-2xl transition-all duration-300 flex flex-col border-r border-white/20 dark:border-slate-700/50 ${
      isCollapsed ? 'w-20' : 'w-64'  
    }`}>
      <div className="flex items-center justify-between p-6">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Civic Admin
            </h1>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-all duration-200 hover:shadow-lg"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600 dark:text-slate-300" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-slate-300" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 px-4 pb-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center rounded-2xl transition-all duration-200 group ${
                    isCollapsed ? 'p-3 justify-center' : 'px-4 py-3'
                  } ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25'
                      : 'text-gray-700 dark:text-slate-200 hover:bg-white/50 dark:hover:bg-gray-700/50 hover:shadow-md'
                  }`}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} ${
                    isActive ? 'text-white' : 'text-gray-500 dark:text-slate-400 group-hover:text-gray-700 dark:group-hover:text-slate-200'
                  }`} />
                  {!isCollapsed && (
                    <span className="font-medium">{item.label}</span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom User Section */}
      {!isCollapsed && (
        <div className="p-4 border-t border-white/20 dark:border-slate-700/50">
          <div className="flex items-center space-x-3 p-3 rounded-2xl bg-white/30 dark:bg-gray-800/30">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100"
              alt="Admin"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                admin@civic.gov
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}