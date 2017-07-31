$(function () {
    var option = {
        tooltip: {},
        legend: {
            data: ['人数']
        },
        xAxis: {
            data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天']
        },
        yAxis: {},
        series: [{
            name: '人数',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20, 33]
        }]
    };
    var player = new echart('echarts', option);
});