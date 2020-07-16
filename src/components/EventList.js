import React from 'react';
import { TableContainer, Table, TableBody} from '@material-ui/core';
import { EventListRow } from './EventListRow';

const dataTableStyle = {
    'marginBottom': '36px'
};

export const EventList = ({data, onDelete}) => (

        <TableContainer plain style={dataTableStyle}>
            <Table aria-label="simple table">
            <TableBody>
                {data.map((event, i) => <EventListRow key={i} event={event} onDelete={(id) => onDelete(id)}/>)}
            </TableBody>
            </Table>
        </TableContainer>
);