import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/Recipe/RecipeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, BookOpen, TrendingUp, Heart } from 'lucide-react';

const MyRecipes: React.FC = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalRecipes: 0,
    totalLikes: 0,
    totalViews: 0,
    avgRating: 0
  });

  useEffect(() => {
    if (user) {
      loadUserRecipes();
    }
  }, [user]);

  useEffect(() => {
    calculateStats();
  }, [recipes]);

  const loadUserRecipes = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const userRecipes = await recipeService.getRecipesByUser(user.id);
      setRecipes(userRecipes);
    } catch (error) {
      console.error('Error loading user recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateStats = () => {
    const totalLikes = recipes.reduce((sum, recipe) => sum + recipe.likes.length, 0);
    const totalRatings = recipes.reduce((sum, recipe) => sum + recipe.rating.count, 0);
    const avgRating = totalRatings > 0 ?
    recipes.reduce((sum, recipe) => sum + recipe.rating.average * recipe.rating.count, 0) / totalRatings :
    0;

    setStats({
      totalRecipes: recipes.length,
      totalLikes,
      totalViews: totalRatings, // Using rating count as view proxy
      avgRating
    });
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="6iyecvlvg" data-path="src/pages/MyRecipes.tsx">
        <div className="text-center" data-id="1d61tkn9j" data-path="src/pages/MyRecipes.tsx">
          <h1 className="text-2xl font-bold mb-4" data-id="sn5g8xgem" data-path="src/pages/MyRecipes.tsx">Access Denied</h1>
          <p className="text-gray-600 mb-4" data-id="tg01uktsn" data-path="src/pages/MyRecipes.tsx">Please log in to view your recipes.</p>
          <Link to="/login" data-id="z63997v05" data-path="src/pages/MyRecipes.tsx">
            <Button data-id="xvesti1se" data-path="src/pages/MyRecipes.tsx">Log In</Button>
          </Link>
        </div>
      </div>);

  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="wpuqh8zbb" data-path="src/pages/MyRecipes.tsx">
        <div className="flex items-center justify-center min-h-64" data-id="m182s5yby" data-path="src/pages/MyRecipes.tsx">
          <div className="text-center" data-id="y14lb3qhh" data-path="src/pages/MyRecipes.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" data-id="cvz0n60o5" data-path="src/pages/MyRecipes.tsx"></div>
            <p data-id="gk3ewfaog" data-path="src/pages/MyRecipes.tsx">Loading your recipes...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="container mx-auto px-4 py-8" data-id="irq9v84qa" data-path="src/pages/MyRecipes.tsx">
      {/* Header */}
      <div className="mb-8" data-id="2gkt94jy2" data-path="src/pages/MyRecipes.tsx">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4" data-id="l1qxf8baz" data-path="src/pages/MyRecipes.tsx">
          <div data-id="lhp5k4uvw" data-path="src/pages/MyRecipes.tsx">
            <h1 className="text-3xl font-bold flex items-center gap-2" data-id="vhwqmr6iu" data-path="src/pages/MyRecipes.tsx">
              <BookOpen className="h-8 w-8 text-orange-500" data-id="2xr8gasxs" data-path="src/pages/MyRecipes.tsx" />
              My Recipes
            </h1>
            <p className="text-gray-600 mt-1" data-id="2j1vgpudo" data-path="src/pages/MyRecipes.tsx">
              Manage and share your culinary creations
            </p>
          </div>
          
          <Link to="/upload" data-id="vh0u55m38" data-path="src/pages/MyRecipes.tsx">
            <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="p6exfh61c" data-path="src/pages/MyRecipes.tsx">
              <PlusCircle className="h-4 w-4 mr-2" data-id="vl4oa8wcn" data-path="src/pages/MyRecipes.tsx" />
              Add New Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8" data-id="vqka21412" data-path="src/pages/MyRecipes.tsx">
        <Card data-id="syw3dw8i5" data-path="src/pages/MyRecipes.tsx">
          <CardContent className="p-6 text-center" data-id="sts2xhgh6" data-path="src/pages/MyRecipes.tsx">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-3" data-id="fjl8gb8vk" data-path="src/pages/MyRecipes.tsx">
              <BookOpen className="h-6 w-6 text-blue-600" data-id="g83z69s75" data-path="src/pages/MyRecipes.tsx" />
            </div>
            <p className="text-2xl font-bold text-blue-600" data-id="ds6te6m7x" data-path="src/pages/MyRecipes.tsx">{stats.totalRecipes}</p>
            <p className="text-sm text-gray-600" data-id="2vpwtb3r6" data-path="src/pages/MyRecipes.tsx">Total Recipes</p>
          </CardContent>
        </Card>

        <Card data-id="hzt4q87oz" data-path="src/pages/MyRecipes.tsx">
          <CardContent className="p-6 text-center" data-id="4yk5iu58y" data-path="src/pages/MyRecipes.tsx">
            <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-3" data-id="ub8buag4b" data-path="src/pages/MyRecipes.tsx">
              <Heart className="h-6 w-6 text-red-600" data-id="8dx7agejb" data-path="src/pages/MyRecipes.tsx" />
            </div>
            <p className="text-2xl font-bold text-red-600" data-id="yr6cwgdj4" data-path="src/pages/MyRecipes.tsx">{stats.totalLikes}</p>
            <p className="text-sm text-gray-600" data-id="9sk0nc8os" data-path="src/pages/MyRecipes.tsx">Total Likes</p>
          </CardContent>
        </Card>

        <Card data-id="4c5ezfiky" data-path="src/pages/MyRecipes.tsx">
          <CardContent className="p-6 text-center" data-id="1fwlc25dn" data-path="src/pages/MyRecipes.tsx">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-3" data-id="lm626io36" data-path="src/pages/MyRecipes.tsx">
              <TrendingUp className="h-6 w-6 text-green-600" data-id="jqajohi97" data-path="src/pages/MyRecipes.tsx" />
            </div>
            <p className="text-2xl font-bold text-green-600" data-id="p7i5963eq" data-path="src/pages/MyRecipes.tsx">{stats.totalViews}</p>
            <p className="text-sm text-gray-600" data-id="0g9dey6wu" data-path="src/pages/MyRecipes.tsx">Total Ratings</p>
          </CardContent>
        </Card>

        <Card data-id="sjge5mokt" data-path="src/pages/MyRecipes.tsx">
          <CardContent className="p-6 text-center" data-id="qdtxhgdqf" data-path="src/pages/MyRecipes.tsx">
            <div className="flex items-center justify-center w-12 h-12 bg-yellow-100 rounded-full mx-auto mb-3" data-id="h3rihj4l5" data-path="src/pages/MyRecipes.tsx">
              <span className="text-xl" data-id="7nm59jy0e" data-path="src/pages/MyRecipes.tsx">⭐</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600" data-id="wfel5tg44" data-path="src/pages/MyRecipes.tsx">{stats.avgRating.toFixed(1)}</p>
            <p className="text-sm text-gray-600" data-id="9h7e2bwwi" data-path="src/pages/MyRecipes.tsx">Avg Rating</p>
          </CardContent>
        </Card>
      </div>

      {/* Recipes Grid */}
      <div data-id="et5up5mmq" data-path="src/pages/MyRecipes.tsx">
        {recipes.length === 0 ?
        <Card className="text-center py-12" data-id="wnfiig4cp" data-path="src/pages/MyRecipes.tsx">
            <CardContent data-id="hrmjyjlue" data-path="src/pages/MyRecipes.tsx">
              <div className="text-gray-500" data-id="acsni1lnv" data-path="src/pages/MyRecipes.tsx">
                <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" data-id="z4qyoi09k" data-path="src/pages/MyRecipes.tsx" />
                <h3 className="text-xl font-medium mb-2" data-id="9s8pvhd4q" data-path="src/pages/MyRecipes.tsx">No recipes yet</h3>
                <p className="mb-6 text-gray-400" data-id="m58krs71n" data-path="src/pages/MyRecipes.tsx">
                  Start sharing your culinary creations with the community!
                </p>
                <Link to="/upload" data-id="c9db9wiuz" data-path="src/pages/MyRecipes.tsx">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="ics7qr9zu" data-path="src/pages/MyRecipes.tsx">
                    <PlusCircle className="h-4 w-4 mr-2" data-id="16ravhbog" data-path="src/pages/MyRecipes.tsx" />
                    Create Your First Recipe
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card> :

        <>
            <div className="flex items-center justify-between mb-6" data-id="r4eray487" data-path="src/pages/MyRecipes.tsx">
              <h2 className="text-xl font-semibold" data-id="aa8l37s8u" data-path="src/pages/MyRecipes.tsx">
                Your Recipes ({recipes.length})
              </h2>
              <Badge variant="secondary" className="text-sm" data-id="yerr8t3mq" data-path="src/pages/MyRecipes.tsx">
                {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="ii3hp8xgn" data-path="src/pages/MyRecipes.tsx">
              {recipes.map((recipe) =>
            <div key={recipe.id} className="relative" data-id="ax0ex6n9d" data-path="src/pages/MyRecipes.tsx">
                  <RecipeCard
                recipe={recipe}
                onUpdate={loadUserRecipes} data-id="gea8zccto" data-path="src/pages/MyRecipes.tsx" />

                  {/* Owner badge */}
                  <div className="absolute top-3 left-3" data-id="2dhz7jmgn" data-path="src/pages/MyRecipes.tsx">
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs" data-id="o5v32e13p" data-path="src/pages/MyRecipes.tsx">
                      Your Recipe
                    </Badge>
                  </div>
                </div>
            )}
            </div>
          </>
        }
      </div>

      {/* Tips Section */}
      {recipes.length > 0 &&
      <Card className="mt-12 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200" data-id="cn1pj6su6" data-path="src/pages/MyRecipes.tsx">
          <CardContent className="p-6" data-id="xzio1ytul" data-path="src/pages/MyRecipes.tsx">
            <h3 className="text-lg font-semibold mb-3 text-orange-800" data-id="f4ronnxk9" data-path="src/pages/MyRecipes.tsx">
              💡 Tips to Increase Engagement
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700" data-id="hwyfbvr7o" data-path="src/pages/MyRecipes.tsx">
              <div data-id="bjak3ng7j" data-path="src/pages/MyRecipes.tsx">
                <p className="font-medium mb-1" data-id="kt75o9lxx" data-path="src/pages/MyRecipes.tsx">📸 High-Quality Photos</p>
                <p data-id="0i63pl6au" data-path="src/pages/MyRecipes.tsx">Upload clear, well-lit photos of your finished dishes</p>
              </div>
              <div data-id="scsxt3cdx" data-path="src/pages/MyRecipes.tsx">
                <p className="font-medium mb-1" data-id="ucbtb6eoo" data-path="src/pages/MyRecipes.tsx">🏷️ Use Relevant Tags</p>
                <p data-id="tlpaj000b" data-path="src/pages/MyRecipes.tsx">Add tags like 'quick', 'budget', 'healthy' to help others find your recipes</p>
              </div>
              <div data-id="92bd8lv46" data-path="src/pages/MyRecipes.tsx">
                <p className="font-medium mb-1" data-id="tu0s6lozn" data-path="src/pages/MyRecipes.tsx">📝 Detailed Instructions</p>
                <p data-id="5qu3hh1xd" data-path="src/pages/MyRecipes.tsx">Provide clear, step-by-step instructions for best results</p>
              </div>
              <div data-id="trrcnpktc" data-path="src/pages/MyRecipes.tsx">
                <p className="font-medium mb-1" data-id="5ga1volxe" data-path="src/pages/MyRecipes.tsx">💬 Engage with Community</p>
                <p data-id="g0okuuvef" data-path="src/pages/MyRecipes.tsx">Like and comment on other recipes to build connections</p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </div>);

};

export default MyRecipes;