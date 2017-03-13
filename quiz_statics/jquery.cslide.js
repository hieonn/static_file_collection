function scoreRadioCheck(){

	questions = $(".cslide-slide").length;
	sum = 0;

	for (i=0; i<questions-2; i++) {  // -2 means removing start and last page
		radioname = "chk_info_slide"+i;
		score = $('input[name='+radioname+']:checked').val();
		if (score=="") score=0;
		sum += parseInt(score);
	}

	return sum;
 }


function buildShare() {
		var fburl = encodeURI("https://www.facebook.com/sharer.php");
		var title = encodeURI("장난해? 흐앙");
		var summary = encodeURI("장난하지마...");
		//var url = encodeURI("http://handsomeus.com/tst/vonvon/");
		//var url = "http%3A%2F%2Fhandsomeus.com%2Ftst%2Fvonvon%2F";
		var url = encodeURIComponent("http://awesomepost.us");
		var image = encodeURIComponent("http://i.imgur.com/Hlf0tjH.jpg");
		//var image = "http%3A%2F%2Fi.imgur.com%2FSYMxjud.png";
		var uri = fburl+'?s=100&p[title]='+title+'&p[summary]='+summary+'&p[url]='+url+'&p[images][0]='+image;

		$('meta[name="description"]').attr("content", "설명설명");
		$('meta[property="og:url"]').attr("content", $(location).attr('href'));
		$('meta[property="og:title"]').attr("content", '타이틀');
		$('meta[property="og:description"]').attr("content", "설명설명");
		$('meta[property="og:image"]').attr("content", "http://i.imgur.com/Hlf0tjH.jpg");

		return uri;
}

function startTest() {
	 $("#startLoadingSpinner").css("display","none");
	 $("#startButton").css("display","");
}

function showresult() {
	 
	 var userscore = scoreRadioCheck();
	 var score_table = JSON.parse($('#test-data').attr('data-unicorns'));
	 var userLevel = 0;

	 for (var i = 0; i < score_table.scoredata.length; i++) {
		 if (parseInt(score_table.scoredata[i])>=userscore) {
			 userLevel = i;	
			 break;
		 } 
		 if (parseInt(score_table.scoredata.length-1)==i) {
			 	userLevel = score_table.scoredata.length-1;
		 }
	}
	 //alert(userscore+"/"+userLevel);

   $('#answer'+userLevel).css('display','');
   $('.cslide-slide.cslide-last.cslide-active').replaceWith($('#answer'+userLevel)); 
   $('#answer'+userLevel).addClass('cslide-slide cslide-last cslide-active');
	 $('#answer'+userLevel).css('width',slideWidthForLastPage);

	 $('.cslide-slide.cslide-last.cslide-active').append($('#buttonsection'));
	 $('#buttonsection').css('display','');

	 $('#fbsharebutton').removeAttr('onclick');
	 //var parameter = score_table.resultImages[userLevel]+','+score_table.caption[userLevel]+','+score_table.description[userLevel];
	 var parameter = score_table.resultImages[userLevel]+',어썸포스트(awesomepost.us),'+score_table.description[userLevel];
	 $('#fbsharebutton').attr('onClick', 'sharefbimage(\"'+parameter+'")');
	 //$('#fbsharebutton').attr('onClick', 'window.open(\''+buildShare()+'\', \'sharer\', \'toolbar=0,status=0,width=550,height=400\')');


	 //$('#fbsharebutton').attr('onClick', 'sharefbimage(); return false;');
	 

	 // og title, og image 를 수정해야 함

}

(function($) {

    $.fn.cslide = function() {

        this.each(function() {

            var slidesContainerId = "#"+($(this).attr("id"));
            
            var len = $(slidesContainerId+" .cslide-slide").size();     // get number of slides
            var slidesContainerWidth = len*100+"%";                     // get width of the slide container
            var slideWidth = (100/len)+"%";                             // get width of the slides
						slideWidthForLastPage = slideWidth;
            
            // set slide container width
            $(slidesContainerId+" .cslide-slides-container").css({
                width : slidesContainerWidth,
                visibility : "visible"
            });

            // set slide width
            $(".cslide-slide").css({
                width : slideWidth
            });

            // add correct classes to first and last slide
            $(slidesContainerId+" .cslide-slides-container .cslide-slide").last().addClass("cslide-last");
            $(slidesContainerId+" .cslide-slides-container .cslide-slide").first().addClass("cslide-first cslide-active");

            // initially disable the previous arrow cuz we start on the first slide
            $(slidesContainerId+" .cslide-prev").addClass("cslide-disabled");

            // if first slide is last slide, hide the prev-next navigation
            if (!$(slidesContainerId+" .cslide-slide.cslide-active.cslide-first").hasClass("cslide-last")) {           
                $(slidesContainerId+" .cslide-prev-next").css({
                    display : "block"
                });
            }

            if ($(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) {
							setTimeout(startTest, 2000);
						}

            // handle the next clicking functionality
            $(slidesContainerId+" .cslide-next").click(function(){
                var i = $(slidesContainerId+" .cslide-slide.cslide-active").index();
                var n = i+1;
                var slideLeft = "-"+n*100+"%";
                if (!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-last")) {
                    $(slidesContainerId+" .cslide-slide.cslide-active").removeClass("cslide-active").next(".cslide-slide").addClass("cslide-active");
                    $(slidesContainerId+" .cslide-slides-container").animate({
                        marginLeft : slideLeft
                    },250);
                    if ($(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-last")) {
                        $(slidesContainerId+" .cslide-next").addClass("cslide-disabled");
                        setTimeout(showresult, 10000);
                    }
                }
                if ((!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) && $(".cslide-prev").hasClass("cslide-disabled")) {
                    $(slidesContainerId+" .cslide-prev").removeClass("cslide-disabled");
                }
            });

            // handle the prev clicking functionality
            $(slidesContainerId+" .cslide-prev").click(function(){
                var i = $(slidesContainerId+" .cslide-slide.cslide-active").index();
                var n = i-1;
                var slideRight = "-"+n*100+"%";
                if (!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) {
                    $(slidesContainerId+" .cslide-slide.cslide-active").removeClass("cslide-active").prev(".cslide-slide").addClass("cslide-active");
                    $(slidesContainerId+" .cslide-slides-container").animate({
                        marginLeft : slideRight
                    },250);
                    if ($(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-first")) {
                        $(slidesContainerId+" .cslide-prev").addClass("cslide-disabled");
                    }
                }
                if ((!$(slidesContainerId+" .cslide-slide.cslide-active").hasClass("cslide-last")) && $(".cslide-next").hasClass("cslide-disabled")) {
                    $(slidesContainerId+" .cslide-next").removeClass("cslide-disabled");
                }
            });



        });

        // return this for chainability
        return this;

    }

}(jQuery));
