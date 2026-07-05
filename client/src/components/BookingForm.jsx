import { useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function BookingForm({
  pricePerDay,
  carName,
  carImage,
}) {
  const [location, setLocation] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const today = new Date()
    .toISOString()
    .split("T")[0];

  const calculateDays = () => {
    if (!pickupDate || !returnDate) return 0;

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    const diff =
      (end - start) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff : 0;
  };

  const totalDays = calculateDays();
  const totalPrice = totalDays * pricePerDay;

  const handleBooking = async () => {
    // validation
    if (
      !location.trim() ||
      !pickupDate ||
      !returnDate
    ) {
      toast.error("Please fill all booking details");
      return;
    }

    if (totalDays <= 0) {
      toast.error(
        "Return date must be after pickup date"
      );
      return;
    }

    try {
      // get logged user
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) {
        toast.error("Please login first");
        return;
      }

      // REAL API CALL 🚀
      await API.post("/bookings", {
        carName,
        carImage,
        pricePerDay,
        location,
        pickupDate,
        returnDate,
        totalDays,
        totalPrice,
      });

      toast.success(
        `${carName} booked successfully! 🚗`
      );

      // reset form
      setLocation("");
      setPickupDate("");
      setReturnDate("");

      console.log("Booking sent to backend");
    } catch (err) {
      console.log(err);
      toast.error("Booking failed");
    }
  };

  return (
    <div className="bg-slate-900 rounded-3xl p-8 mt-12 border border-slate-800">

      <h2 className="text-3xl font-bold mb-8">
        Book This Car
      </h2>

      {/* Location */}
      <div className="mb-5">
        <label className="block mb-2 font-medium">
          Pickup Location
        </label>

        <input
          type="text"
          placeholder="Enter city"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
        />
      </div>

      {/* Dates */}
      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="block mb-2 font-medium">
            Pickup Date
          </label>

          <input
            type="date"
            min={today}
            value={pickupDate}
            onChange={(e) =>
              setPickupDate(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Return Date
          </label>

          <input
            type="date"
            min={pickupDate || today}
            value={returnDate}
            onChange={(e) =>
              setReturnDate(e.target.value)
            }
            className="w-full p-4 rounded-xl bg-slate-800 border border-slate-700 outline-none focus:border-amber-400"
          />
        </div>

      </div>

      {/* Summary */}
      <div className="mt-8 bg-slate-800 rounded-2xl p-6">

        <h3 className="text-xl font-bold mb-4">
          Booking Summary
        </h3>

        <div className="flex justify-between mb-3">
          <span>Car</span>
          <span>{carName}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Price Per Day</span>
          <span>₹{pricePerDay}</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Total Days</span>
          <span>{totalDays}</span>
        </div>

        <hr className="border-slate-700 my-4" />

        <div className="flex justify-between text-2xl font-bold text-amber-400">
          <span>Total Price</span>
          <span>₹{totalPrice}</span>
        </div>

      </div>

      {/* Button */}
      <button
        onClick={handleBooking}
        disabled={totalDays <= 0}
        className="w-full mt-6 bg-amber-400 text-black py-4 rounded-xl font-bold hover:bg-amber-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Confirm Booking
      </button>

    </div>
  );
}

export default BookingForm;