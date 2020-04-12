sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"corona/virus/model/models"
], function (UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("corona.virus.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			//create busy model
			this.setModel(models.createBusyModel(), "busy");

			//api endpoint to fetch country wise data from
			var sUrl = "https://corona.lmao.ninja/countries";
			this.setModel(models.createCovidModel(sUrl), "covid");
			
			//api endpoint to fetch worldwide data from
			var sUrl = "https://corona.lmao.ninja/all";
			this.setModel(models.createCovidModel(sUrl), "covidAll");
			
			//create model for table/chart visibility
			this.setModel(models.createTableChartModel(), "tableChart");
			
		}
	});
});