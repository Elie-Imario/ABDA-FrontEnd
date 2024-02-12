import { useState } from 'react';
import Popup from '../../components/molecules/Popup/AddPopupform';
import './inscription_styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Inscription = ()=>{
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    
   return(
    <>
        <div className="modal-limiter">
            <Popup _open={open} _setOpen = {setOpen}></Popup>
        </div>
        <div className="bloc-limiter">
            <div className="title-lead">
                <span>Les inscriptions</span>
            </div>
            <div className="list-section">
                <div className={`btn-action ${open ? 'hide' : ''}`}>
                    <button className="btn-add" onClick={handleClickOpen}>
                        <FontAwesomeIcon icon='plus' size='lg'/>
                    </button>
                </div>
            </div>
        </div>
    </>
   )
}

export default Inscription;