var SOTERIA = SOTERIA || {};

SOTERIA = (function($){

	var alldatalength = 0;

	var init = function(){
		console.log("page initiated");

		var datapath = 'data/vcdb_isotope.json';

		initDataLoad(datapath);

		// evtHandler();
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
		console.log("event handler");
	};

	function trim (str) {
    	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	}

	var renderFeed = function(alldata){
		console.log("No of hacks: ", alldata.length);

		alldata.forEach(function(data, index){

			if (index < 200){
				console.log("Data: ", data, index);


				var attackInfo = {
					attType		: data['actor.external'] == '1' ? 'external' : 'internal',
					attVector	: getAttackVector(data),
					attCountry 	: data['victim.country'],
					attState 	: data['victim.state'],
					attVictim 	: data['victim.victim_id'],
					attEmpCount : data['victim.employee_count'],
					attAmount 	: data['revenue.amount'],
					attDayCount : data['timeline.discovery.day_count'],
					attYear 	: data['timeline.incident.year']
				};


				var attackElem = '';
				var attacks = trim(attackInfo.attVector).split(' ');

				var attWidth = 'width' + attacks.length;

				attackElem += '<div class="element-feed ' + attWidth + ' ' + attackInfo.attType + ' '+ trim(attackInfo.attVector) + '" data-category="'+ trim(attackInfo.attVector) + '">';
				attackElem += '<p class="country">' + attackInfo.attCountry + '</p>';
				attackElem += '<p class="state">' + attackInfo.attState + '</p>';
				attackElem += '<p class="victim_id">' + attackInfo.attVictim + '</p>';
				attackElem += '<p class="employee_count">' + attackInfo.attEmpCount + '</p>';
				attackElem += '<p class="revenue_amount">' + attackInfo.attAmount + '</p>';
				attackElem += '<p class="discovery_daycount">' + attackInfo.attDayCount + '</p>';
				attackElem += '<p class="incident_year">' + attackInfo.attYear + '</p>';
				attackElem += '</div>';


				jQuery('.feed').append(attackElem);
			}
			



		});

	
	};


	var getAttackVector = function(d){

		var attClass = '';
		if (d['action.environmental'] === 1)	{	attClass += 'environmental '; 	} 	//if environmental is true
		if (d['action.error'] === 1)			{	attClass += 'error '; 			} 	//if error is true
		if (d['action.hacking'] === 1)			{	attClass += 'hacking '; 		} 	//if hacking is true
		if (d['action.malware'] === 1)			{	attClass += 'malware '; 		} 	//if malware is true
		if (d['action.misuse'] === 1)			{	attClass += 'misuse '; 			} 	//if misuse is true
		if (d['action.physical'] === 1)			{	attClass += 'physical '; 		} 	//if physical is true
		if (d['action.social'] === 1)			{	attClass += 'social '; 			} 	//if social is true
		if (d['action.unknown'] === 1)			{	attClass += 'unknown '; 		} 	//if unknown is true


		return attClass;
	}
	


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
		    discoveryDurationGreaterThan: function() {
		    	var number = $(this).find('.discovery_daycount').text();


		    	if (parseInt(number, 10)){
		    		return parseInt( number, 10 ) > 100;
		    	}else{
		    		console.log("number: ", parseInt(number, 10))
		    	}
		    		
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
	SOTERIA.init();
});