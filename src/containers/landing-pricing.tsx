import { pricing } from "../information-text";
import PricingCard from "../components/pricing-card";
import { motion } from 'framer-motion';

const Price = () => {
    return (
      <section id="pricing" className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-blue-600 md:text-5xl lg:text-6xl">Choose Your Plan</h2>
          <p className="mx-auto mb-6 max-w-2xl text-lg text-gray-700">
            Select the perfect plan for your team's mental wellness journey. All plans include our core features to support your employees' well-being.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-8">
          {pricing.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <PricingCard 
                name={plan.name} 
                price={plan.price} 
                features={plan.features} 
              />
            </motion.div>
          ))}
        </div>
      </section>
    );
  }
  
  export default Price;