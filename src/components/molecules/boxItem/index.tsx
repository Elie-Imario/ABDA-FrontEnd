import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './BoxItem.scss'

type Props = {
    label: string,
    iconname : string,
    data : number
}

const BoxItem:FC<Props> = ({label, iconname, data}) => {
  return (
    <div className="box-item">
        <div className="box-header">
            <div>
                <span className="box-title-lead">{label}</span>
            </div>
            <span><FontAwesomeIcon icon={iconname} size='lg'/></span>
        </div>
        <div className="box-body">
            <span>{data}</span>
        </div>
    </div>
  )
}


export default BoxItem; 