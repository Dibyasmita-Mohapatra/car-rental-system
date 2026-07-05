import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import your cars data
import cars from "../data/cars";

function Quiz() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [budget, setBudget] = useState("");
  const [purpose, setPurpose] = useState("");
  const [result, setResult] = useState([]);

  const getRecommendations = () => {
    let filtered = [...cars];

    // Budget filter
    if (budget === "low") {
      filtered = filtered.filter(
        (car) => car.price <= 3000
      );
    }

    if (budget === "mid") {
      filtered = filtered.filter(
        (car) =>
          car.price > 3000 &&
          car.price <= 6000
      );
    }

    if (budget === "high") {
      filtered = filtered.filter(
        (car) => car.price > 6000
      );
    }

    // Purpose filter (simple logic)
    if (purpose === "family") {
      filtered = filtered.filter(
        (car) => car.seats >= 5
      );
    }

    if (purpose === "luxury") {
      filtered = filtered.filter(
        (car) =>
          car.brand === "BMW" ||
          car.brand === "Audi" ||
          car.brand === "Mercedes"
      );
    }

    if (purpose === "adventure") {
      filtered = filtered.filter(
        (car) =>
          car.fuel === "Diesel" ||
          car.seats >= 5
      );
    }

    setResult(filtered.slice(0, 6));
    setStep(3);
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-12 min-h-screen">

        <h1 className="text-5xl font-bold mb-10 text-center">
          AI Car Recommendation Quiz
        </h1>

        {/* STEP 1 */}
        {step === 1 && (
          <div className="bg-slate-900 p-10 rounded-3xl">

            <h2 className="text-2xl mb-6">
              Select Your Budget
            </h2>

            <div className="flex flex-col gap-4">

              <button
                onClick={() => setBudget("low")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                Under ₹3000 / day
              </button>

              <button
                onClick={() => setBudget("mid")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                ₹3000 - ₹6000 / day
              </button>

              <button
                onClick={() => setBudget("high")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                Above ₹6000 / day
              </button>

            </div>

            <button
              disabled={!budget}
              onClick={() => setStep(2)}
              className="mt-8 w-full bg-amber-400 text-black py-3 rounded-xl font-bold disabled:opacity-50"
            >
              Next
            </button>

          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="bg-slate-900 p-10 rounded-3xl">

            <h2 className="text-2xl mb-6">
              Select Purpose
            </h2>

            <div className="flex flex-col gap-4">

              <button
                onClick={() => setPurpose("family")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                Family Trip
              </button>

              <button
                onClick={() => setPurpose("luxury")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                Luxury Ride
              </button>

              <button
                onClick={() => setPurpose("adventure")}
                className="p-4 bg-slate-800 rounded-xl hover:bg-amber-400 hover:text-black"
              >
                Adventure / Long Drive
              </button>

            </div>

            <button
              onClick={getRecommendations}
              className="mt-8 w-full bg-amber-400 text-black py-3 rounded-xl font-bold"
            >
              Get Recommendations
            </button>

          </div>
        )}

        {/* STEP 3 RESULT */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl mb-6">
              Recommended Cars 🚗
            </h2>

            {result.length === 0 ? (
              <div className="bg-slate-900 p-10 rounded-3xl">
                No cars found for your selection
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {result.map((car) => (
                  <div
                    key={car.id}
                    className="bg-slate-900 p-6 rounded-3xl"
                  >
                    <h3 className="text-2xl font-bold">
                      {car.name}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {car.brand}
                    </p>

                    <p className="text-amber-400 text-xl mt-3">
                      ₹{car.price}/day
                    </p>

                    <button
                      onClick={() =>
                        navigate(`/car/${car.id}`)
                      }
                      className="mt-5 w-full bg-amber-400 text-black py-2 rounded-xl"
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => {
                setStep(1);
                setBudget("");
                setPurpose("");
                setResult([]);
              }}
              className="mt-10 text-amber-400 underline"
            >
              Try Again
            </button>
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Quiz;