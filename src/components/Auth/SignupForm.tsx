import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return false;
    }

    if (formData.username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters long",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive"
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Error",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await signup(formData.username, formData.email, formData.password);

      if (result.success) {
        toast({
          title: "Welcome to Student Plate! 🍽️",
          description: "Your account has been created successfully"
        });
        navigate('/dashboard');
      } else {
        toast({
          title: "Signup Failed",
          description: result.error || "Failed to create account",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-50 p-4" data-id="tz9aof4i4" data-path="src/components/Auth/SignupForm.tsx">
      <div className="w-full max-w-md" data-id="3atac84on" data-path="src/components/Auth/SignupForm.tsx">
        <Card className="shadow-xl border-0" data-id="j1igorb0u" data-path="src/components/Auth/SignupForm.tsx">
          <CardHeader className="text-center pb-8" data-id="pzv008lt1" data-path="src/components/Auth/SignupForm.tsx">
            <div className="mx-auto h-12 w-12 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4" data-id="04shupzfa" data-path="src/components/Auth/SignupForm.tsx">
              <span className="text-white font-bold text-lg" data-id="x6qx28kkx" data-path="src/components/Auth/SignupForm.tsx">SP</span>
            </div>
            <CardTitle className="text-2xl font-bold" data-id="76u0ihhw7" data-path="src/components/Auth/SignupForm.tsx">Join Student Plate</CardTitle>
            <CardDescription data-id="06cjochrc" data-path="src/components/Auth/SignupForm.tsx">
              Create your account to start sharing recipes
            </CardDescription>
          </CardHeader>
          
          <CardContent data-id="s7qs8jdsk" data-path="src/components/Auth/SignupForm.tsx">
            <form onSubmit={handleSubmit} className="space-y-6" data-id="bmx3o1l94" data-path="src/components/Auth/SignupForm.tsx">
              <div className="space-y-2" data-id="i4e08ikdx" data-path="src/components/Auth/SignupForm.tsx">
                <Label htmlFor="username" data-id="pasvtl3lj" data-path="src/components/Auth/SignupForm.tsx">Username</Label>
                <div className="relative" data-id="a3gfysjz4" data-path="src/components/Auth/SignupForm.tsx">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="xx4xz3oz7" data-path="src/components/Auth/SignupForm.tsx" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="pl-10"
                    required data-id="4v6qe3rsf" data-path="src/components/Auth/SignupForm.tsx" />

                </div>
              </div>

              <div className="space-y-2" data-id="1xb0vp0nr" data-path="src/components/Auth/SignupForm.tsx">
                <Label htmlFor="email" data-id="n4tz314ta" data-path="src/components/Auth/SignupForm.tsx">Email</Label>
                <div className="relative" data-id="xss42mp90" data-path="src/components/Auth/SignupForm.tsx">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="mshe46os7" data-path="src/components/Auth/SignupForm.tsx" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10"
                    required data-id="wecftk7r2" data-path="src/components/Auth/SignupForm.tsx" />

                </div>
              </div>

              <div className="space-y-2" data-id="bs9jz98zx" data-path="src/components/Auth/SignupForm.tsx">
                <Label htmlFor="password" data-id="h5yv2bao6" data-path="src/components/Auth/SignupForm.tsx">Password</Label>
                <div className="relative" data-id="6q322f0s4" data-path="src/components/Auth/SignupForm.tsx">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="zfw4qocek" data-path="src/components/Auth/SignupForm.tsx" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required data-id="1pmy2lgxf" data-path="src/components/Auth/SignupForm.tsx" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowPassword(!showPassword)} data-id="oh0zp2q7s" data-path="src/components/Auth/SignupForm.tsx">

                    {showPassword ?
                    <EyeOff className="h-4 w-4" data-id="uftwpajoz" data-path="src/components/Auth/SignupForm.tsx" /> :

                    <Eye className="h-4 w-4" data-id="nichhqmkv" data-path="src/components/Auth/SignupForm.tsx" />
                    }
                  </Button>
                </div>
              </div>

              <div className="space-y-2" data-id="rah7v44l9" data-path="src/components/Auth/SignupForm.tsx">
                <Label htmlFor="confirmPassword" data-id="zdffj3xk0" data-path="src/components/Auth/SignupForm.tsx">Confirm Password</Label>
                <div className="relative" data-id="c8unhoy4s" data-path="src/components/Auth/SignupForm.tsx">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="clp1dctmv" data-path="src/components/Auth/SignupForm.tsx" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10"
                    required data-id="h5gx9lx9a" data-path="src/components/Auth/SignupForm.tsx" />

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1 h-8 w-8 p-0"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)} data-id="973xgtsy3" data-path="src/components/Auth/SignupForm.tsx">

                    {showConfirmPassword ?
                    <EyeOff className="h-4 w-4" data-id="8u6iar8ix" data-path="src/components/Auth/SignupForm.tsx" /> :

                    <Eye className="h-4 w-4" data-id="74j68okxn" data-path="src/components/Auth/SignupForm.tsx" />
                    }
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                disabled={isLoading} data-id="po2q3dii4" data-path="src/components/Auth/SignupForm.tsx">

                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="mt-6 text-center" data-id="bv42aaik2" data-path="src/components/Auth/SignupForm.tsx">
              <p className="text-sm text-gray-600" data-id="ozqt8wzxm" data-path="src/components/Auth/SignupForm.tsx">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500" data-id="y1p0ngs1z" data-path="src/components/Auth/SignupForm.tsx">
                  Sign in
                </Link>
              </p>
            </div>

            <div className="mt-4 text-center" data-id="goumpzz85" data-path="src/components/Auth/SignupForm.tsx">
              <p className="text-xs text-gray-500" data-id="iftdivzfb" data-path="src/components/Auth/SignupForm.tsx">
                Join our community of student chefs and food enthusiasts!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default SignupForm;