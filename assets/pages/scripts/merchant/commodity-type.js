$(function () {
    $('#table').bootstrapTable({
        url: "./tree.json",//子级ParentId对应父级id对应，子级Level=父级Level+1
        treeView: true, // 启用树表格模式
        treeId: "id",   // 每一行tree的id
        treeField: "productType",  // 要对那一列进行展开
        treeRootLevel: 1,   // 树根的级别
        collapseIcon: "fa fa-caret-right",//折叠样式
        expandIcon: "fa fa-caret-down",//展开样式
        striped: true, // 隔行变色效果
        columns: [
            {
                field: "productType",
                title: "产品类型"
            },
            {
                field: "productCode",
                title: "产品编码"
            },
            {
                field: "sort",
                title: "排序"
            },
            {
                field: "note",
                title: "备注信息"
            },
            {
                field: "",
                title: "操作",
                events: "actionEvents",
                formatter: function (value, row, index) {
                    return '<a class="btn btn-sm green btn-outline" href="./commodity-type-editor.html">修改</a><a class="btn btn-sm green btn-outline delete" href="javascript:;">删除</a><a class="btn btn-sm green btn-outline" href="./commodity-type-editor.html">添加下级产品类型维护</a>';
                }
            }]
    });
    window.actionEvents = {
        'click .delete': function (e, value, row, index) {
            // alert('You click edit icon, row: ' + JSON.stringify(row));
            // console.log(value, row, index);
            e.preventDefault();
            swal({
                    title: "确定要删除吗 ?",
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
                            type: "error",
                            confirmButtonClass: "btn-info",
                            confirmButtonText: "确定"
                        });
                    }
                });
        }
    };
});