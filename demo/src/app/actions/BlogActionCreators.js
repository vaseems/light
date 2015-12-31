/**
 * Created by steve on 08/07/15.
 */
var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var AppConstants = require('../constants/AppConstants.js');
var WebAPIUtils = require('../utils/WebAPIUtils.js');

var ActionTypes = AppConstants.ActionTypes;

module.exports = {

    getBlogTree: function() {
        WebAPIUtils.getBlogTree();
    },

    getBlog: function() {
        WebAPIUtils.getBlog();
    },

    delBlog: function(blog) {
        WebAPIUtils.delBlog(blog);
    },

    receiveBlog: function(json) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_BLOG,
            json: json
        });
    },

    createBlog: function(title, body) {
        AppDispatcher.dispatch({
            type: ActionTypes.CREATE_BLOG,
            title: title,
            body: body
        });
        WebAPIUtils.createBlog(title, body);
    },

    receiveCreatedBlog: function(json, errors) {
        AppDispatcher.dispatch({
            type: ActionTypes.RECEIVE_CREATED_STORY,
            json: json,
            errors: errors
        });
    }

};

