$(function(){
    //全选
    $('.all').on('click',function () {
        if(this.checked){
            $(this).parents('.form-section').next().find('input[type=checkbox]').prop('checked',true);
        }else{
            $(this).parents('.form-section').next().find('input[type=checkbox]').prop('checked',false);
        }
    });
});