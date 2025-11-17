import Footer from "../components/Footer";
import HomeContainer from "../components/ui/HomeContainer";
import LoginButton from "../components/ui/LoginButton";


export default function Home() {
  return (
    <>
      <HomeContainer>
        <div className="flex justify-end px-4 sm:px-6 lg:px-12 py-4 sm:py-6">
          <LoginButton />
        </div>

        <div
          className="flex flex-col md:flex-row items-center 
      // gap-8 px-4 sm:px-8 lg:px-16 xl:px-24 py-8 sm:py-12"
        >
          <div className="w-full md:w-1/2 text-center md:text-left order-2 md:order-1 animate-slideUp md:ml-20">
            <h2 className="font-outfit text-3xl sm:text-4xl lg:text-7xl font-semibold leading-tight text-primary-700 mb-4 sm:mb-6">
              Talent Guard - Career Monitor
            </h2>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium mb-4 text-primary-700">
              Visão preditiva. Retenção estratégica. Equidade para todos
            </p>
          </div>

          <div className="w-full md:w-1/2 order-1 md:order-2 animate-slideUp">
            <div className="relative w-full max-w-lg mx-auto">
              <img
                src="public\img\logo transp.png"
                alt="logo-talent-guard-transparent"
                className="relative rounded-[20px] shadow-lg w-full h-auto object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </HomeContainer>
      <Footer />
    </>
  );
}
