import jsPDF from "jspdf";

const generateInvoice = (booking, user) => {
  const doc = new jsPDF();

  doc.setFontSize(22);
  doc.text("Car Rental Invoice", 20, 20);

  doc.setFontSize(12);

  doc.text(
    `Booking ID: ${booking._id}`,
    20,
    40
  );

  doc.text(
    `Customer: ${user.name}`,
    20,
    50
  );

  doc.text(
    `Email: ${user.email}`,
    20,
    60
  );

  doc.text(
    `Car: ${booking.carName}`,
    20,
    80
  );

  doc.text(
    `Location: ${booking.location}`,
    20,
    90
  );

  doc.text(
    `Pickup: ${new Date(
      booking.pickupDate
    ).toLocaleDateString()}`,
    20,
    100
  );

  doc.text(
    `Return: ${new Date(
      booking.returnDate
    ).toLocaleDateString()}`,
    20,
    110
  );

  doc.text(
    `Total Days: ${booking.totalDays}`,
    20,
    120
  );

  doc.text(
    `Amount Paid: ₹${booking.totalPrice}`,
    20,
    130
  );

  doc.text(
    `Status: ${booking.status}`,
    20,
    140
  );

  doc.save(
    `Invoice-${booking.carName}.pdf`
  );
};

export default generateInvoice;