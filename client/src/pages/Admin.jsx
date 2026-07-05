import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Admin() {
  const [filter, setFilter] = useState("all");

  const bookings =
    JSON.parse(
      localStorage.getItem("bookings")
    ) || [];

  // FILTER BOOKINGS
  const filteredBookings =
    filter === "all"
      ? bookings
      : bookings.filter(
          (b) => b.status === filter
        );

  // TOTAL REVENUE
  const totalRevenue = bookings.reduce(
    (acc, b) =>
      acc + (b.totalPrice || 0),
    0
  );

  // CANCEL BOOKING
  const cancelBooking = (id) => {
    const updated = bookings.filter(
      (b) => b.id !== id
    );

    localStorage.setItem(
      "bookings",
      JSON.stringify(updated)
    );

    window.location.reload();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">

        <h1 className="text-5xl font-bold mb-10">
          Admin Panel 🧑‍💼
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 p-6 rounded-3xl">
            <h3 className="text-gray-400">
              Total Bookings
            </h3>
            <p className="text-4xl font-bold text-amber-400 mt-3">
              {bookings.length}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <h3 className="text-gray-400">
              Total Revenue
            </h3>
            <p className="text-4xl font-bold text-green-400 mt-3">
              ₹{totalRevenue}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl">
            <h3 className="text-gray-400">
              Active Bookings
            </h3>
            <p className="text-4xl font-bold text-blue-400 mt-3">
              {
                bookings.filter(
                  (b) =>
                    b.status !== "Cancelled"
                ).length
              }
            </p>
          </div>

        </div>

        {/* FILTER */}
        <div className="flex gap-4 mb-8">

          <button
            onClick={() => setFilter("all")}
            className="px-4 py-2 bg-slate-800 rounded-xl"
          >
            All
          </button>

          <button
            onClick={() =>
              setFilter("Confirmed")
            }
            className="px-4 py-2 bg-green-600 rounded-xl"
          >
            Confirmed
          </button>

          <button
            onClick={() =>
              setFilter("Pending")
            }
            className="px-4 py-2 bg-yellow-600 rounded-xl"
          >
            Pending
          </button>

        </div>

        {/* BOOKINGS TABLE */}
        <div className="space-y-6">

          {filteredBookings.length === 0 ? (
            <div className="bg-slate-900 p-8 rounded-3xl text-gray-400">
              No bookings found
            </div>
          ) : (
            filteredBookings.map(
              (booking) => (
                <div
                  key={booking.id}
                  className="bg-slate-900 p-6 rounded-3xl flex flex-col md:flex-row md:justify-between gap-4"
                >

                  <div>

                    <h3 className="text-2xl font-bold">
                      {booking.carName}
                    </h3>

                    <p className="text-gray-400 mt-2">
                      {booking.location}
                    </p>

                    <p className="text-gray-500">
                      {booking.pickupDate} →{" "}
                      {booking.returnDate}
                    </p>

                  </div>

                  <div className="flex flex-col items-end gap-3">

                    <span className="text-amber-400 font-bold">
                      ₹{booking.totalPrice}
                    </span>

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking.id
                        )
                      }
                      className="bg-red-600 px-4 py-2 rounded-xl hover:bg-red-700"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )
            )
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Admin;