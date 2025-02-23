import { useAuth } from '../../context/AuthContext'

const FinalCTA = () => {
    const { user } = useAuth()

    return (
        <section className="mt-12 bg-white p-8 rounded-lg text-center shadow-md">
            <h2 className="text-3xl font-bold text-text mb-4">
                {!user
                    ? 'Join Our Community Today!'
                    : user.role === 'user'
                        ? 'Explore More Events!'
                        : 'Manage Your Events!'}
            </h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                {!user && (
                    <>
                        <button className="buttonPrimary px-6 py-3 text-lg">Join Now</button>
                        <button className="buttonSecondary px-6 py-3 text-lg">Explore Events</button>
                    </>
                )}
                {user.role === 'user' && (
                    <button className="buttonPrimary px-6 py-3 text-lg">Explore More Events</button>
                )}
                {user.role === 'admin' && (
                    <button className="buttonPrimary px-6 py-3 text-lg">Manage Events</button>
                )}
            </div>
        </section>
    );
};

export default FinalCTA;