import React from 'react';
import cache from 'lib/cache';

export default props => {
    return <div>
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="topupCon">
                <h3 className="PageTitle hidden-xs" tabIndex="0">Recarga tu prepago</h3>
                <div id="topupError" data-show-error-info="false"></div>
                <div id="topupBaseInfo" data-is-captive-portal="false" data-prefix-msisdn="111"></div>
                <div id="topupTabs" data-active-tab='abc' data-default-tab='abc'
                     data-call-back-pane-info='abc'
                     data-is-captive-portal="abc"></div>
                <div className="tab-content">

                </div>
            </div>
        </div>
        <div id="loader-overlay" style={{display: false}}><img src={`${cache.get('siteAppConf', 'staticHostUrl')}/images/site/gif/loading.gif`} /></div>
    </div>
}