import React from 'react';
import CreateForm from '../../components/forms/CreateBuildingForm';
import Footer from '../footer';

function NewBuildingPage() {
  return (
    <div><br />
      <div id="createtitle">
        <h4>CREATE BUILDING</h4>
      </div><hr /><br /><br />
      <CreateForm /><br />
      <Footer />
    </div>
  );
}

export default NewBuildingPage;
