import { useState, useEffect } from 'react';
import Landing from './components/Landing';
import VehicleSelection from './components/VehicleSelection';
import CarViewer3D from './components/CarViewer3D';
import Sidebar from './components/Sidebar';
import ActivityModal from './components/ActivityModal';
import Calendar from './components/Calendar';
import ThemeSelector from './components/ThemeSelector';
import { createUserSession, updateSessionVehicle, updateSessionActivities, getCurrentSession } from './services/sessionService';
import './App.css';

function App() {
  const [hasStartedJourney, setHasStartedJourney] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const [isConfigured, setIsConfigured] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentActivityType, setCurrentActivityType] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check for existing session
    const session = getCurrentSession();
    if (session) {
      setSessionId(session.sessionId);
      setUserId(session.userId);
      setHasStartedJourney(true);
    }

    const savedCar = localStorage.getItem('meu-xodo-vehicle');
    if (savedCar) {
      const carData = JSON.parse(savedCar);
      setSelectedCar(carData);
      setIsConfigured(true);
    }

    const savedActivities = localStorage.getItem('meu-xodo-activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    }
  }, []);

  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem('meu-xodo-activities', JSON.stringify(activities));

      // Update Firebase if session exists
      if (sessionId) {
        updateSessionActivities(sessionId, activities).catch(err =>
          console.error('Failed to sync activities to Firebase:', err)
        );
      }
    }
  }, [activities, sessionId]);

  const handleStartJourney = async () => {
    try {
      const { sessionId: newSessionId, userId: newUserId } = await createUserSession();
      setSessionId(newSessionId);
      setUserId(newUserId);
      setHasStartedJourney(true);
    } catch (error) {
      console.error('Failed to start journey:', error);
      alert('Erro ao iniciar jornada. Por favor, tente novamente.');
    }
  };

  const handleVehicleSelect = (vehicleData) => {
    setSelectedCar(vehicleData);
    setIsConfigured(true);
    localStorage.setItem('meu-xodo-vehicle', JSON.stringify(vehicleData));

    // Update Firebase if session exists
    if (sessionId) {
      updateSessionVehicle(sessionId, vehicleData).catch(err =>
        console.error('Failed to sync vehicle to Firebase:', err)
      );
    }
  };

  const handleChangeVehicle = () => {
    if (confirm('Deseja alterar o veículo configurado?')) {
      setIsConfigured(false);
      setSelectedCar(null);
      localStorage.removeItem('meu-xodo-vehicle');
    }
  };

  const handleAddActivity = (type) => {
    setCurrentActivityType(type);
    setShowModal(true);
  };

  const handleSaveActivity = (activityData) => {
    setActivities([...activities, activityData]);
    setShowModal(false);
  };

  const handleDeleteActivity = (id) => {
    if (confirm('Deseja realmente excluir este registro?')) {
      setActivities(activities.filter(a => a.id !== id));
    }
  };

  // Show landing page if journey hasn't started
  if (!hasStartedJourney) {
    return <Landing onStartJourney={handleStartJourney} />;
  }

  // Show vehicle selection if not configured
  if (!isConfigured) {
    return <VehicleSelection onComplete={handleVehicleSelect} />;
  }

  // Show main app
  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-title">
          <img src="/logo.svg" alt="Meu Xodó Logo" className="app-logo" />
          <h1>Meu Xodó</h1>
        </div>
        <div className="header-actions">
          <ThemeSelector />
          <button className="change-vehicle-button-header" onClick={handleChangeVehicle}>
            Alterar Veículo
          </button>
        </div>
      </header>

      <main className="main-content">
        <div className="left-column">
          <section className="car-viewer-section">
            <CarViewer3D vehicle={selectedCar} />
          </section>

          <section className="calendar-section">
            <Calendar activities={activities} />
          </section>
        </div>

        <Sidebar
          vehicle={selectedCar}
          onAddActivity={handleAddActivity}
          activities={activities}
          onDeleteActivity={handleDeleteActivity}
        />
      </main>

      {showModal && (
        <ActivityModal
          type={currentActivityType}
          onClose={() => setShowModal(false)}
          onSave={handleSaveActivity}
        />
      )}
    </div>
  );
}

export default App;
