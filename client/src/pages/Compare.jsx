import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import { useCompare } from "../context/CompareContext";

function Compare() {
  const { compareCars } =
    useCompare();

  if (compareCars.length < 2) {
    return (
      <>
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-20 min-h-screen">

          <h1 className="text-5xl font-bold mb-6">
            Compare Cars
          </h1>

          <div className="bg-slate-900 p-10 rounded-3xl">
            Select at least 2 cars to compare.
          </div>

        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">

        <h1 className="text-5xl font-bold mb-10">
          Compare Cars
        </h1>

        <div className="overflow-x-auto">

          <table className="w-full bg-slate-900 rounded-3xl overflow-hidden">

            <thead>
              <tr>
                <th className="p-5 text-left">
                  Feature
                </th>

                {compareCars.map(
                  (car) => (
                    <th
                      key={car.id}
                      className="p-5"
                    >
                      {car.name}
                    </th>
                  )
                )}
              </tr>
            </thead>

            <tbody>

              <tr>
                <td className="p-5 font-bold">
                  Price
                </td>

                {compareCars.map(
                  (car) => (
                    <td
                      key={car.id}
                      className="p-5"
                    >
                      ₹{car.price}
                    </td>
                  )
                )}
              </tr>

              <tr>
                <td className="p-5 font-bold">
                  Fuel
                </td>

                {compareCars.map(
                  (car) => (
                    <td
                      key={car.id}
                      className="p-5"
                    >
                      {car.fuel}
                    </td>
                  )
                )}
              </tr>

              <tr>
                <td className="p-5 font-bold">
                  Transmission
                </td>

                {compareCars.map(
                  (car) => (
                    <td
                      key={car.id}
                      className="p-5"
                    >
                      {
                        car.transmission
                      }
                    </td>
                  )
                )}
              </tr>

              <tr>
                <td className="p-5 font-bold">
                  Seats
                </td>

                {compareCars.map(
                  (car) => (
                    <td
                      key={car.id}
                      className="p-5"
                    >
                      {car.seats}
                    </td>
                  )
                )}
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Compare;