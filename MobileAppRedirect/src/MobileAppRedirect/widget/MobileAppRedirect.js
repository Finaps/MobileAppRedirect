/*global logger*/
/*
    MobileAppRedirect
    ========================

    @file      : MobileAppRedirect.js
    @version   : 1.0
    @author    : Simon Martyr
    @date      : Sun, 10 Jan 2016 19:24:22 GMT
    @copyright : 
    @license   : 

    Documentation
    ========================
    Describe your widget here.
*/

// Required module list. Remove unnecessary modules, you can always get them back from the boilerplate.
define([
    "dojo/_base/declare",
    "mxui/widget/_WidgetBase",
    "dijit/_TemplatedMixin",

    "mxui/dom",
    "dojo/dom",
    "dojo/dom-prop",
    "dojo/dom-geometry",
    "dojo/dom-class",
    "dojo/dom-style",
    "dojo/dom-construct",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dojo/text",
    "dojo/html",
    "dojo/_base/event",

    "MobileAppRedirect/lib/jquery-1.11.2",
    "dojo/text!MobileAppRedirect/widget/template/MobileAppRedirect.html"
], function(declare, _WidgetBase, _TemplatedMixin, dom, dojoDom, dojoProp, dojoGeometry, dojoClass, dojoStyle, dojoConstruct, dojoArray, dojoLang, dojoText, dojoHtml, dojoEvent, _jQuery, widgetTemplate) {
    "use strict";

    var $ = _jQuery.noConflict(true);

    // Declare widget's prototype.
    return declare("MobileAppRedirect.widget.MobileAppRedirect", [ _WidgetBase, _TemplatedMixin ], {
        // _TemplatedMixin will create our dom node using this HTML template.
        templateString: widgetTemplate,


        // Parameters configured in the Modeler.
        mfToExecute: "",
        formToOpen: "",
        typeEnum: "",


        // dojo.declare.constructor is called to construct the widget instance. Implement to initialize non-primitive properties.
        constructor: function() {
            logger.debug(this.id + ".constructor");
        },

        // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
        postCreate: function() {
            logger.debug(this.id + ".postCreate");
            this._checkCordova(); 
            
        },

        // mxui.widget._WidgetBase.update is called when context is changed or initialized. Implement to re-render and / or fetch data.
        update: function(obj, callback) {
            logger.debug(this.id + ".update");
            callback();
        },

        // mxui.widget._WidgetBase.uninitialize is called when the widget is destroyed. Implement to do special tear-down work.
        uninitialize: function() {
          logger.debug(this.id + ".uninitialize");
            // Clean up listeners, helper objects, etc. There is no need to remove listeners added with this.connect / this.subscribe / this.own.
        },

        _checkCordova : function() {
            if(typeof(cordova) != "undefined"){
                this._handleCordova(); 
            }
            else{
             console.log("Cordova is not present");    
            }
        },
        
        _handleCordova : function() {
            var form = this.formToOpen, microflow = this.mfToExecute; 
            switch(this.typeEnum){
                case "mf":
                    mx.data.action({
                        params: {
                            actionname: microflow
                        },
                        callback: function(obj) {
                        // no MxObject expected
                        },
                        error: function(error) {
                            console.log(error);
                        }
                    });
                    break;
                case "form":           
                    mx.ui.openForm(form, {
                        location: "popup",
                        callback: function(ret) {
                            console.log(ret.id);
                        }
                    });
                    break;
                default:
                    console.log("MobileAppRedirect - this should never happen...");
                
            }    
        }
    });
});

require(["MobileAppRedirect/widget/MobileAppRedirect"], function() {
    "use strict";
});
