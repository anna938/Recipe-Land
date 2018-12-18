const app={};app.applicationKey="5dfd2837e8b388e09dbbbad1a3effaef";app.applicationId="6eeb1d81";app.removalLink="";app.selectedIngredients=[];app.selectedCuisine=[];app.selectedCourse=[];app.start=0;app.ingreientparams="";app.cuisineparams="";app.courseparams="";app.searchRecipes=()=>{$.ajax({url:'http://api.yummly.com/v1/api/recipes?'+app.ingreientparams+"&"+app.cuisineparams+"&"+app.courseparams,method:'GET',dataType:'jsonp',data:{_app_id:app.applicationId,_app_key:app.applicationKey,format:'jsonp',q:app.searchItem,maxResult:20,start:app.start,maxTotalTimeInSeconds:app.prepTime}}).then(function(res){app.start+=20;console.log(res);if(res.matches.length>0){$("#totalResult span").text(`${(res.totalMatchCount).toLocaleString('en')} Recipes`)}
else{$("#totalResult span").text('No Result')}
console.log(res.matches);app.showResult(res.matches)})}
app.showResult=(data)=>{data.forEach(function(results){let newImgSize=results.imageUrlsBySize["90"].replace("s90-c","s320-c-rj-v1-e365");$("#result").append(`<div class="box">
			<a href="http://www.yummly.com/recipe/${results.id}" target="_blank"><img src="${newImgSize}" width=300px height=300px/>
			<h2>${results.recipeName}</h2>
			<div class="resultTime"><p>⏱ ${results.totalTimeInSeconds/60} min</p></div></a></div>`)})}
app.addIngredient=(item)=>{$("#result").empty();app.start=0;app.selectedIngredients.push(item);app.removalLink="<i class='fa fa-times-circle'></i>";$(".filterOptions").append(`<span class="filterItem"><a href='#' id='removeIngredient'>${item} ${app.removalLink}</a></span>`);app.convertIngredientArrayToParam()}
app.addTime=(prepTime)=>{$("#result").empty();app.start=0;if($(".filterOptions").find('#removeTime').length)
{($(".filterOptions").find('#removeTime').parent()).remove()}
console.log(prepTime);app.removalLink="<i class='fa fa-times-circle'></i>";$(".filterOptions").append(`<span class="filterItem"><a href='#' id='removeTime'>>${prepTime/60} min ${app.removalLink}</a></span>`)}
app.addCuisine=(cuisineItem)=>{$("#result").empty();app.start=0;app.selectedCuisine.push(cuisineItem);console.log(app.selectedCuisine);app.removalCuisineLink="<i class='fa fa-times-circle'></i>";$(".filterOptions").append(`<span class="filterItem"><a href='#' id='removeCuisine'>${cuisineItem.substr(16)} ${app.removalCuisineLink}</a></span>`);app.convertCuisineArrayToParam()}
app.addCourse=(courseItem)=>{$("#result").empty();app.start=0;app.selectedCourse.push(courseItem);console.log("course:"+app.selectedCourse);app.removalCourseLink="<i class='fa fa-times-circle'></i>";$(".filterOptions").append(`<span class="filterItem"><a href='#' id='removeCourse'>${courseItem.substr(14)} ${app.removalCourseLink}</a></span>`);app.convertCourseArrayToParam()}
app.convertIngredientArrayToParam=()=>{app.ingreientparams=decodeURIComponent(jQuery.param({'allowedIngredient[]':app.selectedIngredients},!0))}
app.convertCuisineArrayToParam=()=>{app.cuisineparams=decodeURIComponent(jQuery.param({'allowedCuisine[]':app.selectedCuisine},!0))}
app.convertCourseArrayToParam=()=>{app.courseparams=decodeURIComponent(jQuery.param({'allowedCourse[]':app.selectedCourse},!0))}
app.removeIngredient=()=>{app.removeIngredientItem.remove();const items=$.trim(app.removeIngredientItem.text());app.selectedIngredients=app.selectedIngredients.filter(item=>item!==items)
app.convertIngredientArrayToParam();app.start=0;$("#result").empty();console.log(app.searchItem)}
app.removeCuisine=()=>{app.removeCuisineItem.remove();const itemCuisine="cuisine^cuisine-"+$.trim(app.removeCuisineItem.text());app.selectedCuisine=app.selectedCuisine.filter(item2=>item2!==itemCuisine)
app.convertCuisineArrayToParam();app.start=0;$("#result").empty()}
app.removeCourse=()=>{app.removeCourseItem.remove();const itemCourse="course^course-"+$.trim(app.removeCourseItem.text());app.selectedCourse=app.selectedCourse.filter(item2=>item2!==itemCourse)
app.convertCourseArrayToParam();app.start=0;$("#result").empty()}
app.removeTime=()=>{app.removeTimesItem.remove();app.start=0;$("#result").empty();app.prepTime=""}
app.init=()=>{$("#src").on('click',function(e){e.preventDefault();app.start=0;$("#result").empty();app.searchItem=$("#searchText").val();$(".showMore").show();app.searchRecipes()});$("#searchText").on('click',function(){$(this).val("")});$("#searchIngedients").on('click',function(){$(this).val("")});$("#showFilterSection").on('click',function(){$("#containerFilterRecipe").toggle()})
$("#filterIngredient").on('click',function(){$(".active").removeClass("active");$(".containerSearhIngreients").addClass('active')})
$("#srcIngredient").on("click",function(e){e.preventDefault();app.searchIngedients=$('#searchIngedients').val();$('#searchIngedients').val("");app.addIngredient(app.searchIngedients);app.searchRecipes()})
$("#filterTime").on('click',function(){$(".active").removeClass("active");$(".containerTime").addClass('active')})
$(".btnTime").on('click',function(){app.prepTime=($(this).find('.timeValue')).data('value');app.addTime(app.prepTime);app.searchRecipes()})
$("#filterCuisines").on('click',function(){$(".active").removeClass("active");$(".containerCuisine").addClass('active')})
$(".containerCuisine span").on("click",function(){app.cusineSelect=$(this).data('value');console.log(app.cusineSelect);app.addCuisine(app.cusineSelect);app.searchRecipes()})
$("#filterCourse").on('click',function(){$(".active").removeClass("active");$(".containerCourse").addClass('active')})
$(".containerCourse span").on("click",function(){app.courseSelect=$(this).data('value');console.log(app.courseSelect);app.addCourse(app.courseSelect);app.searchRecipes()})
$(".filterOptions").on('click','#removeIngredient',function(){app.removeIngredientItem=$(this).parent();app.removeIngredient();app.searchRecipes()})
$(".filterOptions").on("click","#removeCuisine",function(){app.removeCuisineItem=$(this).parent();app.removeCuisine();app.searchRecipes()})
$('.filterOptions').on('click','#removeCourse',function(){app.removeCourseItem=$(this).parent();app.removeCourse();app.searchRecipes()})
$('.filterOptions').on('click','#removeTime',function(){app.removeTimesItem=$(this).parent();app.removeTime();app.searchRecipes()})
$(".showMore button").on('click',function(){app.searchRecipes()});$(window).scroll(function(){if($(document).height()<=$(window).scrollTop()+$(window).height()){app.searchRecipes()}})}
$(function(){app.searchRecipes();app.init()})