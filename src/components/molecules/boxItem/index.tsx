import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BoxItem.scss'

type Props = {
    label: string,
    data : number
}

const BoxItem:FC<Props> = ({label, data}) => {
  return (
    <div className="box-item">
        <div className="box-header">
            <div>
                <span className="box-title-lead">{label}</span>
            </div>
            <span><FontAwesomeIcon icon={label.toLowerCase() === 'insertion' ? 'check-circle' : label.toLowerCase() === 'modification' ? 'edit' : 'trash-can' } size='lg'/></span>
        </div>
        <div className="box-body">
            <span>{data}</span>
        </div>
    </div>
  )
}


export default BoxItem; 