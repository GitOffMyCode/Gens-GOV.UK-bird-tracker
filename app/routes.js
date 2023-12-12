const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();

router.get("/:birdId", (req, res) => {
  let bird = req.session.data.birds.find(
    (bird) => bird.id === req.params.birdId
  );

  res.render("/show", {
    bird,
  });
});
