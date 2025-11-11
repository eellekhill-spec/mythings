import React, { useState, useEffect } from 'react';
import { DollarSign, Utensils, ShoppingCart, MapPin, Sparkles, Calendar, ChevronDown, ChevronUp, RefreshCw, Lock, Unlock, Clock, Printer, Download, Heart, RotateCcw, TrendingUp, AlertCircle, Check } from 'lucide-react';

const MealPlannerApp = () => {
  const [budget, setBudget] = useState(150);
  const [flexBudget, setFlexBudget] = useState(10);
  const [dietTypes, setDietTypes] = useState(['balanced']);
  const [zipCode, setZipCode] = useState('37201');
  const [selectedStores, setSelectedStores] = useState(['Kroger']);
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [loading, setLoading] = useState(false);
  const [includeSnacks, setIncludeSnacks] = useState(true);
  const [portionSize, setPortionSize] = useState('couple');
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [lockedMeals, setLockedMeals] = useState({});
  const [mealHistory, setMealHistory] = useState([]);
  const [nutritionTargets, setNutritionTargets] = useState({ calories: 2000, protein: 150, carbs: 225, fat: 65 });
  const [showNutritionSettings, setShowNutritionSettings] = useState(false);

  const portionMultipliers = {
    single: 1,
    couple: 2,
    family: 4
  };

  useEffect(() => {
    loadFromStorage();
  }, []);

  const loadFromStorage = async () => {
    try {
      const savedFavorites = await window.storage.get('favorites');
      if (savedFavorites) setFavoriteMeals(JSON.parse(savedFavorites.value));
      
      const savedHistory = await window.storage.get('meal-history');
      if (savedHistory) setMealHistory(JSON.parse(savedHistory.value));
      
      const savedSettings = await window.storage.get('settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings.value);
        setBudget(settings.budget || 150);
        setDietTypes(settings.dietTypes || ['balanced']);
        setPortionSize(settings.portionSize || 'couple');
        setNutritionTargets(settings.nutritionTargets || nutritionTargets);
      }
    } catch (error) {
      console.log('No saved data found');
    }
  };

  const saveToStorage = async (key, value) => {
    try {
      await window.storage.set(key, JSON.stringify(value));
    } catch (error) {
      console.error('Storage error:', error);
    }
  };

  const availableDiets = {
    balanced: { name: 'Balanced', icon: '⚖️' },
    keto: { name: 'Keto', icon: '🥑' },
    vegan: { name: 'Vegan', icon: '🌱' },
    vegetarian: { name: 'Vegetarian', icon: '🥗' },
    lowCarb: { name: 'Low Carb', icon: '🍖' },
    paleo: { name: 'Paleo', icon: '🦴' },
    mediterranean: { name: 'Mediterranean', icon: '🫒' },
    dairyFree: { name: 'Dairy Free', icon: '🥛' },
    nutFree: { name: 'Nut Free', icon: '🚫' },
    glutenFree: { name: 'Gluten Free', icon: '🌾' }
  };

  const groceryStores = [
    { name: 'Kroger', priceLevel: 'moderate', distance: '1.2 miles' },
    { name: 'Walmart', priceLevel: 'budget', distance: '2.1 miles' },
    { name: 'Whole Foods', priceLevel: 'premium', distance: '1.8 miles' },
    { name: 'Trader Joes', priceLevel: 'moderate', distance: '3.4 miles' },
    { name: 'Publix', priceLevel: 'moderate', distance: '0.9 miles' },
    { name: 'Aldi', priceLevel: 'budget', distance: '2.7 miles' }
  ];

  const mealDatabase = {
    balanced: {
      Breakfast: [
        { name: 'Oatmeal with Berries', cost: { budget: 2.50, moderate: 3.50, premium: 4.50 }, cal: 350, protein: 12, carbs: 58, fat: 8, ingredients: [{ item: 'Oats', qty: '1 cup', section: 'Grains' }, { item: 'Berries', qty: '1 cup', section: 'Produce' }, { item: 'Honey', qty: '2 tbsp', section: 'Condiments' }], prepTime: 10, difficulty: 'easy', tags: ['quick', 'heart-healthy'], season: 'all' },
        { name: 'Scrambled Eggs & Toast', cost: { budget: 2.00, moderate: 3.00, premium: 4.00 }, cal: 380, protein: 22, carbs: 35, fat: 16, ingredients: [{ item: 'Eggs', qty: '3 eggs', section: 'Dairy' }, { item: 'Bread', qty: '2 slices', section: 'Bakery' }, { item: 'Butter', qty: '1 tbsp', section: 'Dairy' }], prepTime: 8, difficulty: 'easy', tags: ['quick', 'protein-rich'], season: 'all' },
        { name: 'Greek Yogurt Parfait', cost: { budget: 2.50, moderate: 3.50, premium: 4.50 }, cal: 320, protein: 20, carbs: 42, fat: 8, ingredients: [{ item: 'Yogurt', qty: '1 cup', section: 'Dairy' }, { item: 'Granola', qty: '0.5 cup', section: 'Grains' }], prepTime: 5, difficulty: 'easy', tags: ['no-cook'], season: 'all' },
        { name: 'Banana Pancakes', cost: { budget: 2.00, moderate: 3.00, premium: 4.00 }, cal: 400, protein: 14, carbs: 62, fat: 10, ingredients: [{ item: 'Flour', qty: '1 cup', section: 'Baking' }, { item: 'Banana', qty: '2', section: 'Produce' }, { item: 'Eggs', qty: '2', section: 'Dairy' }], prepTime: 15, difficulty: 'easy', tags: ['weekend'], season: 'all' }
      ],
      Lunch: [
        { name: 'Chicken Caesar Salad', cost: { budget: 4.50, moderate: 6.00, premium: 8.50 }, cal: 420, protein: 35, carbs: 25, fat: 18, ingredients: [{ item: 'Chicken', qty: '6 oz', section: 'Meat' }, { item: 'Lettuce', qty: '4 cups', section: 'Produce' }, { item: 'Parmesan', qty: '0.25 cup', section: 'Dairy' }], prepTime: 15, difficulty: 'easy', tags: ['protein-rich'], season: 'all' },
        { name: 'Turkey Wrap', cost: { budget: 3.50, moderate: 5.50, premium: 7.00 }, cal: 450, protein: 28, carbs: 42, fat: 16, ingredients: [{ item: 'Turkey', qty: '4 oz', section: 'Deli' }, { item: 'Tortilla', qty: '1', section: 'Bakery' }, { item: 'Avocado', qty: '0.5', section: 'Produce' }], prepTime: 8, difficulty: 'easy', tags: ['quick'], season: 'all' },
        { name: 'Quinoa Bowl', cost: { budget: 4.00, moderate: 5.50, premium: 7.50 }, cal: 480, protein: 22, carbs: 58, fat: 18, ingredients: [{ item: 'Quinoa', qty: '1 cup', section: 'Grains' }, { item: 'Chickpeas', qty: '0.5 cup', section: 'Canned' }, { item: 'Veggies', qty: '1.5 cups', section: 'Produce' }], prepTime: 20, difficulty: 'easy', tags: ['meal-prep'], season: 'all' }
      ],
      Dinner: [
        { name: 'Baked Salmon', cost: { budget: 7.00, moderate: 9.00, premium: 12.00 }, cal: 580, protein: 42, carbs: 48, fat: 22, ingredients: [{ item: 'Salmon', qty: '6 oz', section: 'Seafood' }, { item: 'Quinoa', qty: '1 cup', section: 'Grains' }, { item: 'Broccoli', qty: '2 cups', section: 'Produce' }], prepTime: 30, difficulty: 'medium', tags: ['omega-3'], season: 'all' },
        { name: 'Chicken Stir-Fry', cost: { budget: 5.00, moderate: 7.00, premium: 9.00 }, cal: 520, protein: 40, carbs: 52, fat: 16, ingredients: [{ item: 'Chicken', qty: '8 oz', section: 'Meat' }, { item: 'Veggies', qty: '3 cups', section: 'Frozen' }, { item: 'Rice', qty: '1 cup', section: 'Grains' }], prepTime: 20, difficulty: 'medium', tags: ['quick'], season: 'all' },
        { name: 'Beef Pasta', cost: { budget: 5.50, moderate: 7.50, premium: 10.00 }, cal: 620, protein: 35, carbs: 72, fat: 20, ingredients: [{ item: 'Ground beef', qty: '8 oz', section: 'Meat' }, { item: 'Pasta', qty: '8 oz', section: 'Grains' }, { item: 'Sauce', qty: '2 cups', section: 'Canned' }], prepTime: 25, difficulty: 'easy', tags: ['comfort'], season: 'all' }
      ],
      Snack: [
        { name: 'Apple & Peanut Butter', cost: { budget: 1.50, moderate: 2.00, premium: 2.50 }, cal: 200, protein: 8, carbs: 24, fat: 8, ingredients: [{ item: 'Apple', qty: '1', section: 'Produce' }, { item: 'Peanut butter', qty: '2 tbsp', section: 'Condiments' }], prepTime: 2, difficulty: 'easy', tags: ['no-cook'], season: 'all' },
        { name: 'Yogurt & Granola', cost: { budget: 1.50, moderate: 2.50, premium: 3.50 }, cal: 280, protein: 18, carbs: 32, fat: 8, ingredients: [{ item: 'Yogurt', qty: '1 cup', section: 'Dairy' }, { item: 'Granola', qty: '0.25 cup', section: 'Grains' }], prepTime: 2, difficulty: 'easy', tags: ['protein-rich'], season: 'all' }
      ]
    },
    keto: {
      Breakfast: [
        { name: 'Bacon & Eggs', cost: { budget: 3.00, moderate: 4.00, premium: 5.50 }, cal: 420, protein: 28, carbs: 4, fat: 32, ingredients: [{ item: 'Bacon', qty: '4 strips', section: 'Meat' }, { item: 'Eggs', qty: '3', section: 'Dairy' }, { item: 'Avocado', qty: '0.5', section: 'Produce' }], prepTime: 12, difficulty: 'easy', tags: ['high-fat'], season: 'all' }
      ],
      Lunch: [
        { name: 'Keto Cobb Salad', cost: { budget: 5.50, moderate: 7.50, premium: 10.00 }, cal: 520, protein: 32, carbs: 8, fat: 38, ingredients: [{ item: 'Chicken', qty: '6 oz', section: 'Meat' }, { item: 'Bacon', qty: '3 strips', section: 'Meat' }, { item: 'Eggs', qty: '2', section: 'Dairy' }, { item: 'Cheese', qty: '2 oz', section: 'Dairy' }], prepTime: 18, difficulty: 'easy', tags: ['protein-rich'], season: 'all' }
      ],
      Dinner: [
        { name: 'Ribeye Steak', cost: { budget: 9.00, moderate: 12.00, premium: 16.00 }, cal: 680, protein: 48, carbs: 6, fat: 52, ingredients: [{ item: 'Steak', qty: '10 oz', section: 'Meat' }, { item: 'Asparagus', qty: '8 spears', section: 'Produce' }, { item: 'Butter', qty: '2 tbsp', section: 'Dairy' }], prepTime: 20, difficulty: 'medium', tags: ['special'], season: 'all' }
      ],
      Snack: [
        { name: 'Cheese & Pepperoni', cost: { budget: 2.00, moderate: 3.00, premium: 4.00 }, cal: 250, protein: 16, carbs: 2, fat: 20, ingredients: [{ item: 'Cheese', qty: '2 oz', section: 'Dairy' }, { item: 'Pepperoni', qty: '1 oz', section: 'Deli' }], prepTime: 0, difficulty: 'easy', tags: ['no-cook'], season: 'all' }
      ]
    },
    vegan: {
      Breakfast: [
        { name: 'Smoothie Bowl', cost: { budget: 3.50, moderate: 4.50, premium: 6.00 }, cal: 320, protein: 12, carbs: 52, fat: 8, ingredients: [{ item: 'Banana', qty: '1', section: 'Produce' }, { item: 'Berries', qty: '1 cup', section: 'Produce' }, { item: 'Oat milk', qty: '1 cup', section: 'Dairy' }], prepTime: 8, difficulty: 'easy', tags: ['refreshing'], season: 'all' }
      ],
      Lunch: [
        { name: 'Buddha Bowl', cost: { budget: 4.50, moderate: 6.50, premium: 9.00 }, cal: 480, protein: 18, carbs: 68, fat: 14, ingredients: [{ item: 'Quinoa', qty: '1 cup', section: 'Grains' }, { item: 'Chickpeas', qty: '0.75 cup', section: 'Canned' }, { item: 'Sweet potato', qty: '1', section: 'Produce' }, { item: 'Kale', qty: '2 cups', section: 'Produce' }], prepTime: 30, difficulty: 'medium', tags: ['nutrient-dense'], season: 'all' }
      ],
      Dinner: [
        { name: 'Lentil Curry', cost: { budget: 3.50, moderate: 5.00, premium: 7.00 }, cal: 420, protein: 22, carbs: 58, fat: 10, ingredients: [{ item: 'Lentils', qty: '1 cup', section: 'Grains' }, { item: 'Coconut milk', qty: '1 cup', section: 'Canned' }, { item: 'Spices', qty: '2 tbsp', section: 'Spices' }, { item: 'Rice', qty: '1 cup', section: 'Grains' }], prepTime: 35, difficulty: 'easy', tags: ['comfort'], season: 'all' }
      ],
      Snack: [
        { name: 'Hummus & Veggies', cost: { budget: 2.00, moderate: 3.00, premium: 4.50 }, cal: 180, protein: 8, carbs: 22, fat: 7, ingredients: [{ item: 'Hummus', qty: '0.5 cup', section: 'Deli' }, { item: 'Carrots', qty: '1 cup', section: 'Produce' }], prepTime: 3, difficulty: 'easy', tags: ['healthy'], season: 'all' }
      ]
    }
  };

  const generateMealPlan = () => {
    setLoading(true);
    setTimeout(() => {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const plan = [];
      
      const priceLevel = selectedStores.some(s => groceryStores.find(g => g.name === s)?.priceLevel === 'budget') ? 'budget' :
                         selectedStores.some(s => groceryStores.find(g => g.name === s)?.priceLevel === 'premium') ? 'premium' : 'moderate';
      
      const totalBudget = budget + flexBudget;
      const dailyBudget = totalBudget / 7;
      const requiredMealTypes = ['Breakfast', 'Lunch', 'Dinner'];
      const mealTypesNeeded = includeSnacks ? [...requiredMealTypes, 'Snack'] : requiredMealTypes;
      
      const usedMeals = {};
      const portionMultiplier = portionMultipliers[portionSize];
      
      days.forEach((day, dayIndex) => {
        const dayMeals = [];
        let dayTotal = 0;
        usedMeals[day] = [];
        
        mealTypesNeeded.forEach(mealType => {
          const lockedKey = `${day}-${mealType}`;
          
          if (lockedMeals[lockedKey]) {
            const meal = lockedMeals[lockedKey];
            dayMeals.push(meal);
            usedMeals[day].push(meal);
            dayTotal += meal.actualCost;
            return;
          }
          
          const activeDiet = dietTypes[Math.floor(Math.random() * dietTypes.length)];
          const availableMeals = mealDatabase[activeDiet]?.[mealType] || [];
          
          if (availableMeals.length > 0) {
            let selectedMeal;
            let attempts = 0;
            const maxAttempts = 20;
            
            const recentMeals = mealHistory.slice(-14).map(m => m.name);
            
            do {
              selectedMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
              attempts++;
              
              if (dayIndex % 2 === 1 && dayIndex > 0) {
                const previousDay = days[dayIndex - 1];
                const previousDayMealNames = usedMeals[previousDay]
                  ?.filter(m => m.type === mealType)
                  .map(m => m.name) || [];
                
                if (previousDayMealNames.includes(selectedMeal.name)) {
                  continue;
                }
              }
              
              if (recentMeals.includes(selectedMeal.name) && attempts < maxAttempts) {
                continue;
              }
              
              break;
            } while (attempts < maxAttempts);
            
            const baseCost = selectedMeal.cost[priceLevel];
            const mealCost = baseCost * portionMultiplier;
            
            if (dayTotal + mealCost <= dailyBudget * 1.2) {
              const mealWithDetails = {
                ...selectedMeal,
                type: mealType,
                actualCost: mealCost,
                baseCost: baseCost,
                diet: activeDiet,
                store: selectedStores[Math.floor(Math.random() * selectedStores.length)],
                portions: portionMultiplier
              };
              
              dayMeals.push(mealWithDetails);
              usedMeals[day].push(mealWithDetails);
              dayTotal += mealCost;
            }
          }
        });
        
        plan.push({ day, meals: dayMeals, total: dayTotal });
      });
      
      setGeneratedPlan(plan);
      
      const newHistory = [...mealHistory, ...plan.flatMap(d => d.meals)].slice(-50);
      setMealHistory(newHistory);
      saveToStorage('meal-history', newHistory);
      
      setLoading(false);
    }, 1500);
  };

  const regenerateDay = (dayName) => {
    if (!generatedPlan) return;
    
    const updatedPlan = generatedPlan.map(dayPlan => {
      if (dayPlan.day !== dayName) return dayPlan;
      
      const priceLevel = selectedStores.some(s => groceryStores.find(g => g.name === s)?.priceLevel === 'budget') ? 'budget' :
                         selectedStores.some(s => groceryStores.find(g => g.name === s)?.priceLevel === 'premium') ? 'premium' : 'moderate';
      
      const mealTypesNeeded = includeSnacks ? ['Breakfast', 'Lunch', 'Dinner', 'Snack'] : ['Breakfast', 'Lunch', 'Dinner'];
      const newMeals = [];
      let dayTotal = 0;
      
      mealTypesNeeded.forEach(mealType => {
        const lockedKey = `${dayName}-${mealType}`;
        if (lockedMeals[lockedKey]) {
          const meal = lockedMeals[lockedKey];
          newMeals.push(meal);
          dayTotal += meal.actualCost;
          return;
        }
        
        const activeDiet = dietTypes[Math.floor(Math.random() * dietTypes.length)];
        const availableMeals = mealDatabase[activeDiet]?.[mealType] || [];
        
        if (availableMeals.length > 0) {
          const selectedMeal = availableMeals[Math.floor(Math.random() * availableMeals.length)];
          const baseCost = selectedMeal.cost[priceLevel];
          const mealCost = baseCost * portionMultipliers[portionSize];
          
          const mealWithDetails = {
            ...selectedMeal,
            type: mealType,
            actualCost: mealCost,
            baseCost: baseCost,
            diet: activeDiet,
            store: selectedStores[Math.floor(Math.random() * selectedStores.length)],
            portions: portionMultipliers[portionSize]
          };
          
          newMeals.push(mealWithDetails);
          dayTotal += mealCost;
        }
      });
      
      return { day: dayName, meals: newMeals, total: dayTotal };
    });
    
    setGeneratedPlan(updatedPlan);
  };

  const toggleLockMeal = (day, mealType, meal) => {
    const key = `${day}-${mealType}`;
    const newLocked = { ...lockedMeals };
    
    if (newLocked[key]) {
      delete newLocked[key];
    } else {
      newLocked[key] = meal;
    }
    
    setLockedMeals(newLocked);
  };

  const toggleFavorite = (meal) => {
    const mealKey = `${meal.name}-${meal.diet}`;
    let newFavorites;
    
    if (favoriteMeals.some(f => `${f.name}-${f.diet}` === mealKey)) {
      newFavorites = favoriteMeals.filter(f => `${f.name}-${f.diet}` !== mealKey);
    } else {
      newFavorites = [...favoriteMeals, meal];
    }
    
    setFavoriteMeals(newFavorites);
    saveToStorage('favorites', newFavorites);
  };

  const isFavorite = (meal) => {
    return favoriteMeals.some(f => f.name === meal.name && f.diet === meal.diet);
  };

  const isLocked = (day, mealType) => {
    return !!lockedMeals[`${day}-${mealType}`];
  };

  const toggleDiet = (diet) => {
    let newDiets;
    if (dietTypes.includes(diet)) {
      if (dietTypes.length > 1) {
        newDiets = dietTypes.filter(d => d !== diet);
      } else {
        return;
      }
    } else {
      newDiets = [...dietTypes, diet];
    }
    setDietTypes(newDiets);
    saveToStorage('settings', { budget, dietTypes: newDiets, portionSize, nutritionTargets });
  };

  const toggleStore = (store) => {
    if (selectedStores.includes(store)) {
      if (selectedStores.length > 1) {
        setSelectedStores(selectedStores.filter(s => s !== store));
      }
    } else {
      setSelectedStores([...selectedStores, store]);
    }
  };

  const toggleDay = (day) => {
    setExpandedDays({ ...expandedDays, [day]: !expandedDays[day] });
  };

  const totalCost = generatedPlan?.reduce((sum, day) => sum + day.total, 0) || 0;
  const allIngredients = generatedPlan?.flatMap(day => 
    day.meals.flatMap(meal => meal.ingredients)
  ) || [];
  
  const groupedIngredients = allIngredients.reduce((acc, ing) => {
    const existing = acc.find(i => i.item === ing.item);
    if (existing) {
      existing.qty = `${existing.qty} + ${ing.qty}`;
    } else {
      acc.push({ ...ing });
    }
    return acc;
  }, []);

  const ingredientsBySection = groupedIngredients.reduce((acc, ing) => {
    if (!acc[ing.section]) acc[ing.section] = [];
    acc[ing.section].push(ing);
    return acc;
  }, {});

  const weeklyNutrition = generatedPlan?.reduce((acc, day) => {
    day.meals.forEach(meal => {
      acc.calories += meal.cal;
      acc.protein += meal.protein;
      acc.carbs += meal.carbs;
      acc.fat += meal.fat;
    });
    return acc;
  }, { calories: 0, protein: 0, carbs: 0, fat: 0 }) || { calories: 0, protein: 0, carbs: 0, fat: 0 };

  const dailyNutrition = {
    calories: Math.round(weeklyNutrition.calories / 7),
    protein: Math.round(weeklyNutrition.protein / 7),
    carbs: Math.round(weeklyNutrition.carbs / 7),
    fat: Math.round(weeklyNutrition.fat / 7)
  };

  const nutritionStatus = {
    calories: Math.abs(dailyNutrition.calories - nutritionTargets.calories) / nutritionTargets.calories <= 0.1,
    protein: dailyNutrition.protein >= nutritionTargets.protein * 0.9,
    carbs: Math.abs(dailyNutrition.carbs - nutritionTargets.carbs) / nutritionTargets.carbs <= 0.15,
    fat: Math.abs(dailyNutrition.fat - nutritionTargets.fat) / nutritionTargets.fat <= 0.15
  };

  const printMealPlan = () => {
    window.print();
  };

  const exportShoppingList = () => {
    const sections = Object.keys(ingredientsBySection).sort();
    let text = 'SHOPPING LIST\n\n';
    
    sections.forEach(section => {
      text += `${section.toUpperCase()}\n`;
      ingredientsBySection[section].forEach(ing => {
        text += `- ${ing.item}: ${ing.qty}\n`;
      });
      text += '\n';
    });
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'shopping-list.txt';
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2 flex items-center gap-3">
                <Utensils className="text-green-600" size={40} />
                Smart Meal Planner Pro
              </h1>
              <p className="text-gray-600 text-lg">AI-powered meal planning with all features</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Weekly Budget</div>
              <div className="text-3xl font-bold text-green-600">${budget}</div>
              <div className="text-xs text-gray-500">+${flexBudget} flex</div>
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="text-green-600" size={24} />
              <h2 className="text-xl font-semibold">Budget</h2>
            </div>
            <label className="block text-sm text-gray-600 mb-2">Weekly Budget ($)</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => {
                const val = parseFloat(e.target.value) || 0;
                setBudget(val);
                saveToStorage('settings', { budget: val, dietTypes, portionSize, nutritionTargets });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg mb-3"
              min="0"
              step="10"
            />
            <label className="block text-sm text-gray-600 mb-2">Flex Budget ($)</label>
            <input
              type="number"
              value={flexBudget}
              onChange={(e) => setFlexBudget(parseFloat(e.target.value) || 0)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-green-500 focus:outline-none text-lg"
              min="0"
              step="5"
            />
            <p className="text-xs text-gray-500 mt-2">Flex allows going slightly over</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Utensils className="text-orange-600" size={24} />
              <h2 className="text-xl font-semibold">Portions</h2>
            </div>
            <label className="block text-sm text-gray-600 mb-2">Portion Size</label>
            <select
              value={portionSize}
              onChange={(e) => {
                const val = e.target.value;
                setPortionSize(val);
                saveToStorage('settings', { budget, dietTypes, portionSize: val, nutritionTargets });
              }}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
            >
              <option value="single">Single (1 person)</option>
              <option value="couple">Couple (2 people)</option>
              <option value="family">Family (4 people)</option>
            </select>
            
            <div className="mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSnacks}
                  onChange={(e) => setIncludeSnacks(e.target.checked)}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <span className="text-sm font-medium text-gray-700">Include snacks</span>
              </label>
              <p className="text-xs text-gray-500 mt-1 ml-6">B/L/D always included</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="text-blue-600" size={24} />
              <h2 className="text-xl font-semibold">Stores</h2>
            </div>
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none mb-3"
              placeholder="ZIP Code"
            />
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {groceryStores.map(store => (
                <div
                  key={store.name}
                  onClick={() => toggleStore(store.name)}
                  className={`p-2 rounded-lg cursor-pointer transition text-sm ${
                    selectedStores.includes(store.name)
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold">{store.name}</div>
                      <div className="text-xs text-gray-500">{store.distance}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      store.priceLevel === 'budget' ? 'bg-green-100 text-green-700' :
                      store.priceLevel === 'premium' ? 'bg-purple-100 text-purple-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {store.priceLevel}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="text-purple-600" size={24} />
              <h2 className="text-xl font-semibold">Diets</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
              {Object.entries(availableDiets).map(([key, diet]) => (
                <div
                  key={key}
                  onClick={() => toggleDiet(key)}
                  className={`p-2 rounded-lg cursor-pointer transition text-center ${
                    dietTypes.includes(key)
                      ? 'bg-purple-100 border-2 border-purple-500'
                      : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xl mb-1">{diet.icon}</div>
                  <div className="text-xs font-semibold">{diet.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {showNutritionSettings && (
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Daily Nutrition Targets</h3>
              <button
                onClick={() => setShowNutritionSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">Calories</label>
                <input
                  type="number"
                  value={nutritionTargets.calories}
                  onChange={(e) => setNutritionTargets({...nutritionTargets, calories: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Protein (g)</label>
                <input
                  type="number"
                  value={nutritionTargets.protein}
                  onChange={(e) => setNutritionTargets({...nutritionTargets, protein: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Carbs (g)</label>
                <input
                  type="number"
                  value={nutritionTargets.carbs}
                  onChange={(e) => setNutritionTargets({...nutritionTargets, carbs: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">Fat (g)</label>
                <input
                  type="number"
                  value={nutritionTargets.fat}
                  onChange={(e) => setNutritionTargets({...nutritionTargets, fat: parseInt(e.target.value) || 0})}
                  className="w-full p-2 border-2 border-gray-200 rounded-lg"
                />
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-8">
          <button
            onClick={generateMealPlan}
            disabled={loading}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-600 hover:to-blue-600 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
          >
            {loading ? (
              <>
                <RefreshCw className="animate-spin" size={24} />
                Generating...
              </>
            ) : (
              <>
                <Sparkles size={24} />
                Generate Meal Plan
              </>
            )}
          </button>
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={() => setShowNutritionSettings(!showNutritionSettings)}
              className="text-sm text-blue-600 hover:underline flex items-center gap-1"
            >
              <TrendingUp size={16} />
              Nutrition Targets
            </button>
            {favoriteMeals.length > 0 && (
              <span className="text-sm text-gray-600">
                <Heart size={16} className="inline text-red-500" /> {favoriteMeals.length} saved
              </span>
            )}
          </div>
        </div>

        {generatedPlan && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="grid md:grid-cols-5 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-700">${totalCost.toFixed(2)}</div>
                  <div className="text-xs text-gray-600 mt-1">Total Cost</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-700">${((budget + flexBudget) - totalCost).toFixed(2)}</div>
                  <div className="text-xs text-gray-600 mt-1">Remaining</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-700">{generatedPlan.reduce((sum, day) => sum + day.meals.length, 0)}</div>
                  <div className="text-xs text-gray-600 mt-1">Total Meals</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-700">{dailyNutrition.calories}</div>
                  <div className="text-xs text-gray-600 mt-1">Daily Calories</div>
                  {nutritionStatus.calories ? (
                    <Check size={16} className="inline text-green-600 mt-1" />
                  ) : (
                    <AlertCircle size={16} className="inline text-orange-600 mt-1" />
                  )}
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                  <div className="text-2xl font-bold text-pink-700">{dailyNutrition.protein}g</div>
                  <div className="text-xs text-gray-600 mt-1">Daily Protein</div>
                  {nutritionStatus.protein ? (
                    <Check size={16} className="inline text-green-600 mt-1" />
                  ) : (
                    <AlertCircle size={16} className="inline text-orange-600 mt-1" />
                  )}
                </div>
              </div>
              
              <div className="flex gap-3 mt-4 justify-center">
                <button
                  onClick={printMealPlan}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  <Printer size={18} />
                  Print
                </button>
                <button
                  onClick={exportShoppingList}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <Download size={18} />
                  Export
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="text-green-600" size={28} />
                <h2 className="text-2xl font-semibold">Weekly Meal Plan</h2>
              </div>

              <div className="space-y-3">
                {generatedPlan.map(({ day, meals, total }, dayIndex) => (
                  <div key={day} className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <div
                      onClick={() => toggleDay(day)}
                      className={`p-4 cursor-pointer transition flex justify-between items-center ${
                        dayIndex % 2 === 1 ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-gradient-to-r from-gray-50 to-gray-100'
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-wrap">
                        <div className="font-bold text-lg text-gray-800">{day}</div>
                        {dayIndex % 2 === 1 && (
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded font-semibold">
                            Variety
                          </span>
                        )}
                        <div className="text-sm text-gray-600">{meals.length} meals</div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            regenerateDay(day);
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 transition flex items-center gap-1"
                        >
                          <RotateCcw size={14} />
                          Redo
                        </button>
                        <div className="font-semibold text-green-700">${total.toFixed(2)}</div>
                        {expandedDays[day] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>

                    {expandedDays[day] && (
                      <div className="p-4 space-y-3 bg-white">
                        {meals.map((meal, idx) => (
                          <div key={idx} className="border-l-4 border-green-500 bg-gray-50 p-4 rounded-r-lg">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <span className="font-semibold text-lg">{meal.name}</span>
                                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">
                                    {meal.type}
                                  </span>
                                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                    {availableDiets[meal.diet].name}
                                  </span>
                                  {meal.tags?.map(tag => (
                                    <span key={tag} className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                                      {tag}
                                    </span>
                                  ))}
                                  <button onClick={() => toggleFavorite(meal)}>
                                    <Heart
                                      size={18}
                                      className={isFavorite(meal) ? 'fill-red-500 text-red-500' : 'text-gray-400'}
                                    />
                                  </button>
                                  <button onClick={() => toggleLockMeal(day, meal.type, meal)}>
                                    {isLocked(day, meal.type) ? (
                                      <Lock size={18} className="text-yellow-600" />
                                    ) : (
                                      <Unlock size={18} className="text-gray-400" />
                                    )}
                                  </button>
                                </div>
                                <div className="flex items-center gap-4 text-sm text-gray-600 mb-2 flex-wrap">
                                  <span className="flex items-center gap-1">
                                    <MapPin size={14} />
                                    {meal.store}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock size={14} />
                                    {meal.prepTime} min
                                  </span>
                                  <span>{meal.cal} cal</span>
                                  <span>P: {meal.protein}g</span>
                                  <span>C: {meal.carbs}g</span>
                                  <span>F: {meal.fat}g</span>
                                  {meal.portions > 1 && (
                                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                      x{meal.portions}
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs text-gray-700">
                                  <strong>Ingredients:</strong>
                                  <ul className="ml-4 mt-1 space-y-1">
                                    {meal.ingredients.map((ing, i) => (
                                      <li key={i}>{ing.item} - {ing.qty}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <div className="text-right ml-4">
                                <div className="text-lg font-bold text-green-700">${meal.actualCost.toFixed(2)}</div>
                                {meal.portions > 1 && (
                                  <div className="text-xs text-gray-500">${meal.baseCost.toFixed(2)} each</div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-2 mb-6">
                <ShoppingCart className="text-green-600" size={28} />
                <h2 className="text-2xl font-semibold">Shopping List</h2>
              </div>
              <p className="text-gray-600 mb-4">
                By section • {Object.keys(ingredientsBySection).length} sections • {groupedIngredients.length} items
              </p>
              
              <div className="space-y-4">
                {Object.entries(ingredientsBySection).sort().map(([section, items]) => (
                  <div key={section} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-bold text-gray-800 mb-2">{section}</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                      {items.map((item, idx) => (
                        <div key={idx} className="bg-gray-50 p-2 rounded text-sm flex items-start gap-2">
                          <div className="w-4 h-4 border-2 border-gray-400 rounded mt-0.5"></div>
                          <div>
                            <div className="font-medium">{item.item}</div>
                            <div className="text-xs text-gray-500">{item.qty}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {favoriteMeals.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Heart className="text-red-500" size={24} />
                  <h2 className="text-xl font-semibold">Favorites</h2>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {favoriteMeals.map((meal, idx) => (
                    <div key={idx} className="bg-gray-50 p-3 rounded-lg border">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-semibold">{meal.name}</div>
                          <div className="text-xs text-gray-600">{availableDiets[meal.diet].name}</div>
                        </div>
                        <button onClick={() => toggleFavorite(meal)} className="text-red-500">
                          <Heart size={16} className="fill-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MealPlannerApp;
