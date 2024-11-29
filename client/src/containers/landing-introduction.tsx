import logo from "../assets/illustration.svg";

const Introduction = () => {
  return (
    <section className="w-full py-16 mb-28">
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col flex-1 sm:items-center lg:items-start text-center lg:text-left mb-12 lg:mb-0">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Nurture Your Team's <span className="text-blue-600">Mental Wellness</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-md">
            Enhance employee well-being and boost creativity and productivity with WellNest's stress-relief and diagnostic technology.
          </p>
          <button className="group relative mt-6 inline-flex items-center justify-center overflow-hidden rounded-lg bg-yellow-500 px-6 py-3 text-lg font-semibold transition duration-300 ease-out">
            <span className="ease absolute inset-0 flex h-full w-full -translate-x-full items-center justify-center bg-yellow-500 text-white duration-300 group-hover:translate-x-0">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="ease absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-300 group-hover:translate-x-full">Get Started</span>
            <span className="invisible relative">Get Started</span>
          </button>
        </div>
        <div className="flex-1">
          {/* Placeholder for illustration image */}
          <img src={logo} alt="Logo" className="max-w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

export default Introduction;