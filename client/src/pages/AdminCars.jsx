import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../services/api";

function AdminCars() {
  const [cars, setCars] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    fuel: "",
    transmission: "",
    seats: "",
    location: "",
    price: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await API.get("/cars");
      setCars(res.data);
    } catch (err) {
      toast.error("Failed to load cars");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const clearForm = () => {
    setFormData({
      name: "",
      brand: "",
      fuel: "",
      transmission: "",
      seats: "",
      location: "",
      price: "",
      description: "",
      image: "",
    });

    setEditingId(null);
  };

  // ADD CAR
  const handleAddCar = async (e) => {
    e.preventDefault();

    try {
      await API.post("/cars", {
        name: formData.name,
        brand: formData.brand,
        fuel: formData.fuel,
        transmission: formData.transmission,
        seats: Number(formData.seats),
        location: formData.location,
        price: Number(formData.price),
        description: formData.description,

        images: formData.image
          .split(",")
          .map((img) => img.trim()),

        features: [
          "Bluetooth",
          "GPS",
          "Airbags",
        ],
      });

      toast.success("Car added successfully");

      clearForm();
      fetchCars();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Failed to add car"
      );
    }
  };

  // EDIT CAR
  const editCar = (car) => {
    setEditingId(car._id);

    setFormData({
      name: car.name || "",
      brand: car.brand || "",
      fuel: car.fuel || "",
      transmission: car.transmission || "",
      seats: car.seats || "",
      location: car.location || "",
      price: car.price || "",
      description: car.description || "",
      image: car.images?.join(", ") || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // UPDATE CAR
  const handleUpdateCar = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/cars/${editingId}`, {
        name: formData.name,
        brand: formData.brand,
        fuel: formData.fuel,
        transmission: formData.transmission,
        seats: Number(formData.seats),
        location: formData.location,
        price: Number(formData.price),
        description: formData.description,

        images: formData.image
          .split(",")
          .map((img) => img.trim()),

        features: [
          "Bluetooth",
          "GPS",
          "Airbags",
        ],
      });

      toast.success("Car updated successfully");

      clearForm();
      fetchCars();
    } catch (err) {
      toast.error("Failed to update car");
    }
  };

  // DELETE CAR
  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?"))
      return;

    try {
      await API.delete(`/cars/${id}`);

      toast.success("Car deleted");

      fetchCars();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        🚗 Admin Car Management
      </h1>

      {/* FORM */}

      <form
        onSubmit={
          editingId
            ? handleUpdateCar
            : handleAddCar
        }
        className="
          bg-slate-900
          p-6
          rounded-3xl
          mb-10
          grid
          md:grid-cols-2
          gap-4
        "
      >
        <input
          name="name"
          placeholder="Car Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="brand"
          placeholder="Brand"
          value={formData.brand}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="fuel"
          placeholder="Fuel Type"
          value={formData.fuel}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="transmission"
          placeholder="Transmission"
          value={formData.transmission}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="seats"
          placeholder="Seats"
          value={formData.seats}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="price"
          placeholder="Price Per Day"
          value={formData.price}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <input
          name="image"
          placeholder="Image URLs (comma separated)"
          value={formData.image}
          onChange={handleChange}
          className="p-3 rounded-xl bg-slate-800"
        />

        <textarea
          name="description"
          placeholder="Description"
          rows="5"
          value={formData.description}
          onChange={handleChange}
          className="
            md:col-span-2
            p-3
            rounded-xl
            bg-slate-800
          "
        />

        <div className="md:col-span-2 flex gap-4">
          <button
            type="submit"
            className="
              bg-amber-400
              text-black
              px-8
              py-3
              rounded-xl
              font-bold
            "
          >
            {editingId
              ? "Update Car"
              : "Add Car"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={clearForm}
              className="
                bg-gray-600
                px-8
                py-3
                rounded-xl
              "
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* CAR LIST */}

      <div className="grid md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car._id}
            className="
              bg-slate-900
              rounded-3xl
              overflow-hidden
            "
          >
            <img
              src={
                car.images?.[0] ||
                "https://via.placeholder.com/400x250"
              }
              alt={car.name}
              className="
                w-full
                h-52
                object-cover
              "
            />

            <div className="p-5">
              <h2 className="text-2xl font-bold">
                {car.name}
              </h2>

              <p className="text-gray-400">
                {car.brand}
              </p>

              <p className="mt-2">
                ₹{car.price}/day
              </p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() =>
                    editCar(car)
                  }
                  className="
                    bg-blue-600
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    deleteCar(car._id)
                  }
                  className="
                    bg-red-600
                    px-4
                    py-2
                    rounded-xl
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCars;