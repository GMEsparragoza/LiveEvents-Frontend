import HeroSection from '../components/Home/HeroSection';
import FeaturedEvents from '../components/Home/FeaturedEvents';
import BenefitsFeatures from '../components/Home/BenefitsFeatures';
import FinalCTA from '../components/Home/FinalCTA';
import Footer from '../components/Home/Footer';

const Home = () => {
    return (
        <div className="space-y-12 mt-24 mb-8 md:mx-12 mx-6">
            <HeroSection />
            <FeaturedEvents />
            <BenefitsFeatures />
            <FinalCTA />
            <Footer />
        </div>
    );
};

export default Home
