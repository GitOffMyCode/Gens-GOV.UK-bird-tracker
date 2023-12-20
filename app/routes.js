const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

const flash = require("connect-flash");
router.use(flash());
router.all("*", (req, res, next) => {
  res.locals.flash = req.flash("success");
  next();
});

require("./routes/birds")(router);
