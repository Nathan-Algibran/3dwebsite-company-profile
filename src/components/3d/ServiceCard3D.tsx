import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceCard3DProps {
  position: [number, number, number];
  title: string;
  color: string;
  onClick?: () => void;
}

const ServiceCard3D = ({ position, title, color, onClick }: ServiceCard3DProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      
      if (hovered) {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1.1, 0.1));
      } else {
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, 1, 0.1));
      }
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2, 2.5, 0.3]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.9}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, 0.2]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={1.8}
        textAlign="center"
      >
        {title}
      </Text>
      
      {/* Glow effect when hovered */}
      {hovered && (
        <pointLight
          color={color}
          intensity={2}
          distance={5}
          decay={2}
        />
      )}
    </group>
  );
};

export default ServiceCard3D;