import { features } from "../information-text"
import AboutCard from "../components/about-card";
import { motion } from 'framer-motion'

const About = () => {
  return (
    <section id="about" className="mb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">
          What is WellNest?
        </h2>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-700">
          WellNest revolutionizes workplace mental health with AI-powered early diagnosis, personalized support, and anonymous collaborative assessments, enabling organizations to promote employee well-being and drive productivity.
        </p>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-16"
      >
        <h3 className="mb-8 text-center text-3xl font-semibold text-gray-900">Our Features</h3>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <AboutCard 
                icon={feature.icon} 
                title={feature.title} 
                description={feature.description} 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default About;
