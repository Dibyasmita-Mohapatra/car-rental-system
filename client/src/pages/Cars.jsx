import { useState, useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FilterSidebar from "../components/FilterSidebar";
import CarCard from "../components/CarCard";

import API from "../services/api";

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [brand, setBrand] = useState("");
  const [fuel, setFuel] = useState("");
  const [transmission, setTransmission] =
    useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");

      setCars(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  let filteredCars = cars.filter((car) => {
    return (
      car.name
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (brand === "" || car.brand === brand) &&
      (fuel === "" || car.fuel === fuel) &&
      (transmission === "" ||
        car.transmission === transmission)
    );
  });

  if (sort === "low") {
    filteredCars.sort(
      (a, b) => a.price - b.price
    );
  }

  if (sort === "high") {
    filteredCars.sort(
      (a, b) => b.price - a.price
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <h1 className="text-5xl font-bold mb-4">
          Available Cars
        </h1>

        <p className="text-gray-400 mb-10">
          {filteredCars.length} cars found
        </p>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* Sidebar */}

          <div>
            <FilterSidebar
              search={search}
              setSearch={setSearch}
              brand={brand}
              setBrand={setBrand}
              fuel={fuel}
              setFuel={setFuel}
              transmission={transmission}
              setTransmission={
                setTransmission
              }
              sort={sort}
              setSort={setSort}
            />
          </div>

          {/* Cars Grid */}

          <div className="lg:col-span-3">

            {loading ? (
              <div className="bg-slate-900 p-10 rounded-3xl text-center">
                Loading cars...
              </div>
            ) : filteredCars.length === 0 ? (
              <div className="bg-slate-900 p-10 rounded-3xl text-center">
                <h2 className="text-2xl font-semibold">
                  No Cars Found
                </h2>

                <p className="text-gray-400 mt-3">
                  Try changing your filters.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

                {filteredCars.map((car) => (
                  <CarCard
                    key={car._id}
                    car={car}
                  />
                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Cars;