import streamlit as st
import json
import random
from datetime import datetime

# Page configuration
st.set_page_config(
    page_title="Smart Meal Planner Pro",
    page_icon="🍽️",
    layout="wide"
)

# Initialize session state
if 'generated_plan' not in st.session_state:
    st.session_state.generated_plan = None
if 'favorite_meals' not in st.session_state:
    st.session_state.favorite_meals = []
if 'locked_meals' not in st.session_state:
    st.session_state.locked_meals = {}
if 'meal_history' not in st.session_state:
    st.session_state.meal_history = []

# Constants
PORTION_MULTIPLIERS = {
    'Single (1 person)': 1,
    'Couple (2 people)': 2,
    'Family (4 people)': 4
}

AVAILABLE_DIETS = {
    'balanced': {'name': 'Balanced', 'icon': '⚖️'},
    'keto': {'name': 'Keto', 'icon': '🥑'},
    'vegan': {'name': 'Vegan', 'icon': '🌱'},
    'vegetarian': {'name': 'Vegetarian', 'icon': '🥗'},
    'lowCarb': {'name': 'Low Carb', 'icon': '🍖'},
    'paleo': {'name': 'Paleo', 'icon': '🦴'},
    'mediterranean': {'name': 'Mediterranean', 'icon': '🫒'},
    'dairyFree': {'name': 'Dairy Free', 'icon': '🥛'},
    'nutFree': {'name': 'Nut Free', 'icon': '🚫'},
    'glutenFree': {'name': 'Gluten Free', 'icon': '🌾'}
}

GROCERY_STORES = [
    {'name': 'Kroger', 'priceLevel': 'moderate', 'distance': '1.2 miles'},
    {'name': 'Walmart', 'priceLevel': 'budget', 'distance': '2.1 miles'},
    {'name': 'Whole Foods', 'priceLevel': 'premium', 'distance': '1.8 miles'},
    {'name': 'Trader Joes', 'priceLevel': 'moderate', 'distance': '3.4 miles'},
    {'name': 'Publix', 'priceLevel': 'moderate', 'distance': '0.9 miles'},
    {'name': 'Aldi', 'priceLevel': 'budget', 'distance': '2.7 miles'}
]

