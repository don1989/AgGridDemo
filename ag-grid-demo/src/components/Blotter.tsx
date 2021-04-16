import React from 'react';
import { connect } from "react-redux";
import BlotterGrid from './BlotterGrid';
import { Order, OrderState } from '../types/Order';
import { ColDef } from 'ag-grid-community';
import { actions } from '../actions/orderActions';

const columnDefs : ColDef[] = [
    { field : 'ID' },
    { field : 'Name' },
    { field : 'Price' },
]

interface State { 
    IDCounter : number
    rowData : Order[]
    updateOrderID : string;
}

interface Props {
    
}

interface StateProps {
    orders : Order[];
    dispatch ?: any;
}

class Blotter extends React.Component<Props & StateProps, State> {

    state = {
        IDCounter : 4,
        rowData : this.props.orders,
        updateOrderID : '1'
    }

    componentDidUpdate(prevProps: Props & StateProps) {
        if (prevProps.orders !== this.props.orders) {
            this.setState({ rowData : this.props.orders });
        }
    }

    newOrder = () => {
        this.props.dispatch( 
            actions.newOrder({
                ID : this.state.IDCounter.toString(),
                Name : this.randomString(),
                Price : Math.random()
            })
        )

        this.setState({
            IDCounter : this.state.IDCounter + 1
        })
    }

    updateOrderName = () => {
        this.props.dispatch(
            actions.updateOrderName({
                ID : this.state.updateOrderID,
                Name: this.randomString()
            })
        );
    }

    updateOrderPrice = () => {
        this.props.dispatch(
            actions.updateOrderPrice({
                ID : this.state.updateOrderID,
                Price : Math.random()
            })
        );
    }

    onChangeUpdateOrder = (event: React.ChangeEvent<HTMLInputElement>) => {
        const eventID = event.target.value.trim();

        this.setState({
            updateOrderID : eventID
        })
    }

    randomString () {
        return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
    }


    render () {
        return (
            <div style={{height: '500px', width: '650px'}}>
                <button onClick={ this.newOrder }>New Order</button>

                <button onClick={ this.updateOrderName }>Update Name for ID</button>
                <button onClick={ this.updateOrderPrice }>Update Price ID</button>

                <input type="text" value={this.state.updateOrderID} onChange={this.onChangeUpdateOrder}/>

                <BlotterGrid 
                    rowData={this.state.rowData} 
                    columnDefs={columnDefs}
                />
            </div>
            
        )
    }
}

const mapStateToProps = (state : OrderState) => {
    return {
        orders: state.orders
    }
}
export default connect(mapStateToProps)(Blotter);