import React from 'react';
import reactDom from 'react-dom';
import './SideDrawer.css'

/**
 * Send to portal to render above root
 * @param props
 * @returns {{children: *, implementation: *, containerInfo: *, $$typeof: (symbol|number), key: (null|string)}}
 * @constructor
 */
const SideDrawer = props => {
    const content = <aside className={'side-drawer'}>
        {props.children}
    </aside>;

    return reactDom.createPortal(content, document.getElementById('drawer-hook'));
};

export default SideDrawer;
