var FEED = FEED || {};

FEED = (function($){

	var alldatalength = 0;

	var init = function(){
		console.log("page initiated");
		var datapath = '/static/data/badcomments.json';


		// initDataLoad(datapath);

		evtHandler();
	};



	//first method
	var initDataLoad = function(path){

		$.getJSON( path, function( data ) {
		  	renderFeed(data);
		  	initIsotope();
		});
	};




	//event handler
	var evtHandler = function(){
		jQuery('input[type|=radio]').click(function(){
			console.log(jQuery(this).val());

			var btnval = jQuery(this).val();
			var path = '/static/data/' + btnval + '.json';

			initDataLoad(path);

		});
	};

	var renderFeed = function(alldata){
		console.log("No of tweets: ", alldata.statuses.length);

		alldatalength = alldata.statuses.length

		jQuery('.feed').html('');
		jQuery('.progress .bar').css({
			'width' : '0'
		});


		alldata.statuses.forEach(function(data, index){
			// check data
			// console.log("interesting data points: ", data.entities, data.favorite_count);

			var feedInfo = {
				index		: index,
				hashtags 	: getHashTags(data.entities.hashtags),
				author 		: data.user.name,
				favcount 	: data.favorite_count,
				retcount 	: data.retweet_count,
				feedTxt 	: data.text,
				feedSent 	: getFeedSentiment(data.text, index)
			};
			
			console.log("Text: ", feedInfo.feedTxt, "feedHashTags: ", feedInfo.hashtags, "Names: ", feedInfo.author, "Favs: ", feedInfo.favcount, "Retweets: ", feedInfo.retcount);

			//<div id="feed-1" class="element-feed neutral" data-category="neutral">
          	//   <p class="tags">#tag1 #tag2</p>
          	//   <p class="text">lorem ipsum dolor sit amet. A general neutral comment</p>
          	//   <p class="author">@seekshreyas</p>
          	//   <p class="sentiment">&#9205;</p>
          	//   <p class="retweet">2</p>
          	//   <p class="favorite">2</p>
          	// </div>

          	var feedElem = '';

          	var size = (feedInfo.hashtags.length <= 2) ? 'width1' : 'width2';

          	feedElem +=	'<div id="feed-' + index + '" class="element-feed neutral '+ size + '" data-category="neutral">';
          	feedElem += '<p class="tags">' + feedInfo.hashtags.toString() + '</p>';
          	feedElem += '<p class="text">' + feedInfo.feedTxt + '</p>';
          	feedElem += '<p class="sentiment">&#9205;</p>';
          	feedElem += '<p class="author">'+ feedInfo.author + '</p>';
          	feedElem += '<p class="retweet">' + feedInfo.retcount + '</p>';
          	feedElem += '<p class="favorite">' + feedInfo.favcount + '</p>';
          	feedElem += '</div>';

          	jQuery('.feed').append(feedElem);


		});
	};



	var getFeedSentiment = function(txt, id){

		jQuery.ajax({
			url : 'sentiment',
			type : 'POST',
			data : {
				text : txt
			}
		})
		.done(function(sent){
			console.log("Sentiment: ", sent);

			elem = jQuery('#feed-' + id); //selector caching for faster lookup

			switch(sent[0]){

				case 'pos':
					//positive sentiment
					elem.children('.sentiment').html('&#58543;');
					elem.removeClass('neutral').addClass('positive');
					elem.attr('data-category', 'positive');

					elem.css({
						'background-color' : 'rgba(0, 240, 0,' + sent[1] + ')'
					});

					break;

				case 'neg':
					//positive sentiment
					elem.children('.sentiment').html('&#11015;');
					elem.removeClass('neutral').addClass('negative');
					elem.attr('data-category', 'negative');

					elem.css({
						'background-color' : 'rgba(240, 0, 0,' + sent[1] + ')'
					});

					break;

				default:
					console.log("no sentiment");

			}

			jQuery('.progress .bar').animate({
				'width' : String(Math.round((id + 1)/alldatalength * 100)) + '%'
			}, 200);
			
		});
	}


	var getHashTags = function(hEntities){
		var tags = [];

		hEntities.forEach(function(t){
			tags.push(t.text);
		});

		return tags; 
	};




	// referred from: 
	// Isotope Documentation page
	// url: http://isotope.metafizzy.co/filtering.html

	var initIsotope = function(){
		var $container = $('.feed');
		// init
		

		var $container = $('.feed').isotope({
			itemSelector: '.element-feed',
		    layoutMode: 'masonry'
		});
		  
		// filter functions
		var filterFns = {
		    // show if number is greater than 50
		    numberGreaterThan50: function() {
		    	var number = $(this).find('.number').text();
		    	return parseInt( number, 10 ) > 50;
		    },
		    // show if name ends with -ium
		    ium: function() {
		    	var name = $(this).find('.name').text();
		    	return name.match( /ium$/ );
		    }
		};
		  
		// bind filter button click
		$('#filters').on( 'click', 'button', function() {
		    var filterValue = $( this ).attr('data-filter');
		    // use filterFn if matches value
		    filterValue = filterFns[ filterValue ] || filterValue;
		    $container.isotope({ filter: filterValue });
		});
		  
		// change is-checked class on buttons
		$('.button-group').each( function( i, buttonGroup ) {
		    var $buttonGroup = $( buttonGroup );
		    
		    $buttonGroup.on( 'click', 'button', function() {
		    	$buttonGroup.find('.is-checked').removeClass('is-checked');
		    	$( this ).addClass('is-checked');
		    });
		});
		  

	};

	return {
		'init' : init
	}

})(jQuery);

jQuery(document).ready(function(){
	FEED.init();
});