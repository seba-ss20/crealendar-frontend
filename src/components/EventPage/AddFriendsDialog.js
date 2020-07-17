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
    onCancel: () => void,
	eventData: any,
};

const AddFriendsDialog = (props: Props) => {
    const {
		eventData,
        onCancel,
        open,
        setOpen,
		onPrimaryOption
    } = props;

	return (
		<Dialog
            onClose={onCancel}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
			<DialogContent>
                <AddFriendsList
                    setOpen={setOpen}
					closePopUp={onPrimaryOption}
					eventData={eventData}
                />
            </DialogContent>
			<DialogActions>
                <Button onClick={onCancel} color="primary" autoFocus>
                    Cancel
                </Button>
            </DialogActions>
		</Dialog>
	);
};

export default AddFriendsDialog;