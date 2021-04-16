import { createStore } from 'redux';
import * as OrderData from '../types/Order';


const initialState : OrderData.OrderState = {
    orders : [
        { ID : '1', Name : 'Apple', Price : 50.5 },
        { ID : '2', Name : 'Banana', Price : 35.67 },
        { ID : '3', Name : 'Orange', Price : 67.89 }
    ] 
}

function orderReducer(state = initialState, action : any) {
    console.log(state, action)
    switch (action.type) {
        case OrderData.NEW_ORDER:
            const newOrder : OrderData.Order = action.payload;

            return {
                ...state,
                orders: [
                ...state.orders,
                newOrder
            ]
        };
        case OrderData.UPDATE_ORDER_NAME: {
                const orderPayload : OrderData.OrderNameUpdate = action.payload;

                const orderToEdit = state.orders.find( order => order.ID === orderPayload.ID );
                if ( !orderToEdit ) {
                    return state;
                }

                const newOrder = {
                    ...orderToEdit,
                    Name : orderPayload.Name
                }

                return {
                    ...state,
                    orders : state.orders.filter( order => orderPayload.ID !== order.ID ).concat( newOrder )
                };
            }

        
        case OrderData.UPDATE_ORDER_PRICE: {
            const orderPayload : OrderData.OrderPriceUpdate = action.payload;

            const orderToEdit = state.orders.find( order => order.ID === orderPayload.ID );
            if ( !orderToEdit ) {
                return state;
            }

            const newOrder = {
                ...orderToEdit,
                Price : orderPayload.Price
            }

            return {
                ...state,
                orders : state.orders.filter( order => orderPayload.ID !== order.ID ).concat( newOrder )
            };
        }
            

        case OrderData.DELETE_ORDER:
            const orderPayloadID : string = action.payload;

            return {
                ...state,
                orders : state.orders.filter( order => order.ID !== orderPayloadID )
            };
        default:
            return state;
    }
}

export default createStore(orderReducer, initialState);