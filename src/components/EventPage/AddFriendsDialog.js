import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import AddFriendsList from './AddFriendsList'


type Props = {
    text: string,
    title: string,
    open: Boolean,
    onPrimaryOption: () => void,
    onSecondaryOption: () => void,
	eventData: any,
};

const AddFriendsDialog = (props: Props) => {

    const {
		eventData,
        open,
		onClose,
    } = props;

	return (
		<Dialog
            onClose={onClose}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
			<DialogContent>
                <AddFriendsList
					eventData={eventData}
					open={open}
					onClose={onClose}
                />
            </DialogContent>
			<DialogActions>
                <Button onClick={onClose} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
		</Dialog>
	);
};

export default AddFriendsDialog;