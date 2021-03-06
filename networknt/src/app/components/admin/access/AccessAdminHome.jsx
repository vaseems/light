import React from 'react';
import Table from 'material-ui/lib/table/table';
import TableBody from 'material-ui/lib/table/table-body';
import TableFooter from 'material-ui/lib/table/table-footer';
import TableHeader from 'material-ui/lib/table/table-header';
import TableHeaderColumn from 'material-ui/lib/table/table-header-column';
import TableRow from 'material-ui/lib/table/table-row';
import TableRowColumn from 'material-ui/lib/table/table-row-column';
import RaisedButton from 'material-ui/lib/raised-button';
import Dialog from 'material-ui/lib/dialog';
import CircularProgress from 'material-ui/lib/circular-progress';
import AccessAdminStore from '../../../stores/AccessAdminStore';
import AccessActionCreators from '../../../actions/AccessActionCreators';
import FormActionCreators from '../../../actions/FormActionCreators';

var AccessAdminHome = React.createClass({
    displayName: 'AccessAdminHome',

    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function() {
        return {
            accesses: [],
            filter: {}
        };
    },

    componentWillMount: function() {
        AccessAdminStore.addChangeListener(this._onAccessChange);
        AccessActionCreators.getAllAccess();
    },

    componentWillUnmount: function() {
        AccessAdminStore.removeChangeListener(this._onAccessChange);
    },

    _onAccessChange: function() {
        this.setState({
            accesses: AccessAdminStore.getAllAccess()
        });
    },

    _onDeleteAccess: function(access) {
        AccessActionCreators.delAccess(access['@rid']);
    },

    _onUpdateAccess: function(access) {
        let formId = 'com.networknt.light.access.upd_d';
        FormActionCreators.setFormModel(formId, access);
        this.context.router.push('/form/' + formId);
    },

    _onFilterChange: function (event) {
        let filter = {
            ruleClass: this.refs.ruleClass.value,
            accessLevel: this.refs.accessLevel.value,
            createUserId: this.refs.createUserId.value
        };
        console.log('_onFilterChange', filter);
        if(this._throttleTimeout) {
            clearTimeout(this._throttleTimeout);
        }
        this._throttleTimeout = setTimeout(() => this.setState({filter: filter}), 200);
    },

    render: function() {
        let content = this.state.accesses.map((access, index) => {
            let matched = true;
            for(var key in this.state.filter) {
                if(this.state.filter.hasOwnProperty(key) && this.state.filter[key].length > 0) {
                    let regex = new RegExp(this.state.filter[key], 'i');
                    if(access[key].search(regex) == -1) {
                        matched = false;
                        break;
                    }
                }
            }
            if(matched) {
                let boundDelete = this._onDeleteAccess.bind(this, access);
                let boundUpdate = this._onUpdateAccess.bind(this, access);
                return (
                    <TableRow key={index}>
                        <TableRowColumn><a onClick={boundDelete}>Delete</a></TableRowColumn>
                        <TableRowColumn colSpan="4"><a onClick={boundUpdate}>{access.ruleClass}</a></TableRowColumn>
                        <TableRowColumn>{access.accessLevel}</TableRowColumn>
                        <TableRowColumn>{access.clients}</TableRowColumn>
                        <TableRowColumn  colSpan="2">{access.roles? access.roles.toString(): ''}</TableRowColumn>
                        <TableRowColumn>{access.users}</TableRowColumn>
                        <TableRowColumn>{access.createUserId}</TableRowColumn>
                    </TableRow>
                );
            }
        });

        return (
            <span>
                <Table
                    height={'1080px'}
                    fixedHeader={true}
                    fixedFooter={true}
                    selectable={false}
                    multiSelectable={false}>
                    <TableHeader enableSelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn colSpan="11" tooltip='Access' style={{textAlign: 'center'}}>
                                Access
                            </TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn tooltip='Delete'>Delete</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Rule Class' colSpan="4">Rule Class</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Access Level'>Access Level</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Clients'>Clients</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Roles' colSpan="2">Roles</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Users'>Users</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Create UserId'>Create UserId</TableHeaderColumn>
                        </TableRow>
                        <TableRow>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn colSpan="4"><input type="text" ref="ruleClass" onChange={this._onFilterChange}/></TableHeaderColumn>
                            <TableHeaderColumn><input type="text" ref="accessLevel" onChange={this._onFilterChange}/></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn colSpan="2"></TableHeaderColumn>
                            <TableHeaderColumn></TableHeaderColumn>
                            <TableHeaderColumn><input type="text" ref="createUserId" onChange={this._onFilterChange}/></TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        deselectOnClickaway={false}
                        showRowHover={true}
                        stripedRows={true}>
                        {content}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TableHeaderColumn tooltip='Delete'>Delete</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Rule Class' colSpan="4">Rule Class</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Access Level'>Access Level</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Clients'>Clients</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Roles'  colSpan="2">Roles</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Users'>Users</TableHeaderColumn>
                            <TableHeaderColumn tooltip='Create UserId'>Create UserId</TableHeaderColumn>
                        </TableRow>
                    </TableFooter>
                </Table>
            </span>
        );
    }
});

module.exports = AccessAdminHome;
