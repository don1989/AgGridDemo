import { ColDef, GridApi, GridReadyEvent, RefreshCellsParams, RowNode } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham-dark.css";
import "ag-grid-community/dist/styles/ag-theme-alpine-dark.css";

import * as React from "react";
import { Order } from "../types/Order";


interface Props {
    columnDefs : ColDef[];
    rowData : Order[];
}

class BlotterGrid extends React.Component<Props, {}> {

    public gridApi : GridApi | null = null;

    componentDidUpdate( prevProps : Props ) {
        this.flashAndRefreshRowsIfChanged(prevProps);
    }

    flashAndRefreshRowsIfChanged ( prevProps : Props ) {
        if ( this.gridApi ) {
            const rowNodes : RowNode[] = [];

            // this.gridApi.setRowData( this.props.rowData );
            this.props.rowData.forEach( row => {
                const oldOrder = prevProps.rowData.find( prevOr => prevOr.ID === row.ID );

                const rowNode = this.gridApi?.getRowNode( row.ID )
                if ( oldOrder ) {
                    if (  oldOrder.Name !== row.Name || oldOrder.Price !== row.Price ) {
                        if ( rowNode ){
                            rowNodes.push( rowNode );
                        }
                    }
                }
                else {
                    if ( rowNode ){
                        rowNodes.push( rowNode );
                    }
                }

                // This is the problem. RowNode is null when adding a new row.
                // This won't flash unless I explicitly use this.gridApi.setRowData( this.props.rowData ) at the top
                if ( !rowNode ) {
                    console.log('rowNode is null for row', row.ID)
                }
            })

            const flashParams = {
                rowNodes,
                flashDelay: 5000,
                fadeDelay: 3000,
            }
            this.gridApi.flashCells(flashParams);

            const refreshParams : RefreshCellsParams = {
                force : true,
                suppressFlash : false,
                rowNodes,
            }
            this.gridApi.refreshCells(refreshParams);
        }
    }

    onGridReady = (params : GridReadyEvent) => {
        this.gridApi = params.api;
    }

    render() {
        return (
                <div className={`ag-container ag-theme-balham-dark`} style={{ height : '100%' }}>
                    <AgGridReact
                        immutableData={true}
                        enableCellChangeFlash={true}
                        animateRows={true}
                        getRowNodeId={(data : Order)=> data.ID}
                        columnDefs={this.props.columnDefs}
                        rowData={this.props.rowData}
                        onGridReady={this.onGridReady}
                    />
                </div>
        )
    }
}

export default BlotterGrid;