import { ColDef, GridApi, GridReadyEvent, RefreshCellsParams, RowDataUpdatedEvent, RowNode } from "ag-grid-community";
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
    public prevRowData : Order[] = [];

    componentDidUpdate( prevProps : Props ) {
        this.prevRowData = prevProps.rowData;
    }

    flashAndRefreshRowsIfChanged() {
        if ( this.gridApi ) {
            const rowNodesToFlashGreen : RowNode[] = [];
            const rowNodesToFlashRed : RowNode[] = [];

            this.props.rowData.forEach( row => {
                const oldOrder = this.prevRowData.find( prevOr => prevOr.ID === row.ID );

                const rowNode = this.gridApi?.getRowNode( row.ID )

                if ( rowNode ) {
                    if ( oldOrder ) {
                        if ( oldOrder.Name !== row.Name ){ // Flash green if the name changes
                            rowNodesToFlashGreen.push( rowNode );
                        }
                        else if ( oldOrder.Price !== row.Price ) { // TODO: flash red if the name changes ... HOW???
                            rowNodesToFlashRed.push( rowNode );
                        }
                    }
                    else {
                        rowNodesToFlashGreen.push( rowNode );
                    }
                }
            })

            // By default, this will flash green...
            const flashParams = {
                rowNodes : rowNodesToFlashGreen,
                flashDelay: 5000,
                fadeDelay: 3000,
            }
            this.gridApi.flashCells(flashParams);
            // TODO: How do I get the rowNodesToFlashRed to actually flash red??

            const refreshParams : RefreshCellsParams = {
                force : true,
                suppressFlash : false,
                rowNodes : rowNodesToFlashGreen.concat(rowNodesToFlashRed),
            }
            this.gridApi.refreshCells(refreshParams);   
        }
    }

    onGridReady = (params : GridReadyEvent) => {
        this.gridApi = params.api;
    }

    onRowDataUpdated = (event: RowDataUpdatedEvent) => {
        this.flashAndRefreshRowsIfChanged();
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
                        onRowDataUpdated={this.onRowDataUpdated}
                    />
                </div>
        )
    }
}

export default BlotterGrid;