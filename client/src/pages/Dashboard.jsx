import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import API from "../services/api";
import toast from "react-hot-toast";
import generateInvoice from "../utils/generateInvoice";

import {
  FaCar,
  FaUserCircle,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileInvoice,
  FaTrash,
} from "react-icons/fa";

function Dashboard() {
  const [bookings, setBookings] = useState([]);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get("/bookings");
      setBookings(res.data);
    } catch (err) {
      toast.error("Failed to load bookings");
    }
  };

  const totalBookings = bookings.length;

  const totalSpent = bookings.reduce(
    (sum, booking) =>
      sum + (booking.totalPrice || 0),
    0
  );

  const upcomingTrips = bookings.filter(
    (booking) =>
      new Date(booking.pickupDate) >
      new Date()
  ).length;

  const cancelBooking = async (id) => {
    try {
      await API.delete(`/bookings/${id}`);

      setBookings(
        bookings.filter(
          (booking) => booking._id !== id
        )
      );

      toast.success(
        "Booking cancelled successfully"
      );
    } catch (err) {
      toast.error("Failed to cancel booking");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";

      case "Confirmed":
        return "bg-green-600";

      case "In Progress":
        return "bg-blue-600";

      case "Completed":
        return "bg-gray-600";

      default:
        return "bg-red-600";
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">

        {/* HEADER */}

        <div className="flex items-center gap-5 mb-12">

          <FaUserCircle
            size={80}
            className="text-amber-400"
          />

          <div>
            <h1 className="text-5xl font-bold">
              Welcome, {user.name}
            </h1>

            <p className="text-gray-400 mt-2">
              Manage your bookings and trips
            </p>
          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <FaCar className="text-amber-400 text-3xl mb-4" />
            <p className="text-gray-400">
              Total Bookings
            </p>
            <h2 className="text-4xl font-bold text-amber-400">
              {totalBookings}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <FaCalendarAlt className="text-blue-400 text-3xl mb-4" />
            <p className="text-gray-400">
              Upcoming Trips
            </p>
            <h2 className="text-4xl font-bold text-blue-400">
              {upcomingTrips}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800">
            <FaMoneyBillWave className="text-green-400 text-3xl mb-4" />
            <p className="text-gray-400">
              Total Spent
            </p>
            <h2 className="text-4xl font-bold text-green-400">
              ₹{totalSpent}
            </h2>
          </div>

        </div>

        {/* PROFILE */}

        <div className="bg-slate-900 p-8 rounded-3xl border border-slate-800 mb-12">

          <h2 className="text-3xl font-bold mb-6">
            Profile Information
          </h2>

          <div className="space-y-4">

            <p>
              <strong>Name:</strong>{" "}
              {user.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Membership:</strong>

              <span className="ml-3 bg-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                Premium
              </span>
            </p>

          </div>

        </div>

        {/* BOOKINGS */}

        <h2 className="text-3xl font-bold mb-6">
          Booking History
        </h2>

        {bookings.length === 0 ? (
          <div className="bg-slate-900 p-10 rounded-3xl text-center border border-slate-800">

            <h3 className="text-2xl font-bold mb-3">
              No Bookings Yet 🚗
            </h3>

            <p className="text-gray-400">
              Start booking your dream car.
            </p>

          </div>
        ) : (
          <div className="grid gap-6">

            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="
                  bg-slate-900
                  p-6
                  rounded-3xl
                  border
                  border-slate-800
                  hover:border-amber-400
                  transition
                "
              >

                <div className="flex justify-between flex-wrap gap-6">

                  <div>

                    <h3 className="text-2xl font-bold">
                      {booking.carName}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      Booking ID:
                      {" "}
                      {booking._id.slice(-8)}
                    </p>

                    <p className="text-gray-400 mt-3">
                      📍 {booking.location}
                    </p>

                    <p className="text-gray-400">
                      {formatDate(
                        booking.pickupDate
                      )}
                      {" → "}
                      {formatDate(
                        booking.returnDate
                      )}
                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`
                        px-4
                        py-2
                        rounded-xl
                        text-white
                        ${getStatusColor(
                          booking.status
                        )}
                      `}
                    >
                      {booking.status}
                    </span>

                    <h2 className="text-3xl font-bold text-amber-400 mt-4">
                      ₹{booking.totalPrice}
                    </h2>

                  </div>

                </div>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      generateInvoice(
                        booking,
                        user
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      bg-green-600
                      px-5
                      py-3
                      rounded-xl
                      hover:bg-green-700
                    "
                  >
                    <FaFileInvoice />
                    Invoice
                  </button>

                  <button
                    onClick={() =>
                      cancelBooking(
                        booking._id
                      )
                    }
                    className="
                      flex
                      items-center
                      gap-2
                      bg-red-600
                      px-5
                      py-3
                      rounded-xl
                      hover:bg-red-700
                    "
                  >
                    <FaTrash />
                    Cancel
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Dashboard;