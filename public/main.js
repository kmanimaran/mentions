var $loaded = 0;
var $values = $(".twitter_count").length*3;
console.log($loaded);
var highest_fb = 0;
var highest_tw = 0;
var highest_su = 0;
$("table tr:not(:first-child)").each(function(e){
	var $tr = $(this);
	$url = $tr.find(".item_url").attr("href");

	//twitter
	$.get("index.php", {get_count_for: $url, service: 'twitter'}, function(data){
		$loaded++;
		$tr.find(".twitter_count").html(data);
		console.log(parseInt(highest_tw)+", "+parseInt(data))
		highest_tw = Math.max(parseInt(highest_tw), parseInt(data));
		apply_opacity();
	});

	//facebook
	$.get("index.php", {get_count_for: $url, service: 'facebook'}, function(data){
		$loaded++;
		$tr.find(".facebook_count").html(data);
		apply_opacity();
	});

	//stumbleupon
	$.get("index.php", {get_count_for: $url, service: 'stumbleupon'}, function(data){
		$loaded++;
		$tr.find(".stumbleupon_count").html(data);
		apply_opacity();
	});
});

function apply_opacity()
{
	var opacity = 1;
	if($loaded >= $values)
	{
		$(".twitter_count").each(function(){
			opacity = $(this).html()/highest_tw*100 + 0.25;
			console.log(opacity);
			$(this).css("opacity", opacity);
		})
	}
}
