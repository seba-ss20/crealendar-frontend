import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

type Props = {
    text: string,
    title: string,
    open: Boolean,
    onPrimaryOption: () => void,
    onSecondaryOption: () => void,
    onCancel: () => void,
};

const PromotionDialog = (props: Props) => {
    const {
        onCancel,
        open,
        setOpen
    } = props;
	
	return (
		<Dialog
            onClose={onCancel}
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
			<DialogContent>
				
			</DialogContent>
		</Dialog>
	);
};

export default PromotionDialog;