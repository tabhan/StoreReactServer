import React from 'react';
import include from '../include';

export default props => {
    return <div className="shadow">
        {include(props.mainSection)}
    </div>
}

