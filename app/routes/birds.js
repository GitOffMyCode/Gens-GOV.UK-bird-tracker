const _ = require("lodash");

module.exports = (router) => {
  // get birds – including any filters
  router.get("/", (req, res) => {
    let birds = req.session.data.birds;

    let selectedStatusFilters = _.get(req.session.data.filters, "statuses");

    // check if user has selected status filters
    if (_.get(selectedStatusFilters, "length")) {
      birds = birds.filter((bird) => {
        let matchesStatus = true;

        matchesStatus = selectedStatusFilters.includes(bird.status);

        return matchesStatus;
      });
    }

    res.render("/index", {
      birds,
    });
  });

  // get bird by id
  router.get("/:birdId", (req, res) => {
    let bird = req.session.data.birds.find(
      (bird) => bird.id === req.params.birdId
    );

    res.render("/show", {
      bird,
    });
  });
};
