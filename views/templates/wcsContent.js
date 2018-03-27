import React from 'react';
import _ from 'lodash';

const RenderContent = (props) => {
    const html = _.get(props, 'contentItem.DTO.banner.data');
    const className = _.get(props, 'contentItem.className');
    return <div className={className} dangerouslySetInnerHTML={{__html: html}}></div>
}

export default arg => {
    if(typeof arg === 'string'){
        return props => {
            _.set(props, 'contentItem.className', arg);
            return <RenderContent contentItem={props.contentItem}/>
        };
    }else{
        return <RenderContent contentItem={arg.contentItem}/>;
    }
}
