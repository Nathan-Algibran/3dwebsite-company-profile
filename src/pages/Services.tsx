import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceCard3D from '@/components/3d/ServiceCard3D';
import PageTransition from '@/components/PageTransition';

const Services = () => {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const services = [
    {
      title: "Web Development",
      description: "Custom web applications built with cutting-edge technologies, responsive design, and optimal performance.",
      features: ["React & Next.js", "Full-Stack Solutions", "Progressive Web Apps", "E-commerce Platforms"],
      color: "#3B82F6",
      position: [-4, 0, 0] as [number, number, number]
    },
    {
      title: "Mobile Apps",
      description: "Native and cross-platform mobile applications that deliver exceptional user experiences across all devices.",
      features: ["iOS & Android", "React Native", "Flutter", "App Store Optimization"],
      color: "#2563EB",
      position: [0, 0, 0] as [number, number, number]
    },
    {
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and services to help your business grow without technical limitations.",
      features: ["AWS & Azure", "Microservices", "DevOps & CI/CD", "Database Management"],
      color: "#1D4ED8",
      position: [4, 0, 0] as [number, number, number]
    },
    {
      title: "AI & Machine Learning",
      description: "Intelligent solutions that automate processes and provide valuable insights from your data.",
      features: ["Predictive Analytics", "Natural Language Processing", "Computer Vision", "Recommendation Systems"],
      color: "#1E40AF",
      position: [-2, -3, 0] as [number, number, number]
    },
    {
      title: "UI/UX Design",
      description: "Beautiful, intuitive designs that create memorable user experiences and drive engagement.",
      features: ["User Research", "Wireframing & Prototyping", "Design Systems", "Usability Testing"],
      color: "#1E3A8A",
      position: [2, -3, 0] as [number, number, number]
    }
  ];

  return (
    <PageTransition>
      <div className="min-h-screen pt-24">
        {/* Header */}
        <div className="container mx-auto px-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
              Our Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer comprehensive technology solutions to help your business thrive in the digital age.
              Click on any service below to learn more.
            </p>
          </motion.div>
        </div>

        {/* 3D Services Scene */}
        <div className="h-[600px] scene-container">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 2, 12]} />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              maxDistance={20}
              minDistance={8}
            />
            
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight position={[-10, -10, -10]} intensity={0.8} color="#60A5FA" />
            <pointLight position={[10, -10, 10]} intensity={0.6} color="#3B82F6" />
            
            <Suspense fallback={null}>
              {services.map((service, index) => (
                <ServiceCard3D
                  key={index}
                  position={service.position}
                  title={service.title}
                  color={service.color}
                  onClick={() => setSelectedService(index)}
                />
              ))}
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Service Details Modal */}
        <AnimatePresence>
          {selectedService !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setSelectedService(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="glass-card max-w-2xl w-full p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-gradient">
                    {services[selectedService].title}
                  </h2>
                  <button
                    onClick={() => setSelectedService(null)}
                    className="text-muted-foreground hover:text-foreground text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-muted-foreground text-lg mb-6">
                  {services[selectedService].description}
                </p>
                
                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4">Key Features:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {services[selectedService].features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="btn-hero flex-1">
                    Get Quote
                  </button>
                  <button className="btn-outline-hero flex-1">
                    Learn More
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service Process */}
        <div className="bg-gradient-surface py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Our Process
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We follow a proven methodology to ensure successful project delivery and client satisfaction.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discovery", description: "We analyze your needs and define project requirements" },
                { step: "02", title: "Design", description: "Create wireframes and visual designs for your approval" },
                { step: "03", title: "Development", description: "Build your solution using best practices and modern tech" },
                { step: "04", title: "Launch", description: "Deploy, test, and provide ongoing support and maintenance" }
              ].map((process, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.1 }}
                  className="glass-card p-6 text-center card-3d"
                >
                  <div className="text-4xl font-bold text-gradient mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                  <p className="text-muted-foreground">{process.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;