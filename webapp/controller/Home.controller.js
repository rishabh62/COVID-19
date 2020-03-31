sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("corona.virus.controller.Home", {
		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oModel, "covid");
			//api endpoint to fetch data from
			var sUrl = "https://corona.lmao.ninja/countries";
			this.createCovidModel(sUrl);
			
		},
		
		createCovidModel: function(sUrl){
			// var oResponse = await fetch(sUrl);
			// var aData = await oResponse.json();
			var oModel = new sap.ui.model.json.JSONModel(sUrl);
			console.log(oModel)
			this.getView().setModel(oModel, "covid");
		}
		
	});
});