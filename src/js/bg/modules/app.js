/**
* The Application background module takes care of all
* generic state concerning the app, notifications and
* vendor-specific handling.
* @module ModuleApp
*/
const Module = require('../lib/module')


/**
* Main entrypoint for App.
* @memberof AppBackground.modules
* @extends Module
*/
class ModuleApp extends Module {
    /**
    * @param {AppBackground} app - The background application.
    */
    constructor(app) {
        super(app)

        if (this.app.env.isBrowser) {
            window.addEventListener('offline', (e) => {
                this.app.setState({app: {online: false}})
            })
            window.addEventListener('online', (e) => {
                this.app.setState({app: {online: true}})
            })
        }
    }


    /**
    * Initializes the module's store.
    * @returns {Object} The module's store properties.
    */
    _initialState() {
        return {
            installed: true,
            name: process.env.APP_NAME,
            notifications: [],
            online: true,
            updated: false,
            vendor: {
                name: process.env.VENDOR_NAME,
                portal: {
                    name: process.env.PORTAL_NAME,
                    url: process.env.PORTAL_URL,
                },
                support: {
                    email: process.env.VENDOR_SUPPORT_EMAIL,
                    phone: process.env.VENDOR_SUPPORT_PHONE,
                    website: process.env.VENDOR_SUPPORT_WEBSITE,
                },
                type: process.env.VENDOR_TYPE,
            },
            version: {
                current: process.env.VERSION,
                previous: process.env.VERSION,
            },
        }
    }


    /**
    * Restore stored dumped state from localStorage.
    * @param {Object} moduleStore - Root property for this module.
    */
    _restoreState(moduleStore) {
        moduleStore.notifications = []
    }
}

module.exports = ModuleApp
