import {
  useEffect,
  useState,
} from "react";

import API from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res =
      await API.get("/admin/bookings");

    setBookings(res.data);
  };

  const updateStatus = async (
    id,
    status
  ) => {
    await API.put(
      `/admin/booking/${id}/status`,
      { status }
    );

    fetchBookings();
  };

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        Booking Management
      </h1>

      <table className="w-full">

        <thead>
          <tr>
            <th>User</th>
            <th>Car</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {bookings.map((booking) => (
            <tr key={booking._id}>

              <td>
                {booking.user?.name}
              </td>

              <td>
                {booking.carName}
              </td>

              <td>
                {booking.status}
              </td>

              <td>

                <select
                  value={booking.status}
                  onChange={(e) =>
                    updateStatus(
                      booking._id,
                      e.target.value
                    )
                  }
                >

                  <option>
                    Pending
                  </option>

                  <option>
                    Confirmed
                  </option>

                  <option>
                    In Progress
                  </option>

                  <option>
                    Completed
                  </option>

                  <option>
                    Cancelled
                  </option>

                </select>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default AdminBookings;