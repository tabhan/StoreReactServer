import React from 'react';
import Include from '../Include';

export default props => {
    const contentItem = props.contentItem;
    return <div className="shadow">
        <If condition={contentItem.mainSection}>
            <main className="container">
                <Include contentItem={contentItem.mainSection} />
            </main>
        </If>
    </div>
}

