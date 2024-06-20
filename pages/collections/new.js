import React from 'react';
import CollectionForm from '../../components/forms/CreateCollectionForm';
import Footer from '../footer';

const NewCollectionPage = () => (
  <div><br />
    <div id="createtitle">
      <h4>CREATE COLLECTION</h4>
    </div><hr /><br /><br />
    <CollectionForm isUpdate={false} /><br />
    <Footer />
  </div>
);

export default NewCollectionPage;
