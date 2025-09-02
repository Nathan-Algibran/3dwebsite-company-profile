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

        {/* Company Stats */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "250+", label: "Projects Completed" },
              { number: "85+", label: "Happy Clients" },
              { number: "12+", label: "Years Experience" },
              { number: "15+", label: "Team Members" }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center card-3d">
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Company Timeline */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Our Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From a small startup to a leading technology company - here's how we've grown and evolved over the years.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-1 bg-gradient-primary"></div>
            
            <div className="space-y-16">
              {[
                {
                  year: "2012",
                  title: "Company Founded",
                  description: "Started as a small team of 3 developers with a vision to transform digital experiences.",
                  side: "left"
                },
                {
                  year: "2015",
                  title: "First Major Client",
                  description: "Secured our first enterprise client and expanded our team to 8 professionals.",
                  side: "right"
                },
                {
                  year: "2018",
                  title: "AI Division Launch",
                  description: "Launched our AI and Machine Learning division, pioneering intelligent solutions.",
                  side: "left"
                },
                {
                  year: "2021",
                  title: "Global Expansion",
                  description: "Opened offices in 3 countries and reached 50+ international clients.",
                  side: "right"
                },
                {
                  year: "2024",
                  title: "Innovation Hub",
                  description: "Established our R&D center focusing on emerging technologies and sustainable solutions.",
                  side: "left"
                }
              ].map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: milestone.side === 'left' ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 + index * 0.1 }}
                  className={`flex items-center ${milestone.side === 'right' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-1/2 ${milestone.side === 'right' ? 'pl-8' : 'pr-8'}`}>
                    <div className="glass-card p-6 card-3d">
                      <div className="text-2xl font-bold text-gradient mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-semibold mb-3">{milestone.title}</h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10 flex-shrink-0">
                    <div className="w-8 h-8 bg-primary/20 rounded-full absolute -top-2 -left-2 animate-pulse"></div>
                  </div>
                  
                  <div className="w-1/2"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Technology Stack */}
        <div className="bg-gradient-surface py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Our Technology Stack
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We use cutting-edge technologies and industry best practices to deliver exceptional results.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                "React", "TypeScript", "Node.js", "Python", "AWS", "Docker",
                "Kubernetes", "MongoDB", "PostgreSQL", "Redis", "GraphQL", "Next.js"
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  className="glass-card p-4 text-center card-3d"
                >
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl mx-auto mb-3 flex items-center justify-center text-white font-bold">
                    {tech.slice(0, 2)}
                  </div>
                  <p className="text-sm font-medium">{tech}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { 
                    name: "Sarah Johnson", 
                    role: "CEO & Co-Founder", 
                    description: "Visionary leader with 15+ years in tech. Former VP at Google.",
                    skills: ["Strategy", "Leadership", "Innovation"]
                  },
                  { 
                    name: "Michael Chen", 
                    role: "CTO", 
                    description: "Expert in AI and cloud architecture. MIT PhD in Computer Science.",
                    skills: ["AI/ML", "Cloud", "Architecture"]
                  },
                  { 
                    name: "Emily Rodriguez", 
                    role: "Head of Design", 
                    description: "Award-winning UX/UI designer. 10+ years at top design agencies.",
                    skills: ["UI/UX", "Branding", "Research"]
                  },
                  { 
                    name: "David Kim", 
                    role: "Lead Developer", 
                    description: "Full-stack expert with passion for clean code and performance.",
                    skills: ["React", "Node.js", "DevOps"]
                  }
                ].map((member, index) => (
                  <div key={index} className="glass-card p-6 card-3d">
                    <div className="w-20 h-20 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-bold text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-3 text-sm">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-4">{member.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
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
