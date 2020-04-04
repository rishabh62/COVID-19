sap.ui.define([], function(){
	"use strict";
	
	return{
		groupNumber: function(sNumber){
			var oNumFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({groupingEnabled: true});
			return oNumFormat.format(sNumber);
		}	
	}
	
});