# Foreword

This script is meant to help people compete with bots in their ability to acquire hot items. Please only use this to buy a single item and never again. If I am notified of anyone abusing this script (i.e. use this for scalping) I will pull this repository down and no one can have it in the future.

## Just don't be a dick!

Additionally, this script is mildly CPU and network intensive. So, if you have a slower machine, you may want to consider spinning up a free tier EC2 instance and running this script there.

# Getting Started

1. If you don't have NodeJS installed on your computer/server, [click here](https://nodejs.org/en/) to install it.
2. Open the config.js file in the root directory of this repository
   1. Enter your credentials for the corresponding retailers in the appropriate keys. (i.e. Enter your amazon username config.amazon.username). 
       1. If you do not enter information for a specific retailer, that worker thread will abort and you will not check that retailer for stock.
       2. If you enter anything incorrectly, the script will fail during the login process and you will not buy any inventory it detects. 
       3. **_DO NOT_** attempt to commit and push your changes to the config file, because I will allow you will publicly expose your credentials to the world and I will not remove that file history out of spite. 
   2. Enter the URL for the item you wish to purchase for the corresponding retailers in the `itemPath` key.
       1. To get the URL, simply navigate to the retailer's purchase page for the product, copy the URL from the address bar, and paste it *verbatim* into the `itemPath` key.
3. Save the config.js file
    1. Again... **_DO NOT_** attempt to commit and push these changes.
3. Open `command prompt`, `power shell`, `node console`, `terminal`, etc. and navigate to the directory you cloned this repository into
    * Example: `cd C:/Users/YourUsername/Documents/ThisRepo`
4. Run the following command: `npm install`

# Running the script

1. Open `command prompt`, `power shell`, `node console`, `terminal`, etc. and navigate to the directory you cloned this repository into
    * Example: `cd C:/Users/YourUsername/Documents/ThisRepo`
2. Run the following command: `node index.js`

# Tweaking the `config.js` File

If you feel as though your internet may be slow or the script is hogging too many resources or too much bandwidth, you can tweak the script slightly to adjust that. _However_, doing so may impact the efficacy of the script. 

_Proceed with caution!_

`debug` - _boolean_ - This property determines if errors will be output in the console window. I recommend leaving this set to `false` as some functionality, like determining if the user is loggedin, relies on errors occurring.

`purchaseWait` - _number_ - This determines the amount of time (in milliseconds) to wait after a purchase has been made. This is to allow for requests to complete before closing the browser window. The default value is 2 minutes, which is subsequently the max timeout length of a request.

`queryFrequency` - _number_ - This determines how frequently (in milliseconds) to check for stock on the retailers' websites. This default value is 2 seconds. I recommend leaving this alone. If you lessen this value, you run the risk of a temporary account locking your account because they rightfully suspect that you're likely a bot. 