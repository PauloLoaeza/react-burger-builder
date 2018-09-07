import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import ToolBar from '../Navigation/ToolBar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

import classes from './Layout.css';

class Layout extends Component {

    state = {
        showSideDrawer: false
    };

    sideDrawerClosedHanler = () => {
        this.setState({ showSideDrawer: false });
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({
            showSideDrawer: !prevState.showSideDrawer
        }));
    }

    render() {
        return (
            <Aux>
                <ToolBar drawerToggleClicked={ this.sideDrawerToggleHandler }/>
                <SideDrawer 
                    closed={ this.sideDrawerClosedHanler }
                    open={ this.state.showSideDrawer }/>
                <main className={ classes.Content }>
                    { this.props.children }
                </main>
            </Aux>
        );
    }
} 

export default Layout;