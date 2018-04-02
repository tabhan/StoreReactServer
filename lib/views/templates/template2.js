import React from 'react';
import Include from '../Include';

export default props => {
    const contentItem = props.contentItem;
    return <div className="shadow">
        <header>
            <Include contentItem={contentItem.top}/>
        </header>
        <main>
            <Include contentItem={contentItem.main}/>
        </main>
        <footer>
            <Include contentItem={contentItem.footer}/>
        </footer>
    </div>
}

