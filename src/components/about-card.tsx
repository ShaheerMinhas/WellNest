interface AboutCardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Type for the icon component
  title: string;
  description: string;
}

const AboutCard: React.FC<AboutCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md">
      <div className="relative z-10 p-6">
        <Icon className="text-4xl text-yellow-500 mb-4" /> {/* Render the icon as a component */}
        <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
      <span className="absolute right-0 -mt-14 h-60 w-8 -translate-y-36 translate-x-12 rotate-12 transform bg-blue-400 opacity-5 transition-all duration-1000 ease-out group-hover:-translate-x-[30rem]" aria-hidden="true"></span>
    </div>
  );
}

export default AboutCard;
