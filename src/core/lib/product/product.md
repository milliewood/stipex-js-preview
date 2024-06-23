Usage:
You can now use the stipexNewProduct function in your frontend components or other parts of your application to create a new product. For example:

javascript

import stipexNewProduct from './path/to/stipexNewProduct';

const productData = {
  name: 'New Product',
  description: 'Product Description',
  price: 1000,
  image: fileInput.files[0] // Access the product schema from our docs
};

stipexNewProduct(productData)
  .then(data => {
    console.log('Product created successfully:', data);
  })
  .catch(error => {
    console.error('Error creating product:', error);
  });
Environment Variables
Ensure you have the following environment variables set:

STIPEX_PRODUCT_SERVER_URL
STIPEX_LOGIN_API_SERVER
STIPEX_API_KEY
STIPEX_API_SECRET

You can set these in a .env file in your project root