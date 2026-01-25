
import React, { useEffect, useRef } from 'react';
import { FoodDrop } from '../types';
import { KW_CENTER } from '../constants';

interface MapViewProps {
  drops: FoodDrop[];
  onSelectDrop: (drop: FoodDrop) => void;
}

declare const L: any;

export const MapView: React.FC<MapViewProps> = ({ drops, onSelectDrop }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      mapRef.current = L.map(mapContainerRef.current).setView([KW_CENTER.lat, KW_CENTER.lng], 13);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapRef.current);
    }

    // Clear existing markers
    markersRef.current.forEach(marker => mapRef.current.removeLayer(marker));
    markersRef.current = [];

    // Add new markers
    drops.forEach(drop => {
      const marker = L.marker([drop.lat, drop.lng]).addTo(mapRef.current);
      marker.bindPopup(`
        <div class="p-1">
          <h3 class="font-bold text-emerald-800">${drop.title}</h3>
          <p class="text-xs text-slate-600">${drop.donorName}</p>
          <p class="text-sm mt-1">${drop.quantity}</p>
        </div>
      `);
      marker.on('click', () => onSelectDrop(drop));
      markersRef.current.push(marker);
    });

    return () => {
      // Cleanup if needed
    };
  }, [drops, onSelectDrop]);

  return (
    <div className="w-full h-[500px] rounded-xl overflow-hidden border border-slate-200 shadow-inner relative">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
};
