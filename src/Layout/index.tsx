import { FC, ReactNode } from "react"
import LeftSide from "./LeftSide"
import './Layout.scss'

type Props = {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return <>
      <LeftSide/>
      <div className="right-side">
          {children}
      </div>
  </>
}

export default Layout