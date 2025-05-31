import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/Recipe/RecipeCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Search } from 'lucide-react';

const Favorites: React.FC = () => {
  const { user } = useAuth();
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadFavoriteRecipes();
    }
  }, [user]);

  const loadFavoriteRecipes = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      const favorites = await recipeService.getFavoriteRecipes(user.id);
      setFavoriteRecipes(favorites);
    } catch (error) {
      console.error('Error loading favorite recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="c8zazsguu" data-path="src/pages/Favorites.tsx">
        <div className="text-center" data-id="lkzyie5my" data-path="src/pages/Favorites.tsx">
          <h1 className="text-2xl font-bold mb-4" data-id="zalp47uh4" data-path="src/pages/Favorites.tsx">Access Denied</h1>
          <p className="text-gray-600 mb-4" data-id="w2j1ba6za" data-path="src/pages/Favorites.tsx">Please log in to view your favorite recipes.</p>
          <Link to="/login" data-id="t9t3ccdqv" data-path="src/pages/Favorites.tsx">
            <Button data-id="4kqr84wn1" data-path="src/pages/Favorites.tsx">Log In</Button>
          </Link>
        </div>
      </div>);

  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="oo6ukfu9w" data-path="src/pages/Favorites.tsx">
        <div className="flex items-center justify-center min-h-64" data-id="glrbk14h5" data-path="src/pages/Favorites.tsx">
          <div className="text-center" data-id="c3qg8kchv" data-path="src/pages/Favorites.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" data-id="etg40gi7h" data-path="src/pages/Favorites.tsx"></div>
            <p data-id="bn8nwgi0k" data-path="src/pages/Favorites.tsx">Loading your favorite recipes...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="container mx-auto px-4 py-8" data-id="17sx9o8yy" data-path="src/pages/Favorites.tsx">
      {/* Header */}
      <div className="mb-8" data-id="b0hp6fsbi" data-path="src/pages/Favorites.tsx">
        <h1 className="text-3xl font-bold flex items-center gap-2 mb-2" data-id="dcvqc6lel" data-path="src/pages/Favorites.tsx">
          <Heart className="h-8 w-8 text-red-500 fill-current" data-id="1t97efrpa" data-path="src/pages/Favorites.tsx" />
          My Favorite Recipes
        </h1>
        <p className="text-gray-600" data-id="2nghdtqy1" data-path="src/pages/Favorites.tsx">
          Your saved recipes from the Student Plate community
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8" data-id="o9vap67h1" data-path="src/pages/Favorites.tsx">
        <Card className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200" data-id="6qfjolkmm" data-path="src/pages/Favorites.tsx">
          <CardContent className="p-6" data-id="ymzyv5s3q" data-path="src/pages/Favorites.tsx">
            <div className="flex items-center gap-4" data-id="o0m1pvikr" data-path="src/pages/Favorites.tsx">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full" data-id="cbc01hwjj" data-path="src/pages/Favorites.tsx">
                <Heart className="h-6 w-6 text-red-600 fill-current" data-id="3mmxc120z" data-path="src/pages/Favorites.tsx" />
              </div>
              <div data-id="cszuv8hpe" data-path="src/pages/Favorites.tsx">
                <p className="text-2xl font-bold text-red-600" data-id="po8xsgxvl" data-path="src/pages/Favorites.tsx">{favoriteRecipes.length}</p>
                <p className="text-red-700" data-id="1uh355xj8" data-path="src/pages/Favorites.tsx">
                  Favorite Recipe{favoriteRecipes.length !== 1 ? 's' : ''} Saved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recipes Grid */}
      <div data-id="e5uzg9wic" data-path="src/pages/Favorites.tsx">
        {favoriteRecipes.length === 0 ?
        <Card className="text-center py-12" data-id="imbf09r50" data-path="src/pages/Favorites.tsx">
            <CardContent data-id="floebxfma" data-path="src/pages/Favorites.tsx">
              <div className="text-gray-500" data-id="y4g8oicc8" data-path="src/pages/Favorites.tsx">
                <Heart className="h-16 w-16 mx-auto mb-4 opacity-50" data-id="tk3evn0l8" data-path="src/pages/Favorites.tsx" />
                <h3 className="text-xl font-medium mb-2" data-id="gn27xliv8" data-path="src/pages/Favorites.tsx">No favorite recipes yet</h3>
                <p className="mb-6 text-gray-400" data-id="7u5qk0f5m" data-path="src/pages/Favorites.tsx">
                  Start exploring recipes and save your favorites by clicking the heart icon!
                </p>
                <Link to="/dashboard" data-id="ehmii6i3c" data-path="src/pages/Favorites.tsx">
                  <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="x9nds9rkg" data-path="src/pages/Favorites.tsx">
                    <Search className="h-4 w-4 mr-2" data-id="shr9fgezl" data-path="src/pages/Favorites.tsx" />
                    Discover Recipes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card> :

        <>
            <div className="flex items-center justify-between mb-6" data-id="tqw85e0au" data-path="src/pages/Favorites.tsx">
              <h2 className="text-xl font-semibold" data-id="5zczft4ke" data-path="src/pages/Favorites.tsx">
                Saved Recipes ({favoriteRecipes.length})
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="nrhhcnrf6" data-path="src/pages/Favorites.tsx">
              {favoriteRecipes.map((recipe) =>
            <div key={recipe.id} className="relative" data-id="3bn87et2x" data-path="src/pages/Favorites.tsx">
                  <RecipeCard
                recipe={recipe}
                onUpdate={loadFavoriteRecipes} data-id="06cf81eya" data-path="src/pages/Favorites.tsx" />

                  {/* Favorite badge */}
                  <div className="absolute top-3 left-3" data-id="7g8oisyv3" data-path="src/pages/Favorites.tsx">
                    <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1" data-id="yv0wuw0ki" data-path="src/pages/Favorites.tsx">
                      <Heart className="h-3 w-3 fill-current" data-id="kuv7fjbzf" data-path="src/pages/Favorites.tsx" />
                      Favorite
                    </div>
                  </div>
                </div>
            )}
            </div>
          </>
        }
      </div>

      {/* Tips Section */}
      {favoriteRecipes.length > 0 &&
      <Card className="mt-12 bg-gradient-to-r from-pink-50 to-red-50 border-pink-200" data-id="zojpzemd7" data-path="src/pages/Favorites.tsx">
          <CardContent className="p-6" data-id="004annpj4" data-path="src/pages/Favorites.tsx">
            <h3 className="text-lg font-semibold mb-3 text-red-800" data-id="j7i5hduun" data-path="src/pages/Favorites.tsx">
              💡 Make the Most of Your Favorites
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-700" data-id="a9hcmrv39" data-path="src/pages/Favorites.tsx">
              <div data-id="f1jeiky9d" data-path="src/pages/Favorites.tsx">
                <p className="font-medium mb-1" data-id="540u73ddi" data-path="src/pages/Favorites.tsx">📅 Plan Your Meals</p>
                <p data-id="fagzgt533" data-path="src/pages/Favorites.tsx">Use your favorite recipes to plan weekly meals and shopping lists</p>
              </div>
              <div data-id="xw1sq47tq" data-path="src/pages/Favorites.tsx">
                <p className="font-medium mb-1" data-id="doo0qrgc1" data-path="src/pages/Favorites.tsx">👨‍🍳 Try Variations</p>
                <p data-id="iwmepc5j6" data-path="src/pages/Favorites.tsx">Experiment with your favorite recipes by adding your own twist</p>
              </div>
              <div data-id="e5wdfqe59" data-path="src/pages/Favorites.tsx">
                <p className="font-medium mb-1" data-id="hlsgjysfc" data-path="src/pages/Favorites.tsx">📤 Share with Friends</p>
                <p data-id="bgp2wn5ks" data-path="src/pages/Favorites.tsx">Send links to your favorite recipes to friends and family</p>
              </div>
              <div data-id="6fnaem771" data-path="src/pages/Favorites.tsx">
                <p className="font-medium mb-1" data-id="yqz6hx6we" data-path="src/pages/Favorites.tsx">⭐ Rate & Comment</p>
                <p data-id="xtw2gibgj" data-path="src/pages/Favorites.tsx">Leave ratings and comments to help other students discover great recipes</p>
              </div>
            </div>
          </CardContent>
        </Card>
      }
    </div>);

};

export default Favorites;