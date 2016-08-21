'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _rx = require('rx');

var _rx2 = _interopRequireDefault(_rx);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

var _dbpediaSparqlClient = require('dbpedia-sparql-client');

var _dbpediaSparqlClient2 = _interopRequireDefault(_dbpediaSparqlClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DBpediaService = function () {
  function DBpediaService() {
    _classCallCheck(this, DBpediaService);
  }

  _createClass(DBpediaService, [{
    key: 'search',
    value: function search(_ref) {
      var query = _ref.query;
      var qclass = _ref.qclass;
      var limit = _ref.limit;

      var qs = {
        QueryClass: qclass || 'stadium',
        QueryString: query,
        MaxHits: limit || 5
      };
      return _rx2.default.Observable.fromPromise((0, _requestPromise2.default)({
        method: 'GET',
        uri: 'http://lookup.dbpedia.org/api/search.asmx/KeywordSearch',
        headers: {
          Accept: 'application/json'
        },
        qs: qs,
        json: true
      }));
    }
  }, {
    key: 'sparql',
    value: function sparql(query) {
      return _rx2.default.Observable.fromPromise(_dbpediaSparqlClient2.default.client().query(query).asJson());
    }
  }]);

  return DBpediaService;
}();

exports.default = new DBpediaService();