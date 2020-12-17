const webdriver = require( 'selenium-webdriver' ),
chrome = require( 'selenium-webdriver/chrome' ),
chromedriver = require('chromedriver');

// set chrome instance path
chrome.setDefaultService( new chrome.ServiceBuilder( chromedriver.path ).build() );

/**
 * @name close
 * @function
 * @description Closes the provided browser window
 * @param {*} driver Browser instance
 */
const close = driver => driver.quit();

/**
 * @name open 
 * @description Opens the specified page and returns the browser window to the callback
 * @param {string} url 
 * @param {function} callback 
 */
const open = ( url, callback ) => {
    const driver = new webdriver.Builder().forBrowser( 'chrome' ).build();
    driver.get( url ).then( () => callback( driver ) );
}

module.exports = {
    close,
    open
};