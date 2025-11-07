export interface UserDetails {
  height: number; // cm
  weight: number; // kg
  age: number;
  gender: 'male' | 'female';
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extra_active';
}

export interface CalorieResults {
  maintenance_calories: number;
  cut_calories: number;
  bulk_calories: number;
  protein_grams: number;
  carbs_grams: number;
  fat_grams: number;
}

// Activity level multipliers
const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  lightly_active: 1.375,
  moderately_active: 1.55,
  very_active: 1.725,
  extra_active: 1.9,
};

/**
 * Calculate BMR using Mifflin-St Jeor Equation
 */
function calculateBMR(weight: number, height: number, age: number, gender: 'male' | 'female'): number {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

/**
 * Calculate maintenance calories and macros based on user details
 */
export function calculateCalories(details: UserDetails): CalorieResults {
  const bmr = calculateBMR(details.weight, details.height, details.age, details.gender);
  const maintenance = Math.round(bmr * ACTIVITY_MULTIPLIERS[details.activity_level]);
  
  // Calculate calories for different goals
  const cut = Math.round(maintenance * 0.8); // 20% deficit
  const bulk = Math.round(maintenance * 1.15); // 15% surplus
  
  // Calculate macros (protein: 2g/kg, fat: 25% of calories, rest carbs)
  const protein = Math.round(details.weight * 2);
  const fatCalories = Math.round(maintenance * 0.25);
  const fat = Math.round(fatCalories / 9); // 9 calories per gram of fat
  const proteinCalories = protein * 4; // 4 calories per gram of protein
  const carbCalories = maintenance - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4); // 4 calories per gram of carbs
  
  return {
    maintenance_calories: maintenance,
    cut_calories: cut,
    bulk_calories: bulk,
    protein_grams: protein,
    carbs_grams: carbs,
    fat_grams: fat,
  };
}

/**
 * Get target calories and macros for a specific goal
 */
export function getGoalCalories(
  maintenance: number,
  goalType: 'cut' | 'bulk' | 'maintain'
): { calories: number; protein: number; carbs: number; fat: number } {
  let targetCalories = maintenance;
  
  if (goalType === 'cut') {
    targetCalories = Math.round(maintenance * 0.8);
  } else if (goalType === 'bulk') {
    targetCalories = Math.round(maintenance * 1.15);
  }
  
  // Recalculate macros based on target calories
  const protein = Math.round((targetCalories * 0.3) / 4); // 30% protein
  const fat = Math.round((targetCalories * 0.25) / 9); // 25% fat
  const carbs = Math.round((targetCalories * 0.45) / 4); // 45% carbs
  
  return {
    calories: targetCalories,
    protein,
    carbs,
    fat,
  };
}