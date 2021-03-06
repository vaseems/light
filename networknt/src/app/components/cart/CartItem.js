/**
 * Created by steve on 12/04/15.
 */
'use strict';

var React = require('react');
var ReactPropTypes = React.PropTypes;
var CartActionCreators = require('../../actions/CartActionCreators');
var _ = require('lodash');


var CartItem = React.createClass({

    propTypes: {
        cartItem: React.PropTypes.object.isRequired
    },

    render: function() {
        var cartItem = this.props.cartItem;
        var options = _.times(cartItem.initialInventory, n =>
                <option key={n} value={n+1}>{n+1}</option>
        );
        console.log('rendering cartItem');
        return (
            <tr>
                <td>
                    <div className="media">
                        <a className="thumbnail pull-left" href="#">
                            <img className="media-object" src={cartItem.image} />
                        </a>
                        <div className="media-body">
                            <h4 className="media-heading">
                                <a href="#">{cartItem.title} {cartItem.type}</a>
                            </h4>
                        </div>
                    </div>
                </td>
                <td>
                    <select
                        className="checkout__qty"
                        value={cartItem.qty}
                        onChange={this._setQty}
                        >
                        {options}
                    </select>
                </td>
                <td className="col-sm-1 col-md-1 text-center">${(cartItem.price * cartItem.qty).toFixed(2)}</td>
                <td className="col-sm-1 col-md-1">
                    <button type="button" className="btn btn-danger" onClick={this._onClickRemove}>
                        <span className="glyphicon glyphicon-remove"></span> Remove
                    </button>
                </td>
            </tr>
        )
    },

    _setQty: function(e) {
        var qty = Number(e.target.value);
        CartActionCreators.setQty(this.props.cartItem, qty);
    },

    _onClickRemove: function(e) {
        e.preventDefault();
        CartActionCreators.remove(this.props.cartItem);
    }

});

module.exports = CartItem;

