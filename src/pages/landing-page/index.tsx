
const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-yellow-50">
      {/* Navigation Bar */}
      <nav className="w-full flex items-center justify-between px-8 py-6 bg-transparent">
        <div className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-gray-800">WellNest</div>
        </div>
        <div className="flex space-x-8 text-gray-700">
          <a href="#pricing" className="hover:text-blue-500">Pricing</a>
          <a href="#about" className="hover:text-blue-500">About WellNest</a>
          <a href="#contact" className="hover:text-blue-500">Contacts</a>
        </div>
        <div className="flex space-x-4">
          <button className="text-blue-600 border border-blue-600 px-4 py-2 rounded-lg hover:bg-blue-100">Sign In</button>
          <button className="bg-green-600 md:bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Sign Up</button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center w-full px-8 py-16">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Nurture Your Team’s <span className="text-blue-600">Mental Wellness</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg max-w-md">
            Enhance employee well-being and boost creativity and productivity with WellNest's stress-relief and diagnostic technology.
          </p>
          <button className="mt-6 bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600">
            Get Started
          </button>
        </div>

        {/* Illustration */}
        <div className="flex-1 mt-12 lg:mt-0">
          {/* Placeholder for illustration image */}
          <img
            src="/illustration.png"
            alt="Team wellness illustration"
            className="max-w-full h-auto"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 bg-transparent text-center text-gray-500 text-sm">
        © 2023 WellNest. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
