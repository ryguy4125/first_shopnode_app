import React, { useState } from 'react';
import { Page, Layout, EmptyState, Modal} from "@shopify/polaris";
import { ResourcePicker, TitleBar } from '@shopify/app-bridge-react';
import store from 'store-js';
import ProductList from '../components/ProductList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg';

function Index() {
  const [ modal, setModal ] = useState({open: false});

  function handleSelection(resources) {
    const idsFromResources = resources.selection.map((product) => product.id);
    setModal({ open: false });
    store.set('ids', idsFromResources);
  };
    // A constant that defines your app's empty state
    const emptyState = !store.get('ids');
    return (
      <Page>
        <TitleBar
          primaryAction={{
            content: 'Select products',
            onAction: () => setModal({ open: true }),
          }}
          secondaryActions={[{
            content: 'Clear selection',
            onAction: () => {
              store.clearAll();
              setModal({open: false});
            },
            destructive: true
          }]}
        />
        <ResourcePicker
          resourceType="Product"
          showVariants={false}
          open={modal.open}
          onSelection={(resources) => handleSelection(resources)}
          onCancel={() => setModal({ open: false })}
        />
        {emptyState ? ( // Controls the layout of your app's empty state
          <Layout>
            <EmptyState
              heading="Discount your products temporarily"
              action={{
                content: 'Select products',
                onAction: () => setModal({ open: true }),
              }}
              // image={img}
            >
              <p>Select products to change their price temporarily.</p>
            </EmptyState>
          </Layout>
        ) : (
          // Uses the new resource list that retrieves products by IDs
          <ProductList />
        )}
      </Page>
    );
  
}

export default Index;
