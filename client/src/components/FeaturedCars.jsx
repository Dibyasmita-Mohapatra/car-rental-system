import { useEffect, useState } from "react";
import API from "../services/api";
import CarCard from "./CarCard";

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");

      // show first 4 cars as featured
      setCars(res.data.slice(0, 4));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <div className="text-center mb-12">

          <span className="text-amber-500 font-semibold uppercase tracking-wider">
            Premium Collection
          </span>

          <h2 className="text-5xl font-bold mt-3 text-slate-900">
            Featured Cars
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Choose from our most popular luxury and
            premium rental vehicles.
          </p>

        </div>

        {/* Loading */}

        {loading ? (
          <div className="text-center py-20">

            <div className="text-2xl font-semibold text-slate-700">
              Loading Cars...
            </div>

          </div>
        ) : cars.length === 0 ? (
          <div className="text-center py-20">

            <h3 className="text-2xl font-bold text-slate-800">
              No Cars Available
            </h3>

            <p className="text-gray-500 mt-2">
              Add cars from the Admin Panel.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {cars.map((car) => (
              <CarCard
                key={car._id}
                car={car}
              />
            ))}

          </div>
        )}

      </div>

    </section>
  );
}

export default FeaturedCars;