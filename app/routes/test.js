module.exports = (router) => {
  router.post("/testflash/test", (req, res) => {
    req.flash("success", "Something was deleted");
    res.redirect("/testflash/success");
  });
};
