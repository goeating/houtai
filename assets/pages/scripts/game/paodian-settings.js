$(function () {
    $('.date-picker').datepicker({
        rtl: App.isRTL(),
        autoclose: true,
        language: 'zh-CN'
    });
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
                "url": "./paodian-settings.json" // ajax source
            },
            "order": [],// 表格在初始化的时候的排序
            "columnDefs": [
                {
                    "orderable": false,
                    "targets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
                },
                {
                    "targets": 0,
                    "render": function (data, type, full, meta) {
                        return '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input type="checkbox" class="checkboxes" value="' + data + '" /><span></span></label>';
                    }
                },
                {
                    "targets": [9, 10],
                    "render": function (data, type, full, meta) {
                        return function () {
                            switch (data) {
                                case 0:
                                    return '<span class="label label-sm label-danger"> 关闭 </span>';
                                    break;
                                case 1:
                                    return '<span class="label label-sm label-success"> 启用 </span>';
                                    break;
                            }
                        };
                    }
                },
                {
                    "targets": 11,
                    "data": null,
                    "render": function (data, type, full, meta) {
                        return moment(data).format('YYYY-MM-DD HH:mm:ss');
                    }
                },
                {
                    "targets": 12,
                    "data": null,
                    "render": function (data, type, full, meta) {
                        return '<a class="btn btn-sm green btn-outline updata" href="./paodian-settings-editor.html"> 更新 </a>';
                    }
                }
            ],
            "columns": [
                {"data": "id"},
                {"data": "roomName"},
                {"data": "presentObject"},
                {"data": "gameUnitValue"},
                {"data": "gameUnitTime"},
                {"data": "gameStartTime"},
                {"data": "onlineUnitValue"},
                {"data": "onlineUnitTime"},
                {"data": "onlineStartTime"},
                {"data": "gameState"},
                {"data": "onlineState"},
                {"data": "collectionTime"}
            ]
        }
    });
    //删除
    grid.getTableWrapper().on('click', '.delete', function (e) {
        e.preventDefault();
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