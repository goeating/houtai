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
                "url": "./management-server.json" // ajax source
            },
            "order": [],// 表格在初始化的时候的排序
            "columnDefs": [
                {
                    "orderable": false,
                    "targets": [0, 1, 2, 3, 4, 5]
                },
                {
                    "targets": 0,
                    "render": function (data, type, full, meta) {
                        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                    }
                },
                {
                    "targets": 5,
                    "data": null,
                    "render": function (data, type, full, meta) {
                        return '<a class="btn btn-sm green btn-outline delete" href="./management-server-editor.html"> 更新 </a>';
                    }
                }
            ],
            "columns": [
                {"data": "id"},
                {"data": "serverName"},
                {"data": "address"},
                {"data": "port"},
                {"data": "machineCode"}
            ]
        }
    });

//        grid.setAjaxParam("customActionType", "group_action");
//        grid.getDataTable().ajax.reload();
//        grid.clearAjaxParams();
});