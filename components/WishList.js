import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import {
  Button,
  Card,
  Heading,
  Page,
  ResourceList,
  Stack,
  TextStyle,
  Thumbnail
} from '@shopify/polaris';
import store from 'store-js';

const GET_PRODUCTS_BY_ID = gql`
  query getProducts($ids: [ID!]!) {
    nodes(ids: $ids) {
    ... on Product {
      title
      handle
      descriptionHtml
      id
      images(first: 1) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first: 1){
        edges {
          node {
            price
            id
          }
        }
      }
    }
  }
}
`;

class WishListWithProducts extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Query query={GET_PRODUCTS_BY_ID} variables={{ ids: store.get('ids') }}>
        {({ data, loading, error }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>{error.message}</div>
          console.log(data)
          return (
            <Page>
            <Heading>Your Wishlist</Heading>
            <Button
              onClick={this.props.handleAddMore}
            >
              Add More
            </Button>
            <Card>
              <ResourceList
              showHeader
              resourceName={{ singular: 'Product', plural: 'Products' }}
              items={data.nodes}
              renderItem={item => {
                const media = (
                  <Thumbnail
                    source={
                      item.images.edges[0]
                      ? item.images.edges[0].node.originalSrc
                      : ''
                    }
                    alt={
                      item.images.edges[0]
                      ? item.images.edges[0].node.altText
                      : ''
                    }
                  />
                );
                const price = item.variants.edges[0].node.price;
                return (
                  <ResourceList.Item
                    id={item.id}
                    media={media}
                    accessibilityLabel={`View details for ${item.title}`}
                    key={Date.now()}
                  >
                    <Stack>
                      <Stack.Item fill>
                        <h3>
                          <TextStyle variation="strong">
                            {item.title}
                          </TextStyle>
                        </h3>
                      </Stack.Item>
                      <Stack.Item>
                        <p>${price}</p>
                      </Stack.Item>
                      <Stack.Item>
                        <Button
                        onClick={this.props.handleDelete}
                        >
                          Delete
                        </Button>
                      </Stack.Item>
                    </Stack>
                  </ResourceList.Item>
                )
              }}
              >
              </ResourceList>
            </Card>
            </Page>
          )
        }}
      </Query>
    )
  }
}

export default WishListWithProducts;
