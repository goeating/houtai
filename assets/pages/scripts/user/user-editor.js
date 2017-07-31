$(function () {
    var form = $('#form');
    form.validate({
        errorElement: 'span', //默认输入错误消息容器
        errorClass: 'help-block help-block-error font-red col-md-offset-2 col-md-10', // 默认输入错误消息class
        focusInvalid: false, // 不要集中最后一个无效输入。
        ignore: "",  // 验证所有字段，包括表单隐藏输入
        //自定义提示
        // messages: {
        //     name: {
        //         maxlength: jQuery.validator.format("最多 {0} 个字符"),
        //         required: "必填"
        //     }
        // },
        rules: {
            // 规则	                描述
            // required:true	    必须输入的字段。
            // remote:"check.php"	使用 ajax 方法调用 check.php 验证输入值。
            // email:true	        必须输入正确格式的电子邮件。
            // url:true	            必须输入正确格式的网址。
            // date:true	        必须输入正确格式的日期。日期校验 ie6 出错，慎用。
            // dateISO:true	        必须输入正确格式的日期（ISO），例如：2009-06-23，1998/01/22。只验证格式，不验证有效性。
            // number:true	        必须输入合法的数字（负数，小数）。
            // digits:true	        必须输入整数。
            // creditcard:	        必须输入合法的信用卡号。
            // equalTo:"#field"	    输入值必须和 #field 相同。
            // accept:	            输入拥有合法后缀名的字符串（上传文件的后缀）。
            // maxlength:5	        输入长度最多是 5 的字符串（汉字算一个字符）。
            // minlength:10	        输入长度最小是 10 的字符串（汉字算一个字符）。
            // rangelength:[5,10]	输入长度必须介于 5 和 10 之间的字符串（汉字算一个字符）。
            // range:[5,10]	        输入值必须介于 5 和 10 之间。
            // max:5	            输入值不能大于 5。
            // min:10	            输入值不能小于 10。
            username: {
                required: true,
                maxlength: 31
            },
            nickname: {
                maxlength: 31
            },
            password: {
                required: true,
                maxlength: 32
            },
            passwords: {
                required: true,
                equalTo: "#password"
            },
            bankPassword: {
                maxlength: 32
            },
            bankPasswords: {
                equalTo: "#bankPassword"
            },
            autograph: {
                maxlength: 63
            }
        },
        //在表单提交时有错误时滚动到表单顶部
        invalidHandler: function (event, validator) {
            App.scrollTo(form, -200);
        },
        // 自定义错位位置
        errorPlacement: function (error, element) {
            var cont = $(element).parent();
            if (cont) {
                cont.after(error);
            }
        },

        //验证错误时高亮
        highlight: function (element) {
            $(element).closest('.form-group').addClass('has-error');
        },

        unhighlight: function (element) {
            $(element).closest('.form-group').removeClass('has-error');
        },

        success: function (label) {
            label.closest('.form-group').removeClass('has-error');
        },

        //通过验证后运行的函数，里面要加上表单提交的函数，否则表单不会提交
        submitHandler: function (form) {
            //提交成功后
            viewModel.submitForm();
            swal({
                    title: "添加成功！",
                    type: "success",
                    confirmButtonClass: "btn-success",
                    confirmButtonText: "确定"
                },
                function (isConfirm) {
                    if (isConfirm) {
                        console.log("跳转");
                    }
                });
        }
    });
    var viewModel = {

        submitForm : function(formElement) {
            if (form.valid()) {
                // 验证执行
                console.log(formElement);
            }
        }
    };
});