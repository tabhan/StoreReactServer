import React from 'react';
import contentMsg from '../../lib/utils/contentMsg';

export default props => {

    const msgFilter = contentMsg('ProductListPage', 'Label.PLP.Filter.Description', 'Me gustar&#237;a');

    return <section className="refinement container jq-refinement">
        <div className="text-center title">
            <span dangerouslySetInnerHTML={{__html: `
                <a data-toggle="collapse" href="javascript:void(0)" title="${msgFilter}"
                   data-target="#coll-subtitle" aria-expanded="false">
                    ${msgFilter}
                    <span class="icon-plus-circle-empty jq-refinement-plus hidden-xs" id="openRefinementButton"
                          title="${contentMsg('GlobalCartridges', 'ALT.PLP.ExpandDemention')}"></span>
                </a>
            `}}>
            </span>
        </div>
    </section>
}

