import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ChefHat,
  Users,
  BookOpen,
  Heart,
  Star,
  ArrowRight,
  Clock,
  DollarSign,
  Utensils } from
'lucide-react';

const HomePage = () => {
  const { user } = useAuth();

  const features = [
  {
    icon: ChefHat,
    title: "Share Your Recipes",
    description: "Upload your favorite student-friendly recipes with photos and detailed instructions",
    color: "text-orange-500"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Connect with fellow students and food enthusiasts from around the world",
    color: "text-blue-500"
  },
  {
    icon: DollarSign,
    title: "Budget-Friendly",
    description: "Find affordable recipes perfect for student budgets and tight schedules",
    color: "text-green-500"
  },
  {
    icon: Clock,
    title: "Quick & Easy",
    description: "Discover recipes that fit into your busy student lifestyle",
    color: "text-purple-500"
  }];


  const stats = [
  { label: "Active Users", value: "10K+", icon: Users },
  { label: "Recipes Shared", value: "5K+", icon: BookOpen },
  { label: "Avg Rating", value: "4.8", icon: Star },
  { label: "Student Cooks", value: "8K+", icon: ChefHat }];


  const popularTags = [
  { name: "Quick & Easy", count: "1.2k recipes" },
  { name: "Budget Friendly", count: "980 recipes" },
  { name: "Healthy", count: "750 recipes" },
  { name: "Vegetarian", count: "650 recipes" },
  { name: "One Pot", count: "480 recipes" },
  { name: "No Cook", count: "320 recipes" }];


  if (user) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="qv01m3y02" data-path="src/pages/HomePage.tsx">
        {/* Welcome Back Section */}
        <div className="text-center mb-12" data-id="fir53m6m9" data-path="src/pages/HomePage.tsx">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-id="kctcfen5k" data-path="src/pages/HomePage.tsx">
            Welcome back, {user.username}! 👋
          </h1>
          <p className="text-xl text-gray-600 mb-8" data-id="6q7pm4w6t" data-path="src/pages/HomePage.tsx">
            Ready to discover new recipes or share your latest creation?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="piwbl56mc" data-path="src/pages/HomePage.tsx">
            <Link to="/dashboard" data-id="aa73hqs7s" data-path="src/pages/HomePage.tsx">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="pap2ni3mv" data-path="src/pages/HomePage.tsx">
                <BookOpen className="h-5 w-5 mr-2" data-id="inb743e2w" data-path="src/pages/HomePage.tsx" />
                Browse Recipes
              </Button>
            </Link>
            <Link to="/upload" data-id="byhq7g05v" data-path="src/pages/HomePage.tsx">
              <Button size="lg" variant="outline" data-id="tj04f7oo9" data-path="src/pages/HomePage.tsx">
                <ChefHat className="h-5 w-5 mr-2" data-id="v8eafmf04" data-path="src/pages/HomePage.tsx" />
                Share Recipe
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12" data-id="pohxicz0a" data-path="src/pages/HomePage.tsx">
          <Link to="/dashboard" data-id="iqx64ybf6" data-path="src/pages/HomePage.tsx">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" data-id="shuhpd3eg" data-path="src/pages/HomePage.tsx">
              <CardContent className="p-6 text-center" data-id="bxcet1hiy" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors" data-id="myb3aajof" data-path="src/pages/HomePage.tsx">
                  <BookOpen className="h-6 w-6 text-orange-600" data-id="rooepnfob" data-path="src/pages/HomePage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="bjhirr1qb" data-path="src/pages/HomePage.tsx">Discover Recipes</h3>
                <p className="text-gray-600 text-sm" data-id="bdpkfu1s7" data-path="src/pages/HomePage.tsx">Browse community recipes</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/favorites" data-id="o3p6o914z" data-path="src/pages/HomePage.tsx">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" data-id="1lm6t2rlx" data-path="src/pages/HomePage.tsx">
              <CardContent className="p-6 text-center" data-id="mnm0lq3ws" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-200 transition-colors" data-id="gl7ixjz5a" data-path="src/pages/HomePage.tsx">
                  <Heart className="h-6 w-6 text-red-600" data-id="otvgh94fi" data-path="src/pages/HomePage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="535np9v8x" data-path="src/pages/HomePage.tsx">My Favorites</h3>
                <p className="text-gray-600 text-sm" data-id="zk0kptlw8" data-path="src/pages/HomePage.tsx">Your saved recipes</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/my-recipes" data-id="4ixk5njgi" data-path="src/pages/HomePage.tsx">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer group" data-id="hu61egc9y" data-path="src/pages/HomePage.tsx">
              <CardContent className="p-6 text-center" data-id="xsp8tmuzo" data-path="src/pages/HomePage.tsx">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors" data-id="bpt9y6tqz" data-path="src/pages/HomePage.tsx">
                  <ChefHat className="h-6 w-6 text-blue-600" data-id="evfg7kqsh" data-path="src/pages/HomePage.tsx" />
                </div>
                <h3 className="font-semibold mb-2" data-id="fymg7a695" data-path="src/pages/HomePage.tsx">My Recipes</h3>
                <p className="text-gray-600 text-sm" data-id="xunvqizu0" data-path="src/pages/HomePage.tsx">Manage your creations</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>);

  }

  return (
    <div data-id="zplowdex9" data-path="src/pages/HomePage.tsx">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-orange-50 via-red-50 to-pink-50" data-id="xvztwede6" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 py-16" data-id="u9wt4hvm7" data-path="src/pages/HomePage.tsx">
          <div className="text-center max-w-4xl mx-auto" data-id="j6py6lw6x" data-path="src/pages/HomePage.tsx">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" data-id="tvbn50xil" data-path="src/pages/HomePage.tsx">
              <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" data-id="neyrkz7qk" data-path="src/pages/HomePage.tsx">
                Student Plate
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8" data-id="nwbeiqpry" data-path="src/pages/HomePage.tsx">
              The ultimate platform for student nutrition and recipe sharing.
              Discover budget-friendly, delicious recipes from fellow students worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12" data-id="mysiohevc" data-path="src/pages/HomePage.tsx">
              <Link to="/signup" data-id="2y6tue2yy" data-path="src/pages/HomePage.tsx">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="fee9qwnfd" data-path="src/pages/HomePage.tsx">
                  Join the Community
                  <ArrowRight className="h-5 w-5 ml-2" data-id="wbfy5rhsr" data-path="src/pages/HomePage.tsx" />
                </Button>
              </Link>
              <Link to="/login" data-id="2spapzabd" data-path="src/pages/HomePage.tsx">
                <Button size="lg" variant="outline" data-id="imzo3gdlj" data-path="src/pages/HomePage.tsx">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6" data-id="lr46ppjkv" data-path="src/pages/HomePage.tsx">
              {stats.map((stat, index) =>
              <div key={index} className="text-center" data-id="9knb1uklk" data-path="src/pages/HomePage.tsx">
                  <div className="flex items-center justify-center mb-2" data-id="nlf243das" data-path="src/pages/HomePage.tsx">
                    <stat.icon className="h-6 w-6 text-orange-500 mr-2" data-id="wiroy7jpd" data-path="src/pages/HomePage.tsx" />
                    <span className="text-2xl font-bold text-gray-800" data-id="6drvjxen6" data-path="src/pages/HomePage.tsx">{stat.value}</span>
                  </div>
                  <p className="text-sm text-gray-600" data-id="qv6dubejh" data-path="src/pages/HomePage.tsx">{stat.label}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white" data-id="jl5ld5egp" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="vge5mvt1s" data-path="src/pages/HomePage.tsx">
          <div className="text-center mb-16" data-id="gtvafz2xs" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-id="8ngxsvjxo" data-path="src/pages/HomePage.tsx">
              Why Choose Student Plate?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto" data-id="mj5zhjz6y" data-path="src/pages/HomePage.tsx">
              We understand student life. That's why we've built the perfect platform for budget-conscious, time-pressed food enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" data-id="oqso53mji" data-path="src/pages/HomePage.tsx">
            {features.map((feature, index) =>
            <Card key={index} className="text-center hover:shadow-lg transition-shadow" data-id="1wwzje7r1" data-path="src/pages/HomePage.tsx">
                <CardContent className="p-6" data-id="pwu9s3gh1" data-path="src/pages/HomePage.tsx">
                  <div className={`w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4`} data-id="jclwarpc0" data-path="src/pages/HomePage.tsx">
                    <feature.icon className={`h-8 w-8 ${feature.color}`} data-id="j5um4a4u6" data-path="src/pages/HomePage.tsx" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" data-id="3jn2snm9x" data-path="src/pages/HomePage.tsx">{feature.title}</h3>
                  <p className="text-gray-600" data-id="gajpjt349" data-path="src/pages/HomePage.tsx">{feature.description}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Popular Categories */}
      <div className="py-20 bg-gray-50" data-id="zjjrgxmct" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4" data-id="bb4soxw42" data-path="src/pages/HomePage.tsx">
          <div className="text-center mb-16" data-id="yvtdj0bhe" data-path="src/pages/HomePage.tsx">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-id="p51j5arzs" data-path="src/pages/HomePage.tsx">
              Popular Recipe Categories
            </h2>
            <p className="text-xl text-gray-600" data-id="4stwpow1p" data-path="src/pages/HomePage.tsx">
              Discover what's trending in the student cooking community
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" data-id="3o2acl28d" data-path="src/pages/HomePage.tsx">
            {popularTags.map((tag, index) =>
            <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer group" data-id="asva4188i" data-path="src/pages/HomePage.tsx">
                <CardContent className="p-4 text-center" data-id="gj44jnp69" data-path="src/pages/HomePage.tsx">
                  <Badge variant="secondary" className="mb-2 group-hover:bg-orange-100 transition-colors" data-id="o9hdeweo3" data-path="src/pages/HomePage.tsx">
                    {tag.name}
                  </Badge>
                  <p className="text-sm text-gray-600" data-id="qjsrzy7qd" data-path="src/pages/HomePage.tsx">{tag.count}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-orange-500 to-red-500" data-id="z8n3sk26h" data-path="src/pages/HomePage.tsx">
        <div className="container mx-auto px-4 text-center" data-id="70dwevpxy" data-path="src/pages/HomePage.tsx">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4" data-id="p5ltufuaf" data-path="src/pages/HomePage.tsx">
            Ready to Start Cooking?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto" data-id="97o45vsb0" data-path="src/pages/HomePage.tsx">
            Join thousands of students sharing delicious, affordable recipes. Your next favorite meal is just a click away!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center" data-id="zz3for9a1" data-path="src/pages/HomePage.tsx">
            <Link to="/signup" data-id="scx908rn7" data-path="src/pages/HomePage.tsx">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" data-id="txnof4a9o" data-path="src/pages/HomePage.tsx">
                <ChefHat className="h-5 w-5 mr-2" data-id="dfctsca9i" data-path="src/pages/HomePage.tsx" />
                Get Started Free
              </Button>
            </Link>
            <Link to="/login" data-id="tekasxpmi" data-path="src/pages/HomePage.tsx">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600" data-id="nkkg0b5ok" data-path="src/pages/HomePage.tsx">
                <Utensils className="h-5 w-5 mr-2" data-id="93plo0jhl" data-path="src/pages/HomePage.tsx" />
                Browse Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>);

};

export default HomePage;