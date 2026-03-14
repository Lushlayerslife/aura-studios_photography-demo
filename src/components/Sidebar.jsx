import { 
  LayoutDashboard, 
  Pill, 
  Package, 
  AlertTriangle, 
  Users, 
  UserCog, 
  Shield, 
  Thermometer, 
  FileText, 
  BarChart, 
  ShoppingCart, 
  Settings,
  DollarSign,
  Lock,
  LogOut,
  TrendingDown,
  ClipboardList,
  RefreshCw,
  Syringe
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard, tier: 'core' },
  { id: 'prescriptions', name: 'Prescriptions', icon: Pill, tier: 'builder' },
  { id: 'inventory', name: 'Inventory', icon: Package, tier: 'core' },
  { id: 'incidents', name: 'Incidents', icon: AlertTriangle, tier: 'core' },
  { id: 'patients', name: 'Patients', icon: Users, tier: 'builder' },
  { id: 'staff', name: 'Staff', icon: UserCog, tier: 'agency' },
  { id: 'compliance', name: 'Compliance', icon: Shield, tier: 'agency' },
  { id: 'equipment', name: 'Equipment', icon: Thermometer, tier: 'agency' },
  { id: 'documents', name: 'Documents', icon: FileText, tier: 'agency' },
  { id: 'reports', name: 'Reports', icon: BarChart, tier: 'core' },
  { id: 'claims', name: 'Claims & Financial', icon: DollarSign, tier: 'core' },
  { id: 'dir', name: 'DIR Fee Tracker', icon: TrendingDown, tier: 'builder' },
  { id: 'ecare', name: 'eCare Plans', icon: ClipboardList, tier: 'builder' },
  { id: 'medsync', name: 'Med Sync', icon: RefreshCw, tier: 'builder' },
  { id: 'vaccines', name: 'Vaccine Scheduler', icon: Syringe, tier: 'agency' },
  { id: 'pos', name: 'Point of Sale', icon: ShoppingCart, tier: 'enterprise' },
  { id: 'settings', name: 'Settings', icon: Settings, tier: 'core' },
]

const tierLevel = {
  'core': 1,
  'builder': 2,
  'agency': 3,
  'enterprise': 4
}

export default function Sidebar({ currentPage, setCurrentPage, tier }) {
  const currentTierLevel = tierLevel[tier]

  return (
    <div className="w-64 sidebar-bg border-r-2 border-slate-700 flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <img 
          src="/Logo.png" 
          alt="CoreAuraLogix" 
          className="h-10 w-auto invert"
        />
        <p className="text-xs text-slate-500 mt-2">Pharmacy Management Suite</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isLocked = tierLevel[item.tier] > currentTierLevel
          const isActive = currentPage === item.id

          return (
            <button
              key={item.id}
              onClick={() => !isLocked && setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'nav-active text-white'
                  : isLocked
                  ? 'bg-slate-800/20 text-slate-600 cursor-not-allowed'
                  : 'bg-slate-800/40 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Icon size={18} />
              <span className="flex-1 text-left">{item.name}</span>
              {isLocked && <Lock size={14} className="text-slate-600" />}
            </button>
          )
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
            SF
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-white">Sunshine Family</p>
            <p className="text-xs text-slate-400">demopharmacy@core...</p>
          </div>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
