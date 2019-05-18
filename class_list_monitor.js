(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('ClassListMonitor', [], function () {
      return (root['ClassListMonitor'] = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['ClassListMonitor'] = factory();
  }
}(this, function () {

/* class_list_monitor.js 1.0.0
 * Copyright © 2019 David Clews
 * Free to use under MIT license.
 */
/**
 * Description
 *
 * Monitor for chnages within the class list of all elements in the dom
 * 
 * @module Title
 */
var ClassListMonitor = {
  version: '1.0.0'
};

(function (window, document, ClassListMonitor) {
  'use strict';
  
    document.addEventListener("DOMContentLoaded", function(){
        
        if(document.body !== null){
            var targetNode = document.body;
        }else{
            throw "Unable to detect the body element.";
        }

        // Options for the observer (which mutations to observe)
        let config = { 
            attributes: true,
            subtree: true,
            childList: true,
            attributeOldValue: true,
        };

        console.info("ClassListMonitor Loaded");

        // Callback function to execute when mutations are observed
        let callback = function(mutationsList, observer) {
            for(var mutation of mutationsList) {

                if (mutation.type == 'attributes' && mutation.attributeName == "class") {
                    let classListChangedEvent = new CustomEvent("ClassListChanged", {
                    detail: {
                            oldClassList: mutation.oldValue,
                    },
                        bubbles: true,
                        cancelable: true
                    });

                    mutation.target.dispatchEvent(classListChangedEvent);
                }

                /* we don't need to add any new items to the monitor because it is live  */

            }
        };

        // Create an observer instance linked to the callback function
        let observer = new MutationObserver(callback);

        // Start observing the target node for configured mutations
        observer.observe(targetNode, config);

        /*
         * destroy
         * 
         * Stop the monitoring of the document
         * 
         * @returns {undefined}
         */
        ClassListMonitor.destroy = function(){
            observer.disconnect();
        }
    });
}(window, document, ClassListMonitor));

return ClassListMonitor;

})); 
