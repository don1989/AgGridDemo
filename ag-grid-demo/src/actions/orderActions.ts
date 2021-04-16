import * as OrderData from "../types/Order";

export const actions = {
    newOrder( order : OrderData.Order ) {
        return {
            type : OrderData.NEW_ORDER,
            payload : order
        }
    },

    deleteOrder( ID : string ) {
        return {
            type : OrderData.DELETE_ORDER,
            payload : ID
        }
    },

    updateOrderName( order : OrderData.OrderNameUpdate ) {
        return {
            type : OrderData.UPDATE_ORDER_NAME,
            payload : order
        }
    },

    updateOrderPrice( order : OrderData.OrderPriceUpdate ) {
        return {
            type : OrderData.UPDATE_ORDER_PRICE,
            payload : order
        }
    }
}