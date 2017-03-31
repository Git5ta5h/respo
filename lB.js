       //functions for hovering over arrows. 

        var arrowLeftHovered = function()
        {
            document.getElementById("arrowLeft").src="img/arrowLeft2.png";
        };

        var arrowRightHovered = function()
        {
            document.getElementById("arrowRight").src="img/arrowRight2.png";
        };

        var arrowLeftNormal = function()
        {
            document.getElementById("arrowLeft").src="img/arrowLeft.png";
        };

        var arrowRightNormal = function()
        {
            document.getElementById("arrowRight").src="img/arrowRight.png";
        };
    

        var addImage = function(image)
        {   
            if(".jpg" == image.substring(image.length-4, image.length) || ".jpeg" == image.substring(image.length-5, image.length) || ".png" == image.substring(image.length-4, image.length))
            {
                image="<img src1='img/" + image + "' alt='04'></img>";
                images.push(image);
                localStorage.setItem("imgArr", images);
            }
        };

           var removeImage = function(image)
        {   
            if(".jpg" == image.substring(image.length-4, image.length) || ".jpeg" == image.substring(image.length-5, image.length) || ".png" == image.substring(image.length-4, image.length))
            {
                image="<img src1='img/" + image + "' alt='04'></img>";
                var index = images.indexOf(image);
                if (index > -1) {
                    images.splice(index, 1);
                }
                localStorage.setItem("imgArr", images);
            }
        };

        images =  [
        "<img src1='img/bth01.jpg' alt='01'></img>",
        "<img src1='img/bth02.jpg' alt='02'></img>",
        "<img src1='img/bth03.jpg' alt='03'></img>",
        "<img src1='img/bth04.jpg' alt='04'></img>"
        ];

        orgArr = images;

        ( function ($){

        $.fn.lB = function(options){
        
        var  nrImgs = images.length;
        var  currentImg = 0;
        var  zIndex = parseInt($("#active").css("z-index"));

        retrievedArr = localStorage.getItem("imgArr");
        imgArr2 = retrievedArr.split(",")

         if(typeof imgArr2 == "object")
        {
        images = imgArr2; 
        }
        else
        {
            images = orgArr;
        }
        
        

        var  currentZIndex = zIndex;
        var  updateCurrent = 0;
        var  intervalId = null;
        var initImg = function(){
        var idCount = 0;
        currentZIndex += images.length;

        images.forEach(function(entry){
            $("#active").append("</span><img src='' alt='picture'/>");
            $("#active img").last()
            .attr({
                "src": $(entry).attr("src1")
            })
            .css("z-index", currentZIndex--)
            .addClass("hide");
            $("#active img").first().attr("id", "show");
          
            $(".thumbnail").append("<img src='' alt='picture'/>");
            $(".thumbnail img").last()
            .attr({
                "src": $(entry).attr("src1"),
            });
        });
        current = $(".thumbnail img").first().attr("id", "activeThumbnail");
    };


       
        var cycleImages = function(updateCurrent){
            
            $("#active img")
                .eq(updateCurrent)
                .fadeOut(0, function(){
                    $(this)
                    .css("z-index", zIndex)
                    .fadeIn(0)
                    .siblings().each(function(){
                        $(this).css("z-index", ((parseInt($(this).css("z-index")) - zIndex + 1) % nrImgs + zIndex));
                    });
                })
              
                .css("z-index", zIndex + 10)
                .attr("id", "show");

          
            $(".thumbnail img")
                .eq(updateCurrent)
                .removeAttr("id", "activeThumbnail");
            $(".thumbnail img")
                .eq(updateCurrent)
                .attr("id", "activeThumbnail");

        };

    

     

        if (options === "initGallery") {

            $(".gallery").prepend("<div id='active'><span class='verticalMidAligner'></div>");

            $(".gallery").prepend("<div class='navigation navLeft'><span class='verticalMidAligner'></span><img src='img/arrowLeft.png' id='arrowLeft' onmouseover='arrowLeftHovered()' onmouseout='arrowLeftNormal()' alt='left arrow' /></div>");

            $(".gallery").prepend("<div class='navigation navRight'><span class='verticalMidAligner'></span><img src='img/arrowRight.png' id='arrowRight' onmouseover='arrowRightHovered()' onmouseout='arrowRightNormal()' alt='right arrow' /><div>");
            

            $(document.body).append("<div id='lightbox'></div>");

             $(".gallery").append("<div id='addImgDiv'>");  
             $(".gallery").append("<input type='text' name='txt' id='txt' value=''/>");
             $(".gallery").append("<input type='button' id='addBtn' value='add image'/></div>");
             $(".gallery").append("<input type='button' id='removeBtn' value='remove image'/></div>");
             $(".gallery").append("<input type='button' id='resetBtn' value='reset'/></div>");

            addBtn.addEventListener("click", function(){newImageToAdd = txt.value, addImage(newImageToAdd),location.reload()}, false);
            removeBtn.addEventListener("click", function(){imageToRemove = txt.value, removeImage(imageToRemove),location.reload()}, false);
            resetBtn.addEventListener("click", function(){localStorage.setItem("imgArr", orgArr), location.reload()}, false);
           

            initImg();

            $(".thumbnail img").each(function(){
              
                $(this).click(function(){
                    $(current).removeAttr("id", "activeThumbnail");
                    current = this;
                   
                    $("#show").removeAttr("id");
                   
                    updateCurrent = $(".thumbnail img").index(current);
                    cycleImages(updateCurrent);
                });
            });
        };

        $("#lightbox").click(function(){
            $("#lightbox").css({
                "width": "0%",
                "height": "0%",
                "opacity": 0
            });
         
            $("#overlay").remove();
            
            $("body").css("overflow-y", "auto");
        });

        var lightbox = function(){
          
            $("#active").click(function(){
            
                $("body").css("overflow-y", "hidden");
              
                $("#lightbox").css({
                    "opacity": 0.8,
                    "width": "100%",
                    "height": "100%",
                    "z-index": 500 
                });
            
                $(document.body).append("<div id='overlay'><div class='verticalMidAligner'></div></div>");

                $("#overlay").css("z-index", 501);
            
                var toShow = $(current).clone();
             
                $("#overlay").append($(toShow));
            });
        };

      

        lightbox();


        var cycleImg = function(){
            if($(current).next().is("img")){
                $(current).removeAttr("id", "activeThumbnail");
               
                $("#show").removeAttr("id");
              
                current = $(current).next();
                updateCurrent = $(".thumbnail img").index(current);
               
                cycleImages(updateCurrent);

            } else {
                $(current).removeAttr("id", "activeThumbnail");
              
                $("#show").removeAttr("id");
             
                current = $(".thumbnail img").first();
                updateCurrent = $(".thumbnail img").index(current);
             
                cycleImages(updateCurrent);
            };
        };

        var cycleImgRev = function(){
            if($(current).prev().is("img")){
                $(current).removeAttr("id", "activeThumbnail");
             
                $("#show").removeAttr("id");
              
                current = $(current).prev();
                updateCurrent = $(".thumbnail img").index(current);
                
                cycleImages(updateCurrent);
            } else {
                $(current).removeAttr("id", "activeThumbnail");
              
                $("#show").removeAttr("id");
                
                current = $(".thumbnail img").last();
                updateCurrent = $(".thumbnail img").index(current);
                
                cycleImages(updateCurrent);
            };
        };

        var initNavigation = function() {

            $(".navRight").click(function(){
                cycleImg();
            });

            $(".navLeft").click(function(){
                cycleImgRev();
            });
        };
        initNavigation();

    

    };
}(jQuery));
