import { EmptyState, Layout, Page, ResourcePicker, ResourceList } from '@shopify/polaris';
import store from 'store-js';
import WishListWithProducts from '../components/WishList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

class Index extends React.Component {

  state = {
    open: false,
    wishListIds: []
  };

    render() {
      const emptyState = !store.get('ids')
      return (
        <Page
          primaryAction={{
            content: 'Select products',
            onAction: () => this.setState({ open: true })
          }}
        >
          <ResourcePicker
            resourceType="Product"
            showVariants={false}
            open={this.state.open}
            onSelection={
              (resources) => this.handleSelection(resources)
            }
            onCancel ={() => this.setState({ open: false })}
          />
          {emptyState ? (
            <Layout>
              <EmptyState
                heading="Create a wishlist to save great products"
                action={{
                  content: 'Select products',
                  onAction: () => this.setState({ open: true })
                }}
                image={img}
              >
                <p>Select products to add to your wishlist.</p>
              </EmptyState>
            </Layout>
          ) : (
              <WishListWithProducts
                handleDelete={(resources) => this.handleDelete (resources)}
                handleAddMore={this.handleAddMore}
              />
          )}
      </Page>
    );
  }

  handleSelection = (resources) => {
    console.log('state', this.state)
    const { wishListIds } = this.state;
    const newWishListIds = resources.selection.map((product) => product.id)
    this.setState((prevState) => ({
      wishListIds: prevState.wishListIds.concat(newWishListIds)
    }))
    console.log('state', this.state)
    store.set('ids', wishListIds)
    store.set('ids', this.state.wishListIds);
    this.setState({open:false})
  }

  // handleDelete = (resources) => {
  //   idsToDelete = resources.selection.map((product) => product.id)
  //   console.log('deleted!')
  //   console.log('idsToDelete')
  // }

  handleAddMore = () => {
    this.setState({
      open: true
    })
  }

  // handleAddMoreSelection = (resources) => {
  //   const { wishListIds } = this.state;
  //   const newWishListIds = resources.selection.map((product) => product.id)
  //   this.setState((prevState) => ({
  //     wishListIds: prevState.wishListIds.concat(newWishListIds)
  //   }))
  //   console.log('state', this.state)
  //   store.set('ids', wishListIds)
  // }
}


export default Index;
