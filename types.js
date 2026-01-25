
export type UserRole = 'donor' | 'recipient' | 'guest';

export interface FoodDrop {
  id: string;
  donorId: string;
  donorName: string;
  donorPhone: string; // New: Required for contact after reservation
  title: string;
  description: string;
  quantity: string;
  pickupAddress: string;
  city: string;
  lat: number;
  lng: number;
  pickupStartTime: string;
  availableUntil: string;
  tags: string[];
  status: 'available' | 'claimed' | 'expired';
  createdAt: string;
  aiSummary?: string;
  reservedBy?: {
    name: string;
    phone: string;
  };
}

export interface SMSMessage {
  id: string;
  from: string;
  content: string;
  timestamp: Date;
  reply?: string;
}