import Hero from '../components/Hero';
import Stats from '../components/Stats';
import Features from '../components/Features';
import Testimonials from '../components/Testimonials';
import Leadership from '../components/Leadership';
import InfoSection from '../components/InfoSection';
import ContactForm from '../components/ContactForm';

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Stats />
            <Features />
            <Testimonials />
            <Leadership />
            <InfoSection />
            <ContactForm />
        </>
    );
};

export default Home;
