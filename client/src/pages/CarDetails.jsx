import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookingForm from "../components/BookingForm";
import CarGallery from "../components/CarGallery";

import API from "../services/api";

function CarDetails() {
  const { id } = useParams();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const res = await API.get(`/cars/${id}`);

      setCar(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          Loading Car...
        </div>
        <Footer />
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-4xl font-bold">
            Car Not Found 🚗
          </h1>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">

        <CarGallery
          images={car.images || []}
        />

        <div className="grid lg:grid-cols-2 gap-12 mt-10">

          {/* LEFT */}

          <div>

            <div className="flex gap-3 mb-4">
              <span className="bg-green-600 px-4 py-2 rounded-full">
                Available
              </span>

              <span className="bg-amber-500 px-4 py-2 rounded-full">
                ⭐ {car.rating}
              </span>
            </div>

            <h1 className="text-5xl font-bold">
              {car.name}
            </h1>

            <p className="text-xl text-gray-400 mt-2">
              {car.brand}
            </p>

            <h2 className="text-5xl font-bold text-amber-400 mt-8">
              ₹{car.price}
              <span className="text-lg text-white ml-2">
                /day
              </span>
            </h2>

            <div className="grid grid-cols-2 gap-4 mt-10">

              <div className="bg-slate-800 p-5 rounded-xl">
                ⛽ Fuel
                <div className="font-bold mt-2">
                  {car.fuel}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                ⚙️ Transmission
                <div className="font-bold mt-2">
                  {car.transmission}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                👥 Seats
                <div className="font-bold mt-2">
                  {car.seats}
                </div>
              </div>

              <div className="bg-slate-800 p-5 rounded-xl">
                📍 Location
                <div className="font-bold mt-2">
                  {car.location}
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="bg-slate-900 p-8 rounded-3xl">

              <h2 className="text-3xl font-bold mb-5">
                Description
              </h2>

              <p className="text-gray-300 leading-8">
                {car.description}
              </p>

            </div>

            <div className="bg-slate-900 p-8 rounded-3xl mt-6">

              <h2 className="text-3xl font-bold mb-5">
                Features
              </h2>

              <div className="grid grid-cols-2 gap-4">

                {car.features?.map(
                  (feature, index) => (
                    <div
                      key={index}
                      className="bg-slate-800 p-4 rounded-xl"
                    >
                      ✓ {feature}
                    </div>
                  )
                )}

              </div>

            </div>

          </div>

        </div>

        <BookingForm
          pricePerDay={car.price}
          carName={car.name}
          carImage={car.images?.[0]}
        />

      </div>

      <Footer />
    </>
  );
}

export default CarDetails;