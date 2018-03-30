import React from 'react';
import _ from 'lodash';
import contentMsg from '../../lib/utils/contentMsg';
import Message from '../Message';
import Include from '../Include';
import cache from "../../lib/cache/index";

function RenderSelectedRefinements(props) {
    const contentItem = props.contentItem;
    const storeHostUrl = cache.get('siteAppConf', 'storeHostUrl');
    return <For each="refinementMenu" of={contentItem.refinementMenus} index="idx">
        <If condition={!_.isEmpty(refinementMenu.selectedRefinements)}>
            <ul className="searchBreadBox list-inline" key={idx}>
                <For each="refinement" of={refinementMenu.selectedRefinements} index="sIdx">
                    <li key={sIdx}>
                        <span dangerouslySetInnerHTML={{__html: refinement.label}}/>
                        <a href={`${storeHostUrl}${refinement.navigationState}`}
                           className="icon-close-circle-reverse"/>
                    </li>
                </For>
                <If condition={props.removeAll}>
                    <li>
                        de <span>Prepago</span>
                        <a href={`${storeHostUrl}${refinementMenu.removeAllDimUrl}`}
                           className="icon-close-circle-reverse"/>
                    </li>
                </If>
            </ul>
        </If>
    </For>
}

export default props => {
    const contentItem = props.contentItem;
    const msgFilter = contentMsg('ProductListPage', 'Label.PLP.Filter.Description', 'Me gustar&#237;a');

    return <section className="refinement container jq-refinement">
        <div className="text-center title">
            <span dangerouslySetInnerHTML={{
                __html: `
                <a data-toggle="collapse" href="javascript:void(0)" title="${msgFilter}"
                   data-target="#coll-subtitle" aria-expanded="false">
                    ${msgFilter}
                    <span class="icon-plus-circle-empty jq-refinement-plus hidden-xs" id="openRefinementButton"
                          title="${contentMsg('GlobalCartridges', 'ALT.PLP.ExpandDemention')}"></span>
                </a>
            `
            }}>
            </span>
            <RenderSelectedRefinements contentItem={contentItem}/>

            <a className="icon-plus-circle-empty jq-refinement-plus visible-xs" data-toggle="modal"
               data-target=".modal-refinement" href="javascript:;"/>
        </div>

        <div className="modal fade modal-refinement" tabIndex="-1" role="dialog">
            <a href="javascript:;" className="icon-close-circle-reverse visible-xs close" data-dismiss="modal"
               aria-label="Close"/>
            <div className="text-center title visible-xs">
                <p dangerouslySetInnerHTML={{__html: contentMsg('ProductListPage', 'Label.PLP.Filter.Description', 'Me gustar&#237;a')}}/>
                <RenderSelectedRefinements contentItem={contentItem} removeAll={true}/>
            </div>

            <div className="text-center collapse" id="coll-subtitle">
                <ul className="sub-title list-inline">
                    <Include contentItem={contentItem.refinementMenus}/>
                </ul>
                <a href={contentItem.originalUrl}
                   className="btn-filter"
                   id="refinementFilterButton" data-params={contentItem.querystring}
                   data-ref-index={contentItem.refIndex}>
                    <Message messagePage="ProductListPage" messageKey="Action.Button.PLP.Filter" defaultValue="FILTRA"/>
                </a>
            </div>
        </div>

        <div className="sortby-box">
            <div className="dropdown sortby">
                <a href="javascript:void(0)" id="dLabel" type="button" data-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false">
                    <Message messagePage="ProductListPage" messageKey="Label.PLP.SortBy.Default"
                             defaultValue="Ordena por"/>
                    <span className="icon-angle-down-s"/>
                </a>
                <ul className="dropdown-menu" aria-labelledby="dLabel">
                    <For each="sortByAction" of={contentItem.sortByOptions} index="idx">
                        <li key={idx}>
                            <a href={`${sortByAction.contentPath}${sortByAction.navigationState}`}
                               className={sortByAction.selected ? 'active' : ''}>
                                <Message messagePage="ProductListPage" messageKey={sortByAction.label}
                                         defaultValue={sortByAction.defaultLabel}/>
                            </a>
                        </li>
                    </For>
                </ul>
            </div>
        </div>
    </section>
}

