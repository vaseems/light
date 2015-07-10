/**
 * Created by steve on 08/07/15.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var AuthStore = require('../stores/AuthStore.js');
var BlogStore = require('../stores/BlogStore.js');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var Router = require('react-router');
var routes = require('../routes.js');

var router = Router.create({
    routes: routes,
    location: null // Router.HistoryLocation
});

var ActionTypes = AppConstants.ActionTypes;
var CHANGE_EVENT = 'change';

var RouteStore = assign({}, EventEmitter.prototype, {

    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function() {
        this.removeListener(CHANGE_EVENT, callback);
    },

    getRouter: function() {
        return router;
    },

    redirectHome: function() {
        router.transitionTo('app');
    }
});

RouteStore.dispatchToken = AppDispatcher.register(function(payload) {
    AppDispatcher.waitFor([
        AuthStore.dispatchToken,
        BlogStore.dispatchToken
    ]);

    var action = payload.action;

    switch(action.type) {

        case ActionTypes.REDIRECT:
            router.transitionTo(action.route);
            break;

        case ActionTypes.LOGIN_RESPONSE:
            if (AuthStore.isLoggedIn()) {
                router.transitionTo('app');
                // Dirty hack, need to figure this out
                $(document).foundation();
            }
            break;

        case ActionTypes.RECEIVE_CREATED_STORY:
            router.transitionTo('app');
            break;

        default:
    }

    return true;
});

module.exports = RouteStore;
