import React from 'react';
import {connect} from 'react-redux';
import { selectCollectionsForPreview } from '../../redux/shop/shop.selector.js';
import { createStructuredSelector } from 'reselect';
import CollectionPreview from '../collection-preview/collection-preview.component';

import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className="collections-overview">
        {
            collections.map(collection => (
                <CollectionPreview key={collection.id} title={collection.title} items={collection.items}/>
            ))
        }
    </div>
);

const mapStateToProps = createStructuredSelector({
    collections : selectCollectionsForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);