import { InspectionManagement } from '../components/InspectionManagement'
import { useAuth } from '../contexts/AuthContext'

export function InspectionsPage() {
  const { userRole } = useAuth()
  
  return <InspectionManagement userRole={userRole} />
}