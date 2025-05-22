const Booking = require("../models/booking_model");

//@desc - Get all posts
//@Route - GET /posts/
const getAllBookings = (req, res) => {
  Booking.find()
    .then((Booking) => res.status(200).json(Booking))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

//@desc - Create posts
//@Route - POST /posts/add
const addBookings = (req, res) => {
  const { FirstName, LastName, Email, Phone, nic, BookingDate } = req.body;

  const newBooking = new Booking({
    FirstName,
    LastName,
    Email,
    Phone,
    nic,
    BookingDate,
  });

  newBooking
    .save()

    .then(() => res.status(200).json("Booking added succesfully"))
    .catch((err) => res.status(400).json({ Error: err }));
};

//@desc - Get each post by id
//@Route - GET /posts/:id
const getSingleBookings = (req, res) => {
  Booking.findById(req.params.id)
    .then((Booking) => res.status(200).json(Booking))
    .catch((err) => {
      res.status(400).json({ message: err });
    });
};

//@desc - Update post
//@Route - PUT /posts/update/:id
const updateBooking = (req, res) => {
  Booking.findById(req.params.id)
    .then((Booking) => {
      Booking.FirstName = req.body.FirstName;
      Booking.LastName = req.body.LastName;
      Booking.Email = req.body.Email;
      Booking.Phone = req.body.Phone;
      Booking.nic = req.body.nic;
      Booking.BookingDate = req.body.BookingDate;

      Booking.save()
        .then(() => res.status(200).json("Booking updated"))
        .catch((err) => res.status(400).json({ Error: err }));
    })

    .catch((err) => res.status(400).json({ Erro: err }));
};

//@desc - Delete post
//@Route - DELETE /posts/:id
const deleteBooking = (req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.status(200).json("Booking deleted"))
    .catch((err) => res.status(400).json({ Error: err }));
};

module.exports = {
  getAllBookings,
  addBookings,
  getSingleBookings,
  updateBooking,
  deleteBooking,
};
