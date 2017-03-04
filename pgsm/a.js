var map, heatmap;

function initialize() {

	// Adding Data Points from csv file
	var geoData = [];
	var rawFile = new XMLHttpRequest();
	rawFile.open("GET", "members.geo.csv", true);
	rawFile.onreadystatechange = function () {
	if (rawFile.readyState === 4) {
		if (rawFile.status === 200 || rawFile.status == 0) {
			var allText = rawFile.responseText;
			var allTextLines = allText.split(/\r\n|\n/);
			for (var i = 0; i < allTextLines.length; i++) {
				var data = allTextLines[i].split(',');
				geoData.push(new google.maps.LatLng(data[0],data[1]));
				}
			}
		}
	}
	rawFile.send();
	var pointArray = new google.maps.MVCArray(geoData);

	var mapOptions = {
		zoom: 11,
		center: new google.maps.LatLng(42.3314,-83.0458),
		mapTypeId: google.maps.MapTypeId.SATELLITE
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	heatmap = new google.maps.visualization.HeatmapLayer({
		data: pointArray
	});

	heatmap.setMap(map);
}

function toggleHeatmap() {
	heatmap.setMap(heatmap.getMap() ? null : map);
}

function changeGradient() {
	var gradient = [
		'rgba(0, 255, 255, 0)',
		'rgba(0, 255, 255, 1)',
		'rgba(0, 191, 255, 1)',
		'rgba(0, 127, 255, 1)',
		'rgba(0, 63, 255, 1)',
		'rgba(0, 0, 255, 1)',
		'rgba(0, 0, 223, 1)',
		'rgba(0, 0, 191, 1)',
		'rgba(0, 0, 159, 1)',
		'rgba(0, 0, 127, 1)',
		'rgba(63, 0, 91, 1)',
		'rgba(127, 0, 63, 1)',
		'rgba(191, 0, 31, 1)',
		'rgba(255, 0, 0, 1)'
	]
	heatmap.set('gradient', heatmap.get('gradient') ? null : gradient);
}

function changeRadius() {
	heatmap.set('radius', heatmap.get('radius') ? null : 20);
}

function changeOpacity() {
	heatmap.set('opacity', heatmap.get('opacity') ? null : 0.2);
}

google.maps.event.addDomListener(window, 'load', initialize);
