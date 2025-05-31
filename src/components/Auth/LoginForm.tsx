import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        toast({
          title: "Success!",
          description: "Welcome back to Student Plate!"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Login Failed",
          description: result.error || "Invalid credentials",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4" data-id="hbctlcebu" data-path="src/components/Auth/LoginForm.tsx">
      <div className="w-full max-w-md" data-id="ijxzosdhl" data-path="src/components/Auth/LoginForm.tsx">
        <Card className="shadow-xl border-0" data-id="e2euk5sfy" data-path="src/components/Auth/LoginForm.tsx">
          <CardHeader className="text-center pb-8" data-id="9f9ng2x7z" data-path="src/components/Auth/LoginForm.tsx">
            <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4" data-id="bq0lrj6lr" data-path="src/components/Auth/LoginForm.tsx">
              <span className="text-white font-bold text-lg" data-id="1h1pymmqc" data-path="src/components/Auth/LoginForm.tsx">SP</span>
            </div>
            <CardTitle className="text-2xl font-bold" data-id="r4tw6iffu" data-path="src/components/Auth/LoginForm.tsx">Welcome Back</CardTitle>
            <CardDescription data-id="q4lhl52ps" data-path="src/components/Auth/LoginForm.tsx">
              Sign in to your Student Plate account
            </CardDescription>
          </CardHeader>
          
          <CardContent data-id="zkw1teup3" data-path="src/components/Auth/LoginForm.tsx">
            <form onSubmit={handleSubmit} className="space-y-6" data-id="ujwlvx0q2" data-path="src/components/Auth/LoginForm.tsx">
              <div className="space-y-2" data-id="74m144xz9" data-path="src/components/Auth/LoginForm.tsx">
                <Label htmlFor="email" data-id="x8wb57x3z" data-path="src/components/Auth/LoginForm.tsx">Email</Label>
                <div className="relative" data-id="e971wdsg3" data-path="src/components/Auth/LoginForm.tsx">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="s3phi50o0" data-path="src/components/Auth/LoginForm.tsx" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required data-id="lh5wsus31" data-path="src/components/Auth/LoginForm.tsx" />

                </div>
              </div>

              <div className="space-y-2" data-id="lqv6oxcgx" data-path="src/components/Auth/LoginForm.tsx">
                <Label htmlFor="password" data-id="m06e2lgja" data-path="src/components/Auth/LoginForm.tsx">Password</Label>
                <div className="relative" data-id="zi5epcris" data-path="src/components/Auth/LoginForm.tsx">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="zn9awc610" data-path="src/components/Auth/LoginForm.tsx" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required data-id="3r7t2lba9" data-path="src/components/Auth/LoginForm.tsx" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)} data-id="yo34ksgaf" data-path="src/components/Auth/LoginForm.tsx">

                    {showPassword ?
                    <EyeOff className="h-4 w-4" data-id="c3xhcucxp" data-path="src/components/Auth/LoginForm.tsx" /> :

                    <Eye className="h-4 w-4" data-id="sgsvnz88u" data-path="src/components/Auth/LoginForm.tsx" />
                    }
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                disabled={isLoading} data-id="sjm1k2syc" data-path="src/components/Auth/LoginForm.tsx">

                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center" data-id="6j2z2ah4i" data-path="src/components/Auth/LoginForm.tsx">
              <p className="text-sm text-gray-600" data-id="e9oirhviy" data-path="src/components/Auth/LoginForm.tsx">
                Don't have an account?{' '}
                <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500" data-id="r39r3931b" data-path="src/components/Auth/LoginForm.tsx">
                  Sign up
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center" data-id="7ywehqxqy" data-path="src/components/Auth/LoginForm.tsx">
              <p className="text-xs text-gray-500" data-id="l9y73ikx6" data-path="src/components/Auth/LoginForm.tsx">
                Demo: Use any email/password combination or create a new account
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default LoginForm;