materialAdmin
    .controller('reportsBatterHeatZoneCtrl', function($scope, $timeout, reportService) {
        $scope.Math = window.Math;
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
        self.dataPoints = [{ x: -0.1470, y: 2.1840,  szt: 3.6000, szb: 1.5000, label: 'Strike Looking'},
{ x: 0.5790, y: 2.0690,  szt: 3.8400, szb: 1.8000, label: 'Strike Looking'},
{ x: -0.2690, y: 2.2050,  szt: 3.8700, szb: 1.7100, label: 'Strike Looking'},
{ x: 0.6710, y: 1.6770,  szt: 3.5100, szb: 1.4600, label: 'Strike Looking'},
{ x: -0.4400, y: 2.0430,  szt: 3.4700, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.1800, y: 2.9580,  szt: 3.9400, szb: 1.9500, label: 'Strike Looking'},
{ x: -0.1200, y: 2.8320,  szt: 3.5900, szb: 1.5000, label: 'Strike Looking'},
{ x: -1.5340, y: 3.0700,  szt: 3.5600, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.5240, y: 2.0130,  szt: 3.8500, szb: 1.7500, label: 'Strike Looking'},
{ x: 0.5080, y: 3.0750,  szt: 3.5000, szb: 1.7300, label: 'Strike Looking'},
{ x: -0.4400, y: 2.1400,  szt: 3.6400, szb: 1.7000, label: 'Strike Looking'},
{ x: -1.1130, y: 3.0430,  szt: 3.6500, szb: 1.8300, label: 'Strike Looking'},
{ x: -0.9030, y: 2.1120,  szt: 3.6900, szb: 1.7900, label: 'Strike Looking'},
{ x: -0.5760, y: 1.6680,  szt: 3.7600, szb: 1.7400, label: 'Strike Looking'},
{ x: 0.0720, y: 2.1070,  szt: 3.7700, szb: 1.7600, label: 'Strike Looking'},
{ x: 0.1730, y: 2.9390,  szt: 3.9300, szb: 1.7900, label: 'Strike Looking'},
{ x: -0.5750, y: 2.7580,  szt: 3.7800, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.1800, y: 2.0560,  szt: 3.5800, szb: 1.6400, label: 'Strike Looking'},
{ x: -0.4950, y: 2.6670,  szt: 3.8600, szb: 1.6800, label: 'Strike Looking'},
{ x: -1.0000, y: 2.5700,  szt: 3.6700, szb: 1.7000, label: 'Strike Looking'},
{ x: -0.9460, y: 2.1110,  szt: 3.5700, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.7740, y: 2.0830,  szt: 4.0900, szb: 1.8400, label: 'Strike Looking'},
{ x: -0.1530, y: 1.6720,  szt: 3.6200, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.0920, y: 2.9410,  szt: 3.6200, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.5740, y: 2.1790,  szt: 3.4800, szb: 1.5500, label: 'Strike Looking'},
{ x: -0.5860, y: 2.4870,  szt: 3.4800, szb: 1.6400, label: 'Strike Looking'},
{ x: -0.3750, y: 2.7520,  szt: 3.5400, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.6150, y: 2.7610,  szt: 3.6000, szb: 1.5300, label: 'Strike Looking'},
{ x: -0.9880, y: 2.9340,  szt: 3.6900, szb: 1.7200, label: 'Strike Looking'},
{ x: -0.4230, y: 2.6170,  szt: 3.4200, szb: 1.6200, label: 'Strike Looking'},
{ x: 0.3880, y: 2.9190,  szt: 3.4500, szb: 1.6800, label: 'Strike Looking'},
{ x: 0.2350, y: 3.6740,  szt: 3.3900, szb: 1.6100, label: 'Strike Looking'},
{ x: -0.5910, y: 2.4850,  szt: 3.4900, szb: 1.6200, label: 'Strike Looking'},
{ x: 0.1530, y: 2.7980,  szt: 3.5100, szb: 1.6200, label: 'Strike Looking'},
{ x: -0.0930, y: 2.8520,  szt: 3.4900, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.8840, y: 2.2140,  szt: 3.7000, szb: 1.6800, label: 'Strike Looking'},
{ x: 0.1850, y: 1.7580,  szt: 3.5700, szb: 1.7100, label: 'Strike Looking'},
{ x: -1.0040, y: 2.9020,  szt: 3.6900, szb: 1.6000, label: 'Strike Looking'},
{ x: 0.5500, y: 1.9930,  szt: 3.8100, szb: 1.7600, label: 'Strike Looking'},
{ x: -1.1480, y: 2.5920,  szt: 3.6400, szb: 1.8000, label: 'Strike Looking'},
{ x: 0.2600, y: 2.9100,  szt: 3.3300, szb: 1.5500, label: 'Strike Looking'},
{ x: -0.9200, y: 2.4800,  szt: 3.5000, szb: 1.6500, label: 'Strike Looking'},
{ x: 0.2840, y: 3.3120,  szt: 3.5900, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.9710, y: 1.9280,  szt: 3.5900, szb: 1.5000, label: 'Strike Looking'},
{ x: 0.0080, y: 2.5710,  szt: 3.5900, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.1140, y: 3.0740,  szt: 3.2100, szb: 1.5400, label: 'Strike Looking'},
{ x: -0.6280, y: 2.4110,  szt: 4.0200, szb: 1.8100, label: 'Strike Looking'},
{ x: -0.3770, y: 2.9890,  szt: 3.7700, szb: 1.6500, label: 'Strike Looking'},
{ x: 0.6000, y: 2.4000,  szt: 3.7000, szb: 1.8300, label: 'Strike Looking'},
{ x: -0.2600, y: 1.7100,  szt: 3.7000, szb: 1.7900, label: 'Strike Looking'},
{ x: 0.4190, y: 1.7520,  szt: 3.7800, szb: 1.8200, label: 'Strike Looking'},
{ x: -0.4700, y: 1.8300,  szt: 3.7000, szb: 1.7000, label: 'Strike Looking'},
{ x: -0.2700, y: 2.0100,  szt: 3.5100, szb: 1.7100, label: 'Strike Looking'},
{ x: -0.9100, y: 2.0700,  szt: 3.6600, szb: 1.6600, label: 'Strike Looking'},
{ x: -0.7930, y: 2.9830,  szt: 3.5600, szb: 1.6600, label: 'Strike Looking'},
{ x: -0.2720, y: 3.0940,  szt: 3.8100, szb: 1.7700, label: 'Strike Looking'},
{ x: -0.9400, y: 2.9490,  szt: 3.7900, szb: 1.7600, label: 'Strike Looking'},
{ x: -0.4160, y: 3.3970,  szt: 3.5800, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.5830, y: 2.1450,  szt: 3.4800, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.6170, y: 2.7770,  szt: 3.5800, szb: 1.5000, label: 'Strike Looking'},
{ x: -0.0100, y: 1.8900,  szt: 3.5000, szb: 1.6500, label: 'Strike Looking'},
{ x: -0.8360, y: 2.3800,  szt: 3.7200, szb: 1.7200, label: 'Strike Looking'},
{ x: -0.7570, y: 1.9570,  szt: 3.5800, szb: 1.6100, label: 'Strike Looking'},
{ x: -0.8640, y: 1.7380,  szt: 3.4400, szb: 1.6100, label: 'Strike Looking'},
{ x: 0.7780, y: 2.1310,  szt: 3.5600, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.3810, y: 1.9210,  szt: 3.5300, szb: 1.8100, label: 'Strike Looking'},
{ x: -0.7930, y: 2.5780,  szt: 3.4400, szb: 1.7100, label: 'Strike Looking'},
{ x: -1.0230, y: 2.8710,  szt: 3.5100, szb: 1.8400, label: 'Strike Looking'},
{ x: -0.3510, y: 2.4140,  szt: 3.8200, szb: 1.6800, label: 'Strike Looking'},
{ x: -0.6830, y: 2.9680,  szt: 3.4700, szb: 1.6700, label: 'Strike Looking'},
{ x: -0.8000, y: 2.6630,  szt: 3.5200, szb: 1.6600, label: 'Strike Looking'},
{ x: 0.2870, y: 2.7600,  szt: 3.7400, szb: 1.8000, label: 'Strike Looking'},
{ x: -0.1360, y: 1.6880,  szt: 3.5900, szb: 1.6500, label: 'Strike Looking'},
{ x: -0.4180, y: 2.1430,  szt: 3.5600, szb: 1.6100, label: 'Strike Looking'},
{ x: 0.0070, y: 1.7350,  szt: 3.5700, szb: 1.6200, label: 'Strike Looking'},
{ x: -0.9930, y: 2.9110,  szt: 3.6500, szb: 1.5800, label: 'Strike Looking'},
{ x: -0.1590, y: 1.9290,  szt: 3.5500, szb: 1.6900, label: 'Strike Looking'},
{ x: 0.5120, y: 2.2810,  szt: 3.5800, szb: 1.5800, label: 'Strike Looking'},
{ x: -0.0710, y: 1.6540,  szt: 3.4700, szb: 1.7000, label: 'Strike Looking'},
{ x: -0.9110, y: 2.6870,  szt: 3.4500, szb: 1.6300, label: 'Strike Looking'},
        ];
        
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
            /*
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
            */
        });
    });