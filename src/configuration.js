export let notification = {
  success: (message, data) => console.log('react-common-admin - success', message, data),
  error: (message, data) => console.log('react-common-admin - error', message, data),
  info: (message, data) => console.log('react-common-admin - info', message, data),
  warning: (message, data) => console.log('react-common-admin - warning', message, data),
  warn: (message, data) => console.log('react-common-admin - warn', message, data),
}

export let defaultDocumentMessages = {
  onPostMessage: 'react-common-admin document - Created successfully',
  onPostFailedMessage: 'react-common-admin document - Created failed',
  onPutMessage: 'react-common-admin document - Update successfully',
  onPutFailedMessage: 'react-common-admin document - Update failed):',
  onDeleteMessage: 'react-common-admin document - Deleted successfully',
  onDeleteFailedMessage: 'react-common-admin document -  Deleted failed'
}

export let langDir = 'ltr'
/**
 *
 * @param {*} res
 * @param {*} res.notification
 */
export const initCommonAdmin = function(res) {
  if(res.notification) {
    if(typeof res.notification === 'object' || typeof res.notification === 'function') {
      // Show Warning if one of the methods are missing
      if(
        !res.notification.success ||
                !res.notification.error ||
                !res.notification.info ||
                !res.notification.warning ||
                !res.notification.warn
      ) {
        console.warn('react-common-admin.initCommonAdmin({notification}), notification need to include {success, error, info, warning, warn}')
      }
      // Replace (default)notification with notification from initCommonAdmin
      notification = res.notification
    }else{
      // Show error, res.notification most be an object
      console.error('react-common-admin.initCommonAdmin({notification}), notification need to be an object and to include {success, error, info, warning, warn}')
    }
  }

  if(res.defaultDocumentMessages) {
    if(typeof res.defaultDocumentMessages === 'object') {
      // Show Warning if one of the methods are missing
      if(
        !res.defaultDocumentMessages.onPostMessage ||
                !res.defaultDocumentMessages.onPostFailedMessage ||
                !res.defaultDocumentMessages.onPutMessage ||
                !res.defaultDocumentMessages.onPutFailedMessage ||
                !res.defaultDocumentMessages.onDeleteMessage ||
                !res.defaultDocumentMessages.onDeleteFailedMessage
      ) {
        console.warn('react-common-admin.initCommonAdmin({defaultDocumentMessages}), defaultDocumentMessages need to include {onPostMessage, onPostFailedMessage, onPutMessage, onPutFailedMessage, onDeleteMessage, onDeleteFailedMessage}')
      }
      // Replace (default)defaultDocumentMessages with defaultDocumentMessages from initCommonAdmin
      defaultDocumentMessages = res.defaultDocumentMessages
    }else{
      // Show error, res.defaultDocumentMessages most be an object
      console.warn('react-common-admin.initCommonAdmin({defaultDocumentMessages}), defaultDocumentMessages must be an object and need to include {onPostMessage, onPostFailedMessage, onPutMessage, onPutFailedMessage, onDeleteMessage, onDeleteFailedMessage}')
    }
  }

  if(res.langDir){
    langDir = res.langDir;
  }
}

/*eslint no-console: "off"*/
