import Header from "../../containers/landing-header";
import Indtroduction from "../../containers/landing-introduction";
import About from "../../containers/landing-about";
import Price from "../../containers/landing-pricing";
import Contacts from "../../containers/landing-contacts";
import CopyRight from "../../components/copyright-footer";


const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-white to-yellow-50">
      {/* Navigation Bar */}
      <Header />
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Indtroduction/>
        <About />
        <Price />
        <Contacts/>
      </main>
      {/* Footer */}
      <CopyRight/>
    </div>
  );
};

export default LandingPage;
