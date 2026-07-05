import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const WishlistContext = createContext();

export function WishlistProvider({
  children,
}) {
  const [wishlist, setWishlist] = useState(() => {
    const saved =
      localStorage.getItem("wishlist");

    return saved
      ? JSON.parse(saved)
      : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  const addToWishlist = (car) => {
    const exists = wishlist.find(
      (item) => item._id === car._id
    );

    if (!exists) {
      setWishlist([...wishlist, car]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlist(
      wishlist.filter(
        (car) => car._id !== id
      )
    );
  };

  const isWishlisted = (id) => {
    return wishlist.some(
      (car) => car._id === id
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}