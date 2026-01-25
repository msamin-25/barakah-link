
import React, { useState, useMemo, useEffect } from 'react';
import { BarakahBackend, FoodDrop, UserRole } from './backend';
import { AppView } from './frontend';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>('guest');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [view, setView] = useState<string>('landing');
  const [drops, setDrops] = useState<FoodDrop[]>([]);
  const [selectedDrop, setSelectedDrop] = useState<FoodDrop | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [isReserving, setIsReserving] = useState(false);
  const [reserveName, setReserveName] = useState('');
  const [reservePhone, setReservePhone] = useState('');

  useEffect(() => {
    BarakahBackend.getDrops().then(setDrops);
  }, []);

  const filteredDrops = useMemo(() => {
    return drops.filter(d => {
      const cityMatch = selectedCity === 'All' || d.city === selectedCity;
      const tagMatch = filter === 'All' || d.tags.includes(filter);
      return cityMatch && tagMatch;
    });
  }, [drops, filter, selectedCity]);

  const handleAddDrop = async (partialDrop: Partial<FoodDrop>) => {
    try {
      const newDrop = await BarakahBackend.createDrop(
        partialDrop, 
        user?.email || 'guest', 
        user?.name || 'Community Donor'
      );
      setDrops(prev => [newDrop, ...prev]);
    } catch (e) {
      alert(e instanceof Error ? e.message : "Failed to create drop");
    }
  };

  const handleLogin = async (chosenRole: UserRole, email: string) => {
    const userData = await BarakahBackend.login(email);
    setRole(chosenRole);
    setUser(userData);
    setView(chosenRole === 'donor' ? 'donor-dashboard' : 'map');
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDrop) return;
    try {
      const updatedDrop = await BarakahBackend.reserveDrop(selectedDrop.id, reserveName, reservePhone);
      setDrops(prev => prev.map(d => d.id === updatedDrop.id ? updatedDrop : d));
      setSelectedDrop(updatedDrop);
      setIsReserving(false);
      setReserveName('');
      setReservePhone('');
    } catch (e) {
      alert("Reservation failed.");
    }
  };

  return (
    <AppView 
      role={role} setRole={setRole}
      user={user} view={view} setView={setView}
      drops={filteredDrops} selectedDrop={selectedDrop} setSelectedDrop={setSelectedDrop}
      filter={filter} setFilter={setFilter}
      selectedCity={selectedCity} setSelectedCity={setSelectedCity}
      isReserving={isReserving} setIsReserving={setIsReserving}
      reserveName={reserveName} setReserveName={setReserveName}
      reservePhone={reservePhone} setReservePhone={setReservePhone}
      onAddDrop={handleAddDrop} onLogin={handleLogin} onReserve={handleReserve}
    />
  );
}; 

export default App;