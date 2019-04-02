import { EmptyState, Layout, Page, ResourcePicker, ResourceList } from '@shopify/polaris';
import WishListWithProducts from '../components/WishList';

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

class Index extends React.Component {
  state = {
    open: false,
    wishListIds: [],
    emptyState: true
  };

    render() {
      const {emptyState} = this.state
      console.log('re-rendered state', this.state)
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
                handleDelete={(e) => this.handleDelete(e)}
                handleAddMore={this.handleAddMore}
                wishListIds={this.state.wishListIds}
              />
          )}
      </Page>
    );
  }

  handleSelection = (resources) => {
    console.log('state', this.state)
    const { wishListIds, emptyState } = this.state;
    const newWishListIds = resources.selection.map((product) => product.id)
    this.setState((prevState) => ({
      wishListIds: prevState.wishListIds.concat(newWishListIds),
      emptyState: false
    }))
    console.log('state', this.state)
    this.setState({open:false})
  }

  handleDelete = (e) => {
    const { wishListIds } = this.state;
    console.log(e.target.id)
    const filteredIds = wishListIds.filter((id) => id !== e.target.id)
    console.log('filteredIds', filteredIds)
    this.setState({
      wishListIds: filteredIds
    })
    console.log(wishListIds)

  }

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
