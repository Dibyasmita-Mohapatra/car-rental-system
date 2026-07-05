function SearchBar() {
  return (
    <div className="max-w-4xl mx-auto -mt-14 relative z-10">
      <div className="bg-white shadow-xl rounded-2xl p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search car..."
            className="border p-3 rounded-lg"
          />

          <select className="border p-3 rounded-lg">
            <option>Brand</option>
            <option>BMW</option>
            <option>Audi</option>
          </select>

          <input
            type="date"
            className="border p-3 rounded-lg"
          />

          <button className="bg-black text-white rounded-lg">
            Search
          </button>

        </div>

      </div>
    </div>
  );
}

export default SearchBar;