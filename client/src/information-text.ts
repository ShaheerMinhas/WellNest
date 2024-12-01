import { Brain, Heart, Users, Zap, Mail, Phone, MapPin, Check } from 'lucide-react'

type PricingPlan = {
    name: string;
    price: string;
    features: string[];
  };
  
  // Features data
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Leverage cutting-edge AI and Machine Learning to make early mental health diagnoses.",
    },
    {
      icon: Zap,
      title: "Real-time Interventions",
      description: "Receive timely support and interventions from professionals when you need them most.",
    },
    {
      icon: Users,
      title: "Assessment Activities",
      description: "Conduct large-scale employees assessment activites and receive result which maintain anonymity.",
    },
    {
      icon: Heart,
      title: "Emotional Support Tools",
      description: "Enhance your mental health journey with personalized tools for support, guidance, and positive growth.",
    },
  ];
  
  // Pricing data
  const pricing: PricingPlan[] = [
    {
      name: "30 Days Trial",
      price: "Free",
      features: [
        "Upto 25 Employees",
        "AI Mental Health Assessments",
        "Emotional Support Activites",
        "1 Joint Assessment Activity",
      ],
    },
    {
      name: "Basic",
      price: "5,000 PKR",
      features: [
        "Upto 50 Employees",
        "AI Mental Health Assessments",
        "Diagnosis Specific Psychologist Suggestions",
        "Emotional Support Activities",
        "Unlimited Joint Assessment Activities",
      ],
    },
    {
      name: "Enterprise",
      price: "10,000 PKR",
      features: [
        "Unlimited Employees",
        "Diagnosis Specific Psychologist Suggestions",
        "AI Mental Health Assessments",
        "Emotional Support Activities",
        "Unlimited Joint Assessment Activities",
      ],
    },
  ];
  
  export { features, pricing };