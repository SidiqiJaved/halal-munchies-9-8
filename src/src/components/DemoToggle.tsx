import { Button } from './ui/button'
import { Users, Eye, ToggleLeft, ToggleRight } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export function DemoToggle() {
  const { demoMode, setDemoMode } = useAuth()

  const handleDemoToggle = () => {
    const newMode = demoMode === 'customer' ? 'franchise' : 'customer'
    setDemoMode(newMode)
  }

  return (
    <div className="bg-halal-gold text-white py-3 px-4 text-center relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm">
          <Eye className="h-4 w-4" />
          <span>Demo Mode: {demoMode === 'customer' ? 'Customer Website' : 'Franchise Dashboard'}</span>
        </div>
        
        <Button
          onClick={handleDemoToggle}
          variant="outline"
          size="sm"
          className="border-white text-white hover:bg-white hover:text-halal-gold flex items-center space-x-2"
        >
          {demoMode === 'customer' ? (
            <>
              <Users className="h-4 w-4" />
              <span>View Franchise Dashboard</span>
              <ToggleLeft className="h-4 w-4" />
            </>
          ) : (
            <>
              <Users className="h-4 w-4" />
              <span>View Customer Website</span>
              <ToggleRight className="h-4 w-4" />
            </>
          )}
        </Button>
        
        <div className="text-sm opacity-75">
          Switch between user experiences
        </div>
      </div>
    </div>
  )
}