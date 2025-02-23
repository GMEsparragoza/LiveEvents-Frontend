/* eslint-disable react/prop-types */

const AdditionalInfo = ({ event }) => {
    return (
        <section className="mb-8">
            <h2 className="text-2xl font-bold text-text mb-4">Additional Information</h2>
            <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-text mb-2 ">
                    <strong>Description:</strong> {event?.description}
                </h2>
                <p className="text-text mb-2">
                    <strong>Price:</strong> {event?.price ? `$${event.price}` : 'Free'}
                </p>
                <p className="text-text mb-2">
                    <strong>Cancellation Policy:</strong> {'No cancellations allowed.'}
                </p>
            </div>
        </section>
    );
};

export default AdditionalInfo;