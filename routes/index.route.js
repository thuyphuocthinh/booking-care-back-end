const userRoutes = require("./user.route");
const allCodesRoutes = require("./allCode.route");
const doctorRoutes = require("./doctor.route");

const appRoutes = (app) => {
  app.use("/api/user", userRoutes);
  app.use("/api/allCode", allCodesRoutes);
  app.use("/api/doctors", doctorRoutes);
};

module.exports = appRoutes;

/*
  RestAPI
  

*/
