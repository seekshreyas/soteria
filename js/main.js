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

	var renderFeed = function(alldata){
		console.log("No of hacks: ", alldata.length);

		alldata.forEach(function(data, index){

			if (index < 100){
				console.log("Data: ", data, index);

				// <div class="element-feed external" data-category="external">
	   //              <p class="country">US</p>
	   //              <p class="state">CA</p>
	   //              <p class="victim_id">United States Department of Veterans Affairs</p>
	   //              <p class="employee_count">5000</p>
	   				// <p class="revenue_amount">5000</p>
	   //              <p class="discovery_daycount">10</p>
	   //              <p class="incident_year">2012</p>
	   //            </div>

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

				attackElem += '<div class="element-feed external" data-category="external">';
				attackElem += '<p class="country">US</p>';
				attackElem += '<p class="state">CA</p>';
				attackElem += '<p class="victim_id">United States Department of Veterans Affairs</p>';
				attackElem += '<p class="employee_count">5000</p>';
				attackElem += '<p class="revenue_amount">5000</p>';
				attackElem += '<p class="discovery_daycount">10</p>';
				attackElem += '<p class="incident_year">2012</p>';
				attackElem += '</div>';


				jQuery('.feed').append(attackElem);
			}
			



		});

	
	};


	var getAttackVector = function(d){

		// if d['']

		return 0;
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
	SOTERIA.init();
});