export interface Recipe {
  id: string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image?: string;
  tags: string[];
  cookingTime: number; // in minutes
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  createdAt: string;
  likes: string[]; // array of user IDs who liked
  favorites: string[]; // array of user IDs who favorited
  rating: {
    average: number;
    count: number;
  };
  comments: Comment[];
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

export interface RecipeFilters {
  category?: string;
  difficulty?: string;
  maxCookingTime?: number;
  tags?: string[];
  search?: string;
}