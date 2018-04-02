import React from 'react';

export default class EquipmentList extends React.Component{

    render(){
        return <div className="product-msg" id="productInfo">
            <var className="hidden" id="productInfo_JSON" dangerouslySetInnerHTML={{__html:JSON.stringify(this.props.contentItem)}} />
        </div>
    }
}


