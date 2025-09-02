import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text, Box } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PageTransition from '@/components/PageTransition';

const AboutCard3D = ({ position, title, description }: { position: [number, number, number]; title: string; description: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + position[0]) * 0.2;
    }
  });

  return (
    <group position={position}>
      <Box ref={meshRef} args={[3, 2, 0.2]}>
        <meshStandardMaterial
          color="#3B82F6"
          roughness={0.3}
          metalness={0.7}
          transparent
          opacity={0.8}
        />
      </Box>
      <Text
        position={[0, 0.3, 0.15]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
        maxWidth={2.5}
        textAlign="center"
      >
        {title}
      </Text>
      <Text
        position={[0, -0.3, 0.15]}
        fontSize={0.15}
        color="#DBEAFE"
        anchorX="center"
        anchorY="middle"
        maxWidth={2.8}
        textAlign="center"
      >
        {description}
      </Text>
    </group>
  );
};

const About = () => {
  const aboutCards = [
    {
      position: [-4, 0, 0] as [number, number, number],
      title: "Our Vision",
      description: "To be the leading force in digital transformation, creating technologies that improve lives globally."
    },
    {
      position: [0, 0, 0] as [number, number, number],
      title: "Our Mission",
      description: "We develop cutting-edge solutions that empower businesses to thrive in the digital age."
    },
    {
      position: [4, 0, 0] as [number, number, number],
      title: "Our Values",
      description: "Innovation, integrity, and excellence drive everything we do. We believe in sustainable growth."
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Header Section */}
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              About TechCorp
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We are a forward-thinking technology company dedicated to pushing the boundaries 
              of what's possible in the digital realm.
            </p>
          </motion.div>
        </div>

        {/* 3D About Cards Section */}
        <div className="h-[600px] scene-container">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxDistance={15}
              minDistance={5}
            />
            
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#60A5FA" />
            
            <Suspense fallback={null}>
              {aboutCards.map((card, index) => (
                <AboutCard3D key={index} {...card} />
              ))}
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Company Stats */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { number: "150+", label: "Projects Completed" },
              { number: "50+", label: "Happy Clients" },
              { number: "10+", label: "Years Experience" }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-8 text-center">
                <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground text-lg">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-surface py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Our Leadership Team
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Meet the visionaries and experts who drive our company forward with their 
                passion for innovation and commitment to excellence.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: "Sarah Johnson", role: "CEO & Co-Founder", description: "Visionary leader with 15+ years in tech" },
                  { name: "Michael Chen", role: "CTO", description: "Expert in AI and cloud architecture" },
                  { name: "Emily Rodriguez", role: "Head of Design", description: "Award-winning UX/UI designer" }
                ].map((member, index) => (
                  <div key={index} className="glass-card p-6 card-3d">
                    <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm">{member.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default About;