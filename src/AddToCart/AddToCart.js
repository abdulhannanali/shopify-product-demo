import React, { Component } from 'react'
import classnames from 'classnames'

export default class AddToCart extends Component {
  constructor () {
    super()

    // this.generateCheckoutUrl = this.generateCheckoutUrl.bind(this)
    this.onAddCart = this.onAddCart.bind(this)
    this.onChangeQuantity = this.onChangeQuantity.bind(this)
    this.onBuyNow = this.onBuyNow.bind(this)

    this.state = {
      quantity: 1
    }
  }

  /**
   * onChangeQuantity
   * sets the state and changes the quantity within it
   */
  onChangeQuantity (event) {
    const value = event.target.value

    this.setState({
      quantity: value
    })

    if (this.props.onChangeQuantity) {
      this.props.onChangeQuantity(value)
    }
  }

  /**
   * onAddCart
   * function called when the Add To Cart button is clicked
   */
  onAddCart (event) {
    const { onAddCart } = this.props

    if (onAddCart) {
      onAddCart(event)
    }
  }

  onBuyNow (event) {
    const { checkoutUrl } = this.props
    event.preventDefault()    
    window.location.href = checkoutUrl
  }

  /**
   * render
   * function in order to render
   * the Cart Images
   */
  render () {
    let buttonText
    let wrapper
    const { exists, available, quantity = true, checkoutUrl} = this.props

    if (exists && available) {
      buttonText = 'Buy Now'
    } else if (exists) {
      buttonText = 'Out of Stock'
    } else {
      buttonText = 'Unavailable'
    }

    const classes = classnames('btn', {
      'btn-success': exists && available,
      'disabled btn-default': !exists || !available
    })

    const buyNowButton = (
      <button className={classes} onClick={this.onBuyNow} href={checkoutUrl}>{buttonText}</button>
    )

    const addToCartButton = (
      <button className="btn btn-default"
              data-tip="Add To Cart is not implemented, but is here to demonstrate the use of functional handler using Fake Cart"
              onClick={this.onAddCart}>
                Add To Cart
      </button>
    )

    if (quantity) {
      wrapper = (
        <div className="AddToCart">
          <div className="input-group">
            <input type="number"
                   value={this.state.quantity}
                   className="form-control" 
                   placeholder="Enter quantity here" 
                   onChange={this.onChangeQuantity}
            />
            <span className="input-group-btn">
              {buyNowButton}
              {addToCartButton}
            </span>
          </div>
        </div>
      )
    } else {
      wrapper = (
        <div className="AddToCart">
          {buyNowButton}
        </div>
      )
    }

    return wrapper
  }
}