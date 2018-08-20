import React from 'react';
import { Layout, Popconfirm, Icon } from 'antd';
import {langDir} from '../../configuration';
const { Sider } = Layout;

class SiderDemo extends React.Component {
  constructor(props) {
    super(props)
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.toggleMinimized = this.toggleMinimized.bind(this);
  }

  toggleMinimized() {
    this.props.toggleMinimized(this.props.modalId)
  }
  toggleFullScreen() {
    this.props.toggleFullScreen(this.props.modalId)
  }
  render() {
    const {isOpen, onClose, modalId, objectId, minimizedDocumentBeforeMe, title, isMinimized, fullScreen} = this.props
    // const openWidth = fullScreen ? FULL_WIDTH : SMALL_WIDTH
    // const width = isOpen ? openWidth : 0
    const openClassName = fullScreen ? 'rca-sideModalOpenFull' : 'rca-sideModalOpen'
    const className = isMinimized ? 'rca-sideModalMinimized' : (isOpen ? openClassName : 'rca-sideModalClosed')
    const minimizedStyle = {right: (minimizedDocumentBeforeMe * 180) + 5}
    const minimizedTitleStyle = {fontSize: 15}
    const isNew = !objectId
    return (
      <Sider
        trigger={null}
        collapsible={true}
        collapsed={isOpen}
        width={0}
        className={className}
        style={isMinimized ? minimizedStyle : null}
      >
        <div className='rca-sideModalTop'>
          <h2 style={isMinimized ? minimizedTitleStyle : null}>
            {title}
          </h2>
          <div className={'rca-sideModalTopIcons'}>
            {isNew
              ? <Popconfirm
                okType="danger"
                title={'Are you sure delete this ?'}
                onConfirm={() => onClose(modalId)}
                okText="Yes"
                cancelText="No"
              >
                <Icon
                  className='rca-closeIcon'
                  type={'close-circle'}
                />
              </Popconfirm>
              : <Icon
                className='rca-closeIcon'
                type={'close-circle'}
                onClick={() => onClose(modalId)}
              />
            }
            <Icon
              type={isMinimized ? 'plus-circle' : 'minus-circle'}
              className='rca-minimizedIcon'
              onClick={this.toggleMinimized}
            />
            <Icon
              style={{color: isMinimized ? 'grey' : '#59b10d'}}
              className='rca-sizeIcon'
              type={(fullScreen) ? (langDir === 'ltr' ? 'right-circle' : 'left-circle') : (langDir === 'ltr' ? 'left-circle' : 'right-circle')}
              onClick={isMinimized ? null : this.toggleFullScreen}
            />
          </div>
        </div>
        {isOpen && this.props.children}
      </Sider>
    );
  }
}

export default SiderDemo;
