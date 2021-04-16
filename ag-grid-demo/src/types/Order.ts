export interface Order {
    ID : string;
    Name : string;
    Price : number;
}

export interface OrderNameUpdate {
    ID : string;
    Name : string;
}

export interface OrderPriceUpdate {
    ID: string;
    Price : number;
}

export const NEW_ORDER = "NEW_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER_NAME = "UPDATE_ORDER_NAME";
export const UPDATE_ORDER_PRICE = "UPDATE_ORDER_PRICE";


export interface OrderState {
    orders : Order[]
}