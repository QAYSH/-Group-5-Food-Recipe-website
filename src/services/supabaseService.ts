import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Recipe, Comment } from '@/types/recipe';

const supabaseUrl = 'https://ncpqyxmyusyscfgqchyr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5jcHF5eG15dXN5c2NmZ3FjaHlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1Njc2MTAsImV4cCI6MjA2NDE0MzYxMH0.ld0ApKdTJl_M64hGxrAuPk03Jv4yosFSdxFrOvFxWMg';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

class SupabaseService {
  async getAllRecipes(): Promise<Recipe[]> {
    const { data, error } = await supabase.from('recipes').select('*');
    if (error) throw error;
    return data || [];
  }

  async getRecipeById(id: string): Promise<Recipe | null> {
    const { data, error } = await supabase.from('recipes').select('*').eq('id', id).single();
    if (error) throw error;
    return data || null;
  }

  async getRecipesByUser(userId: string): Promise<Recipe[]> {
    const { data, error } = await supabase.from('recipes').select('*').eq('authorId', userId);
    if (error) throw error;
    return data || [];
  }

  async createRecipe(recipeData: Omit<Recipe, 'id' | 'createdAt' | 'likes' | 'favorites' | 'rating' | 'comments'>): Promise<Recipe> {
    const cleanRecipeData = {
      ...recipeData,
      createdAt: new Date().toISOString(),
      likes: [],
      favorites: [],
      rating: { average: 0, count: 0 },
      comments: []
    };
    const { data, error } = await supabase.from('recipes').insert([cleanRecipeData]).single();
    if (error) throw error;
    return data!;
  }

  async updateRecipe(id: string, updates: Partial<Recipe>): Promise<Recipe | null> {
    const cleanUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, v]) => v !== undefined)
    );
    const { data, error } = await supabase.from('recipes').update(cleanUpdates).eq('id', id).single();
    if (error) throw error;
    return data || null;
  }

  async deleteRecipe(id: string): Promise<boolean> {
    const { error } = await supabase.from('recipes').delete().eq('id', id);
    if (error) throw error;
    return true;
  }

  async toggleLike(recipeId: string, userId: string): Promise<Recipe | null> {
    const recipe = await this.getRecipeById(recipeId);
    if (!recipe) return null;

    const hasLiked = recipe.likes.includes(userId);
    let updatedLikes: string[];
    if (hasLiked) {
      updatedLikes = recipe.likes.filter(id => id !== userId);
    } else {
      updatedLikes = [...recipe.likes, userId];
    }

    return this.updateRecipe(recipeId, { likes: updatedLikes });
  }

  async toggleFavorite(recipeId: string, userId: string): Promise<Recipe | null> {
    const recipe = await this.getRecipeById(recipeId);
    if (!recipe) return null;

    const hasFavorited = recipe.favorites.includes(userId);
    let updatedFavorites: string[];
    if (hasFavorited) {
      updatedFavorites = recipe.favorites.filter(id => id !== userId);
    } else {
      updatedFavorites = [...recipe.favorites, userId];
    }

    return this.updateRecipe(recipeId, { favorites: updatedFavorites });
  }

  async getFavoriteRecipes(userId: string): Promise<Recipe[]> {
    const { data, error } = await supabase.from('recipes').select('*').contains('favorites', [userId]);
    if (error) throw error;
    return data || [];
  }

  async addComment(recipeId: string, comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment | null> {
    const recipe = await this.getRecipeById(recipeId);
    if (!recipe) return null;

    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    const updatedComments = [...recipe.comments, newComment];
    await this.updateRecipe(recipeId, { comments: updatedComments });
    return newComment;
  }

  async rateRecipe(recipeId: string, rating: number): Promise<Recipe | null> {
    const recipe = await this.getRecipeById(recipeId);
    if (!recipe) return null;

    const currentTotal = recipe.rating.average * recipe.rating.count;
    const newCount = recipe.rating.count + 1;
    const newAverage = (currentTotal + rating) / newCount;

    return this.updateRecipe(recipeId, { rating: { average: newAverage, count: newCount } });
  }
}

export const supabaseService = new SupabaseService();
