const browser = require( '../browser' ),
config = require( '../config' ),
By = require( 'selenium-webdriver' ).By;

const msg = {
    alreadyLoggedIn: 'User is logged into Amazon. Checking stock...',
    attemptingToPurchase: 'Item in stock on Amazon, attempting to purchase...',
    loggingIn: 'Attempting to log user into Amazon account...',
    notLoggedIn: 'User either was not logged in to Amazon or has timedout... Attempting to login',
    noInventory: `Item out of stock on Amazon... waiting ${ config.queryFrequency }ms and trying again.`,
    emailEnter: '\tEntering Amazon email...',
    emailSubmit: '\tSubmitting Amazon email...',
    passwordEnter: '\tEntering Amazon password...',
    passwordSubmit: '\tSubmitting Amazon password...',
    runAway: `We're either not on the correct page or Amazon is onto us! Cheeze it!!`
};

/**
 * @name buy 
 * @function
 * @description Attempt to purchase by clicking the "buy now" button
 * @param {*} driver 
 */
const buy = driver => {

    var button = driver.findElement( By.css( config.amazon.selectors.buyNow ) );

    button
        .click()
        .then( () => {
            console.log( msg.attemptingToPurchase );
            confirm( driver );
        }).catch( err => {
            if( config.debug ) console.error( err );
            console.log( msg.noInventory );
            setTimeout( refresh, config.queryFrequency, driver );
        }); 
}

/**
 * @name confirm
 * @function
 * @description Attempt to confirm a purchase after clicking "buy now" button
 * @param {*} driver 
 */
const confirm = driver => {

    var button = driver.findElement( By.css( config.amazon.selectors.confirmPurchase ) );

    button
        .click()
        .then( () => setTimeout( browser.close, config.purchaseWait, driver ) )
        .catch( err => {
            if( config.debug ) console.error( err );
            console.log( `Inventory unavailable... waiting ${ config.queryFrequency }ms and trying again.` );
            setTimeout( refresh, config.queryFrequency, driver );
        }); 

}

/**
 * @name handleEmail
 * @function
 * @description Enters email and submits for next screen
 * @param {*} driver 
 */
const handleEmail = driver => {
    console.log( msg.emailEnter );
    driver
        .findElement( By.css( config.amazon.selectors.email ) )
        .sendKeys( config.amazon.username )
        .then( () => {

            driver
                .findElement( By.css( config.amazon.selectors.continue ) )
                .click()
                .then( () => {
                    console.log( msg.emailSubmit );
                    handlePassword( driver );
                });

        })
        .catch( err => {
            if( config.debug ) console.error( err );
            console.log( msg.runAway )
            browser.close( driver );
        });
}

/**
 * @name handlePassword
 * @function 
 * @description Enters password and submits
 * @param {*} driver 
 */
const handlePassword = driver => {
    console.log( msg.passwordEnter );
    driver
        .findElement( By.css( config.amazon.selectors.password ) )
        .sendKeys( config.amazon.password )
        .then( () => {

            driver
                .findElement( By.css( config.amazon.selectors.signIn ) )
                .click()
                .then( () => {
                    console.log( msg.passwordSubmit );
                    buy( driver );
                });

        })
        .catch( err => {
            if( config.debug ) console.error( err );
            console.log( msg.runAway )
            browser.close( driver );
        });
}

/**
 * @name loginCheck
 * @function
 * @description Sees if user is logged into their account
 * @param {*} driver 
 */
const loginCheck = driver => {

    var button = driver.findElement( By.css( config.amazon.selectors.login ) );

    button
        .click()
        .then(() => {
            console.log( msg.loggingIn );
            handleEmail( driver );
        })
        .catch( err => {
            if( config.debug ) console.error( err );
            console.log( msg.alreadyLoggedIn );
            buy( driver );
        })

}

/**
 * @name refresh
 * @function
 * @description Refreshes the window and attempts to buy again.
 * @param {*} driver 
 */
const refresh = driver => {
    driver.navigate().refresh().then(() => buy( driver ) );
}

/**
 * @name query
 * @function
 * @description Queries the retailer for inventory
 */
const query = callback => {

    console.log( 'Checking inventory on Amazon...' );

    browser.open( config.amazon.itemPath, loginCheck );
    
}

module.exports = {
    query
}