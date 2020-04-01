sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("corona.virus.controller.Home", {
		
		onInit: function () {
			//api endpoint to fetch data from
			var sUrl = "https://corona.lmao.ninja/countries";
			this.createCovidModel(sUrl);
			
			//set table state to busy until data is loaded in the model
			var oDataLoadedPromise = this.getView().getModel("covid").dataLoaded();
			oDataLoadedPromise.then( function() {
				this.getView().getModel("busy").setProperty("/busy", false);
			}.bind(this));
		},

		createCovidModel: function (sUrl) {
			var oModel = new sap.ui.model.json.JSONModel(sUrl);
			this.getView().setModel(oModel, "covid");
		},

		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("country", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var oTable = this.byId("table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilters, "Application");
		}

	});
});