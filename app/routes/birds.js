const _ = require("lodash");

module.exports = (router) => {
  // get birds – including any filters
  router.get("/", (req, res) => {
    let birds = req.session.data.birds;

    let selectedStatusFilters = _.get(req.session.data.filters, "statuses");

    let selectedFilters = {
      categories: [],
    };

    if (_.get(selectedStatusFilters, "length")) {
      birds = birds.filter((bird) => {
        let matchesStatus = true;

        matchesStatus = selectedStatusFilters.includes(bird.status);

        return matchesStatus;
      });

      selectedFilters.categories.push({
        heading: {
          text: "Status",
        },
        items: selectedStatusFilters.map((label) => {
          return {
            text: label,
            href: `/remove-status/${label}`,
          };
        }),
      });
    }

    res.render("/index", {
      birds,
      selectedFilters,
    });
  });

  // remove status filter
  router.get("/remove-status/:status", (req, res) => {
    _.set(
      req,
      "session.data.filters.statuses",
      _.pull(req.session.data.filters.statuses, req.params.status)
    );
    res.redirect("/");
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
