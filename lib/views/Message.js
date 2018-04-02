import React from 'react';
import contentMsg from 'lib/utils/contentMsg';

export default props => <span dangerouslySetInnerHTML={{__html: contentMsg(props.messagePage, props.messageKey, props.defaultValue)}}/>