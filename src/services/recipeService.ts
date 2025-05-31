import { Recipe, Comment } from '@/types/recipe';

// Sample recipes data
const sampleRecipes: Recipe[] = [
{
  id: '1',
  title: 'Student Budget Pasta',
  description: 'Quick and affordable pasta dish perfect for busy students',
  ingredients: ['200g pasta', '1 can tomatoes', '2 cloves garlic', '1 onion', 'Olive oil', 'Salt and pepper', 'Parmesan cheese'],
  instructions: [
  'Boil water and cook pasta according to package instructions',
  'Heat olive oil in a pan and sauté diced onion and garlic',
  'Add canned tomatoes and simmer for 10 minutes',
  'Season with salt and pepper',
  'Mix with cooked pasta and serve with Parmesan'],

  image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=500&h=300&fit=crop',
  tags: ['budget', 'quick', 'italian'],
  cookingTime: 20,
  servings: 2,
  difficulty: 'Easy',
  nutrition: { calories: 450, protein: 15, carbs: 75, fat: 12 },
  authorId: 'sample1',
  authorName: 'Chef Maria',
  authorAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=100&h=100&fit=crop&crop=face',
  createdAt: new Date(Date.now() - 86400000).toISOString(),
  likes: [],
  favorites: [],
  rating: { average: 4.5, count: 12 },
  comments: []
},
{
  id: '2',
  title: 'Protein Power Bowl',
  description: 'Nutritious bowl packed with protein and fresh vegetables',
  ingredients: ['1 cup quinoa', '200g chicken breast', '1 avocado', 'Mixed greens', '1 cucumber', '1 bell pepper', 'Greek yogurt', 'Lemon', 'Olive oil'],
  instructions: [
  'Cook quinoa according to package instructions',
  'Season and grill chicken breast until cooked through',
  'Slice avocado, cucumber, and bell pepper',
  'Arrange quinoa in bowl, add grilled chicken and vegetables',
  'Top with Greek yogurt and lemon dressing'],

  image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&h=300&fit=crop',
  tags: ['healthy', 'protein', 'gluten-free'],
  cookingTime: 25,
  servings: 1,
  difficulty: 'Medium',
  nutrition: { calories: 520, protein: 35, carbs: 45, fat: 18 },
  authorId: 'sample2',
  authorName: 'Fitness Mike',
  authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
  createdAt: new Date(Date.now() - 172800000).toISOString(),
  likes: [],
  favorites: [],
  rating: { average: 4.8, count: 8 },
  comments: []
},
{
  id: '3',
  title: 'Veggie Stir Fry',
  description: 'Colorful and nutritious vegetarian stir fry',
  ingredients: ['2 cups mixed vegetables', '1 bell pepper', '1 zucchini', '1 carrot', 'Soy sauce', 'Ginger', 'Garlic', 'Sesame oil', 'Rice'],
  instructions: [
  'Cook rice according to package instructions',
  'Heat sesame oil in a wok or large pan',
  'Add minced ginger and garlic, stir for 30 seconds',
  'Add hard vegetables first, then softer ones',
  'Stir fry for 5-7 minutes until crisp-tender',
  'Add soy sauce and serve over rice'],

  image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&h=300&fit=crop',
  tags: ['vegetarian', 'healthy', 'quick'],
  cookingTime: 15,
  servings: 2,
  difficulty: 'Easy',
  nutrition: { calories: 280, protein: 8, carbs: 55, fat: 6 },
  authorId: 'sample3',
  authorName: 'Veggie Sarah',
  authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
  createdAt: new Date(Date.now() - 259200000).toISOString(),
  likes: [],
  favorites: [],
  rating: { average: 4.3, count: 15 },
  comments: []
}];


class RecipeService {
  private getRecipes(): Recipe[] {
    const stored = localStorage.getItem('recipes');
    return stored ? JSON.parse(stored) : sampleRecipes;
  }

  private saveRecipes(recipes: Recipe[]): void {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }

  async getAllRecipes(): Promise<Recipe[]> {
    return this.getRecipes();
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const recipes = this.getRecipes();
    return recipes.find((recipe) => recipe.id === id) || null;
  }

  async getRecipesByUser(userId: string): Promise<Recipe[]> {
    const recipes = this.getRecipes();
    return recipes.filter((recipe) => recipe.authorId === userId);
  }

  async createRecipe(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'likes' | 'favorites' | 'rating' | 'comments'>): Promise<Recipe> {
    const recipes = this.getRecipes();
    const newRecipe: Recipe = {
      ...recipeData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      likes: [],
      favorites: [],
      rating: { average: 0, count: 0 },
      comments: []
    };

    recipes.push(newRecipe);
    this.saveRecipes(recipes);
    return newRecipe;
  }

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const recipes = this.getRecipes();
    const index = recipes.findIndex((recipe) => recipe.id === id);

    if (index === -1) return null;

    recipes[index] = { ...recipes[index], ...updates };
    this.saveRecipes(recipes);
    return recipes[index];
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const recipes = this.getRecipes();
    const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);

    if (filteredRecipes.length === recipes.length) return false;

    this.saveRecipes(filteredRecipes);
    return true;
  }

  async toggleLike(recipeId: string, userId: string): Promise<Recipe | null> {
    const recipes = this.getRecipes();
    const recipe = recipes.find((r) => r.id === recipeId);

    if (!recipe) return null;

    const hasLiked = recipe.likes.includes(userId);
    if (hasLiked) {
      recipe.likes = recipe.likes.filter((id) => id !== userId);
    } else {
      recipe.likes.push(userId);
    }

    this.saveRecipes(recipes);
    return recipe;
  }

  async toggleFavorite(recipeId: string, userId: string): Promise<Recipe | null> {
    const recipes = this.getRecipes();
    const recipe = recipes.find((r) => r.id === recipeId);

    if (!recipe) return null;

    const hasFavorited = recipe.favorites.includes(userId);
    if (hasFavorited) {
      recipe.favorites = recipe.favorites.filter((id) => id !== userId);
    } else {
      recipe.favorites.push(userId);
    }

    this.saveRecipes(recipes);
    return recipe;
  }

  async getFavoriteRecipes(userId: string): Promise<Recipe[]> {
    const recipes = this.getRecipes();
    return recipes.filter((recipe) => recipe.favorites.includes(userId));
  }

  async addComment(recipeId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment | null> {
    const recipes = this.getRecipes();
    const recipe = recipes.find((r) => r.id === recipeId);

    if (!recipe) return null;

    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    recipe.comments.push(newComment);
    this.saveRecipes(recipes);
    return newComment;
  }

  async rateRecipe(recipeId: string, rating: number): Promise<Recipe | null> {
    const recipes = this.getRecipes();
    const recipe = recipes.find((r) => r.id === recipeId);

    if (!recipe) return null;

    // Simple rating calculation (in real app, you'd track individual ratings)
    const currentTotal = recipe.rating.average * recipe.rating.count;
    recipe.rating.count += 1;
    recipe.rating.average = (currentTotal + rating) / recipe.rating.count;

    this.saveRecipes(recipes);
    return recipe;
  }
}

export const recipeService = new RecipeService();