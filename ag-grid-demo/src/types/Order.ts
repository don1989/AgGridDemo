export interface Order {
    ID : string;
    Name : string;
    Price : number;
}

export const NEW_ORDER = "NEW_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";

export interface OrderState {
    orders : Order[]
}