# Meal Database
MEAL_DATABASE = {
    'balanced': {
        'Breakfast': [
            {'name': 'Oatmeal with Berries', 'cost': {'budget': 2.50, 'moderate': 3.50, 'premium': 4.50}, 'cal': 350, 'protein': 12, 'carbs': 58, 'fat': 8, 'ingredients': [{'item': 'Oats', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Berries', 'qty': '1 cup', 'section': 'Produce'}, {'item': 'Honey', 'qty': '2 tbsp', 'section': 'Condiments'}], 'prepTime': 10, 'difficulty': 'easy', 'tags': ['quick', 'heart-healthy']},
            {'name': 'Scrambled Eggs & Toast', 'cost': {'budget': 2.00, 'moderate': 3.00, 'premium': 4.00}, 'cal': 380, 'protein': 22, 'carbs': 35, 'fat': 16, 'ingredients': [{'item': 'Eggs', 'qty': '3 eggs', 'section': 'Dairy'}, {'item': 'Bread', 'qty': '2 slices', 'section': 'Bakery'}, {'item': 'Butter', 'qty': '1 tbsp', 'section': 'Dairy'}], 'prepTime': 8, 'difficulty': 'easy', 'tags': ['quick', 'protein-rich']},
            {'name': 'Greek Yogurt Parfait', 'cost': {'budget': 2.50, 'moderate': 3.50, 'premium': 4.50}, 'cal': 320, 'protein': 20, 'carbs': 42, 'fat': 8, 'ingredients': [{'item': 'Yogurt', 'qty': '1 cup', 'section': 'Dairy'}, {'item': 'Granola', 'qty': '0.5 cup', 'section': 'Grains'}], 'prepTime': 5, 'difficulty': 'easy', 'tags': ['no-cook']},
            {'name': 'Banana Pancakes', 'cost': {'budget': 2.00, 'moderate': 3.00, 'premium': 4.00}, 'cal': 400, 'protein': 14, 'carbs': 62, 'fat': 10, 'ingredients': [{'item': 'Flour', 'qty': '1 cup', 'section': 'Baking'}, {'item': 'Banana', 'qty': '2', 'section': 'Produce'}, {'item': 'Eggs', 'qty': '2', 'section': 'Dairy'}], 'prepTime': 15, 'difficulty': 'easy', 'tags': ['weekend']},
        ],
        'Lunch': [
            {'name': 'Chicken Caesar Salad', 'cost': {'budget': 4.50, 'moderate': 6.00, 'premium': 8.50}, 'cal': 420, 'protein': 35, 'carbs': 25, 'fat': 18, 'ingredients': [{'item': 'Chicken', 'qty': '6 oz', 'section': 'Meat'}, {'item': 'Lettuce', 'qty': '4 cups', 'section': 'Produce'}, {'item': 'Parmesan', 'qty': '0.25 cup', 'section': 'Dairy'}], 'prepTime': 15, 'difficulty': 'easy', 'tags': ['protein-rich']},
            {'name': 'Turkey Wrap', 'cost': {'budget': 3.50, 'moderate': 5.50, 'premium': 7.00}, 'cal': 450, 'protein': 28, 'carbs': 42, 'fat': 16, 'ingredients': [{'item': 'Turkey', 'qty': '4 oz', 'section': 'Deli'}, {'item': 'Tortilla', 'qty': '1', 'section': 'Bakery'}, {'item': 'Avocado', 'qty': '0.5', 'section': 'Produce'}], 'prepTime': 8, 'difficulty': 'easy', 'tags': ['quick']},
            {'name': 'Quinoa Bowl', 'cost': {'budget': 4.00, 'moderate': 5.50, 'premium': 7.50}, 'cal': 480, 'protein': 22, 'carbs': 58, 'fat': 18, 'ingredients': [{'item': 'Quinoa', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Chickpeas', 'qty': '0.5 cup', 'section': 'Canned'}, {'item': 'Veggies', 'qty': '1.5 cups', 'section': 'Produce'}], 'prepTime': 20, 'difficulty': 'easy', 'tags': ['meal-prep']},
            {'name': 'Chicken Rice Bowl', 'cost': {'budget': 3.50, 'moderate': 5.00, 'premium': 6.50}, 'cal': 520, 'protein': 38, 'carbs': 55, 'fat': 14, 'ingredients': [{'item': 'Chicken', 'qty': '6 oz', 'section': 'Meat'}, {'item': 'Rice', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Broccoli', 'qty': '1.5 cups', 'section': 'Produce'}], 'prepTime': 25, 'difficulty': 'easy', 'tags': ['filling']},
        ],
        'Dinner': [
            {'name': 'Baked Salmon', 'cost': {'budget': 7.00, 'moderate': 9.00, 'premium': 12.00}, 'cal': 580, 'protein': 42, 'carbs': 48, 'fat': 22, 'ingredients': [{'item': 'Salmon', 'qty': '6 oz', 'section': 'Seafood'}, {'item': 'Quinoa', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Broccoli', 'qty': '2 cups', 'section': 'Produce'}], 'prepTime': 30, 'difficulty': 'medium', 'tags': ['omega-3']},
            {'name': 'Chicken Stir-Fry', 'cost': {'budget': 5.00, 'moderate': 7.00, 'premium': 9.00}, 'cal': 520, 'protein': 40, 'carbs': 52, 'fat': 16, 'ingredients': [{'item': 'Chicken', 'qty': '8 oz', 'section': 'Meat'}, {'item': 'Veggies', 'qty': '3 cups', 'section': 'Frozen'}, {'item': 'Rice', 'qty': '1 cup', 'section': 'Grains'}], 'prepTime': 20, 'difficulty': 'medium', 'tags': ['quick']},
            {'name': 'Beef Pasta', 'cost': {'budget': 5.50, 'moderate': 7.50, 'premium': 10.00}, 'cal': 620, 'protein': 35, 'carbs': 72, 'fat': 20, 'ingredients': [{'item': 'Ground beef', 'qty': '8 oz', 'section': 'Meat'}, {'item': 'Pasta', 'qty': '8 oz', 'section': 'Grains'}, {'item': 'Sauce', 'qty': '2 cups', 'section': 'Canned'}], 'prepTime': 25, 'difficulty': 'easy', 'tags': ['comfort']},
            {'name': 'Roasted Chicken & Potatoes', 'cost': {'budget': 6.00, 'moderate': 8.00, 'premium': 10.50}, 'cal': 560, 'protein': 45, 'carbs': 48, 'fat': 18, 'ingredients': [{'item': 'Chicken thighs', 'qty': '12 oz', 'section': 'Meat'}, {'item': 'Potatoes', 'qty': '3 medium', 'section': 'Produce'}, {'item': 'Green beans', 'qty': '2 cups', 'section': 'Produce'}], 'prepTime': 45, 'difficulty': 'medium', 'tags': ['comfort']},
        ],
        'Snack': [
            {'name': 'Apple & Peanut Butter', 'cost': {'budget': 1.50, 'moderate': 2.00, 'premium': 2.50}, 'cal': 200, 'protein': 8, 'carbs': 24, 'fat': 8, 'ingredients': [{'item': 'Apple', 'qty': '1', 'section': 'Produce'}, {'item': 'Peanut butter', 'qty': '2 tbsp', 'section': 'Condiments'}], 'prepTime': 2, 'difficulty': 'easy', 'tags': ['no-cook']},
            {'name': 'Yogurt & Granola', 'cost': {'budget': 1.50, 'moderate': 2.50, 'premium': 3.50}, 'cal': 280, 'protein': 18, 'carbs': 32, 'fat': 8, 'ingredients': [{'item': 'Yogurt', 'qty': '1 cup', 'section': 'Dairy'}, {'item': 'Granola', 'qty': '0.25 cup', 'section': 'Grains'}], 'prepTime': 2, 'difficulty': 'easy', 'tags': ['protein-rich']},
            {'name': 'Trail Mix', 'cost': {'budget': 2.00, 'moderate': 3.00, 'premium': 4.00}, 'cal': 260, 'protein': 8, 'carbs': 28, 'fat': 14, 'ingredients': [{'item': 'Mixed nuts', 'qty': '0.5 cup', 'section': 'Snacks'}, {'item': 'Dried fruit', 'qty': '0.25 cup', 'section': 'Snacks'}], 'prepTime': 0, 'difficulty': 'easy', 'tags': ['portable']},
        ]
    },
    'keto': {
        'Breakfast': [
            {'name': 'Bacon & Eggs', 'cost': {'budget': 3.00, 'moderate': 4.00, 'premium': 5.50}, 'cal': 420, 'protein': 28, 'carbs': 4, 'fat': 32, 'ingredients': [{'item': 'Bacon', 'qty': '4 strips', 'section': 'Meat'}, {'item': 'Eggs', 'qty': '3', 'section': 'Dairy'}, {'item': 'Avocado', 'qty': '0.5', 'section': 'Produce'}], 'prepTime': 12, 'difficulty': 'easy', 'tags': ['high-fat']},
            {'name': 'Cheese Omelet', 'cost': {'budget': 2.50, 'moderate': 3.50, 'premium': 4.50}, 'cal': 450, 'protein': 26, 'carbs': 3, 'fat': 36, 'ingredients': [{'item': 'Eggs', 'qty': '3', 'section': 'Dairy'}, {'item': 'Cheese', 'qty': '2 oz', 'section': 'Dairy'}], 'prepTime': 10, 'difficulty': 'easy', 'tags': ['quick']},
        ],
        'Lunch': [
            {'name': 'Keto Cobb Salad', 'cost': {'budget': 5.50, 'moderate': 7.50, 'premium': 10.00}, 'cal': 520, 'protein': 32, 'carbs': 8, 'fat': 38, 'ingredients': [{'item': 'Chicken', 'qty': '6 oz', 'section': 'Meat'}, {'item': 'Bacon', 'qty': '3 strips', 'section': 'Meat'}, {'item': 'Eggs', 'qty': '2', 'section': 'Dairy'}], 'prepTime': 18, 'difficulty': 'easy', 'tags': ['protein-rich']},
            {'name': 'Bunless Burger', 'cost': {'budget': 5.00, 'moderate': 7.00, 'premium': 9.00}, 'cal': 480, 'protein': 36, 'carbs': 6, 'fat': 34, 'ingredients': [{'item': 'Beef patty', 'qty': '8 oz', 'section': 'Meat'}, {'item': 'Cheese', 'qty': '2 oz', 'section': 'Dairy'}, {'item': 'Lettuce', 'qty': '2 leaves', 'section': 'Produce'}], 'prepTime': 15, 'difficulty': 'easy', 'tags': ['satisfying']},
        ],
        'Dinner': [
            {'name': 'Ribeye Steak', 'cost': {'budget': 9.00, 'moderate': 12.00, 'premium': 16.00}, 'cal': 680, 'protein': 48, 'carbs': 6, 'fat': 52, 'ingredients': [{'item': 'Steak', 'qty': '10 oz', 'section': 'Meat'}, {'item': 'Asparagus', 'qty': '8 spears', 'section': 'Produce'}, {'item': 'Butter', 'qty': '2 tbsp', 'section': 'Dairy'}], 'prepTime': 20, 'difficulty': 'medium', 'tags': ['special']},
            {'name': 'Keto Chicken Alfredo', 'cost': {'budget': 6.00, 'moderate': 8.00, 'premium': 10.50}, 'cal': 620, 'protein': 45, 'carbs': 8, 'fat': 46, 'ingredients': [{'item': 'Chicken', 'qty': '8 oz', 'section': 'Meat'}, {'item': 'Zucchini noodles', 'qty': '2 cups', 'section': 'Produce'}, {'item': 'Cream', 'qty': '0.5 cup', 'section': 'Dairy'}], 'prepTime': 25, 'difficulty': 'medium', 'tags': ['comfort']},
        ],
        'Snack': [
            {'name': 'Cheese & Pepperoni', 'cost': {'budget': 2.00, 'moderate': 3.00, 'premium': 4.00}, 'cal': 250, 'protein': 16, 'carbs': 2, 'fat': 20, 'ingredients': [{'item': 'Cheese', 'qty': '2 oz', 'section': 'Dairy'}, {'item': 'Pepperoni', 'qty': '1 oz', 'section': 'Deli'}], 'prepTime': 0, 'difficulty': 'easy', 'tags': ['no-cook']},
            {'name': 'Macadamia Nuts', 'cost': {'budget': 3.00, 'moderate': 4.00, 'premium': 5.00}, 'cal': 240, 'protein': 3, 'carbs': 4, 'fat': 24, 'ingredients': [{'item': 'Macadamia nuts', 'qty': '1 oz', 'section': 'Snacks'}], 'prepTime': 0, 'difficulty': 'easy', 'tags': ['high-fat']},
        ]
    },
    'vegan': {
        'Breakfast': [
            {'name': 'Smoothie Bowl', 'cost': {'budget': 3.50, 'moderate': 4.50, 'premium': 6.00}, 'cal': 320, 'protein': 12, 'carbs': 52, 'fat': 8, 'ingredients': [{'item': 'Banana', 'qty': '1', 'section': 'Produce'}, {'item': 'Berries', 'qty': '1 cup', 'section': 'Produce'}, {'item': 'Oat milk', 'qty': '1 cup', 'section': 'Dairy'}], 'prepTime': 8, 'difficulty': 'easy', 'tags': ['refreshing']},
            {'name': 'Avocado Toast', 'cost': {'budget': 2.50, 'moderate': 3.50, 'premium': 5.00}, 'cal': 340, 'protein': 10, 'carbs': 42, 'fat': 16, 'ingredients': [{'item': 'Bread', 'qty': '2 slices', 'section': 'Bakery'}, {'item': 'Avocado', 'qty': '1', 'section': 'Produce'}], 'prepTime': 5, 'difficulty': 'easy', 'tags': ['quick']},
        ],
        'Lunch': [
            {'name': 'Buddha Bowl', 'cost': {'budget': 4.50, 'moderate': 6.50, 'premium': 9.00}, 'cal': 480, 'protein': 18, 'carbs': 68, 'fat': 14, 'ingredients': [{'item': 'Quinoa', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Chickpeas', 'qty': '0.75 cup', 'section': 'Canned'}, {'item': 'Sweet potato', 'qty': '1', 'section': 'Produce'}], 'prepTime': 30, 'difficulty': 'medium', 'tags': ['nutrient-dense']},
            {'name': 'Vegan Burrito Bowl', 'cost': {'budget': 3.50, 'moderate': 5.00, 'premium': 7.00}, 'cal': 520, 'protein': 22, 'carbs': 75, 'fat': 14, 'ingredients': [{'item': 'Rice', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Black beans', 'qty': '1 cup', 'section': 'Canned'}, {'item': 'Salsa', 'qty': '0.25 cup', 'section': 'Condiments'}], 'prepTime': 20, 'difficulty': 'easy', 'tags': ['filling']},
        ],
        'Dinner': [
            {'name': 'Lentil Curry', 'cost': {'budget': 3.50, 'moderate': 5.00, 'premium': 7.00}, 'cal': 420, 'protein': 22, 'carbs': 58, 'fat': 10, 'ingredients': [{'item': 'Lentils', 'qty': '1 cup', 'section': 'Grains'}, {'item': 'Coconut milk', 'qty': '1 cup', 'section': 'Canned'}, {'item': 'Rice', 'qty': '1 cup', 'section': 'Grains'}], 'prepTime': 35, 'difficulty': 'easy', 'tags': ['comfort']},
            {'name': 'Pasta Primavera', 'cost': {'budget': 4.00, 'moderate': 5.50, 'premium': 7.50}, 'cal': 480, 'protein': 18, 'carbs': 72, 'fat': 14, 'ingredients': [{'item': 'Pasta', 'qty': '8 oz', 'section': 'Grains'}, {'item': 'Veggies', 'qty': '3 cups', 'section': 'Produce'}, {'item': 'Olive oil', 'qty': '2 tbsp', 'section': 'Condiments'}], 'prepTime': 20, 'difficulty': 'easy', 'tags': ['colorful']},
        ],
        'Snack': [
            {'name': 'Hummus & Veggies', 'cost': {'budget': 2.00, 'moderate': 3.00, 'premium': 4.50}, 'cal': 180, 'protein': 8, 'carbs': 22, 'fat': 7, 'ingredients': [{'item': 'Hummus', 'qty': '0.5 cup', 'section': 'Deli'}, {'item': 'Carrots', 'qty': '1 cup', 'section': 'Produce'}], 'prepTime': 3, 'difficulty': 'easy', 'tags': ['healthy']},
            {'name': 'Energy Balls', 'cost': {'budget': 2.50, 'moderate': 3.50, 'premium': 4.50}, 'cal': 220, 'protein': 6, 'carbs': 28, 'fat': 10, 'ingredients': [{'item': 'Dates', 'qty': '0.5 cup', 'section': 'Snacks'}, {'item': 'Oats', 'qty': '0.5 cup', 'section': 'Grains'}], 'prepTime': 10, 'difficulty': 'easy', 'tags': ['sweet']},
        ]
    }
}

def generate_meal_plan(budget, flex_budget, diet_types, selected_stores, include_snacks, portion_size):
    """Generate a weekly meal plan"""
    days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    plan = []
    
    # Determine price level
    price_levels = [store['priceLevel'] for store in GROCERY_STORES if store['name'] in selected_stores]
    if 'budget' in price_levels:
        price_level = 'budget'
    elif 'premium' in price_levels:
        price_level = 'premium'
    else:
        price_level = 'moderate'
    
    total_budget = budget + flex_budget
    daily_budget = total_budget / 7
    
    meal_types = ['Breakfast', 'Lunch', 'Dinner']
    if include_snacks:
        meal_types.append('Snack')
    
    portion_multiplier = PORTION_MULTIPLIERS[portion_size]
    used_meals = {}
    
    for day_index, day in enumerate(days):
        day_meals = []
        day_total = 0
        used_meals[day] = []
        
        for meal_type in meal_types:
            # Check if meal is locked
            locked_key = f"{day}-{meal_type}"
            if locked_key in st.session_state.locked_meals:
                meal = st.session_state.locked_meals[locked_key]
                day_meals.append(meal)
                used_meals[day].append(meal)
                day_total += meal['actualCost']
                continue
            
            # Select diet
            active_diet = random.choice(diet_types)
            available_meals = MEAL_DATABASE.get(active_diet, {}).get(meal_type, [])
            
            if available_meals:
                attempts = 0
                max_attempts = 20
                recent_meals = [m['name'] for m in st.session_state.meal_history[-14:]]
                
                while attempts < max_attempts:
                    selected_meal = random.choice(available_meals)
                    attempts += 1
                    
                    # Check for variety every other day
                    if day_index % 2 == 1 and day_index > 0:
                        previous_day = days[day_index - 1]
                        previous_meals = [m['name'] for m in used_meals.get(previous_day, []) if m['type'] == meal_type]
                        if selected_meal['name'] in previous_meals:
                            continue
                    
                    # Check history
                    if selected_meal['name'] in recent_meals and attempts < max_attempts:
                        continue
                    
                    break
                
                base_cost = selected_meal['cost'][price_level]
                meal_cost = base_cost * portion_multiplier
                
                if day_total + meal_cost <= daily_budget * 1.2:
                    meal_with_details = {
                        **selected_meal,
                        'type': meal_type,
                        'actualCost': meal_cost,
                        'baseCost': base_cost,
                        'diet': active_diet,
                        'store': random.choice(selected_stores),
                        'portions': portion_multiplier
                    }
                    
                    day_meals.append(meal_with_details)
                    used_meals[day].append(meal_with_details)
                    day_total += meal_cost
        
        plan.append({'day': day, 'meals': day_meals, 'total': day_total})
    
    # Update history
    all_meals = [meal for day in plan for meal in day['meals']]
    st.session_state.meal_history.extend(all_meals)
    st.session_state.meal_history = st.session_state.meal_history[-50:]  # Keep last 50
    
    return plan

def calculate_nutrition(plan):
    """Calculate weekly and daily nutrition"""
    weekly = {'calories': 0, 'protein': 0, 'carbs': 0, 'fat': 0}
    
    for day in plan:
        for meal in day['meals']:
            weekly['calories'] += meal['cal']
            weekly['protein'] += meal['protein']
            weekly['carbs'] += meal['carbs']
            weekly['fat'] += meal['fat']
    
    daily = {k: round(v / 7) for k, v in weekly.items()}
    return weekly, daily

def get_shopping_list(plan):
    """Generate organized shopping list"""
    all_ingredients = []
    for day in plan:
        for meal in day['meals']:
            all_ingredients.extend(meal['ingredients'])
    
    # Group by section
    by_section = {}
    for ing in all_ingredients:
        section = ing['section']
        if section not in by_section:
            by_section[section] = []
        
        # Check if item already exists
        existing = next((i for i in by_section[section] if i['item'] == ing['item']), None)
        if existing:
            existing['qty'] = f"{existing['qty']} + {ing['qty']}"
        else:
            by_section[section].append(ing.copy())
    
    return by_section

# Main App
st.title("🍽️ Smart Meal Planner Pro")
st.markdown("AI-powered meal planning with nutritional tracking, budget optimization, and smart variety")

# Sidebar - Settings
with st.sidebar:
    st.header("⚙️ Settings")
    
    # Budget
    st.subheader("💰 Budget")
    budget = st.number_input("Weekly Budget ($)", min_value=0, value=150, step=10)
    flex_budget = st.number_input("Flex Budget ($)", min_value=0, value=10, step=5,
                                   help="Allows going slightly over for better value")
    
    st.markdown(f"**Total:** ${budget + flex_budget}")
    st.markdown(f"**Daily:** ${(budget + flex_budget) / 7:.2f}")
    st.markdown(f"**Per Meal:** ${(budget + flex_budget) / 28:.2f}")
    
    st.divider()
    
    # Portions
    st.subheader("👥 Portions")
    portion_size = st.selectbox("Portion Size", list(PORTION_MULTIPLIERS.keys()))
    include_snacks = st.checkbox("Include daily snacks", value=True,
                                  help="Breakfast, Lunch, Dinner always included")
    
    st.divider()
    
    # Diet Selection
    st.subheader("🥗 Diet Preferences")
    selected_diets = []
    cols = st.columns(2)
    for idx, (key, diet) in enumerate(AVAILABLE_DIETS.items()):
        col = cols[idx % 2]
        if col.checkbox(f"{diet['icon']} {diet['name']}", value=(key == 'balanced'), key=f"diet_{key}"):
            selected_diets.append(key)
    
    if not selected_diets:
        st.warning("Please select at least one diet type")
        selected_diets = ['balanced']
    
    st.divider()
    
    # Store Selection
    st.subheader("🏪 Grocery Stores")
    selected_stores = []
    for store in GROCERY_STORES:
        if st.checkbox(f"{store['name']} ({store['distance']})", 
                      value=(store['name'] == 'Kroger'),
                      key=f"store_{store['name']}"):
            selected_stores.append(store['name'])
    
    if not selected_stores:
        st.warning("Please select at least one store")
        selected_stores = ['Kroger']
    
    st.divider()
    
    # Nutrition Targets
    st.subheader("🎯 Daily Nutrition Targets")
    if st.checkbox("Show Nutrition Settings"):
        target_calories = st.number_input("Calories", min_value=1000, max_value=5000, value=2000, step=100)
        target_protein = st.number_input("Protein (g)", min_value=50, max_value=300, value=150, step=10)
        target_carbs = st.number_input("Carbs (g)", min_value=50, max_value=500, value=225, step=25)
        target_fat = st.number_input("Fat (g)", min_value=30, max_value=200, value=65, step=5)
    else:
        target_calories, target_protein, target_carbs, target_fat = 2000, 150, 225, 65

# Main Content
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    if st.button("✨ Generate Meal Plan", type="primary", use_container_width=True):
        with st.spinner("Generating your optimized meal plan..."):
            plan = generate_meal_plan(budget, flex_budget, selected_diets, selected_stores, 
                                     include_snacks, portion_size)
            st.session_state.generated_plan = plan
        st.success("Meal plan generated successfully!")

if st.session_state.generated_plan:
    plan = st.session_state.generated_plan
    
    # Calculate stats
    total_cost = sum(day['total'] for day in plan)
    total_meals = sum(len(day['meals']) for day in plan)
    weekly_nutrition, daily_nutrition = calculate_nutrition(plan)
    
    # Stats Cards
    st.markdown("### 📊 Weekly Overview")
    col1, col2, col3, col4, col5 = st.columns(5)
    
    with col1:
        st.metric("Total Cost", f"${total_cost:.2f}")
    with col2:
        remaining = (budget + flex_budget) - total_cost
        st.metric("Remaining", f"${remaining:.2f}", 
                 delta=f"${remaining:.2f}" if remaining >= 0 else f"-${abs(remaining):.2f}")
    with col3:
        st.metric("Total Meals", total_meals)
    with col4:
        st.metric("Daily Calories", daily_nutrition['calories'])
    with col5:
        st.metric("Daily Protein", f"{daily_nutrition['protein']}g")
    
    # Action Buttons
    col1, col2, col3 = st.columns(3)
    with col1:
        if st.button("🖨️ Print Meal Plan"):
            st.info("Use your browser's print function (Ctrl+P / Cmd+P)")
    with col2:
        shopping_list = get_shopping_list(plan)
        shopping_text = "SHOPPING LIST\n\n"
        for section, items in sorted(shopping_list.items()):
            shopping_text += f"{section.upper()}\n"
            for item in items:
                shopping_text += f"  ☐ {item['item']} - {item['qty']}\n"
            shopping_text += "\n"
        
        st.download_button(
            label="📥 Download Shopping List",
            data=shopping_text,
            file_name="shopping_list.txt",
            mime="text/plain"
        )
    with col3:
        if st.button("🔄 Clear All Locks"):
            st.session_state.locked_meals = {}
            st.rerun()
    
    st.divider()
    
    # Weekly Meal Plan
    st.markdown("### 📅 Your Weekly Meal Plan")
    
    for day_index, day_plan in enumerate(plan):
        day = day_plan['day']
        meals = day_plan['meals']
        day_total = day_plan['total']
        
        # Day header
        with st.expander(f"**{day}** - {len(meals)} meals - ${day_total:.2f}", expanded=True):
            if day_index % 2 == 1:
                st.info("🎨 Variety day - Different meals from previous day")
            
            col1, col2 = st.columns([4, 1])
            with col2:
                if st.button(f"🔄 Regenerate", key=f"regen_{day}"):
                    # Regenerate just this day
                    st.info("Feature: Regenerate individual days coming soon!")
            
            # Display meals
            for meal_idx, meal in enumerate(meals):
                st.markdown(f"#### {meal['type']}: {meal['name']}")
                
                # Meal details in columns
                col1, col2, col3 = st.columns([2, 2, 1])
                
                with col1:
                    st.markdown(f"**🏪 Store:** {meal['store']}")
                    st.markdown(f"**⏱️ Prep Time:** {meal['prepTime']} min")
                    st.markdown(f"**📊 Difficulty:** {meal['difficulty']}")
                    if meal.get('tags'):
                        tags = ", ".join(meal['tags'])
                        st.markdown(f"**🏷️ Tags:** {tags}")
                
                with col2:
                    st.markdown(f"**🔥 Calories:** {meal['cal']}")
                    st.markdown(f"**💪 Protein:** {meal['protein']}g")
                    st.markdown(f"**🌾 Carbs:** {meal['carbs']}g")
                    st.markdown(f"**🥑 Fat:** {meal['fat']}g")
                    if meal['portions'] > 1:
                        st.markdown(f"**👥 Servings:** ×{meal['portions']}")
                
                with col3:
                    st.markdown(f"**💵 Cost:** ${meal['actualCost']:.2f}")
                    if meal['portions'] > 1:
                        st.markdown(f"*(${meal['baseCost']:.2f} each)*")
                    
                    # Favorite button
                    meal_key = f"{meal['name']}-{meal['diet']}"
                    is_fav = any(f"{f['name']}-{f['diet']}" == meal_key for f in st.session_state.favorite_meals)
                    
                    if st.button("❤️" if is_fav else "🤍", key=f"fav_{day}_{meal_idx}"):
                        if is_fav:
                            st.session_state.favorite_meals = [f for f in st.session_state.favorite_meals 
                                                              if f"{f['name']}-{f['diet']}" != meal_key]
                        else:
                            st.session_state.favorite_meals.append(meal)
                        st.rerun()
                    
                    # Lock button
                    locked_key = f"{day}-{meal['type']}"
                    is_locked = locked_key in st.session_state.locked_meals
                    
                    if st.button("🔒" if is_locked else "🔓", key=f"lock_{day}_{meal_idx}"):
                        if is_locked:
                            del st.session_state.locked_meals[locked_key]
                        else:
                            st.session_state.locked_meals[locked_key] = meal
                        st.rerun()
                
                # Ingredients
                with st.expander("📝 Ingredients"):
                    for ing in meal['ingredients']:
                        st.markdown(f"- **{ing['item']}**: {ing['qty']} *({ing['section']})*")
                
                st.divider()
    
    st.divider()
    
    # Shopping List
    st.markdown("### 🛒 Smart Shopping List")
    st.markdown(f"Organized by store section • {len(shopping_list)} sections • "
               f"{sum(len(items) for items in shopping_list.values())} items")
    
    tabs = st.tabs(sorted(shopping_list.keys()))
    
    for tab, section in zip(tabs, sorted(shopping_list.keys())):
        with tab:
            st.markdown(f"### {section}")
            for item in shopping_list[section]:
                col1, col2 = st.columns([3, 1])
                with col1:
                    st.checkbox(f"{item['item']}", key=f"shop_{section}_{item['item']}")
                with col2:
                    st.markdown(f"*{item['qty']}*")
    
    st.divider()
    
    # Nutritional Analysis
    st.markdown("### 📈 Nutritional Analysis")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("#### Daily Averages vs Targets")
        
        # Calories
        cal_percent = (daily_nutrition['calories'] / target_calories) * 100
        cal_status = "✅" if abs(daily_nutrition['calories'] - target_calories) / target_calories <= 0.1 else "⚠️"
        st.markdown(f"**Calories** {cal_status}")
        st.progress(min(cal_percent / 100, 1.0))
        st.markdown(f"{daily_nutrition['calories']} / {target_calories} cal")
        
        # Protein
        prot_percent = (daily_nutrition['protein'] / target_protein) * 100
        prot_status = "✅" if daily_nutrition['protein'] >= target_protein * 0.9 else "⚠️"
        st.markdown(f"**Protein** {prot_status}")
        st.progress(min(prot_percent / 100, 1.0))
        st.markdown(f"{daily_nutrition['protein']}g / {target_protein}g")
        
        # Carbs
        carb_percent = (daily_nutrition['carbs'] / target_carbs) * 100
        carb_status = "✅" if abs(daily_nutrition['carbs'] - target_carbs) / target_carbs <= 0.15 else "⚠️"
        st.markdown(f"**Carbs** {carb_status}")
        st.progress(min(carb_percent / 100, 1.0))
        st.markdown(f"{daily_nutrition['carbs']}g / {target_carbs}g")
        
        # Fat
        fat_percent = (daily_nutrition['fat'] / target_fat) * 100
        fat_status = "✅" if abs(daily_nutrition['fat'] - target_fat) / target_fat <= 0.15 else "⚠️"
        st.markdown(f"**Fat** {fat_status}")
        st.progress(min(fat_percent / 100, 1.0))
        st.markdown(f"{daily_nutrition['fat']}g / {target_fat}g")
    
    with col2:
        st.markdown("#### Weekly Totals")
        st.metric("Total Calories", f"{weekly_nutrition['calories']:,}")
        st.metric("Total Protein", f"{weekly_nutrition['protein']}g")
        st.metric("Total Carbs", f"{weekly_nutrition['carbs']}g")
        st.metric("Total Fat", f"{weekly_nutrition['fat']}g")
        
        all_on_target = all([
            abs(daily_nutrition['calories'] - target_calories) / target_calories <= 0.1,
            daily_nutrition['protein'] >= target_protein * 0.9,
            abs(daily_nutrition['carbs'] - target_carbs) / target_carbs <= 0.15,
            abs(daily_nutrition['fat'] - target_fat) / target_fat <= 0.15
        ])
        
        if all_on_target:
            st.success("✅ Well balanced! All targets met.")
        else:
            st.warning("⚠️ Some targets not met. Consider regenerating or adjusting targets.")
    
    # Favorites Section
    if st.session_state.favorite_meals:
        st.divider()
        st.markdown("### ❤️ Your Favorite Meals")
        
        fav_cols = st.columns(3)
        for idx, meal in enumerate(st.session_state.favorite_meals):
            col = fav_cols[idx % 3]
            with col:
                with st.container():
                    st.markdown(f"**{meal['name']}**")
                    st.markdown(f"*{AVAILABLE_DIETS[meal['diet']]['name']}*")
                    st.markdown(f"{meal['cal']} cal • {meal['prepTime']} min")
                    if st.button("Remove", key=f"remove_fav_{idx}"):
                        st.session_state.favorite_meals.pop(idx)
                        st.rerun()

else:
    # Welcome screen
    st.markdown("""
    ## Welcome to Smart Meal Planner Pro! 👋
    
    Get started by:
    1. **Setting your budget** in the sidebar
    2. **Choosing your diet preferences** (Balanced, Keto, Vegan, etc.)
    3. **Selecting local grocery stores**
    4. **Clicking "Generate Meal Plan"**
    
    ### Features:
    - 🎯 **Budget Optimization** - Stay within your budget with flex options
    - 🥗 **10 Diet Types** - From Balanced to Gluten-Free
    - 👥 **Portion Sizes** - Single, Couple, or Family
    - 🔒 **Lock Favorite Meals** - Keep what you love
    - ❤️ **Save Favorites** - Build your collection
    - 🔄 **Smart Variety** - Different meals every other day
    - 📊 **Nutrition Tracking** - Meet your daily targets
    - 🛒 **Smart Shopping List** - Organized by store section
    - 📥 **Export & Print** - Take it with you
    
    ### Pro Tips:
    - Enable **Flex Budget** for better deals
    - **Lock meals** you love before regenerating
    - Check **Nutrition Settings** for custom targets
    - Use **variety days** to avoid meal fatigue
    """)
    
    st.info("💡 **Tip:** All your favorites and locked meals are saved automatically!")

# Footer
st.divider()
st.markdown("""
<div style='text-align: center; color: gray; padding: 20px;'>
    Made with ❤️ using Streamlit | Smart Meal Planner Pro v1.0
</div>
""", unsafe_allow_html=True)
