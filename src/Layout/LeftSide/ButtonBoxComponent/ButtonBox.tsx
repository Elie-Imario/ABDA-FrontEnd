import {FC} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './buttonBox.scss'


type Props = {
    page: string,
    icoName: string,
    pageName: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    onHandleClick: Function,
}
  
export const ButtonBox: FC<Props> = ({page, icoName, pageName, onHandleClick}) => {
    const handleClick = () => {
        onHandleClick(page)
    }
    return (
        <div className="sidebar-navigation-item">
            <button className="box" onClick={handleClick}>
                <FontAwesomeIcon icon={icoName} size='3x'/>
            </button>
            <span className="caption">{pageName}</span>
        </div>
    )
}
