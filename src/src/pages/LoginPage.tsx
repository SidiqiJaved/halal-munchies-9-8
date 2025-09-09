import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { useAuth } from '../contexts/AuthContext'
import { User, Lock, Building } from 'lucide-react'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Demo login - in a real app, this would authenticate with a backend
    console.log('Login attempt:', { email, password, role })
    
    login(role)
    
    // Redirect based on role
    if (['admin', 'franchisee', 'manager'].includes(role)) {
      navigate('/dashboard')
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-halal-cream flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-halal-green rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-halal-green">Welcome Back</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card className="shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-halal-green">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="focus:ring-halal-green focus:border-halal-green"
                />
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="focus:ring-halal-green focus:border-halal-green"
                />
              </div>

              {/* Role Selection */}
              <div className="space-y-2">
                <Label htmlFor="role">Account Type</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="focus:ring-halal-green focus:border-halal-green">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">Customer</SelectItem>
                    <SelectItem value="admin">System Administrator</SelectItem>
                    <SelectItem value="franchisee">Franchise Owner</SelectItem>
                    <SelectItem value="manager">Store Manager</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-halal-green hover:bg-halal-green-dark text-white py-3"
              >
                <Lock className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </form>

            {/* Demo Notice */}
            <div className="mt-6 p-4 bg-halal-gold bg-opacity-10 rounded-lg">
              <div className="flex items-start space-x-3">
                <Building className="h-5 w-5 text-halal-gold flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-halal-gold mb-1">Demo Mode</p>
                  <p className="text-gray-600">
                    This is a demo login. Use any email/password combination. 
                    Select "Franchise Owner" or "Store Manager" to access the business portal.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Links */}
        <div className="text-center space-y-2">
          <a href="#" className="text-sm text-halal-green hover:text-halal-gold">
            Forgot your password?
          </a>
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="#" className="text-halal-green hover:text-halal-gold font-medium">
              Contact us for franchise opportunities
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}