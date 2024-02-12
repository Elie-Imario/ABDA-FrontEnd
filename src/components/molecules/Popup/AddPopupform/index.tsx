import { FC } from 'react';
import Box from '@mui/material/Box';
import { Modal, FormControl } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Popup.scss'

type Props = {
  _open: boolean,
  // eslint-disable-next-line @typescript-eslint/ban-types
  _setOpen: Function
}

const AddPopup: FC<Props> = ({ _open, _setOpen }) => {
  const handleClose = () => {
    _setOpen(false);
  }

  return (
    <>
      <Modal
        style={{ position: 'absolute' }}
        open={_open}
        onClose={handleClose}
        container={() => document.querySelector('.modal-limiter')}
      >
        <Box className="wrap-modal-form">
          <div className="modal-header">
            <button className="closepopup" onClick={handleClose}><FontAwesomeIcon icon='times' size='lg' /></button>
            <span className="modal-header-title">
              Inscrire un(e) étudiant(e)
            </span>
          </div>
          <div className="create-session-form">
            <FormControl fullWidth className="wrap-select100">
            
            </FormControl>
            <div className="button_group">
              <button className="btn-add" type="button">
                <FontAwesomeIcon icon='check-circle' size='lg' />
                <span>Confirmer</span>
              </button>
            </div>
          </div>
        </Box>
      </Modal>

    </>
  )
}

export default AddPopup