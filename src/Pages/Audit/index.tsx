import BoxItem from '../../components/molecules/boxItem';
import './audit_styles.scss'

const Audit = () => {
  return (
    <div className="bloc-limiter">
      <div className="top-header">
        <div className="title-lead">
          <span>Audits</span>
        </div>
      </div>

      <div className="content-body no-scroll">
        <div className="content-body-header">
          <div className="box-items">
            <BoxItem
              label='INSERTION'
              iconname='rocket'
              data={15}
            />
            <BoxItem
              label='INSERTION'
              iconname='rocket'
              data={15}
            />
            <BoxItem
              label='INSERTION'
              iconname='rocket'
              data={15}
            />
          </div>
        </div>
        <div className="intro">
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae unde non voluptate quis quos accusantium.</span>
        </div>
        <div className="content-body-body">
          <div className="list-items">
            
          </div>
        </div>
      </div>
    </div>
  )
}


export default Audit;