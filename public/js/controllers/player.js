materialAdmin
    .controller('playerCtrl', function($scope, $timeout, $location, playerService) {
        var self = this;
        self.player = [];
        self.activeTab = 'stats';
        self.currentCareerSort = 'season';
        
        playerService.getPlayer($location.path().substr(9,999)).success(function(data){
            self.player = data;
            var options = {
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
                    axisLabel: "Framing Percentage",
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
            
            var raw = self.player.catcherframingscorebymonth;
            var chartdata = [];
            for(r in raw){
                chartdata[r] = [gd(raw[r]['y'],raw[r]['m'],1),raw[r]['score']];
            }
            var dataset = [{label: "Framing Percentage", data:chartdata}];
            $timeout(function(){
                $.plot($("#line-chart-catcher-framing-by-month"), dataset, options);
                $("#line-chart-catcher-framing-by-month").UseTooltip();
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
                "<strong>" + item.series.label + "</strong><br>" + monthNames[month] + " : <strong>" + y + "</strong>(%)");
                
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