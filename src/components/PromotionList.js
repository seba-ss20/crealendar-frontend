import React from 'react';
import { TableContainer, Table, TableBody} from '@material-ui/core';
import { PromotionListRow } from './PromotionListRow';

const dataTableStyle = {
    'marginBottom': '36px'
};

export const PromotionList = ({data, onDelete}) => (

        <TableContainer plain style={dataTableStyle}>
            <Table aria-label="simple table">
            <TableBody>
                {data.map((promo, i) => <PromotionListRow key={i} promo={promo} onDelete={(id) => onDelete(id)}/>)}
            </TableBody>
            </Table>
        </TableContainer>
);