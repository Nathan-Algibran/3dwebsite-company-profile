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

        {/* Client Testimonials */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it - hear from some of our satisfied clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                company: "StartupCo",
                role: "CEO",
                testimonial: "TechCorp transformed our vision into reality. Their web development expertise helped us launch faster than we ever imagined.",
                rating: 5
              },
              {
                name: "Maria Santos",
                company: "GlobeRetail",
                role: "CTO",
                testimonial: "The mobile app they built for us increased our customer engagement by 300%. Outstanding work and professional team.",
                rating: 5
              },
              {
                name: "John Davis",
                company: "FinanceFlow",
                role: "Founder",
                testimonial: "Their AI solutions revolutionized our data analysis. We're now making data-driven decisions with confidence.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 + index * 0.1 }}
                className="glass-card p-6 card-3d"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <div key={i} className="text-yellow-400 text-xl">★</div>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.testimonial}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-bold mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Portfolio Preview */}
        <div className="bg-gradient-surface py-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
                Featured Projects
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Take a look at some of our recent successful projects across different industries.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "E-commerce Platform",
                  client: "RetailMax",
                  category: "Web Development",
                  description: "Modern React-based e-commerce solution with real-time inventory management.",
                  technologies: ["React", "Node.js", "MongoDB"]
                },
                {
                  title: "Healthcare Mobile App",
                  client: "MediCare Plus",
                  category: "Mobile Development",
                  description: "Cross-platform mobile app for patient management and telemedicine services.",
                  technologies: ["React Native", "Firebase", "WebRTC"]
                },
                {
                  title: "AI Analytics Dashboard",
                  client: "DataInsights",
                  category: "AI & Machine Learning",
                  description: "Intelligent dashboard with predictive analytics and automated reporting.",
                  technologies: ["Python", "TensorFlow", "React"]
                },
                {
                  title: "Cloud Infrastructure",
                  client: "ScaleUp Inc",
                  category: "Cloud Solutions",
                  description: "Scalable microservices architecture deployed on AWS with auto-scaling.",
                  technologies: ["AWS", "Docker", "Kubernetes"]
                },
                {
                  title: "Banking App Redesign",
                  client: "SecureBank",
                  category: "UI/UX Design",
                  description: "Complete redesign of mobile banking app focusing on user experience.",
                  technologies: ["Figma", "React Native", "Design System"]
                },
                {
                  title: "IoT Control System",
                  client: "SmartHome Pro",
                  category: "IoT Development",
                  description: "Comprehensive IoT platform for smart home automation and monitoring.",
                  technologies: ["IoT", "Node.js", "MQTT"]
                }
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.4 + index * 0.1 }}
                  className="glass-card p-6 card-3d"
                >
                  <div className="h-32 bg-gradient-primary rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white font-bold text-lg">{project.title}</div>
                  </div>
                  <div className="mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">Client: {project.client}</p>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="container mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gradient">
              Service Packages
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect package for your project needs. All packages include consultation and ongoing support.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "$5,000",
                period: "Starting from",
                description: "Perfect for small businesses and startups",
                features: [
                  "Basic Web Development",
                  "Responsive Design",
                  "SEO Optimization",
                  "3 Months Support",
                  "Basic Analytics"
                ],
                popular: false
              },
              {
                name: "Professional",
                price: "$15,000",
                period: "Starting from",
                description: "Ideal for growing businesses",
                features: [
                  "Advanced Web/Mobile App",
                  "Custom UI/UX Design",
                  "API Integration",
                  "6 Months Support",
                  "Advanced Analytics",
                  "Cloud Deployment"
                ],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "Quote available",
                description: "For large-scale enterprise solutions",
                features: [
                  "Full-Stack Development",
                  "AI/ML Integration",
                  "Scalable Architecture",
                  "12 Months Support",
                  "Dedicated Team",
                  "24/7 Monitoring"
                ],
                popular: false
              }
            ].map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 + index * 0.1 }}
                className={`glass-card p-8 card-3d relative ${tier.popular ? 'ring-2 ring-primary' : ''}`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-gradient mb-1">{tier.price}</div>
                  <p className="text-sm text-muted-foreground">{tier.period}</p>
                </div>
                <p className="text-muted-foreground mb-6 text-center">{tier.description}</p>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={tier.popular ? "btn-hero w-full" : "btn-outline-hero w-full"}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Services;