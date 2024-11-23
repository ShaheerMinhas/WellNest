import { motion } from 'framer-motion';
import {Mail, Phone, MapPin} from 'lucide-react'

const Contacts = () => {
    return (
        <section id="contacts" className="mb-12">
            <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
            >
                <h2 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">Get in Touch</h2>
                <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-700">
                We'd love to hear from you!
                </p>
            </motion.div>
            <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
            >
                <div className="bg-white shadow-md flex flex-col items-center justify-center rounded-lg overflow-hidden p-8">
                    <h3 className="text-3xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-4 text-lg">
                        <div className="flex items-center">
                            <Mail className="w-6 h-6 text-yellow-500 mr-4" />
                            <span>contact@wellnest.com</span>
                        </div>
                        <div className="flex items-center">
                            <Phone className="w-6 h-6 text-yellow-500 mr-4" />
                            <span>+1 (555) 123-4567</span>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-6 h-6 text-yellow-500 mr-4" />
                            <span>123 WellNest Street, Health City, WN 12345</span>
                        </div>
                    </div>
                    <div className="mt-8">
                        <img src="/placeholder.svg?height=300&width=400" alt="Map" className="w-full h-48 object-cover rounded-lg" />
                    </div>
            </div>
            </motion.div>
        </section>
    );
};

export default Contacts