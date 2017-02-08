import React, { Component } from 'react'

import VariantsSelector from './VariantsSelector'
import AddToCart from '../AddToCart'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

/**
 * ProductItem
 * Displays the ProductItem
 * in the Shopify application along with all the important details we need regarding the 
 * Item, allows us to choose the option, and based on the option, change the image and details relatively.
 * 
 * The ProductID and details about the major product along with the variants also seem to be very valuable
 * and can't just be thrown away. We are going to use that information within the ProductItem for callback purposes and other purposes
 * too.
 * 
 * Following are the props to be used here
 * - Product
 *  - Product ID
 *  - Product Description
 *  - Product Title
 *  - Product Images
 *  - selectedVariantId
 * - selectedVariant
 *  - ID
 *  - Option Values
 *  - selectedImage
 */
export default class ProductItem extends Component {
  onSelect (index, name, option) {
    if (this.props.onSelect) {
      this.props.onSelect(index, name, option)
    }
  }

  onChangeQuantity (quantity) {
    const { onChangeQuantity } = this.props

    if (onChangeQuantity) {
      onChangeQuantity(quantity)
    }
  }

  /**
   * onAddCart
   * adds items to cart and calls this function handler along with information
   */
  onAddCart (event) {
    const { onAddCart } = this.props
    if (onAddCart) {
      onAddCart(event)
    }
  }

  render () {
    const { product = {}, checkoutUrl, quantity } = this.props
    let displayImage

    if (product.image && product.image.src) {
      displayImage = product.image
    } else {
      displayImage = product.images && product.images[0]
    }


    return (
      <div className="ProductItem">
        <div className="row">
          <div className="ProductItem--image">
            <ReactCSSTransitionGroup 
              transitionName="example"
              transitionAppear={true}
              transitionEnter={true}
              transitionEnterTimeout={500}
              transitionAppearTimeout={500}
              transitionLeave={false}>
              <img className="img-responsive" key={displayImage && displayImage.src} src={displayImage && displayImage.src} alt={product.title} />
            </ReactCSSTransitionGroup>
          </div>
          <div className="ProductItem--description">
            <h2>{product.productTitle }</h2>
            <div className="ProductItem--label">
              <StockLabel available={product.available} exists={product.exists} />
            </div>
            <h3>{product.title || 'Unavailable'}</h3>
            <p className="ProductItem--body" dangerouslySetInnerHTML={{__html: product.description}} />
          </div>
          <div className="ProductItem--variantOptions">
            <VariantsSelector options={product.options} 
                              onSelect={this.onSelect.bind(this)}
                              selections={product.selections || []} />
          </div>
          <div className="ProductItem--AddToCart">
            <AddToCart available={product.available} 
                       exists={product.exists}
                       onChangeQuantity={this.onChangeQuantity.bind(this)} 
                       checkoutUrl={checkoutUrl}
                       onAddCart={this.onAddCart.bind(this)}
                       quantity={quantity} />
          </div>
        </div>
      </div>
    )
  }
}

const StockLabel = ({available, exists}) => {
  const stockColor = available ? 'green' : 'red'
  let stockText

  if (exists && available) {
    stockText = 'In Stock'
  } else if (exists && !available) {
    stockText = 'Out of Stock'
  } else {
    stockText = 'Unavailable'
  }

  const styles = {
    color: stockColor
  }

  return (
    <span className="StockLabel" style={styles}>{stockText}</span>
  )
}
