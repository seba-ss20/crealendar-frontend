import React from 'react';
import { TableRow, TableCell} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import UserService from '../services/UserService';

export class PromotionListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <TableRow key={this.props.key}>
                <TableCell>{this.props.promotion.name} </TableCell>
                {UserService.isAuthenticated() ?
                    <TableCell align='right' size='small'><Link to={`/editPromotion/${this.props.promotion._id}`}><EditIcon/></Link></TableCell>
                    : <TableCell align='right' size='small'><Link to={'/login'}><EditIcon/></Link></TableCell>
                }
                {UserService.isAuthenticated() ?
                    <TableCell align='right' size='small'><IconButton onClick={() => this.props.onDelete(this.props.promotion._id)} > <DeleteIcon /> </IconButton></TableCell>
                    : <TableCell align='right' size='small'><Link to={'/login'}> <DeleteIcon /> </Link></TableCell>
                }

            </TableRow>
        );
    }
}