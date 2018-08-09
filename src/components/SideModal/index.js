import React from 'react';
import { Layout, Menu, Icon } from 'antd';
import {langDir} from '../../configuration';
const { Header, Sider, Content } = Layout;

const SMALL_WIDTH = 600;
const FULL_WIDTH = 800;


const openStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: SMALL_WIDTH,
  maxWidth: SMALL_WIDTH,
  minWidth: SMALL_WIDTH,
  width: SMALL_WIDTH
}
const openFullStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: FULL_WIDTH,
  maxWidth: FULL_WIDTH,
  minWidth: FULL_WIDTH,
  width: FULL_WIDTH
}
const closeStyle = {
  backgroundColor: 'white',
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: FULL_WIDTH,
  maxWidth: FULL_WIDTH,
  minWidth: FULL_WIDTH,
  width: FULL_WIDTH
}
class SiderDemo extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      fullScreen: true
    }
  }

  render() {
    const {fullScreen} = this.state
    const {isOpen, onClose} = this.props
    // const openWidth = fullScreen ? FULL_WIDTH : SMALL_WIDTH
    // const width = isOpen ? openWidth : 0
    const openClassName = fullScreen ? 'rca-sideModalOpenFull' : 'rca-sideModalOpen'
    const className = isOpen ? openClassName : 'rca-sideModalClosed'
    return (
        <Sider
          trigger={null}
          collapsible={true}
          collapsed={isOpen}
          width={0}
          className={className}
        >
          <div className={'rca-sideModalTopIcons'}>
            <Icon
              type={(fullScreen) ? (langDir === 'ltr' ? "right" : 'left') : (langDir === 'ltr' ? "left" : 'right')}
              onClick={()=> this.setState({fullScreen: !fullScreen})}
            />
            <Icon
              type={"close"}
              onClick={onClose}
            />
          </div>
          {isOpen && this.props.children}
        </Sider>
    );
  }
}

export default SiderDemo;