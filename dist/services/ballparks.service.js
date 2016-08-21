'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _ballparks = require('../data/ballparks.json');

var _ballparks2 = _interopRequireDefault(_ballparks);

var _dbpedia = require('./dbpedia.service');

var _dbpedia2 = _interopRequireDefault(_dbpedia);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _ballparksCache = [];

var BallparksService = function () {
  function BallparksService() {
    _classCallCheck(this, BallparksService);
  }

  _createClass(BallparksService, [{
    key: 'all',
    value: function all() {
      // TODO cache the Rx way - clear it every day hour
      if (_ballparksCache.length > 0) {
        return _rx2.default.Observable.from(_ballparksCache);
      }
      return _rx2.default.Observable.from(_ballparks2.default).concatMap(function (park) {
        return BallparksService._withDetail(park.name).map(function (r) {
          return _extends({}, r, park);
        });
      }).do(function (park) {
        return _ballparksCache.push(park);
      });
    }
  }, {
    key: 'byId',
    value: function byId(id) {
      var $ballparks = _ballparksCache.length > 0 ? _rx2.default.Observable.from(_ballparksCache) : this.all();

      return $ballparks.toArray().map(function (ballparks) {
        return ballparks[Number.parseInt(id) - 1];
      });
    }
  }], [{
    key: '_withDetail',
    value: function _withDetail(name) {
      var query = '\n      PREFIX dbpedia2: <http://dbpedia.org/property/>\n      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n      PREFIX d: <http://dbpedia.org/ontology/>\n\n      SELECT ?name ?thumb ?comment ?description ?openingDate (group_concat(?link;separator="|") as ?links) WHERE {\n        ?park rdfs:label "' + name + '"@en ;\n              d:abstract ?description ;\n              rdfs:comment ?comment ;\n              foaf:isPrimaryTopicOf ?name .\n              OPTIONAL { ?park dbo:wikiPageExternalLink ?link } .\n              OPTIONAL { ?park d:thumbnail ?thumb } .\n              OPTIONAL { ?park dbpedia2:logoImage ?thumb } .\n              OPTIONAL { ?park d:openingDate ?openingDate } .\n              OPTIONAL { ?park dbpedia2:opened ?openingDate } .\n          FILTER ( lang(?description) = "en")\n          FILTER ( lang(?comment) = "en")\n      }\n    GROUP BY ?name ?thumb ?comment ?description ?openingDate\n    ';
      return _dbpedia2.default.sparql(query).map(function (r) {
        var b = r.results.bindings.length > 0 ? r.results.bindings[0] : null;
        if (!b) {
          console.log(name + ' has no results');
        }
        return {
          wikipediaUrl: b ? b.name.value : null,
          image: {
            thumb: b ? b.thumb.value : null
          },
          description: b ? b.description.value : null,
          comment: b ? b.comment.value : null,
          openingDate: b && b.openingDate ? b.openingDate.value : null,
          links: b && b.links ? b.links.value.split('|') : []
        };
      });
    }
  }]);

  return BallparksService;
}();

exports.default = new BallparksService();