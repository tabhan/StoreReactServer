import React from 'react';

export default props => <div className="product-msg" id="productInfo">
    <var className="hidden" id="productInfo_JSON" dangerouslySetInnerHTML={{__html:JSON.stringify(props.contentItem)}} />
</div>


