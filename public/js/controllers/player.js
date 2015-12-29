materialAdmin
    .controller('playerCtrl', function($scope, $timeout, $location, playerService) {
        var self = this;
        self.player = [];
        self.activeTab = 'stats';
        self.currentCareerSort = 'season';
        self.activeTab = '';
        
        self.flotOptions = {
            series: {
                lines: {
                    show: true
                },
                points: {
                    radius: 3,
                    fill: true,
                    show: true
                }
            },
            xaxis: {
                mode: "time",
                tickSize: [1, "month"],
                tickLength: 0,
                axisLabel: "Year",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 10
            },
            yaxis: {
                position: "right",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 3
            },
            legend: {
                noColumns: 0,
                labelBoxBorderColor: "#000000",
                position: "nw"
            },
            grid: {
                hoverable: true,
                borderWidth: 2,
                borderColor: "#633200",
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] }
            }
        };
        
        playerService.getPlayer($location.path().substr(9,999)).success(function(data){
            self.player = data;
            
            playerService.getPlayerCatcherFraming($location.path().substr(9,999)).success(function(data){
                self.player.catcherframingscorebymonth = data;
                self.activeTab = 'catcherframing';
                
                var framing = self.player.catcherframingscorebymonth;
                var framedata = [];
                for(r in framing){
                    framedata[r] = [gd(framing[r]['y'],framing[r]['m'],1),framing[r]['score']];
                }
                var dataset1 = [{label: "Framing Percentage", data:framedata}];
                
                $timeout(function(){
                    if ($("#line-chart-catcher-framing-by-month")){
                        self.flotOptions.yaxis.axisLabel = "Framing Percentage";
                        $.plot($("#line-chart-catcher-framing-by-month"), dataset1, self.flotOptions);
                        $("#line-chart-catcher-framing-by-month").UseTooltip();
                    }
                });
            });
            
            playerService.getPlayerVelocityDiff($location.path().substr(9,999)).success(function(data){
                self.player.velocitydiffbymonth = data;
                if (self.activeTab == '' && self.player.velocitydiffbymonth.length > 0) {
                    self.activeTab = 'velocitydiff';
                }
                
                var velodiff = self.player.velocitydiffbymonth;
                var velodiffdata = [];
                for (r in velodiff){
                    velodiffdata[r] = [gd(velodiff[r]['y'],velodiff[r]['m'],1),velodiff[r]['diff']];
                }
                var dataset2 = [{label: "Velocity Difference", data:velodiffdata}];
                
                $timeout(function(){
                    if ($("#line-chart-velocity-difference-by-month")){
                        self.flotOptions.yaxis.axisLabel = "Velocity Difference from Fastball to Changeup";
                        $.plot($("#line-chart-velocity-difference-by-month"), dataset2, self.flotOptions);
                        $("#line-chart-velocity-difference-by-month").UseTooltip();
                    }
                });
            });
            
            playerService.getPlayerBattedBallDistance($location.path().substr(9,999)).success(function(data){
                self.player.battedballdistancebymonth = data;
                if (self.activeTab == '' && self.player.battedballdistancebymonth.length > 0) {
                    self.activeTab = 'battedballdistance';
                }
                
                var balldist = self.player.battedballdistancebymonth;
                var balldistdata = [];
                for (r in balldist){
                    balldistdata[r] = [gd(balldist[r]['y'],balldist[r]['m'],1),balldist[r]['dist']];
                }
                var dataset3 = [{label: "Batted Ball Distance", data:balldistdata}];
                
                $timeout(function(){
                    if ($("#line-chart-batted-ball-distance-by-month")){
                        self.flotOptions.yaxis.axisLabel = "Batted Ball Distance";
                        $.plot($("#line-chart-batted-ball-distance-by-month"), dataset3, self.flotOptions);
                        $("#line-chart-batted-ball-distance-by-month").UseTooltip();
                    }
                });
            });
        });
        
        
        self.changeCareerSort = function(c){
            self.currentCareerSort = c;
        }
    });

function gd(year, month, day) {
    return new Date(year, month, day).getTime();
}
var previousPoint = null, previousLabel = null;
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
$.fn.UseTooltip = function () {
    $(this).bind("plothover", function (event, pos, item) {
        if (item) {
            if ((previousLabel != item.series.label) || (previousPoint != item.dataIndex)) {
                previousPoint = item.dataIndex;
                previousLabel = item.series.label;
                $("#tooltip").remove();

                var x = item.datapoint[0];
                var y = item.datapoint[1];

                var color = item.series.color;
                var month = new Date(x).getMonth();

                //console.log(item);

                showTooltip(item.pageX,
                item.pageY,
                color,
                "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(" + $(this).attr('units') + ")");
                
            }
        } else {
            $("#tooltip").remove();
            previousPoint = null;
        }
    });
};
function showTooltip(x, y, color, contents) {
    $('<div id="tooltip">' + contents + '</div>').css({
        position: 'absolute',
        display: 'none',
        top: y - 40,
        left: x - 120,
        border: '2px solid ' + color,
        padding: '3px',
        'font-size': '9px',
        'border-radius': '5px',
        'background-color': '#fff',
        'font-family': 'Verdana, Arial, Helvetica, Tahoma, sans-serif',
        opacity: 0.9
    }).appendTo("body").fadeIn(200);
}