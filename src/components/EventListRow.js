import React from 'react';
import { TableRow, TableCell} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import ls from 'local-storage';

export class EventListRow extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const user = ls.get('userObject');
        const user_role = user['role'];
        return (
            <TableRow key={this.props.key}>

                <TableCell>
                    {this.props.event.source !== undefined && this.props.event.source !== 'calendar'
                        ? <Link to={`/events/${this.props.event._id}`}>{this.props.event.name}</Link>
                        :   this.props.event.name
                    }
                </TableCell>

                { user_role === 'Organizer'?
                    <TableCell align='right' size='small'><Link to={`/edit/${this.props.event._id}`}><EditIcon/></Link></TableCell>
                    : <TableCell align='right' size='small'> </TableCell>
                }
                { user_role === 'Organizer' ?
                    <TableCell align='right' size='small'><IconButton onClick={() => this.props.onDelete(this.props.event._id)} > <DeleteIcon /> </IconButton></TableCell>
                    : <TableCell align='right' size='small'> </TableCell>
                }

            </TableRow>
        );
    }
}