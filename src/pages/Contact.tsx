import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera, Text, Box } from '@react-three/drei';
import { Suspense, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useFrame } from '@react-three/fiber';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import * as THREE from 'three';
import PageTransition from '@/components/PageTransition';

const ContactForm3D = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <group>
      <Box ref={meshRef} args={[6, 4, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#3B82F6"
          roughness={0.2}
          metalness={0.8}
          transparent
          opacity={0.7}
        />
      </Box>
      <Text
        position={[0, 0.5, 0.3]}
        fontSize={0.4}
        color="white"
        anchorX="center"
        anchorY="middle"
        font="/fonts/inter-bold.woff"
      >
        Get In Touch
      </Text>
      <Text
        position={[0, -0.5, 0.3]}
        fontSize={0.2}
        color="#DBEAFE"
        anchorX="center"
        anchorY="middle"
        maxWidth={5}
        textAlign="center"
      >
        Let's discuss your next project
      </Text>
    </group>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to start your next project? Get in touch with our team and let's create something amazing together.
            </p>
          </motion.div>
        </div>

        {/* 3D Contact Scene */}
        <div className="h-[400px] scene-container mb-16">
          <Canvas>
            <PerspectiveCamera makeDefault position={[0, 0, 10]} />
            <OrbitControls
              enablePan={false}
              enableZoom={false}
              autoRotate
              autoRotateSpeed={1}
            />
            
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1.2}
              castShadow
            />
            <pointLight position={[-10, 0, -5]} intensity={0.8} color="#60A5FA" />
            
            <Suspense fallback={null}>
              <ContactForm3D />
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        {/* Contact Content */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-6 text-gradient">
                Let's Connect
              </h2>
              <p className="text-muted-foreground mb-8">
                We're here to help you bring your ideas to life. Reach out to us through any
                of the channels below or fill out the contact form.
              </p>
              
              <div className="space-y-6">
                {[
                  {
                    icon: <Mail className="w-6 h-6" />,
                    title: "Email",
                    content: "hello@techcorp.com",
                    description: "Send us an email anytime"
                  },
                  {
                    icon: <Phone className="w-6 h-6" />,
                    title: "Phone",
                    content: "+1 (555) 123-4567",
                    description: "Mon-Fri from 8am to 5pm"
                  },
                  {
                    icon: <MapPin className="w-6 h-6" />,
                    title: "Office",
                    content: "123 Tech Street, Silicon Valley, CA 94000",
                    description: "Come say hello at our HQ"
                  }
                ].map((contact, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-gradient-primary p-3 rounded-xl text-white">
                      {contact.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{contact.title}</h3>
                      <p className="text-primary font-medium">{contact.content}</p>
                      <p className="text-muted-foreground text-sm">{contact.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass-card p-8"
            >
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium mb-2">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Your company name"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <button
                  type="submit"
                  className="btn-hero w-full flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-gradient-surface py-16 mt-16">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold mb-4 text-gradient">Visit Our Office</h2>
              <p className="text-muted-foreground">
                Located in the heart of Silicon Valley, we're always happy to meet in person.
              </p>
            </motion.div>
            
            <div className="glass-card p-2 h-64 bg-muted/50 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Interactive map coming soon</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;