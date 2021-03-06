import React from 'react';

import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchCollectionStart } from '../../redux/shop/shop.action';
import { CollectionsOverviewContainer } from '../../components/collections-overview/collections-overview.container';
import { CollectionPageContainer } from '../collection/collection.container';

class ShopPage extends React.Component {
    state = {
        loading : true,
    }

    unsubscribeFromSnapshot = null;

    componentDidMount() {
        const {fetchCollectionStart} = this.props;
        fetchCollectionStart();
    }

    render() {
        const { match} = this.props;
        return (
            <div className='shop-page'>
                <Route exact path={`${match.path}`} 
                component={CollectionsOverviewContainer}/>
                <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionStart: () => dispatch(fetchCollectionStart()),
});

export default connect( null, mapDispatchToProps)(ShopPage);