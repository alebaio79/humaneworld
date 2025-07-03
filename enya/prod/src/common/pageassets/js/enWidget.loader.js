(function(){
	if(!document.getElementById('enWidgetJs')){
		var $script = document.querySelector('script[src$="enWidget.loader.js"]');

		if($script){
			
			var basepath = $script.src;
			var paths = {
				'/ea-demo/frontend/pbAssets/src/js/lib/enWidget/enWidget.loader.js': function(url, path){
					return url.replace(path, '/pageassets/js/')
				},
				'/pageassets/js/enWidget.loader.js': function(url, path){
					return url.replace('/enWidget.loader.js', '/')
				},
				'/pageassets/src/js/lib/enWidget/enWidget.loader.js': function(url, path){
					return url.replace(path, '/dist/pageassets/js/')
				}
			};
			
			Object.keys(paths).forEach(function(path){
				if(basepath.indexOf(path) !== -1){
					basepath = paths[path](basepath, path)
				}
			})

			
			var head = document.getElementsByTagName('head')[0];
			var js = document.createElement("script");
				js.type = 'text/javascript';
				var file;
				if(window.EngagingNetworks && window.EngagingNetworks.require && window.EngagingNetworks.define){
					file = 'enWidget';
				}else{
					file = 'enWidget.external';
				}

				js.src = basepath + file + '.js';
				js.id = 'enWidgetJs';
				head.appendChild(js);
		}
	}
})();