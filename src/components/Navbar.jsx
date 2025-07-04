const Navbar = ({ searchQuery, setSearchQuery }) => {
    return (
        <nav className="bg-lilac py-5 pt-10">
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mx-5 outline-1 hover:outline-2 outline-white w-2/3 md:w-1/2 py-1 px-3 rounded-4xl mb-5 hover:bg-hover-lilac focus:bg-white"
            />
        </nav>
    );
};

export default Navbar;  
