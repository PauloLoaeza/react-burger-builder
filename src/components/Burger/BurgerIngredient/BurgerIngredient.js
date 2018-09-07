import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clasess from './BurgerIngredient.css';

class BurgerIngredient extends Component {
    render() {
        let ingredient = null;

        switch (this.props.type) {
            case 'bread-bottom':
                ingredient = <div className={ clasess.BreadBottom }></div>
                break;
            case 'bread-top':
                ingredient = (
                    <div className={ clasess.BreadTop }>
                        <div className={ clasess.Seeds1 }></div>
                        <div className={ clasess.Seeds2 }></div>
                    </div>
                );
                break;
            case 'meat':
                ingredient = <div className={clasess.Meat}></div>
                break;
            case 'cheese':
                ingredient = <div className={clasess.Cheese}></div>
                break;
            case 'bacon':
                ingredient = <div className={clasess.Bacon}></div>
                break;
            case 'salad':
                ingredient = <div className={clasess.Salad}></div>
                break;
            default:
                ingredient = null;
        }
        return ingredient;
    }
} 

BurgerIngredient.propTypes = {
    type: PropTypes.string.isRequired
}

export default BurgerIngredient;