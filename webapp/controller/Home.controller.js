sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"../model/formatter"
], function (Controller, formatter) {
	"use strict";

	return Controller.extend("corona.virus.controller.Home", {
		formatter: formatter,
		onInit: function () {
			//set table state to busy until data is loaded in the model
			var oDataLoadedPromise = this.getView().getModel("covid").dataLoaded();
			oDataLoadedPromise.then( function() {
				this.getView().getModel("busy").setProperty("/busy", false);
			}.bind(this));
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