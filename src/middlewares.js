/**
 * Dolman Middlewares
 * ===================
 *
 * Collection of handy middlewares.
 */

/**
 * Factory building a validation middleware working for the given definition.
 */
function validate(types, def) {
  return function(req, res, next) {

    var sources = ['params', 'query', 'body'],
        source,
        i,
        l;

    for (i = 0, l = sources.length; i < l; i++) {
      source = sources[i];

      if (def[source] && !types.check(def[source], req[source])) {
        var reason = {
          source: source,
          expecting: def[source],
          sent: req[source] || {}
        };

        if (source === 'params')
          reason.path = req.route.path;

        return res.badRequest(reason);
      }
    }

    return next();
  };
};

module.exports = {
  validate: validate
};
