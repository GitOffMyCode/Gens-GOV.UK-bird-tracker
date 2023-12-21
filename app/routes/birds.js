const _ = require("lodash");

module.exports = (router) => {
  // get birds – including any filters
  router.get("/", (req, res) => {
    let birds = req.session.data.birds;

    let selectedStatusFilters = _.get(req.session.data.filters, "statuses");
    let selectedYearsTrackedFilters = _.get(
      req.session.data.filters,
      "yearsTracked"
    );

    let hasFilters =
      _.get(selectedStatusFilters, "length") ||
      _.get(selectedYearsTrackedFilters, "length");

    let selectedFilters = {
      categories: [],
    };

    if (hasFilters) {
      birds = birds.filter((bird) => {
        let matchesStatus = true;
        let matchesYearsTracked = true;

        if (_.get(selectedStatusFilters, "length")) {
          matchesStatus = selectedStatusFilters.includes(bird.status);
        }

        if (_.get(selectedYearsTrackedFilters, "length")) {
          matchesYearsTracked = selectedYearsTrackedFilters.includes(
            bird.yearsTracked
          );
        }

        return matchesStatus && matchesYearsTracked;
      });
    }

    if (_.get(selectedStatusFilters, "length")) {
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

    if (_.get(selectedYearsTrackedFilters, "length")) {
      selectedFilters.categories.push({
        heading: {
          text: "Years tracked",
        },
        items: selectedYearsTrackedFilters.map((label) => {
          return {
            text: label,
            href: `/remove-yearsTracked/${label}`,
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

  // remove years tracked filter
  router.get("/remove-yearsTracked/:yearsTracked", (req, res) => {
    _.set(
      req,
      "session.data.filters.yearsTracked",
      _.pull(req.session.data.filters.yearsTracked, req.params.yearsTracked)
    );
    res.redirect("/");
  });

  // clear filters
  router.get("/clear-filters", (req, res) => {
    _.set(req, "session.data.filters.statuses", null);
    _.set(req, "session.data.filters.yearsTracked", null);
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
