import { Check } from 'lucide-react';

interface PricingCardProp {
    name: string;
    price: string;
    features: string[];
}

const PricingCard: React.FC<PricingCardProp> = ({ name, price, features }) => {
    return (
        <div className="group relative overflow-hidden rounded-lg bg-white shadow-md flex flex-col h-full">
            <div className="relative z-10 p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-semibold mb-4">{name}</h3>
                <p className="text-4xl font-bold mb-6 text-yellow-500">{price}<span className="text-sm text-gray-500">/month</span></p>
                <ul className="mb-8 flex-grow">
                    {features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center mb-2">
                            <Check className="w-5 h-5 text-green-500 mr-2" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
                <button className="relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-lg bg-black px-6 py-3 text-lg font-semibold transition duration-300 ease-out">
                    <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-black text-white duration-300 group-hover:translate-x-0">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                    </span>
                    <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">Get Started</span>
                    <span className="invisible relative">Get Started</span>
                </button>
            </div>
            <span className="absolute right-0 -mt-8 h-[100rem] w-12 -translate-y-[35rem] translate-x-20 rotate-12 transform bg-blue-400 opacity-5 transition-all duration-1000 ease-out group-hover:-translate-x-[40rem]" aria-hidden="true"></span>
        </div>
    );
};

export default PricingCard;
