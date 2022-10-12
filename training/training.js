$(".screferralShow").on("click",function(){

    $(".referralTraining").css("display","block")
    $(".screferralShow").css("display","none")
    $(".screferralClose").css("display","block")
    $(".des").css("display","none")

});

$(".screferralClose").on("click",function(){

    $(".referralTraining").css("display","none")
    $(".screferralShow").css("display","block")
    $(".screferralClose").css("display","none")
    $(".des").css("display","block")

});
