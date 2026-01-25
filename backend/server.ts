
import { FoodDrop } from './types';
import { analyzeFoodDescription } from '../services/geminiService';

// Mock Database Initial State
const INITIAL_DROPS: FoodDrop[] = [
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

let dbDrops: FoodDrop[] = [...INITIAL_DROPS];

/**
 * BarakahLink Backend API
 */
export const BarakahBackend = {
  async getDrops(): Promise<FoodDrop[]> {
    await new Promise(r => setTimeout(r, 300));
    return [...dbDrops];
  },

  async createDrop(dropData: Partial<FoodDrop>, donorId: string, donorName: string): Promise<FoodDrop> {
    const analysis = await analyzeFoodDescription(dropData.description || '');
    
    if (!analysis.isAppropriate) {
      throw new Error("Content inappropriate for the community platform.");
    }

    const newDrop: FoodDrop = {
      id: Math.random().toString(36).substr(2, 9),
      donorId,
      donorName,
      status: 'available',
      createdAt: new Date().toISOString(),
      title: dropData.title || 'Untitled Donation',
      description: dropData.description || '',
      donorPhone: dropData.donorPhone || '',
      pickupAddress: dropData.pickupAddress || '',
      city: dropData.city || 'Kitchener',
      quantity: dropData.quantity || '1 portion',
      tags: analysis.tags,
      aiSummary: analysis.summary,
      pickupStartTime: dropData.pickupStartTime || new Date().toISOString(),
      availableUntil: dropData.availableUntil || new Date(Date.now() + 4 * 3600000).toISOString(),
      lat: dropData.lat || 43.45,
      lng: dropData.lng || -80.49,
    };

    dbDrops = [newDrop, ...dbDrops];
    return newDrop;
  },

  async reserveDrop(dropId: string, name: string, phone: string): Promise<FoodDrop> {
    const dropIndex = dbDrops.findIndex(d => d.id === dropId);
    if (dropIndex === -1) throw new Error("Drop not found.");
    if (dbDrops[dropIndex].status === 'claimed') throw new Error("Already claimed.");

    dbDrops[dropIndex] = {
      ...dbDrops[dropIndex],
      status: 'claimed',
      reservedBy: { name, phone }
    };

    return dbDrops[dropIndex];
  },

  async login(email: string): Promise<{ email: string; name: string }> {
    return {
      email,
      name: email.split('@')[0]
    };
  }
};