const CONFIG = {

    /**
     * @name amazon
     * @property
     * @object
     * @description information pertaining to amazon
     */
    amazon: {
        username: '',
        password: '',
        itemPath: '',
        selectors: {
            buyNow: '#buy-now-button',
            confirmPurchase: '#turbo-checkout-pyo-button',
            continue: '#continue',
            email: 'input[type="email"]',
            login: '[data-csa-c-content-id="nav_ya_signin"]',
            password: 'input[type="password"]',
            signIn: '#signInSubmit'
        }
    },

    /**
     * @name debug
     * @property
     * @boolean
     * @description Determines if the bots should throw error messages. `true` if console should log errors, `false` if no errors should be logged.
     */
    debug: false,

    /**
     * @name purchaseWait
     * @property
     * @number
     * @description Amount of time to wait after purchasing to close the browser
     */
    purchaseWait: ( 1000 * 60 * 60 * 2 ),

    /**
     * @name queryFrequency
     * @property
     * @number
     * @description How frequent the bot attempts to detect a purchaseable unit in milliseconds
     */
    queryFrequency: 2000

};

module.exports = CONFIG;