import NavBar from "../../components/nav-bar";
import CopyRight from "../../components/copyright-footer";
import logo from "../../assets/illustration.svg";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-yellow-50">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="flex flex-1 flex-col lg:flex-row items-center justify-center w-full px-8 py-16">

        <div className="flex flex-col flex-1 sm:items-center lg:items-start text-center lg:text-left">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
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
          <img src={logo} alt="Logo" className="max-w-full h-auto" />
        </div>

      </main>

      {/* Footer */}
      <CopyRight/>
    </div>
  );
};

export default LandingPage;
