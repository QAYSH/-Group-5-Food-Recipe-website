import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { Recipe } from '@/types/recipe';
import RecipeCard from '@/components/Recipe/RecipeCard';
import RecipeFilters from '@/components/Recipe/RecipeFilters';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, TrendingUp, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [userStats, setUserStats] = useState({
    totalRecipes: 0,
    totalLikes: 0,
    totalFavorites: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All Levels');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  useEffect(() => {
    if (user) {
      calculateUserStats();
    }
  }, [recipes, user]);

  useEffect(() => {
    applyFilters();
  }, [recipes, searchTerm, selectedCategory, selectedDifficulty, selectedTags]);

  const loadRecipes = async () => {
    try {
      setIsLoading(true);
      const allRecipes = await recipeService.getAllRecipes();
      setRecipes(allRecipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateUserStats = () => {
    if (!user) return;

    const userRecipes = recipes.filter((recipe) => recipe.authorId === user.id);
    const totalLikes = userRecipes.reduce((sum, recipe) => sum + recipe.likes.length, 0);
    const totalFavorites = recipes.filter((recipe) => recipe.favorites.includes(user.id)).length;

    setUserStats({
      totalRecipes: userRecipes.length,
      totalLikes,
      totalFavorites
    });
  };

  const applyFilters = () => {
    let filtered = [...recipes];

    // Search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      filtered = filtered.filter((recipe) =>
      recipe.title.toLowerCase().includes(lowercaseSearch) ||
      recipe.description.toLowerCase().includes(lowercaseSearch) ||
      recipe.authorName.toLowerCase().includes(lowercaseSearch) ||
      recipe.ingredients.some((ingredient) =>
      ingredient.toLowerCase().includes(lowercaseSearch)
      )
      );
    }

    // Category filter
    if (selectedCategory !== 'All Categories') {
      const categoryTag = selectedCategory.toLowerCase();
      filtered = filtered.filter((recipe) =>
      recipe.tags.some((tag) => tag.toLowerCase().includes(categoryTag))
      );
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All Levels') {
      filtered = filtered.filter((recipe) => recipe.difficulty === selectedDifficulty);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter((recipe) =>
      selectedTags.every((tag) =>
      recipe.tags.some((recipeTag) =>
      recipeTag.toLowerCase().includes(tag.toLowerCase())
      )
      )
      );
    }

    setFilteredRecipes(filtered);
  };

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
    prev.includes(tag) ?
    prev.filter((t) => t !== tag) :
    [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedDifficulty('All Levels');
    setSelectedTags([]);
  };

  const featuredRecipes = recipes.
  sort((a, b) => b.rating.average - a.rating.average).
  slice(0, 3);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="fskmf0x3z" data-path="src/pages/Dashboard.tsx">
        <div className="flex items-center justify-center min-h-64" data-id="46jvaumm3" data-path="src/pages/Dashboard.tsx">
          <div className="text-center" data-id="ky5sz1m9h" data-path="src/pages/Dashboard.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" data-id="watom9y4h" data-path="src/pages/Dashboard.tsx"></div>
            <p data-id="6crsh393n" data-path="src/pages/Dashboard.tsx">Loading delicious recipes...</p>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="container mx-auto px-4 py-8" data-id="pr4upvtjt" data-path="src/pages/Dashboard.tsx">
      {/* Welcome Section */}
      <div className="mb-8" data-id="mcalnwcl0" data-path="src/pages/Dashboard.tsx">
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white" data-id="t3qzwmlc7" data-path="src/pages/Dashboard.tsx">
          <h1 className="text-3xl font-bold mb-2" data-id="rby9l1uty" data-path="src/pages/Dashboard.tsx">
            Welcome back, {user?.username}! 👋
          </h1>
          <p className="text-orange-100 mb-6" data-id="5ptnopxgp" data-path="src/pages/Dashboard.tsx">
            Discover new recipes, share your culinary creations, and connect with fellow food enthusiasts.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-6" data-id="80wjgq3v2" data-path="src/pages/Dashboard.tsx">
            <div className="bg-white/20 rounded-lg p-4 flex-1 min-w-32" data-id="opy4esfnw" data-path="src/pages/Dashboard.tsx">
              <div className="flex items-center gap-2 mb-1" data-id="phdzlmwlc" data-path="src/pages/Dashboard.tsx">
                <TrendingUp className="h-5 w-5" data-id="9k5mxl6d2" data-path="src/pages/Dashboard.tsx" />
                <span className="font-semibold" data-id="o95edn5zm" data-path="src/pages/Dashboard.tsx">My Recipes</span>
              </div>
              <p className="text-2xl font-bold" data-id="jyveh0ysn" data-path="src/pages/Dashboard.tsx">{userStats.totalRecipes}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex-1 min-w-32" data-id="m8ri8z4xk" data-path="src/pages/Dashboard.tsx">
              <div className="flex items-center gap-2 mb-1" data-id="o5pyftw8c" data-path="src/pages/Dashboard.tsx">
                <Heart className="h-5 w-5" data-id="mdtvmytcq" data-path="src/pages/Dashboard.tsx" />
                <span className="font-semibold" data-id="hbjfphzgq" data-path="src/pages/Dashboard.tsx">Total Likes</span>
              </div>
              <p className="text-2xl font-bold" data-id="xaj3xllsf" data-path="src/pages/Dashboard.tsx">{userStats.totalLikes}</p>
            </div>
            <div className="bg-white/20 rounded-lg p-4 flex-1 min-w-32" data-id="9ixznngve" data-path="src/pages/Dashboard.tsx">
              <div className="flex items-center gap-2 mb-1" data-id="cl9tcqxnn" data-path="src/pages/Dashboard.tsx">
                <Heart className="h-5 w-5 fill-current" data-id="muych9n2o" data-path="src/pages/Dashboard.tsx" />
                <span className="font-semibold" data-id="l76uv2e71" data-path="src/pages/Dashboard.tsx">Favorites</span>
              </div>
              <p className="text-2xl font-bold" data-id="2bni3u0xk" data-path="src/pages/Dashboard.tsx">{userStats.totalFavorites}</p>
            </div>
          </div>

          <Link to="/upload" data-id="kb8lhmvv8" data-path="src/pages/Dashboard.tsx">
            <Button className="bg-white text-orange-600 hover:bg-orange-50" data-id="jf8tbbo4u" data-path="src/pages/Dashboard.tsx">
              <PlusCircle className="h-4 w-4 mr-2" data-id="ca3nw5dus" data-path="src/pages/Dashboard.tsx" />
              Share Your Recipe
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Recipes */}
      {featuredRecipes.length > 0 &&
      <div className="mb-8" data-id="gwiwmlmsm" data-path="src/pages/Dashboard.tsx">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" data-id="o415j383c" data-path="src/pages/Dashboard.tsx">
            <TrendingUp className="h-6 w-6 text-orange-500" data-id="kvao8w35w" data-path="src/pages/Dashboard.tsx" />
            Featured Recipes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-id="jnkk7uoxh" data-path="src/pages/Dashboard.tsx">
            {featuredRecipes.map((recipe) =>
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onUpdate={loadRecipes} data-id="p5eckyr2x" data-path="src/pages/Dashboard.tsx" />

          )}
          </div>
        </div>
      }

      {/* Recipe Discovery Section */}
      <div className="mb-6" data-id="z29o8sj53" data-path="src/pages/Dashboard.tsx">
        <h2 className="text-2xl font-bold mb-4" data-id="xbs1vrayp" data-path="src/pages/Dashboard.tsx">Discover Recipes</h2>
        
        <RecipeFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedDifficulty={selectedDifficulty}
          onDifficultyChange={setSelectedDifficulty}
          selectedTags={selectedTags}
          onTagToggle={handleTagToggle}
          onClearFilters={clearFilters} data-id="izjq2qg6l" data-path="src/pages/Dashboard.tsx" />

      </div>

      {/* Recipes Grid */}
      <div data-id="ngdj0atzt" data-path="src/pages/Dashboard.tsx">
        <div className="flex items-center justify-between mb-4" data-id="cmuukk56e" data-path="src/pages/Dashboard.tsx">
          <h3 className="text-xl font-semibold" data-id="wwul57qe7" data-path="src/pages/Dashboard.tsx">
            {filteredRecipes.length === recipes.length ?
            `All Recipes (${recipes.length})` :
            `Filtered Results (${filteredRecipes.length} of ${recipes.length})`
            }
          </h3>
          
          {filteredRecipes.length > 0 &&
          <Badge variant="secondary" data-id="x6jfymt5l" data-path="src/pages/Dashboard.tsx">
              {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? 's' : ''} found
            </Badge>
          }
        </div>

        {filteredRecipes.length === 0 ?
        <Card className="text-center py-12" data-id="9sc7oecif" data-path="src/pages/Dashboard.tsx">
            <CardContent data-id="i61rh8qx0" data-path="src/pages/Dashboard.tsx">
              <div className="text-gray-500" data-id="7emciizrv" data-path="src/pages/Dashboard.tsx">
                <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" data-id="zb2t15lgo" data-path="src/pages/Dashboard.tsx" />
                <h3 className="text-lg font-medium mb-2" data-id="uncbejhv5" data-path="src/pages/Dashboard.tsx">No recipes found</h3>
                <p className="mb-4" data-id="jvqgy4991" data-path="src/pages/Dashboard.tsx">
                  {searchTerm || selectedCategory !== 'All Categories' || selectedDifficulty !== 'All Levels' || selectedTags.length > 0 ?
                "Try adjusting your filters to find more recipes." :
                "Be the first to share a recipe with the community!"
                }
                </p>
                <div className="flex gap-2 justify-center" data-id="gasfrathq" data-path="src/pages/Dashboard.tsx">
                  {(searchTerm || selectedCategory !== 'All Categories' || selectedDifficulty !== 'All Levels' || selectedTags.length > 0) &&
                <Button variant="outline" onClick={clearFilters} data-id="ver9ab16l" data-path="src/pages/Dashboard.tsx">
                      Clear Filters
                    </Button>
                }
                  <Link to="/upload" data-id="eujzj0yiz" data-path="src/pages/Dashboard.tsx">
                    <Button data-id="secq1hcc7" data-path="src/pages/Dashboard.tsx">
                      <PlusCircle className="h-4 w-4 mr-2" data-id="xr72m24pw" data-path="src/pages/Dashboard.tsx" />
                      Add Recipe
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-id="vu7m0rns3" data-path="src/pages/Dashboard.tsx">
            {filteredRecipes.map((recipe) =>
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onUpdate={loadRecipes} data-id="riqzkjtow" data-path="src/pages/Dashboard.tsx" />

          )}
          </div>
        }
      </div>
    </div>);

};

export default Dashboard;