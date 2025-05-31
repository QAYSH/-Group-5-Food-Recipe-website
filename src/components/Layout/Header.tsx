import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator } from
'@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  User,
  LogOut,
  Plus,
  Heart,
  BookOpen,
  Home,
  Menu,
  X } from
'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/upload', label: 'Upload Recipe', icon: Plus },
  { path: '/my-recipes', label: 'My Recipes', icon: BookOpen },
  { path: '/favorites', label: 'Favorites', icon: Heart }];


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" data-id="vkjseqx4p" data-path="src/components/Layout/Header.tsx">
      <div className="container mx-auto px-4" data-id="hxe1sirx9" data-path="src/components/Layout/Header.tsx">
        <div className="flex h-16 items-center justify-between" data-id="p7m5x7lyt" data-path="src/components/Layout/Header.tsx">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" data-id="p5ncpm3b0" data-path="src/components/Layout/Header.tsx">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center" data-id="3zp99xoy0" data-path="src/components/Layout/Header.tsx">
              <span className="text-white font-bold text-sm" data-id="cmczcf3gy" data-path="src/components/Layout/Header.tsx">SP</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-id="g67z3brrq" data-path="src/components/Layout/Header.tsx">
              Student Plate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" data-id="mpa9raq5w" data-path="src/components/Layout/Header.tsx">
            {user && navigationItems.map((item) =>
            <Link key={item.path} to={item.path} data-id="je1uu00cw" data-path="src/components/Layout/Header.tsx">
                <Button
                variant={isActive(item.path) ? "default" : "ghost"}
                size="sm"
                className="flex items-center gap-2" data-id="684677nee" data-path="src/components/Layout/Header.tsx">

                  <item.icon className="h-4 w-4" data-id="xkb52u93z" data-path="src/components/Layout/Header.tsx" />
                  {item.label}
                </Button>
              </Link>
            )}
          </nav>

          {/* User Actions */}
          <div className="flex items-center space-x-4" data-id="ggggr72yt" data-path="src/components/Layout/Header.tsx">
            {user ?
            <div className="flex items-center space-x-3" data-id="nnmq3dnh0" data-path="src/components/Layout/Header.tsx">
                <div className="hidden md:block text-sm" data-id="k5hb4bwf8" data-path="src/components/Layout/Header.tsx">
                  Welcome, <span className="font-semibold" data-id="yrzmtxz7x" data-path="src/components/Layout/Header.tsx">{user.username}</span>
                  <Badge variant="secondary" className="ml-2" data-id="rhewsufvz" data-path="src/components/Layout/Header.tsx">Student</Badge>
                </div>
                
                {/* Desktop User Menu */}
                <DropdownMenu data-id="n1htm59ol" data-path="src/components/Layout/Header.tsx">
                  <DropdownMenuTrigger asChild className="hidden md:flex" data-id="4lzf9uvtg" data-path="src/components/Layout/Header.tsx">
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full" data-id="ob0igxrvr" data-path="src/components/Layout/Header.tsx">
                      <Avatar className="h-8 w-8" data-id="ugaly8qr9" data-path="src/components/Layout/Header.tsx">
                        <AvatarImage src={user.profilePicture} alt={user.username} data-id="inqk33v6r" data-path="src/components/Layout/Header.tsx" />
                        <AvatarFallback data-id="hwjbrk3ay" data-path="src/components/Layout/Header.tsx">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount data-id="tkqrljj5k" data-path="src/components/Layout/Header.tsx">
                    <DropdownMenuItem onClick={() => navigate('/profile')} data-id="vaoozyvnu" data-path="src/components/Layout/Header.tsx">
                      <User className="mr-2 h-4 w-4" data-id="m9nmx2ked" data-path="src/components/Layout/Header.tsx" />
                      <span data-id="rjfowuead" data-path="src/components/Layout/Header.tsx">Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator data-id="gpc685z6b" data-path="src/components/Layout/Header.tsx" />
                    <DropdownMenuItem onClick={handleLogout} data-id="m6i3849jz" data-path="src/components/Layout/Header.tsx">
                      <LogOut className="mr-2 h-4 w-4" data-id="3958fjpha" data-path="src/components/Layout/Header.tsx" />
                      <span data-id="yeohyn8rn" data-path="src/components/Layout/Header.tsx">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen} data-id="lai30w4cr" data-path="src/components/Layout/Header.tsx">
                  <SheetTrigger asChild data-id="suyvts29x" data-path="src/components/Layout/Header.tsx">
                    <Button variant="ghost" size="sm" className="md:hidden" data-id="h1tm9po14" data-path="src/components/Layout/Header.tsx">
                      <Menu className="h-5 w-5" data-id="ld18ci02n" data-path="src/components/Layout/Header.tsx" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]" data-id="4pdxrd9kz" data-path="src/components/Layout/Header.tsx">
                    <div className="flex flex-col space-y-4 mt-4" data-id="5z32ioe3g" data-path="src/components/Layout/Header.tsx">
                      <div className="flex items-center space-x-3 pb-4 border-b" data-id="nxpjpm140" data-path="src/components/Layout/Header.tsx">
                        <Avatar className="h-10 w-10" data-id="99mw1b0lo" data-path="src/components/Layout/Header.tsx">
                          <AvatarImage src={user.profilePicture} alt={user.username} data-id="pe97v9kxm" data-path="src/components/Layout/Header.tsx" />
                          <AvatarFallback data-id="venq5dm9j" data-path="src/components/Layout/Header.tsx">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div data-id="hiwetms8e" data-path="src/components/Layout/Header.tsx">
                          <p className="font-medium" data-id="sxit3xky0" data-path="src/components/Layout/Header.tsx">{user.username}</p>
                          <Badge variant="secondary" className="text-xs" data-id="hgr712q5t" data-path="src/components/Layout/Header.tsx">Student</Badge>
                        </div>
                      </div>
                      
                      {navigationItems.map((item) =>
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)} data-id="w7jrt8fz3" data-path="src/components/Layout/Header.tsx">

                          <Button
                        variant={isActive(item.path) ? "default" : "ghost"}
                        className="w-full justify-start" data-id="hl0y39oow" data-path="src/components/Layout/Header.tsx">

                            <item.icon className="mr-2 h-4 w-4" data-id="qkv73vyfc" data-path="src/components/Layout/Header.tsx" />
                            {item.label}
                          </Button>
                        </Link>
                    )}
                      
                      <div className="pt-4 border-t" data-id="90ivnzym5" data-path="src/components/Layout/Header.tsx">
                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)} data-id="a5fyiqh5p" data-path="src/components/Layout/Header.tsx">
                          <Button variant="ghost" className="w-full justify-start" data-id="d9fk56cav" data-path="src/components/Layout/Header.tsx">
                            <User className="mr-2 h-4 w-4" data-id="ilr5igv0z" data-path="src/components/Layout/Header.tsx" />
                            Profile
                          </Button>
                        </Link>
                        <Button
                        variant="ghost"
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                        onClick={handleLogout} data-id="0baa9k5fl" data-path="src/components/Layout/Header.tsx">

                          <LogOut className="mr-2 h-4 w-4" data-id="vaso51454" data-path="src/components/Layout/Header.tsx" />
                          Log out
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div> :

            <div className="flex items-center space-x-2" data-id="ka5wymfbp" data-path="src/components/Layout/Header.tsx">
                <Link to="/login" data-id="kl89g5idz" data-path="src/components/Layout/Header.tsx">
                  <Button variant="ghost" size="sm" data-id="oc0t8sago" data-path="src/components/Layout/Header.tsx">
                    Login
                  </Button>
                </Link>
                <Link to="/signup" data-id="8o0uw9k15" data-path="src/components/Layout/Header.tsx">
                  <Button size="sm" data-id="bzwb2kjg2" data-path="src/components/Layout/Header.tsx">
                    Sign Up
                  </Button>
                </Link>
              </div>
            }
          </div>
        </div>
      </div>
    </header>);

};

export default Header;