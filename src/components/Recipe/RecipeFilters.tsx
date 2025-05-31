import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from
'@/components/ui/select';
import { Search, X } from 'lucide-react';

interface RecipeFiltersProps {
  searchTerm: string;
  onSearchChange: (search: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedDifficulty: string;
  onDifficultyChange: (difficulty: string) => void;
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearFilters: () => void;
}

const RecipeFilters: React.FC<RecipeFiltersProps> = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedDifficulty,
  onDifficultyChange,
  selectedTags,
  onTagToggle,
  onClearFilters
}) => {
  const categories = [
  'All Categories',
  'Breakfast',
  'Lunch',
  'Dinner',
  'Snacks',
  'Desserts',
  'Beverages'];


  const difficulties = [
  'All Levels',
  'Easy',
  'Medium',
  'Hard'];


  const popularTags = [
  'budget',
  'quick',
  'healthy',
  'vegetarian',
  'vegan',
  'gluten-free',
  'protein',
  'low-carb',
  'comfort-food',
  'spicy',
  'international',
  'indian',
  'italian',
  'mexican',
  'asian'];


  const hasActiveFilters = searchTerm ||
  selectedCategory !== 'All Categories' ||
  selectedDifficulty !== 'All Levels' ||
  selectedTags.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6" data-id="bvg168zs6" data-path="src/components/Recipe/RecipeFilters.tsx">
      <div className="space-y-4" data-id="yqexevow5" data-path="src/components/Recipe/RecipeFilters.tsx">
        {/* Search */}
        <div className="relative" data-id="rsqohq3v6" data-path="src/components/Recipe/RecipeFilters.tsx">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" data-id="sotbhrr33" data-path="src/components/Recipe/RecipeFilters.tsx" />
          <Input
            placeholder="Search recipes, ingredients, or authors..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11" data-id="8rvd5tf0u" data-path="src/components/Recipe/RecipeFilters.tsx" />

        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap gap-4" data-id="lkqxvmvfz" data-path="src/components/Recipe/RecipeFilters.tsx">
          <div className="flex-1 min-w-48" data-id="484viwpkq" data-path="src/components/Recipe/RecipeFilters.tsx">
            <Select value={selectedCategory} onValueChange={onCategoryChange} data-id="hm4rxayp6" data-path="src/components/Recipe/RecipeFilters.tsx">
              <SelectTrigger data-id="z6hlkz19y" data-path="src/components/Recipe/RecipeFilters.tsx">
                <SelectValue placeholder="Category" data-id="pkl3vx9v0" data-path="src/components/Recipe/RecipeFilters.tsx" />
              </SelectTrigger>
              <SelectContent data-id="3ehk41msa" data-path="src/components/Recipe/RecipeFilters.tsx">
                {categories.map((category) =>
                <SelectItem key={category} value={category} data-id="4e7e6xzx1" data-path="src/components/Recipe/RecipeFilters.tsx">
                    {category}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 min-w-36" data-id="xc54v5xlu" data-path="src/components/Recipe/RecipeFilters.tsx">
            <Select value={selectedDifficulty} onValueChange={onDifficultyChange} data-id="3b5or80pl" data-path="src/components/Recipe/RecipeFilters.tsx">
              <SelectTrigger data-id="fklyz4l9y" data-path="src/components/Recipe/RecipeFilters.tsx">
                <SelectValue placeholder="Difficulty" data-id="6nfmuspvz" data-path="src/components/Recipe/RecipeFilters.tsx" />
              </SelectTrigger>
              <SelectContent data-id="759jcagkl" data-path="src/components/Recipe/RecipeFilters.tsx">
                {difficulties.map((difficulty) =>
                <SelectItem key={difficulty} value={difficulty} data-id="37qmzlzws" data-path="src/components/Recipe/RecipeFilters.tsx">
                    {difficulty}
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters &&
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="flex items-center gap-2" data-id="1j23beep4" data-path="src/components/Recipe/RecipeFilters.tsx">

              <X className="h-4 w-4" data-id="4fje06hj1" data-path="src/components/Recipe/RecipeFilters.tsx" />
              Clear Filters
            </Button>
          }
        </div>

        {/* Tags */}
        <div data-id="20mfryq2k" data-path="src/components/Recipe/RecipeFilters.tsx">
          <p className="text-sm font-medium text-gray-700 mb-2" data-id="c0hkmtiax" data-path="src/components/Recipe/RecipeFilters.tsx">Popular Tags:</p>
          <div className="flex flex-wrap gap-2" data-id="vpr6hc5hh" data-path="src/components/Recipe/RecipeFilters.tsx">
            {popularTags.map((tag) =>
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              className="cursor-pointer hover:bg-orange-100 hover:text-orange-800 transition-colors"
              onClick={() => onTagToggle(tag)} data-id="yw5170zpe" data-path="src/components/Recipe/RecipeFilters.tsx">

                {tag}
                {selectedTags.includes(tag) &&
              <X className="h-3 w-3 ml-1" data-id="d92kekcd6" data-path="src/components/Recipe/RecipeFilters.tsx" />
              }
              </Badge>
            )}
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters &&
        <div className="pt-4 border-t" data-id="h03eouohx" data-path="src/components/Recipe/RecipeFilters.tsx">
            <p className="text-sm font-medium text-gray-700 mb-2" data-id="8vhwfs3kh" data-path="src/components/Recipe/RecipeFilters.tsx">Active Filters:</p>
            <div className="flex flex-wrap gap-2" data-id="k1mm6jq70" data-path="src/components/Recipe/RecipeFilters.tsx">
              {searchTerm &&
            <Badge variant="outline" className="flex items-center gap-1" data-id="ets40fp7v" data-path="src/components/Recipe/RecipeFilters.tsx">
                  Search: "{searchTerm}"
                  <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onSearchChange('')} data-id="swovua0vk" data-path="src/components/Recipe/RecipeFilters.tsx" />

                </Badge>
            }
              {selectedCategory !== 'All Categories' &&
            <Badge variant="outline" className="flex items-center gap-1" data-id="7t7ydthg6" data-path="src/components/Recipe/RecipeFilters.tsx">
                  Category: {selectedCategory}
                  <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onCategoryChange('All Categories')} data-id="gtf19lp6r" data-path="src/components/Recipe/RecipeFilters.tsx" />

                </Badge>
            }
              {selectedDifficulty !== 'All Levels' &&
            <Badge variant="outline" className="flex items-center gap-1" data-id="71fcq9ume" data-path="src/components/Recipe/RecipeFilters.tsx">
                  Difficulty: {selectedDifficulty}
                  <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onDifficultyChange('All Levels')} data-id="19gb3m4zu" data-path="src/components/Recipe/RecipeFilters.tsx" />

                </Badge>
            }
              {selectedTags.map((tag) =>
            <Badge key={tag} variant="outline" className="flex items-center gap-1" data-id="nrr571fkj" data-path="src/components/Recipe/RecipeFilters.tsx">
                  Tag: {tag}
                  <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => onTagToggle(tag)} data-id="y09d75901" data-path="src/components/Recipe/RecipeFilters.tsx" />

                </Badge>
            )}
            </div>
          </div>
        }
      </div>
    </div>);

};

export default RecipeFilters;