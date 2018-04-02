import React from 'react';
import Include from '../Include';

export default arg => {
    if(typeof arg === 'string'){
        return props => <Include contentItem={props.contentItem[arg]}/>;
    }else{
        return <Include contentItem={arg.contentItem.contents}/>
    }
}
