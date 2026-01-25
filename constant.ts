
import { FoodDrop } from './backend/types';

export const KW_CENTER = {
  lat: 43.4516,
  lng: -80.4925,
};

export const CANADIAN_CITIES = [
  'Kitchener', 'Waterloo', 'Cambridge', 'Guelph', 'Toronto', 'Hamilton', 'London'
];

export const INITIAL_DROPS: FoodDrop[] = [
  {
    id: '1',
    donorId: 'd1',
    donorName: 'Kitchener Market Bakery',
    donorPhone: '519-555-0101',
    title: 'Fresh Sourdough Loaves',
    description: '10 loaves of fresh sourdough baked this morning. Must go today!',
    quantity: '10 loaves',
    pickupAddress: '300 King St E',
    city: 'Kitchener',
    lat: 43.4497,
    lng: -80.4855,
    pickupStartTime: new Date().toISOString(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
    tags: ['Vegan', 'Bakery'],
    status: 'available',
    createdAt: new Date().toISOString(),
    aiSummary: 'Fresh sourdough loaves from a local bakery, perfect for families.'
  },
  {
    id: '2',
    donorId: 'd2',
    donorName: 'Uptown Bistro',
    donorPhone: '519-555-0202',
    title: 'Individual Pasta Meals',
    description: 'Surplus pasta with marinara. Halal and Vegetarian.',
    quantity: '15 portions',
    pickupAddress: '75 King St S',
    city: 'Waterloo',
    lat: 43.4651,
    lng: -80.5223,
    pickupStartTime: new Date().toISOString(),
    availableUntil: new Date(Date.now() + 1000 * 60 * 300).toISOString(),
    tags: ['Halal', 'Vegetarian', 'Hot Meal'],
    status: 'available',
    createdAt: new Date().toISOString(),
    aiSummary: 'Nutritious halal pasta meals ready for immediate pickup.'
  }
];

export const DIETARY_TAGS = [
  'Halal', 'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Kosher'
];