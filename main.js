$(function() {
	// 무비차트 div clone 만드는 함수 선언
	function template(movieCd, rank, movieNm) {
		let $element = $("#chart_template").clone().removeAttr("id");
		
		$element.attr("data-rank", rank);
		$element.find(".movie_img").attr("src", "../image/" + movieCd + ".jpg");
		$element.find(".movie_info").attr("href", "movie" + movieCd + ".html");
		$element.find(".movie_rank").html(rank);
		$element.find(".movie_title").html(movieNm);
		
		$("#movie_chart").append($element);
	}
	
	// 일별 박스오피스 리스트에서 영화 코드, 영화 순위, 영화 제목 가져옴
	$.ajax({
		url : "../ajax/searchDailyBoxOfficeList.xml",
		type : "get",
		dataType : "xml",
		cache: false,
		timeout: 30000,
		success: function(xml) {
			$(xml).find("dailyBoxOffice").each(function() {
				let rank = $(this).find("rank").text();
				let movieCd = $(this).find("movieCd").text();
				let movieNm = $(this).find("movieNm").text();
				template(movieCd, rank, movieNm);
			});
		},
		error: function(xhr, textStatus, errorThrown) {
			console.log(textStatus + " (HTTP-" + xhr.status + " / " + errorThrown + ")");
		}
	});
	
	// 메뉴바에 마우스오버 시 서브메뉴 나타남 
	$("#nav_sub").hide();
	$("nav").hover(function() {
		$(this).parent().find("#nav_sub").slideDown();
		$(this).parent().hover(function() {
			//서브가 slideDown된 상태를 유지하게 함
		}, function() {
			$(this).parent().find("#nav_sub").slideUp();
		});
	}); //hover 함수 종료
	
	// 예매 클릭 시 알림창 띄우기
	$(".reservation").click(function() {
		alert("예매하시려면 로그인이 필요합니다.");
	});
});