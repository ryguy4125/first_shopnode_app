import { EmptyState, Heading, Layout, Page } from "@shopify/polaris";
import { ResourcePicker } from "@shopify/app-bridge-react";
import { useState } from "react";
import store from 'store-js';
import ProductList from "../components/ProductList";

function Index() {
  const [modal, setModal] = useState({open: false});
  const emptyState = !store.get('ids');

  function handleSelection(resources) {
    const getIdFromResources = resources.selection.map((product) => product.id);
    setModal({open:false});
    store.set('ids', getIdFromResources);
    console.log('Resource Ids', store.get('ids'));
  }

  return(
  <Page>
    <ResourcePicker 
        resourceType="Product"
        showVariants={false}
        open={modal.open}
        onSelection={(resources) => handleSelection(resources)}
        onCancel={() => setModal({open:false})}
      />
    <Layout>
      { emptyState ?
      <EmptyState
        heading="Select Products"
        action={{
          content: 'SelectProduct',
          onAction: () => setModal({open:true})
        }}
        secondaryAction={{content: 'Learn more', url: 'https://help.shopify.com'}}
        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >
        <p>Select Products</p>
      </EmptyState>
      :
      <ProductList />
    }
    </Layout>
  </Page>
  )};

export default Index;
