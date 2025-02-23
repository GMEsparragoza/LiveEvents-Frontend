

const benefits = [
    {
        id: 1,
        icon: '🚀',
        title: 'Fast & Secure Booking',
        description: 'Reserve your spot in seconds with a seamless experience.'
    },
    {
        id: 2,
        icon: '🎉',
        title: 'Variety of Events',
        description: 'Choose from concerts, workshops, festivals, and more.'
    },
    {
        id: 3,
        icon: '⚙️',
        title: 'Efficient Management',
        description: 'Admins can easily manage events and user activities.'
    }
];

const BenefitsFeatures = () => {
    return (
        <section className="mt-12">
            <h2 className="text-2xl font-bold text-text mb-6">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits?.map((benefit) => (
                    <div
                        key={benefit.id}
                        className="bg-white rounded-lg shadow p-6 flex flex-col items-center text-center"
                    >
                        <div className="text-4xl mb-4">{benefit.icon}</div>
                        <h3 className="text-xl font-semibold text-text mb-2">{benefit.title}</h3>
                        <p className="text-sm text-text-secondary">{benefit.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BenefitsFeatures;