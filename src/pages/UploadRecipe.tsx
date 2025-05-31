import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { recipeService } from '@/services/recipeService';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import {
  Upload,
  Plus,
  X,
  Clock,
  Users,
  ChefHat,
  ImageIcon } from
'lucide-react';

const UploadRecipe: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    cookingTime: '',
    servings: '',
    difficulty: 'Easy' as 'Easy' | 'Medium' | 'Hard',
    image: ''
  });

  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  const commonTags = [
  'budget', 'quick', 'healthy', 'vegetarian', 'vegan', 'gluten-free',
  'protein', 'low-carb', 'comfort-food', 'spicy', 'breakfast', 'lunch',
  'dinner', 'snacks', 'dessert', 'indian', 'italian', 'mexican', 'asian'];


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {// 5MB limit
        toast({
          title: "File too large",
          description: "Please choose an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setFormData((prev) => ({ ...prev, image: result }));
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    setImagePreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const addIngredient = () => {
    setIngredients((prev) => [...prev, '']);
  };

  const updateIngredient = (index: number, value: string) => {
    setIngredients((prev) => prev.map((ing, i) => i === index ? value : ing));
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addInstruction = () => {
    setInstructions((prev) => [...prev, '']);
  };

  const updateInstruction = (index: number, value: string) => {
    setInstructions((prev) => prev.map((inst, i) => i === index ? value : inst));
  };

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      setInstructions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags((prev) => [...prev, trimmedTag]);
    }
    setCurrentTag('');
  };

  const removeTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(currentTag);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Missing Title",
        description: "Please enter a recipe title",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.description.trim()) {
      toast({
        title: "Missing Description",
        description: "Please enter a recipe description",
        variant: "destructive"
      });
      return false;
    }

    const validIngredients = ingredients.filter((ing) => ing.trim());
    if (validIngredients.length === 0) {
      toast({
        title: "Missing Ingredients",
        description: "Please add at least one ingredient",
        variant: "destructive"
      });
      return false;
    }

    const validInstructions = instructions.filter((inst) => inst.trim());
    if (validInstructions.length === 0) {
      toast({
        title: "Missing Instructions",
        description: "Please add at least one instruction step",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.cookingTime || parseInt(formData.cookingTime) <= 0) {
      toast({
        title: "Invalid Cooking Time",
        description: "Please enter a valid cooking time",
        variant: "destructive"
      });
      return false;
    }

    if (!formData.servings || parseInt(formData.servings) <= 0) {
      toast({
        title: "Invalid Servings",
        description: "Please enter a valid number of servings",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to upload recipes",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const recipeData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        ingredients: ingredients.filter((ing) => ing.trim()),
        instructions: instructions.filter((inst) => inst.trim()),
        image: formData.image,
        tags: tags,
        cookingTime: parseInt(formData.cookingTime),
        servings: parseInt(formData.servings),
        difficulty: formData.difficulty,
        authorId: user.id,
        authorName: user.username,
        authorAvatar: user.profilePicture
      };

      await recipeService.createRecipe(recipeData);

      toast({
        title: "Recipe Uploaded! 🎉",
        description: "Your recipe has been shared with the community"
      });

      navigate('/my-recipes');
    } catch (error) {
      console.error('Error uploading recipe:', error);
      toast({
        title: "Upload Failed",
        description: "Failed to upload recipe. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl" data-id="1plrhgkvg" data-path="src/pages/UploadRecipe.tsx">
      <div className="mb-8" data-id="a84csque1" data-path="src/pages/UploadRecipe.tsx">
        <h1 className="text-3xl font-bold mb-2" data-id="lc2xhos3v" data-path="src/pages/UploadRecipe.tsx">Share Your Recipe</h1>
        <p className="text-gray-600" data-id="wj82nlwbe" data-path="src/pages/UploadRecipe.tsx">
          Share your culinary creations with the Student Plate community
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8" data-id="7q8krhhwr" data-path="src/pages/UploadRecipe.tsx">
        {/* Basic Information */}
        <Card data-id="w4w8wpync" data-path="src/pages/UploadRecipe.tsx">
          <CardHeader data-id="s25p6zsei" data-path="src/pages/UploadRecipe.tsx">
            <CardTitle className="flex items-center gap-2" data-id="ppw7q26n1" data-path="src/pages/UploadRecipe.tsx">
              <ChefHat className="h-5 w-5" data-id="nkxma11uh" data-path="src/pages/UploadRecipe.tsx" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6" data-id="1818sbowy" data-path="src/pages/UploadRecipe.tsx">
            <div className="space-y-2" data-id="snn2uvpy2" data-path="src/pages/UploadRecipe.tsx">
              <Label htmlFor="title" data-id="ibm0mgnq8" data-path="src/pages/UploadRecipe.tsx">Recipe Title *</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g., Easy Student Pasta"
                value={formData.title}
                onChange={handleInputChange}
                required data-id="wk96urszf" data-path="src/pages/UploadRecipe.tsx" />

            </div>

            <div className="space-y-2" data-id="la2lkueuj" data-path="src/pages/UploadRecipe.tsx">
              <Label htmlFor="description" data-id="b0gc5n2z4" data-path="src/pages/UploadRecipe.tsx">Description *</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe your recipe..."
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required data-id="nw0hzti0u" data-path="src/pages/UploadRecipe.tsx" />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-id="bt70nrwg3" data-path="src/pages/UploadRecipe.tsx">
              <div className="space-y-2" data-id="9dgbt5fhi" data-path="src/pages/UploadRecipe.tsx">
                <Label htmlFor="cookingTime" className="flex items-center gap-2" data-id="uer1l3un3" data-path="src/pages/UploadRecipe.tsx">
                  <Clock className="h-4 w-4" data-id="nfusj8jt4" data-path="src/pages/UploadRecipe.tsx" />
                  Cooking Time (minutes) *
                </Label>
                <Input
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  placeholder="30"
                  value={formData.cookingTime}
                  onChange={handleInputChange}
                  min="1"
                  required data-id="var54sph4" data-path="src/pages/UploadRecipe.tsx" />

              </div>

              <div className="space-y-2" data-id="od320yl8m" data-path="src/pages/UploadRecipe.tsx">
                <Label htmlFor="servings" className="flex items-center gap-2" data-id="2412mrnwc" data-path="src/pages/UploadRecipe.tsx">
                  <Users className="h-4 w-4" data-id="une3r7fq9" data-path="src/pages/UploadRecipe.tsx" />
                  Servings *
                </Label>
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  placeholder="2"
                  value={formData.servings}
                  onChange={handleInputChange}
                  min="1"
                  required data-id="jino5ztij" data-path="src/pages/UploadRecipe.tsx" />

              </div>

              <div className="space-y-2" data-id="yfl82ogkz" data-path="src/pages/UploadRecipe.tsx">
                <Label htmlFor="difficulty" data-id="y35kh5nq8" data-path="src/pages/UploadRecipe.tsx">Difficulty Level</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value: 'Easy' | 'Medium' | 'Hard') =>
                  setFormData((prev) => ({ ...prev, difficulty: value }))} data-id="pfckj4k0o" data-path="src/pages/UploadRecipe.tsx">

                  <SelectTrigger data-id="66vg2asgz" data-path="src/pages/UploadRecipe.tsx">
                    <SelectValue data-id="mboacwzi1" data-path="src/pages/UploadRecipe.tsx" />
                  </SelectTrigger>
                  <SelectContent data-id="ivcenppzh" data-path="src/pages/UploadRecipe.tsx">
                    <SelectItem value="Easy" data-id="23z8vnt1e" data-path="src/pages/UploadRecipe.tsx">Easy</SelectItem>
                    <SelectItem value="Medium" data-id="85s2kdtgv" data-path="src/pages/UploadRecipe.tsx">Medium</SelectItem>
                    <SelectItem value="Hard" data-id="jejeme5h2" data-path="src/pages/UploadRecipe.tsx">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Image Upload */}
        <Card data-id="ujd5gg8cd" data-path="src/pages/UploadRecipe.tsx">
          <CardHeader data-id="ijxew7drx" data-path="src/pages/UploadRecipe.tsx">
            <CardTitle className="flex items-center gap-2" data-id="f9nf2ykjv" data-path="src/pages/UploadRecipe.tsx">
              <ImageIcon className="h-5 w-5" data-id="y1h8c8k5x" data-path="src/pages/UploadRecipe.tsx" />
              Recipe Image
            </CardTitle>
          </CardHeader>
          <CardContent data-id="9cwettzwi" data-path="src/pages/UploadRecipe.tsx">
            {imagePreview ?
            <div className="relative" data-id="tv8kdum03" data-path="src/pages/UploadRecipe.tsx">
                <img
                src={imagePreview}
                alt="Recipe preview"
                className="w-full h-64 object-cover rounded-lg" data-id="7m5s9v9c7" data-path="src/pages/UploadRecipe.tsx" />

                <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={removeImage} data-id="qr368u8t1" data-path="src/pages/UploadRecipe.tsx">

                  <X className="h-4 w-4" data-id="6nrn7faax" data-path="src/pages/UploadRecipe.tsx" />
                </Button>
              </div> :

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-orange-400 transition-colors"
              onClick={() => fileInputRef.current?.click()} data-id="61535bzaf" data-path="src/pages/UploadRecipe.tsx">

                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" data-id="ux1rjrnvz" data-path="src/pages/UploadRecipe.tsx" />
                <p className="text-gray-600 mb-2" data-id="i7ko5q8p7" data-path="src/pages/UploadRecipe.tsx">Click to upload an image</p>
                <p className="text-sm text-gray-500" data-id="72pt0bf8a" data-path="src/pages/UploadRecipe.tsx">PNG, JPG up to 5MB</p>
              </div>
            }
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden" data-id="yw6eulfhu" data-path="src/pages/UploadRecipe.tsx" />

          </CardContent>
        </Card>

        {/* Ingredients */}
        <Card data-id="80gog01vr" data-path="src/pages/UploadRecipe.tsx">
          <CardHeader data-id="2fkxl0xlv" data-path="src/pages/UploadRecipe.tsx">
            <CardTitle data-id="qe045sdjq" data-path="src/pages/UploadRecipe.tsx">Ingredients</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="zraic55q2" data-path="src/pages/UploadRecipe.tsx">
            {ingredients.map((ingredient, index) =>
            <div key={index} className="flex gap-2" data-id="pjynx92qy" data-path="src/pages/UploadRecipe.tsx">
                <Input
                placeholder={`Ingredient ${index + 1}`}
                value={ingredient}
                onChange={(e) => updateIngredient(index, e.target.value)}
                className="flex-1" data-id="y2grwl7dk" data-path="src/pages/UploadRecipe.tsx" />

                {ingredients.length > 1 &&
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeIngredient(index)} data-id="vics90djf" data-path="src/pages/UploadRecipe.tsx">

                    <X className="h-4 w-4" data-id="m2rcfmn6k" data-path="src/pages/UploadRecipe.tsx" />
                  </Button>
              }
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              className="w-full" data-id="58hosk6jn" data-path="src/pages/UploadRecipe.tsx">

              <Plus className="h-4 w-4 mr-2" data-id="1zptdhiih" data-path="src/pages/UploadRecipe.tsx" />
              Add Ingredient
            </Button>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card data-id="yjyban3ys" data-path="src/pages/UploadRecipe.tsx">
          <CardHeader data-id="r0k9o3oh4" data-path="src/pages/UploadRecipe.tsx">
            <CardTitle data-id="jz2qoisnm" data-path="src/pages/UploadRecipe.tsx">Cooking Instructions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="wuns6wuxl" data-path="src/pages/UploadRecipe.tsx">
            {instructions.map((instruction, index) =>
            <div key={index} className="flex gap-2" data-id="5v67qkjon" data-path="src/pages/UploadRecipe.tsx">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-sm font-medium text-orange-600 mt-1" data-id="vnryo45ar" data-path="src/pages/UploadRecipe.tsx">
                  {index + 1}
                </div>
                <Textarea
                placeholder={`Step ${index + 1} instructions...`}
                value={instruction}
                onChange={(e) => updateInstruction(index, e.target.value)}
                className="flex-1"
                rows={2} data-id="oniidw1d3" data-path="src/pages/UploadRecipe.tsx" />

                {instructions.length > 1 &&
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeInstruction(index)}
                className="mt-1" data-id="cyu606193" data-path="src/pages/UploadRecipe.tsx">

                    <X className="h-4 w-4" data-id="ys6e5a8yj" data-path="src/pages/UploadRecipe.tsx" />
                  </Button>
              }
              </div>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={addInstruction}
              className="w-full" data-id="s6gbj69d4" data-path="src/pages/UploadRecipe.tsx">

              <Plus className="h-4 w-4 mr-2" data-id="6ezu9mfrj" data-path="src/pages/UploadRecipe.tsx" />
              Add Step
            </Button>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card data-id="qo48wfeex" data-path="src/pages/UploadRecipe.tsx">
          <CardHeader data-id="g1psfvnpf" data-path="src/pages/UploadRecipe.tsx">
            <CardTitle data-id="oi56qc5jy" data-path="src/pages/UploadRecipe.tsx">Tags</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4" data-id="9n9sxqkul" data-path="src/pages/UploadRecipe.tsx">
            <div className="space-y-2" data-id="8wlrsxxeb" data-path="src/pages/UploadRecipe.tsx">
              <Label htmlFor="tags" data-id="ti1pcvflt" data-path="src/pages/UploadRecipe.tsx">Add Tags</Label>
              <div className="flex gap-2" data-id="24m661ocp" data-path="src/pages/UploadRecipe.tsx">
                <Input
                  id="tags"
                  placeholder="e.g., quick, budget, vegetarian"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                  className="flex-1" data-id="xmhv205yp" data-path="src/pages/UploadRecipe.tsx" />

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addTag(currentTag)}
                  disabled={!currentTag.trim()} data-id="akjddkljd" data-path="src/pages/UploadRecipe.tsx">

                  Add
                </Button>
              </div>
            </div>

            {/* Current Tags */}
            {tags.length > 0 &&
            <div className="space-y-2" data-id="7thu6o83o" data-path="src/pages/UploadRecipe.tsx">
                <Label data-id="p6w8spc49" data-path="src/pages/UploadRecipe.tsx">Your Tags:</Label>
                <div className="flex flex-wrap gap-2" data-id="sttzac9ka" data-path="src/pages/UploadRecipe.tsx">
                  {tags.map((tag) =>
                <Badge key={tag} variant="secondary" className="flex items-center gap-1" data-id="8omkmmz2o" data-path="src/pages/UploadRecipe.tsx">
                      {tag}
                      <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => removeTag(tag)} data-id="m4x5yup32" data-path="src/pages/UploadRecipe.tsx" />

                    </Badge>
                )}
                </div>
              </div>
            }

            {/* Common Tags */}
            <div className="space-y-2" data-id="9zb7zuxsh" data-path="src/pages/UploadRecipe.tsx">
              <Label data-id="vaxrvqdzr" data-path="src/pages/UploadRecipe.tsx">Popular Tags:</Label>
              <div className="flex flex-wrap gap-2" data-id="llax7hhze" data-path="src/pages/UploadRecipe.tsx">
                {commonTags.filter((tag) => !tags.includes(tag)).map((tag) =>
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-orange-100"
                  onClick={() => addTag(tag)} data-id="9us9eelei" data-path="src/pages/UploadRecipe.tsx">

                    {tag}
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit */}
        <div className="flex gap-4" data-id="66wet5szj" data-path="src/pages/UploadRecipe.tsx">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex-1" data-id="qvlpqmjy5" data-path="src/pages/UploadRecipe.tsx">

            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600" data-id="hz6669gig" data-path="src/pages/UploadRecipe.tsx">

            {isLoading ? 'Uploading...' : 'Share Recipe'}
          </Button>
        </div>
      </form>
    </div>);

};

export default UploadRecipe;