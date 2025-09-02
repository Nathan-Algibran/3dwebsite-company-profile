import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

const FloatingElements = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.children.forEach((child, index) => {
        child.position.y += Math.sin(state.clock.elapsedTime + index) * 0.01;
        child.rotation.x += delta * 0.5;
        child.rotation.z += delta * 0.3;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {/* Floating boxes */}
      <Box position={[-4, 2, -2]} args={[0.5, 0.5, 0.5]}>
        <meshStandardMaterial color="#60A5FA" roughness={0.3} metalness={0.8} />
      </Box>
      
      <Box position={[4, -1, -3]} args={[0.7, 0.7, 0.7]}>
        <meshStandardMaterial color="#3B82F6" roughness={0.3} metalness={0.8} />
      </Box>
      
      {/* Floating spheres */}
      <Sphere position={[-3, -2, 1]} args={[0.4, 32, 32]}>
        <meshStandardMaterial color="#93C5FD" roughness={0.2} metalness={0.9} />
      </Sphere>
      
      <Sphere position={[3, 1.5, 2]} args={[0.3, 32, 32]}>
        <meshStandardMaterial color="#DBEAFE" roughness={0.1} metalness={0.7} />
      </Sphere>
      
      {/* Floating torus */}
      <Torus position={[0, 3, -1]} args={[0.8, 0.3, 16, 100]}>
        <meshStandardMaterial color="#1D4ED8" roughness={0.4} metalness={0.6} />
      </Torus>
      
      <Torus position={[-2, -3, 0]} args={[0.6, 0.2, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#2563EB" roughness={0.4} metalness={0.6} />
      </Torus>
    </group>
  );
};

export default FloatingElements;