$("ul").on("click", "li", function(){
    
    
    
    $(this).toggleClass("completed");
    // if($(this).css("color") === "rgb(128, 128, 128)")
    // {
    //     $(this).css({
    //         color: "black",
    //         textDecoration: "none"
    //     })
    // }else
    // {
    //     $(this).css({
    //         color: "gray",
    //         textDecoration: "line-through"
    //     })
    // }
});

$("ul").on("click", "span", function(e)
{
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });
    e.stopPropagation();
});


$("input[type='text']").keypress(function(e){
        
        if(e.which === 13)
        {
                var inputContent = $(this).val();
                $(this).val("");
                $("ul").append("<li><span><i class='fas fa-trash'></i></span> " + inputContent + "</li>");
        }
});

$(".fa-plus-square").click(function(){

    
    $("input[type='text']").fadeToggle();

});