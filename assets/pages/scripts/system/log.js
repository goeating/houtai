$(function () {
    var grid = new Datatable();
    grid.init({
        src: $("#table"),
        onSuccess: function (grid, response) {
            // grid:        grid object
            // response:    json object of server side ajax response
            // execute some code after table records loaded
        },
        onError: function (grid) {
            // execute some code on network or other general error
        },
        onDataLoad: function (grid) {
            // execute some code on ajax data load
        },
        loadingMessage: 'Loading...',
        dataTable: {
            "dom": "<'row'<'col-md-8 col-sm-12'l><'col-md-12 col-sm-12'<'table-group-actions pull-right'>>r>t<'row'<'col-md-8 col-sm-12'i><'col-md-4 col-sm-12 text-right'p>>",
            "pagingType": "bootstrap_full_number",
            "bStateSave": true, // save datatable state(pagination, sort, etc) in cookie.
            "searching": false,// 是否允许Datatables开启本地搜索
            "orderCellsTop": false,// 控制表头(colspan rowspan 表头)的哪一个单元格可以应用于该列的排序响应
            "deferRender": true,// 控制Datatables的延迟渲染，可以提高初始化的速度
            "lengthChange": false,// 是否允许用户改变表格每页显示的记录数
            "pageLength": 10, // 	改变初始化页长度（每页多少条数据）
            "ajax": {
                "url": "./log.json" // ajax source
            },
            "order": [],// 表格在初始化的时候的排序
            "columnDefs": [
                {
                    "orderable": false,
                    "targets": [0, 1, 2, 3, 4]
                },
                {
                    "targets": 1,
                    "data": null,
                    "render": function (data, type, full, meta) {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
            ],
            "columns": [
                {"data": "identification"},
                {"data": "operationTime"},
                {"data": "operationAccount"},
                {"data": "operation"},
                {"data": "operationIp"}
            ]
        }
    });

//        grid.setAjaxParam("customActionType", "group_action");
//        grid.getDataTable().ajax.reload();
//        grid.clearAjaxParams();
});