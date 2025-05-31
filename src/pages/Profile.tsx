import React, { useState, useRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Camera, Mail, User, Calendar, Save, Upload } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="7m0akbbom" data-path="src/pages/Profile.tsx">
        <div className="text-center" data-id="7vjbupflj" data-path="src/pages/Profile.tsx">
          <h1 className="text-2xl font-bold mb-4" data-id="nsikbnnzj" data-path="src/pages/Profile.tsx">Access Denied</h1>
          <p className="text-gray-600" data-id="7mibsdjyc" data-path="src/pages/Profile.tsx">Please log in to view your profile.</p>
        </div>
      </div>);

  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {// 2MB limit
        toast({
          title: "File too large",
          description: "Please choose an image smaller than 2MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        updateProfile({ profilePicture: result });
        toast({
          title: "Profile picture updated",
          description: "Your profile picture has been updated successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!formData.username.trim()) {
      toast({
        title: "Error",
        description: "Username cannot be empty",
        variant: "destructive"
      });
      return;
    }

    if (formData.username.length < 3) {
      toast({
        title: "Error",
        description: "Username must be at least 3 characters long",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    try {
      updateProfile({
        username: formData.username.trim(),
        email: formData.email.trim()
      });

      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      username: user.username,
      email: user.email
    });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl" data-id="nxkufp7zx" data-path="src/pages/Profile.tsx">
      <div className="mb-8" data-id="wfv6ecwga" data-path="src/pages/Profile.tsx">
        <h1 className="text-3xl font-bold mb-2" data-id="dszni1s6r" data-path="src/pages/Profile.tsx">My Profile</h1>
        <p className="text-gray-600" data-id="ui5gve60q" data-path="src/pages/Profile.tsx">
          Manage your Student Plate account settings
        </p>
      </div>

      {/* Profile Picture Section */}
      <Card className="mb-8" data-id="o7izcqvby" data-path="src/pages/Profile.tsx">
        <CardHeader data-id="3c5zj0iz8" data-path="src/pages/Profile.tsx">
          <CardTitle data-id="emb0hl54k" data-path="src/pages/Profile.tsx">Profile Picture</CardTitle>
        </CardHeader>
        <CardContent data-id="82hgo10xv" data-path="src/pages/Profile.tsx">
          <div className="flex items-center gap-6" data-id="o9scffvfe" data-path="src/pages/Profile.tsx">
            <div className="relative" data-id="7h3i9tuys" data-path="src/pages/Profile.tsx">
              <Avatar className="h-24 w-24" data-id="yx6bixblb" data-path="src/pages/Profile.tsx">
                <AvatarImage src={user.profilePicture} alt={user.username} data-id="fvntynoba" data-path="src/pages/Profile.tsx" />
                <AvatarFallback className="text-2xl" data-id="j4nwfugc3" data-path="src/pages/Profile.tsx">
                  {user.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
                onClick={() => fileInputRef.current?.click()} data-id="8my0gyn9b" data-path="src/pages/Profile.tsx">

                <Camera className="h-4 w-4" data-id="zq9o9b5j3" data-path="src/pages/Profile.tsx" />
              </Button>
            </div>
            
            <div data-id="x6peqvt25" data-path="src/pages/Profile.tsx">
              <h3 className="font-semibold text-lg" data-id="fxmnyw7nl" data-path="src/pages/Profile.tsx">{user.username}</h3>
              <div className="flex items-center gap-2 mt-1" data-id="ufxzmhtsz" data-path="src/pages/Profile.tsx">
                <Badge variant="secondary" className="text-xs" data-id="o2mfdaaei" data-path="src/pages/Profile.tsx">Student Chef</Badge>
                <Badge variant="outline" className="text-xs" data-id="s7jveooqn" data-path="src/pages/Profile.tsx">Active Member</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-2" data-id="bqkpq89m5" data-path="src/pages/Profile.tsx">
                Member since {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden" data-id="tx13l6855" data-path="src/pages/Profile.tsx" />

        </CardContent>
      </Card>

      {/* Account Information */}
      <Card data-id="nwu8jsqma" data-path="src/pages/Profile.tsx">
        <CardHeader data-id="efmyl67r4" data-path="src/pages/Profile.tsx">
          <div className="flex items-center justify-between" data-id="vmsv94tme" data-path="src/pages/Profile.tsx">
            <CardTitle data-id="kb4dx2y90" data-path="src/pages/Profile.tsx">Account Information</CardTitle>
            {!isEditing ?
            <Button
              variant="outline"
              onClick={() => setIsEditing(true)} data-id="nnq4ylza3" data-path="src/pages/Profile.tsx">

                Edit Profile
              </Button> :

            <div className="flex gap-2" data-id="zmxtgo3rj" data-path="src/pages/Profile.tsx">
                <Button
                variant="outline"
                onClick={handleCancelEdit}
                disabled={isLoading} data-id="xo7f9f4ur" data-path="src/pages/Profile.tsx">

                  Cancel
                </Button>
                <Button
                onClick={handleSaveProfile}
                disabled={isLoading} data-id="nt6pbidmp" data-path="src/pages/Profile.tsx">

                  <Save className="h-4 w-4 mr-2" data-id="rv8hyigzy" data-path="src/pages/Profile.tsx" />
                  {isLoading ? 'Saving...' : 'Save'}
                </Button>
              </div>
            }
          </div>
        </CardHeader>
        <CardContent className="space-y-6" data-id="3oad26ivj" data-path="src/pages/Profile.tsx">
          <div className="space-y-2" data-id="texxp33sf" data-path="src/pages/Profile.tsx">
            <Label htmlFor="username" className="flex items-center gap-2" data-id="h7cj99l2e" data-path="src/pages/Profile.tsx">
              <User className="h-4 w-4" data-id="f5bkv25bh" data-path="src/pages/Profile.tsx" />
              Username
            </Label>
            {isEditing ?
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Enter your username" data-id="ry4v9j1v5" data-path="src/pages/Profile.tsx" /> :


            <div className="p-3 bg-gray-50 rounded-md" data-id="k1247wuzo" data-path="src/pages/Profile.tsx">
                {user.username}
              </div>
            }
          </div>

          <div className="space-y-2" data-id="qccz8hj9j" data-path="src/pages/Profile.tsx">
            <Label htmlFor="email" className="flex items-center gap-2" data-id="4wlmk6zm4" data-path="src/pages/Profile.tsx">
              <Mail className="h-4 w-4" data-id="icl50qxx1" data-path="src/pages/Profile.tsx" />
              Email Address
            </Label>
            {isEditing ?
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email" data-id="b7jt9n5ez" data-path="src/pages/Profile.tsx" /> :


            <div className="p-3 bg-gray-50 rounded-md" data-id="zn7pcjilg" data-path="src/pages/Profile.tsx">
                {user.email}
              </div>
            }
          </div>

          <div className="space-y-2" data-id="cfnbq10lo" data-path="src/pages/Profile.tsx">
            <Label className="flex items-center gap-2" data-id="u834s0oo7" data-path="src/pages/Profile.tsx">
              <Calendar className="h-4 w-4" data-id="gjra8d9rf" data-path="src/pages/Profile.tsx" />
              Member Since
            </Label>
            <div className="p-3 bg-gray-50 rounded-md" data-id="t6maszmfg" data-path="src/pages/Profile.tsx">
              {new Date(user.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Account Stats */}
      <Card className="mt-8" data-id="nneaq48cy" data-path="src/pages/Profile.tsx">
        <CardHeader data-id="gp6ks252m" data-path="src/pages/Profile.tsx">
          <CardTitle data-id="lnvp86pei" data-path="src/pages/Profile.tsx">Account Statistics</CardTitle>
        </CardHeader>
        <CardContent data-id="92bqj9bcg" data-path="src/pages/Profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="ztrf3yhif" data-path="src/pages/Profile.tsx">
            <div className="text-center p-4 bg-blue-50 rounded-lg" data-id="99xmx5b0d" data-path="src/pages/Profile.tsx">
              <p className="text-2xl font-bold text-blue-600" data-id="ceavjwqfz" data-path="src/pages/Profile.tsx">0</p>
              <p className="text-sm text-blue-700" data-id="iz19xpy1u" data-path="src/pages/Profile.tsx">Recipes Shared</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg" data-id="qswowpvli" data-path="src/pages/Profile.tsx">
              <p className="text-2xl font-bold text-red-600" data-id="i8l1hrbol" data-path="src/pages/Profile.tsx">0</p>
              <p className="text-sm text-red-700" data-id="ii9t991hb" data-path="src/pages/Profile.tsx">Total Likes</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg" data-id="ulw119aif" data-path="src/pages/Profile.tsx">
              <p className="text-2xl font-bold text-green-600" data-id="x02bkcyj4" data-path="src/pages/Profile.tsx">0</p>
              <p className="text-sm text-green-700" data-id="lglqo5snw" data-path="src/pages/Profile.tsx">Favorites Saved</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Section */}
      <Card className="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200" data-id="wr2fzxeon" data-path="src/pages/Profile.tsx">
        <CardHeader data-id="541hhfcwc" data-path="src/pages/Profile.tsx">
          <CardTitle className="text-orange-800" data-id="9o48rdhyk" data-path="src/pages/Profile.tsx">Profile Tips</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-orange-700" data-id="aewnn8sr5" data-path="src/pages/Profile.tsx">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-id="tfr48uzxf" data-path="src/pages/Profile.tsx">
            <div data-id="7widlrqj4" data-path="src/pages/Profile.tsx">
              <p className="font-medium mb-1" data-id="m8iqmxawm" data-path="src/pages/Profile.tsx">📸 Profile Picture</p>
              <p data-id="mif4thog3" data-path="src/pages/Profile.tsx">A clear profile picture helps others recognize you in the community</p>
            </div>
            <div data-id="wvwc3tu7l" data-path="src/pages/Profile.tsx">
              <p className="font-medium mb-1" data-id="nm0la1uew" data-path="src/pages/Profile.tsx">👤 Username</p>
              <p data-id="pyg6pcp97" data-path="src/pages/Profile.tsx">Choose a memorable username that represents your culinary style</p>
            </div>
            <div data-id="h4me7pp7n" data-path="src/pages/Profile.tsx">
              <p className="font-medium mb-1" data-id="6jsy2h7s8" data-path="src/pages/Profile.tsx">🔒 Privacy</p>
              <p data-id="zik7fywwr" data-path="src/pages/Profile.tsx">Your email is kept private and only used for account purposes</p>
            </div>
            <div data-id="1iq6rkt74" data-path="src/pages/Profile.tsx">
              <p className="font-medium mb-1" data-id="dej2uydus" data-path="src/pages/Profile.tsx">🏆 Build Reputation</p>
              <p data-id="0tz3vmi81" data-path="src/pages/Profile.tsx">Share quality recipes and engage with the community to build your reputation</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>);

};

export default Profile;