materialAdmin
    .controller('reportsBatterHeatZoneCtrl', function($scope, $timeout, reportService) {
        var self = this;
        self.results = [];
        self.activeTab = 'basic';
        self.additionalFilters = {
            'inningMin': 1,
            'inningMax': 20,
            'manOnFirst': false,
            'manOnSecond': false,
            'manOnThird': false,
            'outs': [0,1,2],
            'balls': [0,1,2,3],
            'strikes': [0,1,2],
        };
        self.initialAdditionalFilters = jQuery.extend(true, {}, self.additionalFilters);
        self.runningReport = true;
        
        self.filterResults = function(r){
            return r.pitch_count >= self.minimumPitchCount && (self.playerSearch == '' || r.name.toLowerCase().indexOf(self.playerSearch.toLowerCase()) > -1);
        }
        
        self.arraysEqual = function(a, b) {
            if (a === b) return true;
            if (a == null || b == null) return false;
            if (a.length != b.length) return false;

            for (i in a) {
                if ($.isArray(a[i])){
                    if (!self.arraysEqual(a[i], b[i])){
                        return false;
                    }
                }else{
                    if (a[i] !== b[i]) return false;
                }
            }
            return true;
        }
        
        self.range = function(min,max,step){
            step = step || 1;
            var input = [];
            
            for (var i = min; i <= max; i += step){
                input.push(i);
            }
            return input;
        };
    
        $timeout(function(){
            var chart = new CanvasJS.Chart("chartContainer",
                {
                  title:{
                    text: "Server Performance",
                    fontSize: 20
                  },
                  animationEnabled: true,
                  axisX: {
                    tickLength: 0,
                    valueFormatString:  " ",
                    minimum:-4,
                    maximum:4,
                    stripLines:[
                      {                
                        startValue:-0.7083,
                        endValue:0.7083,                
                        color:"#d8d8d8"                      
                      }
                    ],
                  },
                  axisY:{
                    tickLength: 0,
                    valueFormatString:  " ",
                    minimum:0,
                    maximum:5,
                    stripLines:[
                      {                
                        startValue:1.5370,
                        endValue:3.4130,                
                        color:"#d8d8d8"                      
                      }
                    ],
                  },
                  legend: {
                    verticalAlign: 'bottom',
                    horizontalAlign: "center"
                  },

                  data: [
                  {        
                    type: "scatter",  
                    markerType: "square", 
                    toolTipContent: "{label}",

                    name: "Server Pluto",
                    showInLegend: true,  
                    dataPoints: [

                        { x: -1.4050, y: 2.8990, label: 'Foul'},
                        { x: 0.3100, y: 0.5440, label: 'Swinging Strike'},
                        { x: -0.0220, y: 3.0610, label: 'Ball in Play'},
                        { x: -0.1470, y: 2.1840, label: 'Strike Looking'},
                        { x: -1.7100, y: 2.8260, label: 'Ball'},
                        { x: -0.0520, y: 2.4530, label: 'Foul'},
                        { x: -0.7970, y: 4.0740, label: 'Swinging Strike'},
                        { x: -1.0540, y: 0.6790, label: 'Ball in Dirt'},
                        { x: 0.0550, y: 2.5110, label: 'Ball in Play'},
                        { x: -0.9740, y: 4.1210, label: 'Ball'},
                        { x: -0.9600, y: 2.7600, label: 'Ball in Play'},
                        { x: 0.2790, y: 1.0960, label: 'Ball'},
                        { x: 1.1670, y: 2.0610, label: 'Ball'},
                        { x: 1.1160, y: 2.1040, label: 'Ball'},
                    ]
                  }	,
                  {        
                    type: "scatter",     
                    name: "Server Mars",
                    markerType: "triangle",
                    showInLegend: true, 
                    toolTipContent: "{label}",

                    dataPoints: [
                        { x: 0.5790, y: 2.0690, label: 'Strike Looking'},
                        { x: -0.0280, y: 1.4850, label: 'Ball in Play'},
                        { x: -0.2690, y: 2.2050, label: 'Strike Looking'},

                    ]
                  }
                  ],
                      legend:{
                        cursor:"pointer",
                        itemclick : function(e) {
                          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                            e.dataSeries.visible = false;              
                          }
                          else {
                            e.dataSeries.visible = true;              
                          }
                          chart.render();
                        }
                      }
                });

            chart.render();
            
        });
    });