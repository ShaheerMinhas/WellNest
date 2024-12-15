// information-text.ts

import { Brain, Heart, Users, Zap, Mail, Phone, MapPin, Check } from 'lucide-react';

// Data for assessments
const assessmentsData = [
  {
    title: "Depression",
    description: "Identify symptoms of depression",
    rt: '/depression'
  },
  {
    title: "Anxiety",
    description: "Recognize the signs of anxiety",
    rt: '/anxiety'
  },
];

// Features data
const features = [
  {
    icon: Brain,
    title: "AI-Powered Insights",
    description: "Leverage cutting-edge AI and Machine Learning to make early mental health diagnoses."
  },
  {
    icon: Zap,
    title: "Real-time Interventions",
    description: "Receive timely support and interventions from professionals when you need them most."
  },
  {
    icon: Users,
    title: "Assessment Activities",
    description: "Conduct large-scale employee assessment activities and receive results that maintain anonymity."
  },
  {
    icon: Heart,
    title: "Emotional Support Tools",
    description: "Enhance your mental health journey with personalized tools for support, guidance, and positive growth."
  }
];

// Pricing data
type PricingPlan = {
  name: string;
  price: string;
  features: string[];
};

const pricing: PricingPlan[] = [
  {
    name: "30 Days Trial",
    price: "Free",
    features: [
      "Up to 25 Employees",
      "AI Mental Health Assessments",
      "Emotional Support Activities",
      "1 Joint Assessment Activity"
    ]
  },
  {
    name: "Basic",
    price: "5,000 PKR",
    features: [
      "Up to 50 Employees",
      "AI Mental Health Assessments",
      "Diagnosis-Specific Psychologist Suggestions",
      "Emotional Support Activities",
      "Unlimited Joint Assessment Activities"
    ]
  },
  {
    name: "Enterprise",
    price: "10,000 PKR",
    features: [
      "Unlimited Employees",
      "Diagnosis-Specific Psychologist Suggestions",
      "AI Mental Health Assessments",
      "Emotional Support Activities",
      "Unlimited Joint Assessment Activities"
    ]
  }
];

const activities = {
  title: "Daily Activities",
  deadline: "Tomorrow",
  action: "Start Activity"
};

export { assessmentsData, features, pricing, activities };
