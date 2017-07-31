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
                "url": "./commodity-exchange.json" // ajax source
            },
            "order": [
                [1, 'asc']
            ],// 表格在初始化的时候的排序
            "columnDefs": [
                {
                    "targets": 0,
                    "orderable": false
                },
                {
                    "targets": [12, 13],
                    "render": function (data, type, full, meta) {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                }
            ],
            "columns": [
                {"data": "uid"},
                {"data": "superiorId"},
                {"data": "commodityType"},
                {"data": "commodityId"},
                {"data": "tradeName"},
                {"data": "number"},
                {"data": "pice"},
                {"data": "paymentType"},
                {"data": "payment"},
                {"data": "order"},
                {"data": "additionalPaymentType"},
                {"data": "additionalPaymentAmount"},
                {"data": "orderGenerationTime"},
                {"data": "orderPaymentCompletionTime"},
                {"data": "personalGoods"},
                {"data": "paymentStatus"},
                {"data": "orderGenerationType"},
                {"data": "distributionStatus"},
                {"data": "orderStatus"},
                {"data": "orderDescription"},
                {"data": "extract"}
            ]
        }
    });

    //删除
    grid.getTableWrapper().on('click', '.delete', function (e) {
        e.preventDefault();
//            if (confirm("确定要删除吗 ?") == false) {
//                return;
//            }
        swal({
                title: "确定要删除吗 ?",
                text: "你确定吗？你确定吗？你确定吗？重要的事情说三遍！",
                type: "warning",
                allowOutsideClick: false,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                cancelButtonClass: "btn-default",
                closeOnConfirm: false,
                closeOnCancel: false,
                confirmButtonText: "确定",
                cancelButtonText: "取消"
            },
            function (isConfirm) {
                if (isConfirm) {
                    swal({
                        title: "删除成功",
                        text: "成功！成功！成功！重要的事情说三遍！",
                        type: "success",
                        confirmButtonClass: "btn-success",
                        confirmButtonText: "确定"
                    }, function (confirm) {
                        if (confirm) {
                            console.log('111');
                        }
                    });

                } else {
                    swal({
                        title: "删除取消",
                        text: "取消！取消！取消！重要的事情说三遍！",
                        type: "error",
                        confirmButtonClass: "btn-info",
                        confirmButtonText: "确定"
                    });
                }
            });
    });


    // 批量操作
    grid.getTableWrapper().on('click', '.table-group-action-submit', function (e) {
        e.preventDefault();
        var action = $(".table-group-action-input", grid.getTableWrapper());
        if (action.val() !== "" && grid.getSelectedRowsCount() > 0) {
            grid.setAjaxParam("customActionType", "group_action");
            grid.setAjaxParam("customActionName", action.val());
            grid.setAjaxParam("id", grid.getSelectedRows());
            grid.getDataTable().ajax.reload();
            grid.clearAjaxParams();
        } else if (action.val() === "") {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: '请选择操作类型',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        } else if (grid.getSelectedRowsCount() === 0) {
            App.alert({
                type: 'danger',
                icon: 'warning',
                message: '没有选择记录',
                container: grid.getTableWrapper(),
                place: 'prepend'
            });
        }
    });
//        grid.setAjaxParam("customActionType", "group_action");
//        grid.getDataTable().ajax.reload();
//        grid.clearAjaxParams();
});