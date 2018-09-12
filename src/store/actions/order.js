import * as actionTypes from './actionsTypes';
import axios from '../../axios-order';

export const purchaseBurgerSuccess = (id, order) => ({
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    order: {
        id,
        ...order
    }
});

export const purchaseBurgerFail = (error) => ({
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error
});

export const purchaseBurgerStart = () => ({
    type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
});

export const purchaseBurger = (order) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios
            .post('/orders.json', order)
            .then(res => dispatch(purchaseBurgerSuccess(res.data.name, order)))
            .catch(err => dispatch(purchaseBurgerFail(err)));
    }
}

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders
});

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAIL,
    error
});

export const fetchOrdersStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios
            .get('/orders.json')
            .then(res => {
                const fetchedOrders = [];

                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders))
            })
            .catch(err => dispatch(fetchOrdersFail(err)));
    }
}