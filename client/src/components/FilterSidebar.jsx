function FilterSidebar({
  search,
  setSearch,
  brand,
  setBrand,
  fuel,
  setFuel,
  sort,
  setSort,
}) {
  return (
    <div className="bg-slate-900 p-6 rounded-3xl">

      <h2 className="text-2xl font-bold mb-6">
        Filters
      </h2>

      {/* Search */}

      <div className="mb-5">
        <label className="block mb-2">
          Search
        </label>

        <input
          type="text"
          placeholder="BMW, Audi..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-slate-800
            border
            border-slate-700
          "
        />
      </div>

      {/* Brand */}

      <div className="mb-5">
        <label className="block mb-2">
          Brand
        </label>

        <select
          value={brand}
          onChange={(e) =>
            setBrand(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-slate-800
          "
        >
          <option value="">All</option>
          <option value="BMW">BMW</option>
          <option value="Audi">Audi</option>
          <option value="Mercedes">Mercedes</option>
          <option value="Hyundai">Hyundai</option>
        </select>
      </div>

      {/* Fuel */}

      <div className="mb-5">
        <label className="block mb-2">
          Fuel Type
        </label>

        <select
          value={fuel}
          onChange={(e) =>
            setFuel(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-slate-800
          "
        >
          <option value="">All</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>

      {/* Sort */}

      <div>
        <label className="block mb-2">
          Sort By
        </label>

        <select
          value={sort}
          onChange={(e) =>
            setSort(e.target.value)
          }
          className="
            w-full
            p-3
            rounded-xl
            bg-slate-800
          "
        >
          <option value="">
            Default
          </option>

          <option value="low">
            Price Low → High
          </option>

          <option value="high">
            Price High → Low
          </option>

        </select>
      </div>

    </div>
  );
}

export default FilterSidebar;