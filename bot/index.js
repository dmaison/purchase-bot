const retailers = require( '../retailers' );

/**
 * @name check
 * @function
 * @description check the retailers for inventory
 */
const check = () => {
    retailers.amazon.query( evaluate );
}

/**
 * @name evaluate
 * @function
 * @description Evaluate the response from the retailers
 * @param {*} err 
 * @param {*} stock 
 */
const evaluate = ( err, stock ) => {

}

module.exports = {
    check
};