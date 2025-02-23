import { useAuth } from '../../context/AuthContext'

const HeroSection = () => {
    const { user } = useAuth()

    return (
        <section className="bg-white p-6 md:p-12 rounded-lg shadow-md text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-text mb-4">
                Discover Amazing Events
            </h1>
            <p className="text-lg text-text-secondary mb-6">
                Find and book exciting events near you, and never miss out on the fun.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!user && (
                    <>
                        <button className="buttonPrimary px-6 py-3 text-lg">Sign Up</button>
                        <button className="buttonSecondary px-6 py-3 text-lg">Explore Events</button>
                    </>
                )}
                {user.role === 'user' && (
                    <button className="buttonPrimary px-6 py-3 text-lg">Explore Events</button>
                )}
                {user.role === 'admin' && (
                    <button className="buttonPrimary px-6 py-3 text-lg">Go to Admin Dashboard</button>
                )}
            </div>
        </section>
    );
};

export default HeroSection;