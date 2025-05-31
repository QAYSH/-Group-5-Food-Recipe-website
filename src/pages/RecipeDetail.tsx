import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { Recipe, Comment } from '@/types/recipe';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';
import {
  Heart,
  Clock,
  Users,
  Star,
  MessageCircle,
  ChefHat,
  ArrowLeft,
  Edit,
  Trash2,
  Send } from
'lucide-react';

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{id: string;}>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);

  useEffect(() => {
    loadRecipe();
  }, [id]);

  const loadRecipe = async () => {
    if (!id) return;

    try {
      setIsLoading(true);
      const fetchedRecipe = await recipeService.getRecipeById(id);
      setRecipe(fetchedRecipe);
    } catch (error) {
      console.error('Error loading recipe:', error);
      toast({
        title: "Error",
        description: "Failed to load recipe",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLike = async () => {
    if (!user || !recipe) {
      toast({
        title: "Login Required",
        description: "Please log in to like recipes",
        variant: "destructive"
      });
      return;
    }

    try {
      const updatedRecipe = await recipeService.toggleLike(recipe.id, user.id);
      if (updatedRecipe) {
        setRecipe(updatedRecipe);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update like",
        variant: "destructive"
      });
    }
  };

  const handleToggleFavorite = async () => {
    if (!user || !recipe) {
      toast({
        title: "Login Required",
        description: "Please log in to save favorites",
        variant: "destructive"
      });
      return;
    }

    try {
      const updatedRecipe = await recipeService.toggleFavorite(recipe.id, user.id);
      if (updatedRecipe) {
        setRecipe(updatedRecipe);
        toast({
          title: updatedRecipe.favorites.includes(user.id) ? "Added to favorites" : "Removed from favorites",
          description: updatedRecipe.favorites.includes(user.id) ?
          "Recipe saved to your favorites" :
          "Recipe removed from your favorites"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update favorites",
        variant: "destructive"
      });
    }
  };

  const handleSubmitComment = async () => {
    if (!user || !recipe || !commentText.trim()) return;

    setIsSubmittingComment(true);
    try {
      const newComment = await recipeService.addComment(recipe.id, {
        userId: user.id,
        userName: user.username,
        userAvatar: user.profilePicture,
        content: commentText.trim()
      });

      if (newComment) {
        setRecipe((prev) => prev ? {
          ...prev,
          comments: [...prev.comments, newComment]
        } : null);
        setCommentText('');
        toast({
          title: "Comment added",
          description: "Your comment has been posted"
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleDeleteRecipe = async () => {
    if (!recipe || !user || recipe.authorId !== user.id) return;

    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await recipeService.deleteRecipe(recipe.id);
        toast({
          title: "Recipe deleted",
          description: "Your recipe has been removed"
        });
        navigate('/my-recipes');
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete recipe",
          variant: "destructive"
        });
      }
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="3ahtz5iji" data-path="src/pages/RecipeDetail.tsx">
        <div className="flex items-center justify-center min-h-64" data-id="t2ik1u7il" data-path="src/pages/RecipeDetail.tsx">
          <div className="text-center" data-id="se3bu16ch" data-path="src/pages/RecipeDetail.tsx">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4" data-id="y5sjm5993" data-path="src/pages/RecipeDetail.tsx"></div>
            <p data-id="cvaia5w7g" data-path="src/pages/RecipeDetail.tsx">Loading recipe...</p>
          </div>
        </div>
      </div>);

  }

  if (!recipe) {
    return (
      <div className="container mx-auto px-4 py-8" data-id="yvo8ilswy" data-path="src/pages/RecipeDetail.tsx">
        <div className="text-center" data-id="i7kohyugl" data-path="src/pages/RecipeDetail.tsx">
          <h1 className="text-2xl font-bold mb-4" data-id="sdp2zbknb" data-path="src/pages/RecipeDetail.tsx">Recipe Not Found</h1>
          <p className="text-gray-600 mb-4" data-id="9x0r2txhi" data-path="src/pages/RecipeDetail.tsx">The recipe you're looking for doesn't exist.</p>
          <Link to="/" data-id="tnoo50a9i" data-path="src/pages/RecipeDetail.tsx">
            <Button data-id="qrgvk97xl" data-path="src/pages/RecipeDetail.tsx">
              <ArrowLeft className="h-4 w-4 mr-2" data-id="kaxuflt38" data-path="src/pages/RecipeDetail.tsx" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>);

  }

  const isLiked = user ? recipe.likes.includes(user.id) : false;
  const isFavorited = user ? recipe.favorites.includes(user.id) : false;
  const isOwner = user?.id === recipe.authorId;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" data-id="02clvdhco" data-path="src/pages/RecipeDetail.tsx">
      {/* Header */}
      <div className="mb-6" data-id="z7rt80451" data-path="src/pages/RecipeDetail.tsx">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4" data-id="22y2cboli" data-path="src/pages/RecipeDetail.tsx">
          <ArrowLeft className="h-4 w-4 mr-2" data-id="wktyrzcwu" data-path="src/pages/RecipeDetail.tsx" />
          Back
        </Button>
      </div>

      {/* Recipe Image */}
      <div className="aspect-video rounded-xl overflow-hidden mb-8" data-id="okpaun60z" data-path="src/pages/RecipeDetail.tsx">
        <img
          src={recipe.image || 'https://images.unsplash.com/photo-1546548970-71785318a17b?w=800&h=450&fit=crop'}
          alt={recipe.title}
          className="w-full h-full object-cover" data-id="wkki44v5i" data-path="src/pages/RecipeDetail.tsx" />

      </div>

      {/* Recipe Header */}
      <div className="mb-8" data-id="8d988t5lc" data-path="src/pages/RecipeDetail.tsx">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4" data-id="4zd76nmn7" data-path="src/pages/RecipeDetail.tsx">
          <div className="flex-1" data-id="slbm5lm77" data-path="src/pages/RecipeDetail.tsx">
            <h1 className="text-3xl font-bold mb-2" data-id="sws969rpo" data-path="src/pages/RecipeDetail.tsx">{recipe.title}</h1>
            <p className="text-gray-600 text-lg" data-id="e8jzalfua" data-path="src/pages/RecipeDetail.tsx">{recipe.description}</p>
          </div>
          
          {isOwner &&
          <div className="flex gap-2" data-id="law6fur6j" data-path="src/pages/RecipeDetail.tsx">
              <Button variant="outline" size="sm" data-id="osaz5q1xf" data-path="src/pages/RecipeDetail.tsx">
                <Edit className="h-4 w-4 mr-2" data-id="mwh8o2szs" data-path="src/pages/RecipeDetail.tsx" />
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteRecipe} data-id="cfkwascng" data-path="src/pages/RecipeDetail.tsx">
                <Trash2 className="h-4 w-4 mr-2" data-id="l3aerewcm" data-path="src/pages/RecipeDetail.tsx" />
                Delete
              </Button>
            </div>
          }
        </div>

        {/* Author Info */}
        <div className="flex items-center justify-between" data-id="rpjmqw6f2" data-path="src/pages/RecipeDetail.tsx">
          <div className="flex items-center gap-3" data-id="ync3e9w0w" data-path="src/pages/RecipeDetail.tsx">
            <Avatar className="h-10 w-10" data-id="sw6anglpa" data-path="src/pages/RecipeDetail.tsx">
              <AvatarImage src={recipe.authorAvatar} alt={recipe.authorName} data-id="m4tigpk4d" data-path="src/pages/RecipeDetail.tsx" />
              <AvatarFallback data-id="dkfy0b9er" data-path="src/pages/RecipeDetail.tsx">{recipe.authorName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div data-id="ljx6nya9t" data-path="src/pages/RecipeDetail.tsx">
              <p className="font-medium" data-id="a72gzcr0f" data-path="src/pages/RecipeDetail.tsx">{recipe.authorName}</p>
              <p className="text-sm text-gray-500" data-id="8w9nr287a" data-path="src/pages/RecipeDetail.tsx">
                {new Date(recipe.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2" data-id="9f1a7wnlg" data-path="src/pages/RecipeDetail.tsx">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleLike}
              className={isLiked ? 'text-red-500 hover:text-red-600' : 'text-gray-500 hover:text-red-500'} data-id="z4d8v6dwo" data-path="src/pages/RecipeDetail.tsx">

              <Heart className={`h-5 w-5 mr-1 ${isLiked ? 'fill-current' : ''}`} data-id="0pnxv3jtu" data-path="src/pages/RecipeDetail.tsx" />
              {recipe.likes.length}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleToggleFavorite}
              className={isFavorited ? 'text-orange-500 hover:text-orange-600' : 'text-gray-500 hover:text-orange-500'} data-id="e3642azeh" data-path="src/pages/RecipeDetail.tsx">

              <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} data-id="44ke26yhx" data-path="src/pages/RecipeDetail.tsx" />
            </Button>
          </div>
        </div>
      </div>

      {/* Recipe Meta */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" data-id="xq1piwxys" data-path="src/pages/RecipeDetail.tsx">
        <Card data-id="hx8622as8" data-path="src/pages/RecipeDetail.tsx">
          <CardContent className="p-4 text-center" data-id="vms3obpbc" data-path="src/pages/RecipeDetail.tsx">
            <Clock className="h-6 w-6 mx-auto mb-2 text-orange-500" data-id="o11falt4r" data-path="src/pages/RecipeDetail.tsx" />
            <p className="font-semibold" data-id="taluo3xf0" data-path="src/pages/RecipeDetail.tsx">{recipe.cookingTime} min</p>
            <p className="text-sm text-gray-500" data-id="in3jynjhq" data-path="src/pages/RecipeDetail.tsx">Prep time</p>
          </CardContent>
        </Card>
        
        <Card data-id="apq08o6hk" data-path="src/pages/RecipeDetail.tsx">
          <CardContent className="p-4 text-center" data-id="pm7rq7ewk" data-path="src/pages/RecipeDetail.tsx">
            <Users className="h-6 w-6 mx-auto mb-2 text-blue-500" data-id="7dtix22yu" data-path="src/pages/RecipeDetail.tsx" />
            <p className="font-semibold" data-id="ggdavkchq" data-path="src/pages/RecipeDetail.tsx">{recipe.servings}</p>
            <p className="text-sm text-gray-500" data-id="1rujsfa3y" data-path="src/pages/RecipeDetail.tsx">Servings</p>
          </CardContent>
        </Card>
        
        <Card data-id="g3x23asy5" data-path="src/pages/RecipeDetail.tsx">
          <CardContent className="p-4 text-center" data-id="ggh28t3k1" data-path="src/pages/RecipeDetail.tsx">
            <ChefHat className="h-6 w-6 mx-auto mb-2 text-green-500" data-id="nbtfwuj9w" data-path="src/pages/RecipeDetail.tsx" />
            <p className="font-semibold" data-id="4mxs07qpy" data-path="src/pages/RecipeDetail.tsx">{recipe.difficulty}</p>
            <p className="text-sm text-gray-500" data-id="wvop41siz" data-path="src/pages/RecipeDetail.tsx">Difficulty</p>
          </CardContent>
        </Card>
        
        <Card data-id="nvhumiahu" data-path="src/pages/RecipeDetail.tsx">
          <CardContent className="p-4 text-center" data-id="rnjpx9nwz" data-path="src/pages/RecipeDetail.tsx">
            <Star className="h-6 w-6 mx-auto mb-2 text-yellow-500 fill-current" data-id="z3gnr7hn4" data-path="src/pages/RecipeDetail.tsx" />
            <p className="font-semibold" data-id="vatka8kf4" data-path="src/pages/RecipeDetail.tsx">{recipe.rating.average.toFixed(1)}</p>
            <p className="text-sm text-gray-500" data-id="w0mm6l8rv" data-path="src/pages/RecipeDetail.tsx">{recipe.rating.count} ratings</p>
          </CardContent>
        </Card>
      </div>

      {/* Tags */}
      {recipe.tags.length > 0 &&
      <div className="mb-8" data-id="37hj1m4p1" data-path="src/pages/RecipeDetail.tsx">
          <div className="flex flex-wrap gap-2" data-id="u2chq0v1w" data-path="src/pages/RecipeDetail.tsx">
            {recipe.tags.map((tag) =>
          <Badge key={tag} variant="secondary" data-id="v5t9eqrco" data-path="src/pages/RecipeDetail.tsx">
                {tag}
              </Badge>
          )}
          </div>
        </div>
      }

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8" data-id="8cohybgq2" data-path="src/pages/RecipeDetail.tsx">
        {/* Ingredients */}
        <div className="lg:col-span-1" data-id="pyjbwv8d0" data-path="src/pages/RecipeDetail.tsx">
          <Card data-id="n7bgfsr0l" data-path="src/pages/RecipeDetail.tsx">
            <CardHeader data-id="a4nlakxac" data-path="src/pages/RecipeDetail.tsx">
              <CardTitle data-id="eexy9gonf" data-path="src/pages/RecipeDetail.tsx">Ingredients</CardTitle>
            </CardHeader>
            <CardContent data-id="otdcsfps8" data-path="src/pages/RecipeDetail.tsx">
              <ul className="space-y-2" data-id="v3fhpna93" data-path="src/pages/RecipeDetail.tsx">
                {recipe.ingredients.map((ingredient, index) =>
                <li key={index} className="flex items-start gap-2" data-id="4itvo8ynf" data-path="src/pages/RecipeDetail.tsx">
                    <span className="text-orange-500 mt-1" data-id="lb4wmm9fl" data-path="src/pages/RecipeDetail.tsx">•</span>
                    <span data-id="9ud9zah4u" data-path="src/pages/RecipeDetail.tsx">{ingredient}</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>

          {/* Nutrition (if available) */}
          {recipe.nutrition &&
          <Card className="mt-6" data-id="107bhhxeq" data-path="src/pages/RecipeDetail.tsx">
              <CardHeader data-id="ub5w3nm86" data-path="src/pages/RecipeDetail.tsx">
                <CardTitle data-id="iiv9g17ss" data-path="src/pages/RecipeDetail.tsx">Nutrition (per serving)</CardTitle>
              </CardHeader>
              <CardContent data-id="7akm39yry" data-path="src/pages/RecipeDetail.tsx">
                <div className="grid grid-cols-2 gap-4 text-sm" data-id="7ed1niqw3" data-path="src/pages/RecipeDetail.tsx">
                  <div data-id="hkk3boyc3" data-path="src/pages/RecipeDetail.tsx">
                    <p className="font-medium" data-id="qre3eq3ue" data-path="src/pages/RecipeDetail.tsx">Calories</p>
                    <p className="text-gray-600" data-id="72wgduyzu" data-path="src/pages/RecipeDetail.tsx">{recipe.nutrition.calories}</p>
                  </div>
                  <div data-id="hz3xvztwd" data-path="src/pages/RecipeDetail.tsx">
                    <p className="font-medium" data-id="wmrcb3zg9" data-path="src/pages/RecipeDetail.tsx">Protein</p>
                    <p className="text-gray-600" data-id="s6urbdulw" data-path="src/pages/RecipeDetail.tsx">{recipe.nutrition.protein}g</p>
                  </div>
                  <div data-id="gp1un3ntv" data-path="src/pages/RecipeDetail.tsx">
                    <p className="font-medium" data-id="sthr80bre" data-path="src/pages/RecipeDetail.tsx">Carbs</p>
                    <p className="text-gray-600" data-id="wpbtzzdp1" data-path="src/pages/RecipeDetail.tsx">{recipe.nutrition.carbs}g</p>
                  </div>
                  <div data-id="vqkla8nce" data-path="src/pages/RecipeDetail.tsx">
                    <p className="font-medium" data-id="j0itwbiev" data-path="src/pages/RecipeDetail.tsx">Fat</p>
                    <p className="text-gray-600" data-id="tnbd2e4l4" data-path="src/pages/RecipeDetail.tsx">{recipe.nutrition.fat}g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          }
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2" data-id="sxt5k89dj" data-path="src/pages/RecipeDetail.tsx">
          <Card data-id="qim0pl3x3" data-path="src/pages/RecipeDetail.tsx">
            <CardHeader data-id="es2proa00" data-path="src/pages/RecipeDetail.tsx">
              <CardTitle data-id="3fxzbzwiw" data-path="src/pages/RecipeDetail.tsx">Instructions</CardTitle>
            </CardHeader>
            <CardContent data-id="c8p7tbhq5" data-path="src/pages/RecipeDetail.tsx">
              <ol className="space-y-4" data-id="7o34nqlo3" data-path="src/pages/RecipeDetail.tsx">
                {recipe.instructions.map((instruction, index) =>
                <li key={index} className="flex gap-4" data-id="4mtvjffl9" data-path="src/pages/RecipeDetail.tsx">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600" data-id="joxt1xb34" data-path="src/pages/RecipeDetail.tsx">
                      {index + 1}
                    </div>
                    <p className="pt-1" data-id="nls95vpdv" data-path="src/pages/RecipeDetail.tsx">{instruction}</p>
                  </li>
                )}
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12" id="comments" data-id="niqr0nlau" data-path="src/pages/RecipeDetail.tsx">
        <Card data-id="jhpcepfeg" data-path="src/pages/RecipeDetail.tsx">
          <CardHeader data-id="ocsj4sphs" data-path="src/pages/RecipeDetail.tsx">
            <CardTitle className="flex items-center gap-2" data-id="jyq3pp98y" data-path="src/pages/RecipeDetail.tsx">
              <MessageCircle className="h-5 w-5" data-id="hgur34ey5" data-path="src/pages/RecipeDetail.tsx" />
              Comments ({recipe.comments.length})
            </CardTitle>
          </CardHeader>
          <CardContent data-id="o8xe20ok1" data-path="src/pages/RecipeDetail.tsx">
            {/* Add Comment */}
            {user ?
            <div className="mb-6" data-id="7gevxd7ij" data-path="src/pages/RecipeDetail.tsx">
                <div className="flex gap-3" data-id="tjr36c8qg" data-path="src/pages/RecipeDetail.tsx">
                  <Avatar className="h-8 w-8" data-id="rhjivcafx" data-path="src/pages/RecipeDetail.tsx">
                    <AvatarImage src={user.profilePicture} alt={user.username} data-id="u5bq7ga1o" data-path="src/pages/RecipeDetail.tsx" />
                    <AvatarFallback data-id="hidnixd47" data-path="src/pages/RecipeDetail.tsx">{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1" data-id="vwqg700c9" data-path="src/pages/RecipeDetail.tsx">
                    <Textarea
                    placeholder="Share your thoughts about this recipe..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    rows={3} data-id="qua2v4bh2" data-path="src/pages/RecipeDetail.tsx" />

                    <Button
                    onClick={handleSubmitComment}
                    disabled={!commentText.trim() || isSubmittingComment}
                    className="mt-2"
                    size="sm" data-id="cq6gc77q6" data-path="src/pages/RecipeDetail.tsx">

                      <Send className="h-4 w-4 mr-2" data-id="4mq8grp83" data-path="src/pages/RecipeDetail.tsx" />
                      {isSubmittingComment ? 'Posting...' : 'Post Comment'}
                    </Button>
                  </div>
                </div>
              </div> :

            <div className="mb-6 text-center py-6 bg-gray-50 rounded-lg" data-id="771z4i5jy" data-path="src/pages/RecipeDetail.tsx">
                <p className="text-gray-600 mb-3" data-id="vt65486bn" data-path="src/pages/RecipeDetail.tsx">Please log in to leave a comment</p>
                <Link to="/login" data-id="ln8sp7zs8" data-path="src/pages/RecipeDetail.tsx">
                  <Button size="sm" data-id="0ji8t2dsf" data-path="src/pages/RecipeDetail.tsx">Log In</Button>
                </Link>
              </div>
            }

            {/* Comments List */}
            <div className="space-y-4" data-id="akryyeps0" data-path="src/pages/RecipeDetail.tsx">
              {recipe.comments.map((comment) =>
              <div key={comment.id} data-id="6d192drfk" data-path="src/pages/RecipeDetail.tsx">
                  <div className="flex gap-3" data-id="uh8571o3l" data-path="src/pages/RecipeDetail.tsx">
                    <Avatar className="h-8 w-8" data-id="xs5vpdno3" data-path="src/pages/RecipeDetail.tsx">
                      <AvatarImage src={comment.userAvatar} alt={comment.userName} data-id="x7rb102zf" data-path="src/pages/RecipeDetail.tsx" />
                      <AvatarFallback data-id="hyc8917pj" data-path="src/pages/RecipeDetail.tsx">{comment.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1" data-id="ddpzb0ug3" data-path="src/pages/RecipeDetail.tsx">
                      <div className="flex items-center gap-2 mb-1" data-id="e4qca4r7m" data-path="src/pages/RecipeDetail.tsx">
                        <p className="font-medium" data-id="d2itnobfq" data-path="src/pages/RecipeDetail.tsx">{comment.userName}</p>
                        <p className="text-sm text-gray-500" data-id="lwuglty9k" data-path="src/pages/RecipeDetail.tsx">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-gray-700" data-id="5abvzkrqz" data-path="src/pages/RecipeDetail.tsx">{comment.content}</p>
                    </div>
                  </div>
                  <Separator className="mt-4" data-id="d7h7lik4r" data-path="src/pages/RecipeDetail.tsx" />
                </div>
              )}
              
              {recipe.comments.length === 0 &&
              <p className="text-gray-500 text-center py-8" data-id="wfw0glbx0" data-path="src/pages/RecipeDetail.tsx">
                  No comments yet. Be the first to share your thoughts!
                </p>
              }
            </div>
          </CardContent>
        </Card>
      </div>
    </div>);

};

export default RecipeDetail;