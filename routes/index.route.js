const userRoutes = require("./user.route");
const allCodesRoutes = require("./allCode.route");
const doctorRoutes = require("./doctor.route");
const scheduleRoutes = require("./schedule.route");
const bookingRoutes = require("./booking.route");

const appRoutes = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/allCode", allCodesRoutes);
  app.use("/api/doctors", doctorRoutes);
  app.use("/api/schedule", scheduleRoutes);
  app.use("/api/booking", bookingRoutes);
};

module.exports = appRoutes;

/*
  RestAPI
  

*/
