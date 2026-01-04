import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import './CarViewer3D.css';

function CarModel({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={3} position={[0, -5, 0]} />;
}

function CarPlaceholder() {
  return (
    <group>
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[4, 1.5, 2]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[-1.3, -0.3, 1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[1.3, -0.3, 1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[-1.3, -0.3, -1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      <mesh position={[1.3, -0.3, -1]}>
        <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#1a1a1a" wireframe />
    </mesh>
  );
}

export default function CarViewer3D({ vehicle }) {
  const [modelAvailable, setModelAvailable] = useState(false);

  useEffect(() => {
    const checkModel = async () => {
      try {
        const response = await fetch('/models/chevy-tracker.glb', { method: 'HEAD' });
        setModelAvailable(response.ok);
      } catch {
        setModelAvailable(false);
      }
    };
    checkModel();
  }, []);

  const shouldShowModel = vehicle?.marca === 'Chevrolet' && vehicle?.modelo === 'Tracker' && modelAvailable;

  return (
    <div className="car-viewer-container">
      <Canvas
        camera={{ position: [12, 6, 12], fov: 50 }}
        shadows
        dpr={[1, 2]}
      >
        <Suspense fallback={<LoadingFallback />}>
          <ambientLight intensity={0.8} />
          <spotLight position={[20, 30, 20]} angle={0.3} penumbra={1} intensity={2} castShadow />
          <pointLight position={[-20, -10, -20]} intensity={0.6} />

          {shouldShowModel ? (
            <CarModel modelPath="/models/chevy-tracker.glb" />
          ) : (
            <CarPlaceholder />
          )}

          <ContactShadows
            position={[0, -5, 0]}
            opacity={0.7}
            scale={50}
            blur={4}
            far={10}
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={40}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.2}
          autoRotate={false}
        />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
