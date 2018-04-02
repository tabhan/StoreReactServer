import React from 'react';
import _ from 'lodash';
import contentMsg from 'lib/utils/contentMsg'

function transferRefinementLable(label) {
    switch (label) {
        case 'Entel':
            return contentMsg('StoreLocatorPage', 'Label.StoreLocator.StoreType.EntelStores', 'Tiendas ENTEL');
        case 'Other':
            return contentMsg('StoreLocatorPage', 'Label.StoreLocator.StoreType.EntelPOS', 'Otras tiendas');
        default:
            return label;
    }
}

export default props => {

    const contentItem = props.contentItem;
    const refinements = contentItem.refinements;
    const selectedRefinements = contentItem.selectedRefinements;
    const defaultSelected = _.get(refinements, 'length') === _.get(selectedRefinements, 'length');

    return <If condition={!_.isEmpty(refinements)}>
        <li className="sub-level">
            <a data-toggle="collapse" href="javascript:void(0)"
               data-target={`#coll-optionLayer${contentItem.dimensionId}`} aria-expanded="false">
                {contentItem.name}
                <span className="icon-angle-down-s"/>
            </a>

            <div className="option-level collapse jq-option-collapse" id={`coll-optionLayer${contentItem.dimensionId}`}>
                <div className="link-title visible-xs">
                    <a data-toggle="collapse"
                       href={`#coll-optionLayer${contentItem.dimensionId}`}
                       className="icon-angle-left"/>
                    {contentItem.name}
                </div>
                <ul className="list-inline clearfix">
                    <If condition={contentItem.selectAllCheckBoxName}>
                        <li className="form-group">
                            <div className="checkbox small">
                                <input type="checkbox" defaultChecked={defaultSelected} data-select-all="true"
                                       data-dimension={contentItem.dimensionId} id={`jq_${contentItem.dimensionId}`}
                                       className="dimension_refinement_checkbox" autoComplete="off"/>
                                <label htmlFor={`jq_${contentItem.dimensionId}`}
                                       dangerouslySetInnerHTML={{__html: contentItem.selectAllCheckBoxName}}/>
                            </div>
                        </li>
                    </If>
                    <For each="refinement" of={refinements} index="idx">
                        <li className="form-group" key={idx}>
                            <div className="checkbox small">
                                <input type="checkbox" data-count={refinements.length}
                                       data-dimension-id={refinement.formatedDimval}
                                       data-dimension={contentItem.dimensionId}
                                       data-dimension-name={refinement.formatedDimName}
                                       defaultChecked={refinement.selected}
                                       className={`dimension_refinement_checkbox store_refinement js_${contentItem.dimensionId}`}
                                       autoComplete="off" id={`${contentItem.dimensionId}${idx }`}/>
                                <label htmlFor={`${contentItem.dimensionId}${idx }`}
                                       dangerouslySetInnerHTML={{__html: transferRefinementLable(refinement.label)}}/>
                            </div>
                        </li>
                    </For>
                </ul>
                <a href={contentItem.originalUrl} className="btn-filter"
                   data-params={contentItem.querystring} data-ref-index={contentItem.refIndex}
                   dangerouslySetInnerHTML={{__html: contentMsg('ProductListPage', 'Action.Button.PLP.Filter', 'FILTRA')}}/>
            </div>
        </li>
    </If>
}