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

    updateOrder( order : OrderData.Order ) {
        return {
            type : OrderData.UPDATE_ORDER,
            payload : order
        }
    }
}