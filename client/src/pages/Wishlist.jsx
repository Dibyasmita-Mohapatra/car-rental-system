import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CarCard from "../components/CarCard";

import { useWishlist } from "../context/WishlistContext";

function Wishlist() {
  const { wishlist } =
    useWishlist();

  return (
    <>
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12 min-h-screen">

        <h1 className="text-5xl font-bold mb-10">
          My Wishlist
        </h1>

        {wishlist.length === 0 ? (
          <div className="bg-slate-900 p-10 rounded-3xl text-center">
            <h2 className="text-2xl font-bold">
              No cars saved yet
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {wishlist.map((car) => (
              <CarCard
                key={car.id}
                car={car}
              />
            ))}
          </div>
        )}

      </div>

      <Footer />
    </>
  );
}

export default Wishlist;