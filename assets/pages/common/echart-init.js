var echart = function (id, option) {
    this.id = document.getElementById(id);
    this.option = option;
    this.init();
};
echart.prototype.init = function () {
    var that = this;
    require.config({
        paths: {
            echarts: '../assets/global/plugins/echarts'
        }
    });
    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/chord',
            'echarts/chart/eventRiver',
            'echarts/chart/force',
            'echarts/chart/funnel',
            'echarts/chart/gauge',
            'echarts/chart/heatmap',
            'echarts/chart/k',
            'echarts/chart/line',
            'echarts/chart/map',
            'echarts/chart/pie',
            'echarts/chart/radar',
            'echarts/chart/scatter',
            'echarts/chart/tree',
            'echarts/chart/treemap',
            'echarts/chart/venn',
            'echarts/chart/wordCloud'
        ],
        function (ec) {
            var chart = ec.init(that.id);
            var option = that.option;
            chart.setOption(option);
        });
};
