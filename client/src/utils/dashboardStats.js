export const getDashboardStats = (bookings, cars) => {
  if (!bookings || bookings.length === 0) {
    return {
      totalTrips: 0,
      totalSpent: 0,
      mostUsedBrand: "-",
      recommendedCar: null,
    };
  }

  // Total trips
  const totalTrips = bookings.length;

  // Total spent
  const totalSpent = bookings.reduce(
    (acc, b) => acc + (b.totalPrice || 0),
    0
  );

  // Brand frequency
  const brandCount = {};

  bookings.forEach((b) => {
    const car = cars.find(
      (c) => c.id === b.carId
    );

    if (car) {
      brandCount[car.brand] =
        (brandCount[car.brand] || 0) +
        1;
    }
  });

  const mostUsedBrand =
    Object.keys(brandCount).sort(
      (a, b) =>
        brandCount[b] -
        brandCount[a]
    )[0] || "-";

  // Recommend next car (simple AI logic)
  let recommendedCar = null;

  if (mostUsedBrand !== "-") {
    recommendedCar =
      cars.find(
        (c) =>
          c.brand === mostUsedBrand
      ) || cars[0];
  }

  return {
    totalTrips,
    totalSpent,
    mostUsedBrand,
    recommendedCar,
  };
};