import React from 'react';
import { Link } from 'react-router-dom';
import { Recipe } from '@/types/recipe';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, Clock, Users, Star, MessageCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { toast } from '@/hooks/use-toast';

interface RecipeCardProps {
  recipe: Recipe;
  onUpdate?: () => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onUpdate }) => {
  const { user } = useAuth();

  const handleToggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save recipes to favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      await recipeService.toggleFavorite(recipe.id, user.id);
      toast({
        title: recipe.favorites.includes(user.id) ? "Removed from favorites" : "Added to favorites",
        description: recipe.favorites.includes(user.id) ?
        "Recipe removed from your favorites" :
        "Recipe saved to your favorites"
      });
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to like recipes",
        variant: "destructive"
      });
      return;
    }

    try {
      await recipeService.toggleLike(recipe.id, user.id);
      onUpdate?.();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  const isLiked = user ? recipe.likes.includes(user.id) : false;
  const isFavorited = user ? recipe.favorites.includes(user.id) : false;

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1" data-id="1ql09wx1v" data-path="src/components/Recipe/RecipeCard.tsx">
      <Link to={`/recipe/${recipe.id}`} data-id="oiwklcdg4" data-path="src/components/Recipe/RecipeCard.tsx">
        <div className="aspect-video overflow-hidden" data-id="z4t2odfjw" data-path="src/components/Recipe/RecipeCard.tsx">
          <img
            src={recipe.image || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=500&h=300&fit=crop'}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" data-id="472o35dzt" data-path="src/components/Recipe/RecipeCard.tsx" />

        </div>
      </Link>
      
      <CardContent className="p-4" data-id="qlinatwrp" data-path="src/components/Recipe/RecipeCard.tsx">
        <Link to={`/recipe/${recipe.id}`} data-id="n9oovg3y9" data-path="src/components/Recipe/RecipeCard.tsx">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1 hover:text-orange-600 transition-colors" data-id="sk9let7rd" data-path="src/components/Recipe/RecipeCard.tsx">
            {recipe.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2" data-id="azkw989w1" data-path="src/components/Recipe/RecipeCard.tsx">
          {recipe.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3" data-id="bx33rs02p" data-path="src/components/Recipe/RecipeCard.tsx">
          {recipe.tags.slice(0, 3).map((tag) =>
          <Badge key={tag} variant="secondary" className="text-xs" data-id="hkf1winak" data-path="src/components/Recipe/RecipeCard.tsx">
              {tag}
            </Badge>
          )}
          {recipe.tags.length > 3 &&
          <Badge variant="outline" className="text-xs" data-id="y8v735nta" data-path="src/components/Recipe/RecipeCard.tsx">
              +{recipe.tags.length - 3}
            </Badge>
          }
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-3" data-id="eci9diumj" data-path="src/components/Recipe/RecipeCard.tsx">
          <div className="flex items-center gap-4" data-id="c4hnl00u7" data-path="src/components/Recipe/RecipeCard.tsx">
            <div className="flex items-center gap-1" data-id="iib6pej25" data-path="src/components/Recipe/RecipeCard.tsx">
              <Clock className="h-4 w-4" data-id="fnvs6tlxm" data-path="src/components/Recipe/RecipeCard.tsx" />
              <span data-id="tftu8a957" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.cookingTime}m</span>
            </div>
            <div className="flex items-center gap-1" data-id="uh6hgjfv3" data-path="src/components/Recipe/RecipeCard.tsx">
              <Users className="h-4 w-4" data-id="yphmew4pe" data-path="src/components/Recipe/RecipeCard.tsx" />
              <span data-id="0nmkki8rl" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.servings}</span>
            </div>
            <div className="flex items-center gap-1" data-id="zsosq18k1" data-path="src/components/Recipe/RecipeCard.tsx">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" data-id="od1ngybn2" data-path="src/components/Recipe/RecipeCard.tsx" />
              <span data-id="5yflqlcox" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.rating.average.toFixed(1)}</span>
            </div>
          </div>
          <Badge
            variant={recipe.difficulty === 'Easy' ? 'default' : recipe.difficulty === 'Medium' ? 'secondary' : 'destructive'}
            className="text-xs" data-id="valtgn6x2" data-path="src/components/Recipe/RecipeCard.tsx">

            {recipe.difficulty}
          </Badge>
        </div>

        <div className="flex items-center gap-2" data-id="rnfqp300v" data-path="src/components/Recipe/RecipeCard.tsx">
          <Avatar className="h-6 w-6" data-id="9c956ij10" data-path="src/components/Recipe/RecipeCard.tsx">
            <AvatarImage src={recipe.authorAvatar} alt={recipe.authorName} data-id="xt0y1yqik" data-path="src/components/Recipe/RecipeCard.tsx" />
            <AvatarFallback className="text-xs" data-id="j9a8u8gth" data-path="src/components/Recipe/RecipeCard.tsx">
              {recipe.authorName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-gray-600" data-id="4thfuw48h" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.authorName}</span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex justify-between items-center" data-id="f4uwl3e7y" data-path="src/components/Recipe/RecipeCard.tsx">
        <div className="flex items-center gap-2" data-id="9p5aklscl" data-path="src/components/Recipe/RecipeCard.tsx">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleToggleLike}
            className={`h-8 px-2 ${isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'}`} data-id="fe72kaqqu" data-path="src/components/Recipe/RecipeCard.tsx">

            <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} data-id="wsi04ct70" data-path="src/components/Recipe/RecipeCard.tsx" />
            <span className="text-xs" data-id="5h6srhnkh" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.likes.length}</span>
          </Button>

          <Link to={`/recipe/${recipe.id}#comments`} data-id="6brdp9736" data-path="src/components/Recipe/RecipeCard.tsx">
            <Button variant="ghost" size="sm" className="h-8 px-2 text-gray-500 hover:text-blue-500" data-id="ntlfara5o" data-path="src/components/Recipe/RecipeCard.tsx">
              <MessageCircle className="h-4 w-4 mr-1" data-id="tbewzv3j1" data-path="src/components/Recipe/RecipeCard.tsx" />
              <span className="text-xs" data-id="bzgkb8clq" data-path="src/components/Recipe/RecipeCard.tsx">{recipe.comments.length}</span>
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleToggleFavorite}
          className={`h-8 px-2 ${isFavorited ? 'text-orange-500 hover:text-orange-600' : 'text-gray-500 hover:text-orange-500'}`} data-id="4fjtqnzwc" data-path="src/components/Recipe/RecipeCard.tsx">

          <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} data-id="lkd374wo3" data-path="src/components/Recipe/RecipeCard.tsx" />
        </Button>
      </CardFooter>
    </Card>);

};

export default RecipeCard;