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
			oDataLoadedPromise.then(function () {
				this.getView().getModel("busy").setProperty("/busy", false);
			}.bind(this));
		},

		drawChart: function () {
			var self = this;
			// Load the Visualization API and the corechart package.
			google.charts.load('current', {
				'packages': ['corechart']
			});

			// Set a callback to run when the Google Visualization API is loaded.
			google.charts.setOnLoadCallback(function () {
				// Callback that creates and populates a data table,
				// instantiates the pie chart, passes in the data and
				// draws it.
				// Create the data table.
				var data = new google.visualization.DataTable();
				data.addColumn('string', 'Country');
				data.addColumn('number', 'Total Cases');
				var aData = this.getDataForChart();
				data.addRows(aData);

				// Set chart options
				var options = {
					'title': "Total Cases by Country",
					'width': '100%',
					'height': '500',
					'is3D': true
				};

				// Instantiate and draw our chart, passing in some options.
				var chart = new google.visualization.PieChart(this.getView().byId('Home--chart_div').getDomRef());
				chart.draw(data, options);
			}.bind(this));

		},

		onSearch: function (oEvent) {
			// add filter for search
			var aFilters = [new sap.ui.model.Filter("country", sap.ui.model.FilterOperator.NE, 'World')];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new sap.ui.model.Filter("country", sap.ui.model.FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			// update list binding
			var oTable = this.byId("Home--table");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(new sap.ui.model.Filter({
				filters: aFilters,
				and: true
			}), "Application");
		},

		onSelectionChange: function (oEvent) {
			var oSegBtn = oEvent.getParameters("item");
			var oModel = this.getView().getModel("tableChart");
			if (oSegBtn.item.getKey() === 'table') {
				oModel.setProperty("/table", true);
				oModel.setProperty("/chart", false);
			} else {
				oModel.setProperty("/table", false);
				oModel.setProperty("/chart", true);
				setTimeout(function () {
					this.drawChart();
				}.bind(this), 0);

			}
		},

		getDataForChart: function () {
			var aData = this.getView().getModel("covid").getData();
			return aData.map(function (item, index) {
				var aRow = [];
				aRow.push(item.country);
				aRow.push(item.cases);
				return aRow;
			}).sort(function (a, b) {
				return a[1] >= b[1] ? 1 : -1;
			});
		}

	});
});