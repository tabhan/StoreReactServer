import React from 'react';
import cache from "../../lib/cache/index";
import contentMsg from '../../lib/utils/contentMsg';

export default props => {
    const staticHostUrl = cache.get('siteAppConf', 'staticHostUrl');

    return <div className="container">
        <div id="loader-overlay"><img src={`${staticHostUrl}/images/site/gif/loading.gif`}/></div>
        <div className="compare-bar clearfix container hidden">
            <div className="col-md-2 col-sm-3 col-xs-3 text-center">
                <a href="javascript:void(0);" className="icon-close-compare" id="compareButton"
                   title={contentMsg('GlobalCartridges', 'ALT.PLP.CloseCompareBar')}/>
            </div>
            <For each="idx" of={[0, 1, 2, 3]}>
                <div className="col-md-2 col-sm-3 col-xs-3 thumbnail-box jq-compareEmpty" key={idx}>
                    <div className="img-box">
                        <img src={`${staticHostUrl}/images/common/icon-compare.png`} width="40" height="80"
                             alt={contentMsg('GlobalCartridges', 'ALT.PLP.RemoveDeviceFromCarpareBar')}
                             title={contentMsg('GlobalCartridges', 'ALT.PLP.RemoveDeviceFromCarpareBar')}/>
                        <a href="javascript:void(0);" className="jq-compareRemove hidden"
                           title={contentMsg('GlobalCartridges', 'ALT.PLP.RemoveDeviceFromCarpareBar')}>
                            <i className="icon-close-circle"/>
                        </a>
                    </div>
                    <p/>
                </div>
            </For>
            <div className="col-md-2 col-sm-3 col-xs-3 text-center">
                <a href="javascript:void(0);" data-target="#compareOverlay" className="jq-compareBtn hidden"
                   data-toggle="modal"
                   title={contentMsg('GlobalCartridges', 'ALT.PLP.CompareButton')}>
                    <i className="icon-arrow-cRight"/>
                </a>
                <a href="javascript:void(0);" className="jq-compareBtnDisable"><i
                    className="icon-arrow-cRight-reverse"/>
                </a>
            </div>
            <p className="compare-errorMsg hidden"
               dangerouslySetInnerHTML={{
                   __html: contentMsg('ProductListPage', 'Error.PLP.Compare.SelectedProductQTYExceeded',
                       'Puede comparar un m&#225;ximo de 4 art&#237;culos, anular la selecci&#243;n de un elemento para continuar.')
               }}/>
        </div>
    </div>
}

