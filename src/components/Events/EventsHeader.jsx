/* eslint-disable react/prop-types */

const EventsHeader = ({ searchTerm, setSearchTerm, filterDate, setFilterDate }) => {
    return (
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold text-text mb-4 md:mb-0">Published Events</h1>
            <div className="flex flex-col md:flex-row items-center gap-4">
                <input
                    type="text"
                    placeholder="Search events..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 border border-border rounded w-full md:w-64"
                />
                <input
                    type="date"
                    value={filterDate}
                    onChange={(e) => setFilterDate(e.target.value)}
                    className="p-2 border border-border rounded"
                />
            </div>
        </div>
    );
};

export default EventsHeader;
