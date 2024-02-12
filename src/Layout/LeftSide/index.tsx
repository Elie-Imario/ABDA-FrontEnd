import './leftSide.scss'
import '../../plugins/fa-plugin-kit.js'
import { ButtonBox } from './ButtonBoxComponent/ButtonBox.js'

const LeftSide = () => {
    const onHandleQuitClick = () => {
    }
    return (
        <div className="left-side">
            
            <div className="bloc-limiter">
            <div className="sidebar-toggle">
                <button type="button" className="navbar-toggler">
                    <span className="navbar-toggler-bar bar1"></span>
                    <span className="navbar-toggler-bar bar2"></span>
                    <span className="navbar-toggler-bar bar3"></span>
                </button>
            </div>
                
                <div className="sidebar-navigation">
                    <div className="sidebar-navgation-brand">
                        <span className="text-uppercase">Bonjour, Samantha</span>
                        <span className="sub-title text-background">Bienvenue sur votre espace de travail!</span>
                    </div>
                    <div className="sidebar-navigation-bloc">
                        <span className="menu-category">Vos Options</span>
                        <div className="sidebar-navigation-items">
                            <ButtonBox
                                page='' 
                                icoName='door-open'
                                pageName='Quitter la session'
                                onHandleClick={onHandleQuitClick} //mbola dinihina
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftSide;