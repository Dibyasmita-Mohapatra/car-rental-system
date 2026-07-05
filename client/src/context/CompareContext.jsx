import {
  createContext,
  useContext,
  useState,
} from "react";

const CompareContext = createContext();

export function CompareProvider({
  children,
}) {
  const [compareCars, setCompareCars] =
    useState([]);

  const addToCompare = (car) => {
    const exists = compareCars.find(
      (item) => item._id === car._id
    );

    if (exists) return;

    if (compareCars.length >= 3) {
      alert(
        "Maximum 3 cars can be compared"
      );
      return;
    }

    setCompareCars([
      ...compareCars,
      car,
    ]);
  };

  const removeFromCompare = (id) => {
    setCompareCars(
      compareCars.filter(
        (car) => car._id !== id
      )
    );
  };

  const isCompared = (id) => {
    return compareCars.some(
      (car) => car._id === id
    );
  };

  return (
    <CompareContext.Provider
      value={{
        compareCars,
        addToCompare,
        removeFromCompare,
        isCompared,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}