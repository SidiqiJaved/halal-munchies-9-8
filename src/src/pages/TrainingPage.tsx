import { TrainingSystem } from '../components/TrainingSystem'
import { useAuth } from '../contexts/AuthContext'

export function TrainingPage() {
  const { userRole } = useAuth()
  
  return <TrainingSystem userRole={userRole} />
}