import React, { Component } from 'react';
import axios from '../../axios-order';
import { connect } from 'react-redux';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';

import { fetchOrders } from '../../store/actions';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = <Spinner />

        if (!this.props.loading) {
            orders = this.props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price} />
            ))
        }

        return (
            <div>
                {orders}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    token: state.auth.token,
    orders: state.order.orders,
    loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token) => dispatch(fetchOrders(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));