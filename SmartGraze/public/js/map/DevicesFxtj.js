<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Action Controller: Exception caught</title>
  <style>
    body {
      background-color: #FAFAFA;
      color: #333;
      margin: 0px;
    }

    body, p, ol, ul, td {
      font-family: helvetica, verdana, arial, sans-serif;
      font-size:   13px;
      line-height: 18px;
    }

    pre {
      font-size: 11px;
      white-space: pre-wrap;
    }

    pre.box {
      border: 1px solid #EEE;
      padding: 10px;
      margin: 0px;
      width: 958px;
    }

    header {
      color: #F0F0F0;
      background: #C52F24;
      padding: 0.5em 1.5em;
    }

    h1 {
      margin: 0.2em 0;
      line-height: 1.1em;
      font-size: 2em;
    }

    h2 {
      color: #C52F24;
      line-height: 25px;
    }

    .details {
      border: 1px solid #D0D0D0;
      border-radius: 4px;
      margin: 1em 0px;
      display: block;
      width: 978px;
    }

    .summary {
      padding: 8px 15px;
      border-bottom: 1px solid #D0D0D0;
      display: block;
    }

    .details pre {
      margin: 5px;
      border: none;
    }

    #container {
      box-sizing: border-box;
      width: 100%;
      padding: 0 1.5em;
    }

    .source * {
      margin: 0px;
      padding: 0px;
    }

    .source {
      border: 1px solid #D9D9D9;
      background: #ECECEC;
      width: 978px;
    }

    .source pre {
      padding: 10px 0px;
      border: none;
    }

    .source .data {
      font-size: 80%;
      overflow: auto;
      background-color: #FFF;
    }

    .info {
      padding: 0.5em;
    }

    .source .data .line_numbers {
      background-color: #ECECEC;
      color: #AAA;
      padding: 1em .5em;
      border-right: 1px solid #DDD;
      text-align: right;
    }

    .line {
      padding-left: 10px;
    }

    .line:hover {
      background-color: #F6F6F6;
    }

    .line.active {
      background-color: #FFCCCC;
    }

    .hidden {
      display: none;
    }

    a { color: #980905; }
    a:visited { color: #666; }
    a.trace-frames { color: #666; }
    a:hover { color: #C52F24; }
    a.trace-frames.selected { color: #C52F24 }

      #route_table {
    margin: 0;
    border-collapse: collapse;
  }

  #route_table thead tr {
    border-bottom: 2px solid #ddd;
  }

  #route_table thead tr.bottom {
    border-bottom: none;
  }

  #route_table thead tr.bottom th {
    padding: 10px 0;
    line-height: 15px;
  }

  #route_table tbody tr {
    border-bottom: 1px solid #ddd;
  }

  #route_table tbody tr:nth-child(odd) {
    background: #f2f2f2;
  }

  #route_table tbody.exact_matches,
  #route_table tbody.fuzzy_matches {
    background-color: LightGoldenRodYellow;
    border-bottom: solid 2px SlateGrey;
  }

  #route_table tbody.exact_matches tr,
  #route_table tbody.fuzzy_matches tr {
    background: none;
    border-bottom: none;
  }

  #route_table td {
    padding: 4px 30px;
  }

  #path_search {
    width: 80%;
    font-size: inherit;
  }

  </style>

  <script>
    var toggle = function(id) {
      var s = document.getElementById(id).style;
      s.display = s.display == 'none' ? 'block' : 'none';
      return false;
    }
    var show = function(id) {
      document.getElementById(id).style.display = 'block';
    }
    var hide = function(id) {
      document.getElementById(id).style.display = 'none';
    }
    var toggleTrace = function() {
      return toggle('blame_trace');
    }
    var toggleSessionDump = function() {
      return toggle('session_dump');
    }
    var toggleEnvDump = function() {
      return toggle('env_dump');
    }
  </script>
</head>
<body>

<header>
  <h1>Routing Error</h1>
</header>
<div id="container">
  <h2>No route matches [GET] &quot;/js/map/DevicesFxtj.js&quot;</h2>

  
<p><code>Rails.root: /home/smartwifi/SmartGraze</code></p>

<div id="traces">
    <a href="#" onclick="hide(&#39;Framework-Trace&#39;);hide(&#39;Full-Trace&#39;);show(&#39;Application-Trace&#39;);; return false;">Application Trace</a> |
    <a href="#" onclick="hide(&#39;Application-Trace&#39;);hide(&#39;Full-Trace&#39;);show(&#39;Framework-Trace&#39;);; return false;">Framework Trace</a> |
    <a href="#" onclick="hide(&#39;Application-Trace&#39;);hide(&#39;Framework-Trace&#39;);show(&#39;Full-Trace&#39;);; return false;">Full Trace</a> 

    <div id="Application-Trace" style="display: block;">
      <pre><code></code></pre>
    </div>
    <div id="Framework-Trace" style="display: none;">
      <pre><code><a class="trace-frames" data-frame-id="0" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/debug_exceptions.rb:21:in `call&#39;</a><br><a class="trace-frames" data-frame-id="1" href="#">web-console (2.3.0) lib/web_console/middleware.rb:20:in `block in call&#39;</a><br><a class="trace-frames" data-frame-id="2" href="#">web-console (2.3.0) lib/web_console/middleware.rb:18:in `catch&#39;</a><br><a class="trace-frames" data-frame-id="3" href="#">web-console (2.3.0) lib/web_console/middleware.rb:18:in `call&#39;</a><br><a class="trace-frames" data-frame-id="4" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/show_exceptions.rb:30:in `call&#39;</a><br><a class="trace-frames" data-frame-id="5" href="#">railties (4.2.2) lib/rails/rack/logger.rb:38:in `call_app&#39;</a><br><a class="trace-frames" data-frame-id="6" href="#">railties (4.2.2) lib/rails/rack/logger.rb:20:in `block in call&#39;</a><br><a class="trace-frames" data-frame-id="7" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:68:in `block in tagged&#39;</a><br><a class="trace-frames" data-frame-id="8" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:26:in `tagged&#39;</a><br><a class="trace-frames" data-frame-id="9" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:68:in `tagged&#39;</a><br><a class="trace-frames" data-frame-id="10" href="#">railties (4.2.2) lib/rails/rack/logger.rb:20:in `call&#39;</a><br><a class="trace-frames" data-frame-id="11" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/request_id.rb:21:in `call&#39;</a><br><a class="trace-frames" data-frame-id="12" href="#">rack (1.6.4) lib/rack/methodoverride.rb:22:in `call&#39;</a><br><a class="trace-frames" data-frame-id="13" href="#">rack (1.6.4) lib/rack/runtime.rb:18:in `call&#39;</a><br><a class="trace-frames" data-frame-id="14" href="#">activesupport (4.2.2) lib/active_support/cache/strategy/local_cache_middleware.rb:28:in `call&#39;</a><br><a class="trace-frames" data-frame-id="15" href="#">rack (1.6.4) lib/rack/lock.rb:17:in `call&#39;</a><br><a class="trace-frames" data-frame-id="16" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/static.rb:113:in `call&#39;</a><br><a class="trace-frames" data-frame-id="17" href="#">rack (1.6.4) lib/rack/sendfile.rb:113:in `call&#39;</a><br><a class="trace-frames" data-frame-id="18" href="#">railties (4.2.2) lib/rails/engine.rb:518:in `call&#39;</a><br><a class="trace-frames" data-frame-id="19" href="#">railties (4.2.2) lib/rails/application.rb:164:in `call&#39;</a><br><a class="trace-frames" data-frame-id="20" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:562:in `process_client&#39;</a><br><a class="trace-frames" data-frame-id="21" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:658:in `worker_loop&#39;</a><br><a class="trace-frames" data-frame-id="22" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:508:in `spawn_missing_workers&#39;</a><br><a class="trace-frames" data-frame-id="23" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:132:in `start&#39;</a><br><a class="trace-frames" data-frame-id="24" href="#">unicorn (5.1.0) bin/unicorn_rails:209:in `&lt;top (required)&gt;&#39;</a><br><a class="trace-frames" data-frame-id="25" href="#">/home/smartwifi/.rvm/gems/ruby-2.1.8/bin/unicorn_rails:23:in `load&#39;</a><br><a class="trace-frames" data-frame-id="26" href="#">/home/smartwifi/.rvm/gems/ruby-2.1.8/bin/unicorn_rails:23:in `&lt;main&gt;&#39;</a><br></code></pre>
    </div>
    <div id="Full-Trace" style="display: none;">
      <pre><code><a class="trace-frames" data-frame-id="0" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/debug_exceptions.rb:21:in `call&#39;</a><br><a class="trace-frames" data-frame-id="1" href="#">web-console (2.3.0) lib/web_console/middleware.rb:20:in `block in call&#39;</a><br><a class="trace-frames" data-frame-id="2" href="#">web-console (2.3.0) lib/web_console/middleware.rb:18:in `catch&#39;</a><br><a class="trace-frames" data-frame-id="3" href="#">web-console (2.3.0) lib/web_console/middleware.rb:18:in `call&#39;</a><br><a class="trace-frames" data-frame-id="4" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/show_exceptions.rb:30:in `call&#39;</a><br><a class="trace-frames" data-frame-id="5" href="#">railties (4.2.2) lib/rails/rack/logger.rb:38:in `call_app&#39;</a><br><a class="trace-frames" data-frame-id="6" href="#">railties (4.2.2) lib/rails/rack/logger.rb:20:in `block in call&#39;</a><br><a class="trace-frames" data-frame-id="7" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:68:in `block in tagged&#39;</a><br><a class="trace-frames" data-frame-id="8" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:26:in `tagged&#39;</a><br><a class="trace-frames" data-frame-id="9" href="#">activesupport (4.2.2) lib/active_support/tagged_logging.rb:68:in `tagged&#39;</a><br><a class="trace-frames" data-frame-id="10" href="#">railties (4.2.2) lib/rails/rack/logger.rb:20:in `call&#39;</a><br><a class="trace-frames" data-frame-id="11" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/request_id.rb:21:in `call&#39;</a><br><a class="trace-frames" data-frame-id="12" href="#">rack (1.6.4) lib/rack/methodoverride.rb:22:in `call&#39;</a><br><a class="trace-frames" data-frame-id="13" href="#">rack (1.6.4) lib/rack/runtime.rb:18:in `call&#39;</a><br><a class="trace-frames" data-frame-id="14" href="#">activesupport (4.2.2) lib/active_support/cache/strategy/local_cache_middleware.rb:28:in `call&#39;</a><br><a class="trace-frames" data-frame-id="15" href="#">rack (1.6.4) lib/rack/lock.rb:17:in `call&#39;</a><br><a class="trace-frames" data-frame-id="16" href="#">actionpack (4.2.2) lib/action_dispatch/middleware/static.rb:113:in `call&#39;</a><br><a class="trace-frames" data-frame-id="17" href="#">rack (1.6.4) lib/rack/sendfile.rb:113:in `call&#39;</a><br><a class="trace-frames" data-frame-id="18" href="#">railties (4.2.2) lib/rails/engine.rb:518:in `call&#39;</a><br><a class="trace-frames" data-frame-id="19" href="#">railties (4.2.2) lib/rails/application.rb:164:in `call&#39;</a><br><a class="trace-frames" data-frame-id="20" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:562:in `process_client&#39;</a><br><a class="trace-frames" data-frame-id="21" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:658:in `worker_loop&#39;</a><br><a class="trace-frames" data-frame-id="22" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:508:in `spawn_missing_workers&#39;</a><br><a class="trace-frames" data-frame-id="23" href="#">unicorn (5.1.0) lib/unicorn/http_server.rb:132:in `start&#39;</a><br><a class="trace-frames" data-frame-id="24" href="#">unicorn (5.1.0) bin/unicorn_rails:209:in `&lt;top (required)&gt;&#39;</a><br><a class="trace-frames" data-frame-id="25" href="#">/home/smartwifi/.rvm/gems/ruby-2.1.8/bin/unicorn_rails:23:in `load&#39;</a><br><a class="trace-frames" data-frame-id="26" href="#">/home/smartwifi/.rvm/gems/ruby-2.1.8/bin/unicorn_rails:23:in `&lt;main&gt;&#39;</a><br></code></pre>
    </div>

  <script type="text/javascript">
    var traceFrames = document.getElementsByClassName('trace-frames');
    var selectedFrame, currentSource = document.getElementById('frame-source-0');

    // Add click listeners for all stack frames
    for (var i = 0; i < traceFrames.length; i++) {
      traceFrames[i].addEventListener('click', function(e) {
        e.preventDefault();
        var target = e.target;
        var frame_id = target.dataset.frameId;

        if (selectedFrame) {
          selectedFrame.className = selectedFrame.className.replace("selected", "");
        }

        target.className += " selected";
        selectedFrame = target;

        // Change the extracted source code
        changeSourceExtract(frame_id);
      });

      function changeSourceExtract(frame_id) {
        var el = document.getElementById('frame-source-' + frame_id);
        if (currentSource && el) {
          currentSource.className += " hidden";
          el.className = el.className.replace(" hidden", "");
          currentSource = el;
        }
      }
    }
  </script>
</div>


    <h2>
      Routes
    </h2>

    <p>
      Routes match in priority from top to bottom
    </p>

    
<table id='route_table' class='route_table'>
  <thead>
    <tr>
      <th>Helper</th>
      <th>HTTP Verb</th>
      <th>Path</th>
      <th>Controller#Action</th>
    </tr>
    <tr class='bottom'>
      <th>
        <a data-route-helper="_path" title="Returns a relative path (without the http or domain)" href="#">Path</a> /
        <a data-route-helper="_url" title="Returns an absolute url (with the http and domain)" href="#">Url</a>
      </th>
      <th>
      </th>
      <th>
        <input id="search" placeholder="Path Match" type="search" name="path[]" />
      </th>
      <th>
      </th>
    </tr>
  </thead>
  <tbody class='exact_matches' id='exact_matches'>
  </tbody>
  <tbody class='fuzzy_matches' id='fuzzy_matches'>
  </tbody>
  <tbody>
    <tr class='route_row' data-helper='path'>
  <td data-route-name='alarmlogs'>
      alarmlogs<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarmlogs(.:format)' data-regexp='^\/alarmlogs(?:\.([^\/.?]+))?$'>
    /alarmlogs(.:format)
  </td>
  <td data-route-reqs='alarmlogs#index'>
    alarmlogs#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/alarmlogs(.:format)' data-regexp='^\/alarmlogs(?:\.([^\/.?]+))?$'>
    /alarmlogs(.:format)
  </td>
  <td data-route-reqs='alarmlogs#create'>
    alarmlogs#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_alarmlog'>
      new_alarmlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarmlogs/new(.:format)' data-regexp='^\/alarmlogs\/new(?:\.([^\/.?]+))?$'>
    /alarmlogs/new(.:format)
  </td>
  <td data-route-reqs='alarmlogs#new'>
    alarmlogs#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_alarmlog'>
      edit_alarmlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarmlogs/:id/edit(.:format)' data-regexp='^\/alarmlogs\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /alarmlogs/:id/edit(.:format)
  </td>
  <td data-route-reqs='alarmlogs#edit'>
    alarmlogs#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarmlog'>
      alarmlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarmlogs/:id(.:format)' data-regexp='^\/alarmlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarmlogs/:id(.:format)
  </td>
  <td data-route-reqs='alarmlogs#show'>
    alarmlogs#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/alarmlogs/:id(.:format)' data-regexp='^\/alarmlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarmlogs/:id(.:format)
  </td>
  <td data-route-reqs='alarmlogs#update'>
    alarmlogs#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/alarmlogs/:id(.:format)' data-regexp='^\/alarmlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarmlogs/:id(.:format)
  </td>
  <td data-route-reqs='alarmlogs#update'>
    alarmlogs#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/alarmlogs/:id(.:format)' data-regexp='^\/alarmlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarmlogs/:id(.:format)
  </td>
  <td data-route-reqs='alarmlogs#destroy'>
    alarmlogs#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devicetofences'>
      devicetofences<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devicetofences(.:format)' data-regexp='^\/devicetofences(?:\.([^\/.?]+))?$'>
    /devicetofences(.:format)
  </td>
  <td data-route-reqs='devicetofences#index'>
    devicetofences#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/devicetofences(.:format)' data-regexp='^\/devicetofences(?:\.([^\/.?]+))?$'>
    /devicetofences(.:format)
  </td>
  <td data-route-reqs='devicetofences#create'>
    devicetofences#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_devicetofence'>
      new_devicetofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devicetofences/new(.:format)' data-regexp='^\/devicetofences\/new(?:\.([^\/.?]+))?$'>
    /devicetofences/new(.:format)
  </td>
  <td data-route-reqs='devicetofences#new'>
    devicetofences#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_devicetofence'>
      edit_devicetofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devicetofences/:id/edit(.:format)' data-regexp='^\/devicetofences\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /devicetofences/:id/edit(.:format)
  </td>
  <td data-route-reqs='devicetofences#edit'>
    devicetofences#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devicetofence'>
      devicetofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devicetofences/:id(.:format)' data-regexp='^\/devicetofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devicetofences/:id(.:format)
  </td>
  <td data-route-reqs='devicetofences#show'>
    devicetofences#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/devicetofences/:id(.:format)' data-regexp='^\/devicetofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devicetofences/:id(.:format)
  </td>
  <td data-route-reqs='devicetofences#update'>
    devicetofences#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/devicetofences/:id(.:format)' data-regexp='^\/devicetofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devicetofences/:id(.:format)
  </td>
  <td data-route-reqs='devicetofences#update'>
    devicetofences#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/devicetofences/:id(.:format)' data-regexp='^\/devicetofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devicetofences/:id(.:format)
  </td>
  <td data-route-reqs='devicetofences#destroy'>
    devicetofences#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='geofences'>
      geofences<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/geofences(.:format)' data-regexp='^\/geofences(?:\.([^\/.?]+))?$'>
    /geofences(.:format)
  </td>
  <td data-route-reqs='geofences#index'>
    geofences#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/geofences(.:format)' data-regexp='^\/geofences(?:\.([^\/.?]+))?$'>
    /geofences(.:format)
  </td>
  <td data-route-reqs='geofences#create'>
    geofences#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_geofence'>
      new_geofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/geofences/new(.:format)' data-regexp='^\/geofences\/new(?:\.([^\/.?]+))?$'>
    /geofences/new(.:format)
  </td>
  <td data-route-reqs='geofences#new'>
    geofences#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_geofence'>
      edit_geofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/geofences/:id/edit(.:format)' data-regexp='^\/geofences\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /geofences/:id/edit(.:format)
  </td>
  <td data-route-reqs='geofences#edit'>
    geofences#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='geofence'>
      geofence<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/geofences/:id(.:format)' data-regexp='^\/geofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /geofences/:id(.:format)
  </td>
  <td data-route-reqs='geofences#show'>
    geofences#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/geofences/:id(.:format)' data-regexp='^\/geofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /geofences/:id(.:format)
  </td>
  <td data-route-reqs='geofences#update'>
    geofences#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/geofences/:id(.:format)' data-regexp='^\/geofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /geofences/:id(.:format)
  </td>
  <td data-route-reqs='geofences#update'>
    geofences#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/geofences/:id(.:format)' data-regexp='^\/geofences\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /geofences/:id(.:format)
  </td>
  <td data-route-reqs='geofences#destroy'>
    geofences#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='zones'>
      zones<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/zones(.:format)' data-regexp='^\/zones(?:\.([^\/.?]+))?$'>
    /zones(.:format)
  </td>
  <td data-route-reqs='zones#index'>
    zones#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/zones(.:format)' data-regexp='^\/zones(?:\.([^\/.?]+))?$'>
    /zones(.:format)
  </td>
  <td data-route-reqs='zones#create'>
    zones#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_zone'>
      new_zone<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/zones/new(.:format)' data-regexp='^\/zones\/new(?:\.([^\/.?]+))?$'>
    /zones/new(.:format)
  </td>
  <td data-route-reqs='zones#new'>
    zones#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_zone'>
      edit_zone<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/zones/:id/edit(.:format)' data-regexp='^\/zones\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /zones/:id/edit(.:format)
  </td>
  <td data-route-reqs='zones#edit'>
    zones#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='zone'>
      zone<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/zones/:id(.:format)' data-regexp='^\/zones\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /zones/:id(.:format)
  </td>
  <td data-route-reqs='zones#show'>
    zones#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/zones/:id(.:format)' data-regexp='^\/zones\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /zones/:id(.:format)
  </td>
  <td data-route-reqs='zones#update'>
    zones#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/zones/:id(.:format)' data-regexp='^\/zones\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /zones/:id(.:format)
  </td>
  <td data-route-reqs='zones#update'>
    zones#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/zones/:id(.:format)' data-regexp='^\/zones\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /zones/:id(.:format)
  </td>
  <td data-route-reqs='zones#destroy'>
    zones#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='schedulers'>
      schedulers<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/schedulers(.:format)' data-regexp='^\/schedulers(?:\.([^\/.?]+))?$'>
    /schedulers(.:format)
  </td>
  <td data-route-reqs='schedulers#index'>
    schedulers#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/schedulers(.:format)' data-regexp='^\/schedulers(?:\.([^\/.?]+))?$'>
    /schedulers(.:format)
  </td>
  <td data-route-reqs='schedulers#create'>
    schedulers#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_scheduler'>
      new_scheduler<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/schedulers/new(.:format)' data-regexp='^\/schedulers\/new(?:\.([^\/.?]+))?$'>
    /schedulers/new(.:format)
  </td>
  <td data-route-reqs='schedulers#new'>
    schedulers#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_scheduler'>
      edit_scheduler<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/schedulers/:id/edit(.:format)' data-regexp='^\/schedulers\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /schedulers/:id/edit(.:format)
  </td>
  <td data-route-reqs='schedulers#edit'>
    schedulers#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='scheduler'>
      scheduler<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/schedulers/:id(.:format)' data-regexp='^\/schedulers\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /schedulers/:id(.:format)
  </td>
  <td data-route-reqs='schedulers#show'>
    schedulers#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/schedulers/:id(.:format)' data-regexp='^\/schedulers\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /schedulers/:id(.:format)
  </td>
  <td data-route-reqs='schedulers#update'>
    schedulers#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/schedulers/:id(.:format)' data-regexp='^\/schedulers\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /schedulers/:id(.:format)
  </td>
  <td data-route-reqs='schedulers#update'>
    schedulers#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/schedulers/:id(.:format)' data-regexp='^\/schedulers\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /schedulers/:id(.:format)
  </td>
  <td data-route-reqs='schedulers#destroy'>
    schedulers#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='getAlarmByDeviceID'>
      getAlarmByDeviceID<span class='helper'>_path</span>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/getAlarmByDeviceID(.:format)' data-regexp='^\/getAlarmByDeviceID(?:\.([^\/.?]+))?$'>
    /getAlarmByDeviceID(.:format)
  </td>
  <td data-route-reqs='alarmlogs#getAlarmByDeviceID'>
    alarmlogs#getAlarmByDeviceID
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='AlarmDetail'>
      AlarmDetail<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/AlarmDetail(.:format)' data-regexp='^\/AlarmDetail(?:\.([^\/.?]+))?$'>
    /AlarmDetail(.:format)
  </td>
  <td data-route-reqs='alarmlogs#AlarmDetail'>
    alarmlogs#AlarmDetail
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='simpleMap'>
      simpleMap<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/simpleMap(.:format)' data-regexp='^\/simpleMap(?:\.([^\/.?]+))?$'>
    /simpleMap(.:format)
  </td>
  <td data-route-reqs='alarmlogs#simpleMap'>
    alarmlogs#simpleMap
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='getPolygonList'>
      getPolygonList<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/getPolygonList(.:format)' data-regexp='^\/getPolygonList(?:\.([^\/.?]+))?$'>
    /getPolygonList(.:format)
  </td>
  <td data-route-reqs='geofences#getPolygonList'>
    geofences#getPolygonList
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/getPolygonList(.:format)' data-regexp='^\/getPolygonList(?:\.([^\/.?]+))?$'>
    /getPolygonList(.:format)
  </td>
  <td data-route-reqs='geofences#getPolygonList'>
    geofences#getPolygonList
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='getPolygonDetail'>
      getPolygonDetail<span class='helper'>_path</span>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/getPolygonDetail(.:format)' data-regexp='^\/getPolygonDetail(?:\.([^\/.?]+))?$'>
    /getPolygonDetail(.:format)
  </td>
  <td data-route-reqs='geofences#getPolygonDetail'>
    geofences#getPolygonDetail
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/geofences(.:format)' data-regexp='^\/geofences(?:\.([^\/.?]+))?$'>
    /geofences(.:format)
  </td>
  <td data-route-reqs='geofences#index'>
    geofences#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='dmaps_layout'>
      dmaps_layout<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmaps/layout(.:format)' data-regexp='^\/dmaps\/layout(?:\.([^\/.?]+))?$'>
    /dmaps/layout(.:format)
  </td>
  <td data-route-reqs='dmaps#layout'>
    dmaps#layout
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='dmaps'>
      dmaps<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmaps(.:format)' data-regexp='^\/dmaps(?:\.([^\/.?]+))?$'>
    /dmaps(.:format)
  </td>
  <td data-route-reqs='dmaps#index'>
    dmaps#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/dmaps(.:format)' data-regexp='^\/dmaps(?:\.([^\/.?]+))?$'>
    /dmaps(.:format)
  </td>
  <td data-route-reqs='dmaps#create'>
    dmaps#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_dmap'>
      new_dmap<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmaps/new(.:format)' data-regexp='^\/dmaps\/new(?:\.([^\/.?]+))?$'>
    /dmaps/new(.:format)
  </td>
  <td data-route-reqs='dmaps#new'>
    dmaps#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_dmap'>
      edit_dmap<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmaps/:id/edit(.:format)' data-regexp='^\/dmaps\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /dmaps/:id/edit(.:format)
  </td>
  <td data-route-reqs='dmaps#edit'>
    dmaps#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='dmap'>
      dmap<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmaps/:id(.:format)' data-regexp='^\/dmaps\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /dmaps/:id(.:format)
  </td>
  <td data-route-reqs='dmaps#show'>
    dmaps#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/dmaps/:id(.:format)' data-regexp='^\/dmaps\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /dmaps/:id(.:format)
  </td>
  <td data-route-reqs='dmaps#update'>
    dmaps#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/dmaps/:id(.:format)' data-regexp='^\/dmaps\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /dmaps/:id(.:format)
  </td>
  <td data-route-reqs='dmaps#update'>
    dmaps#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/dmaps/:id(.:format)' data-regexp='^\/dmaps\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /dmaps/:id(.:format)
  </td>
  <td data-route-reqs='dmaps#destroy'>
    dmaps#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='contacts'>
      contacts<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/contacts(.:format)' data-regexp='^\/contacts(?:\.([^\/.?]+))?$'>
    /contacts(.:format)
  </td>
  <td data-route-reqs='contacts#index'>
    contacts#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/contacts(.:format)' data-regexp='^\/contacts(?:\.([^\/.?]+))?$'>
    /contacts(.:format)
  </td>
  <td data-route-reqs='contacts#create'>
    contacts#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_contact'>
      new_contact<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/contacts/new(.:format)' data-regexp='^\/contacts\/new(?:\.([^\/.?]+))?$'>
    /contacts/new(.:format)
  </td>
  <td data-route-reqs='contacts#new'>
    contacts#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_contact'>
      edit_contact<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/contacts/:id/edit(.:format)' data-regexp='^\/contacts\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /contacts/:id/edit(.:format)
  </td>
  <td data-route-reqs='contacts#edit'>
    contacts#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='contact'>
      contact<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/contacts/:id(.:format)' data-regexp='^\/contacts\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /contacts/:id(.:format)
  </td>
  <td data-route-reqs='contacts#show'>
    contacts#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/contacts/:id(.:format)' data-regexp='^\/contacts\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /contacts/:id(.:format)
  </td>
  <td data-route-reqs='contacts#update'>
    contacts#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/contacts/:id(.:format)' data-regexp='^\/contacts\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /contacts/:id(.:format)
  </td>
  <td data-route-reqs='contacts#update'>
    contacts#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/contacts/:id(.:format)' data-regexp='^\/contacts\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /contacts/:id(.:format)
  </td>
  <td data-route-reqs='contacts#destroy'>
    contacts#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='sensors'>
      sensors<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensors(.:format)' data-regexp='^\/sensors(?:\.([^\/.?]+))?$'>
    /sensors(.:format)
  </td>
  <td data-route-reqs='sensors#index'>
    sensors#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/sensors(.:format)' data-regexp='^\/sensors(?:\.([^\/.?]+))?$'>
    /sensors(.:format)
  </td>
  <td data-route-reqs='sensors#create'>
    sensors#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_sensor'>
      new_sensor<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensors/new(.:format)' data-regexp='^\/sensors\/new(?:\.([^\/.?]+))?$'>
    /sensors/new(.:format)
  </td>
  <td data-route-reqs='sensors#new'>
    sensors#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_sensor'>
      edit_sensor<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensors/:id/edit(.:format)' data-regexp='^\/sensors\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /sensors/:id/edit(.:format)
  </td>
  <td data-route-reqs='sensors#edit'>
    sensors#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='sensor'>
      sensor<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensors/:id(.:format)' data-regexp='^\/sensors\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensors/:id(.:format)
  </td>
  <td data-route-reqs='sensors#show'>
    sensors#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/sensors/:id(.:format)' data-regexp='^\/sensors\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensors/:id(.:format)
  </td>
  <td data-route-reqs='sensors#update'>
    sensors#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/sensors/:id(.:format)' data-regexp='^\/sensors\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensors/:id(.:format)
  </td>
  <td data-route-reqs='sensors#update'>
    sensors#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/sensors/:id(.:format)' data-regexp='^\/sensors\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensors/:id(.:format)
  </td>
  <td data-route-reqs='sensors#destroy'>
    sensors#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarmStatistics'>
      alarmStatistics<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarmStatistics(.:format)' data-regexp='^\/alarmStatistics(?:\.([^\/.?]+))?$'>
    /alarmStatistics(.:format)
  </td>
  <td data-route-reqs='alarms#alarmStatistics'>
    alarms#alarmStatistics
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarms_toAddAlarms'>
      alarms_toAddAlarms<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms/toAddAlarms(.:format)' data-regexp='^\/alarms\/toAddAlarms(?:\.([^\/.?]+))?$'>
    /alarms/toAddAlarms(.:format)
  </td>
  <td data-route-reqs='alarms#toAddAlarms'>
    alarms#toAddAlarms
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarms_toUpdateAlarms'>
      alarms_toUpdateAlarms<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms/toUpdateAlarms(.:format)' data-regexp='^\/alarms\/toUpdateAlarms(?:\.([^\/.?]+))?$'>
    /alarms/toUpdateAlarms(.:format)
  </td>
  <td data-route-reqs='alarms#toUpdateAlarms'>
    alarms#toUpdateAlarms
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarms_querySensorByDeviceId'>
      alarms_querySensorByDeviceId<span class='helper'>_path</span>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/alarms/querySensorByDeviceId(.:format)' data-regexp='^\/alarms\/querySensorByDeviceId(?:\.([^\/.?]+))?$'>
    /alarms/querySensorByDeviceId(.:format)
  </td>
  <td data-route-reqs='alarms#querySensorByDeviceId'>
    alarms#querySensorByDeviceId
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarms_addAlarms'>
      alarms_addAlarms<span class='helper'>_path</span>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/alarms/addAlarms(.:format)' data-regexp='^\/alarms\/addAlarms(?:\.([^\/.?]+))?$'>
    /alarms/addAlarms(.:format)
  </td>
  <td data-route-reqs='alarms#addAlarms'>
    alarms#addAlarms
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='map'>
      map<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/map(.:format)' data-regexp='^\/map(?:\.([^\/.?]+))?$'>
    /map(.:format)
  </td>
  <td data-route-reqs='devices#map'>
    devices#map
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='playback'>
      playback<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/playback(.:format)' data-regexp='^\/playback(?:\.([^\/.?]+))?$'>
    /playback(.:format)
  </td>
  <td data-route-reqs='devices#playback'>
    devices#playback
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='tracking'>
      tracking<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/tracking(.:format)' data-regexp='^\/tracking(?:\.([^\/.?]+))?$'>
    /tracking(.:format)
  </td>
  <td data-route-reqs='devices#tracking'>
    devices#tracking
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='dstatistics'>
      dstatistics<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dstatistics(.:format)' data-regexp='^\/dstatistics(?:\.([^\/.?]+))?$'>
    /dstatistics(.:format)
  </td>
  <td data-route-reqs='devices#dstatistics'>
    devices#dstatistics
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='gettracking'>
      gettracking<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/gettracking(.:format)' data-regexp='^\/gettracking(?:\.([^\/.?]+))?$'>
    /gettracking(.:format)
  </td>
  <td data-route-reqs='devices#gettracking'>
    devices#gettracking
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/dmap(.:format)' data-regexp='^\/dmap(?:\.([^\/.?]+))?$'>
    /dmap(.:format)
  </td>
  <td data-route-reqs='devices#dmap'>
    devices#dmap
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_monitor'>
      devices_monitor<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/monitor(.:format)' data-regexp='^\/devices\/monitor(?:\.([^\/.?]+))?$'>
    /devices/monitor(.:format)
  </td>
  <td data-route-reqs='devices#monitor'>
    devices#monitor
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='monitor'>
      monitor<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/monitor(.:format)' data-regexp='^\/monitor(?:\.([^\/.?]+))?$'>
    /monitor(.:format)
  </td>
  <td data-route-reqs='devices#monitor'>
    devices#monitor
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_layout'>
      devices_layout<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/layout(.:format)' data-regexp='^\/devices\/layout(?:\.([^\/.?]+))?$'>
    /devices/layout(.:format)
  </td>
  <td data-route-reqs='devices#layout'>
    devices#layout
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_explore'>
      devices_explore<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/explore(.:format)' data-regexp='^\/devices\/explore(?:\.([^\/.?]+))?$'>
    /devices/explore(.:format)
  </td>
  <td data-route-reqs='devices#explore'>
    devices#explore
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_queryLineData'>
      devices_queryLineData<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/queryLineData(.:format)' data-regexp='^\/devices\/queryLineData(?:\.([^\/.?]+))?$'>
    /devices/queryLineData(.:format)
  </td>
  <td data-route-reqs='devices#queryLineData'>
    devices#queryLineData
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_alarm'>
      devices_alarm<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/alarm(.:format)' data-regexp='^\/devices\/alarm(?:\.([^\/.?]+))?$'>
    /devices/alarm(.:format)
  </td>
  <td data-route-reqs='devices#alarmsms'>
    devices#alarmsms
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/devices/:id/update(.:format)' data-regexp='^\/devices\/([^\/.?]+)\/update(?:\.([^\/.?]+))?$'>
    /devices/:id/update(.:format)
  </td>
  <td data-route-reqs='devices#update'>
    devices#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices_getDevices'>
      devices_getDevices<span class='helper'>_path</span>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/devices/getDevices(.:format)' data-regexp='^\/devices\/getDevices(?:\.([^\/.?]+))?$'>
    /devices/getDevices(.:format)
  </td>
  <td data-route-reqs='devices#getDevices'>
    devices#getDevices
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='sensorlogs_getData'>
      sensorlogs_getData<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensorlogs/getData(.:format)' data-regexp='^\/sensorlogs\/getData(?:\.([^\/.?]+))?$'>
    /sensorlogs/getData(.:format)
  </td>
  <td data-route-reqs='sensorlogs#getData'>
    sensorlogs#getData
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/sensorlogs/getData(.:format)' data-regexp='^\/sensorlogs\/getData(?:\.([^\/.?]+))?$'>
    /sensorlogs/getData(.:format)
  </td>
  <td data-route-reqs='sensorlogs#getData'>
    sensorlogs#getData
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='devices'>
      devices<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices(.:format)' data-regexp='^\/devices(?:\.([^\/.?]+))?$'>
    /devices(.:format)
  </td>
  <td data-route-reqs='devices#index'>
    devices#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/devices(.:format)' data-regexp='^\/devices(?:\.([^\/.?]+))?$'>
    /devices(.:format)
  </td>
  <td data-route-reqs='devices#create'>
    devices#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_device'>
      new_device<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/new(.:format)' data-regexp='^\/devices\/new(?:\.([^\/.?]+))?$'>
    /devices/new(.:format)
  </td>
  <td data-route-reqs='devices#new'>
    devices#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_device'>
      edit_device<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/:id/edit(.:format)' data-regexp='^\/devices\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /devices/:id/edit(.:format)
  </td>
  <td data-route-reqs='devices#edit'>
    devices#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='device'>
      device<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#show'>
    devices#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#update'>
    devices#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#update'>
    devices#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#destroy'>
    devices#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='projects'>
      projects<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects(.:format)' data-regexp='^\/projects(?:\.([^\/.?]+))?$'>
    /projects(.:format)
  </td>
  <td data-route-reqs='projects#index'>
    projects#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/projects(.:format)' data-regexp='^\/projects(?:\.([^\/.?]+))?$'>
    /projects(.:format)
  </td>
  <td data-route-reqs='projects#create'>
    projects#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_project'>
      new_project<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/new(.:format)' data-regexp='^\/projects\/new(?:\.([^\/.?]+))?$'>
    /projects/new(.:format)
  </td>
  <td data-route-reqs='projects#new'>
    projects#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_project'>
      edit_project<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/:id/edit(.:format)' data-regexp='^\/projects\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /projects/:id/edit(.:format)
  </td>
  <td data-route-reqs='projects#edit'>
    projects#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='project'>
      project<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#show'>
    projects#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#update'>
    projects#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#update'>
    projects#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#destroy'>
    projects#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='sensorlogs'>
      sensorlogs<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensorlogs(.:format)' data-regexp='^\/sensorlogs(?:\.([^\/.?]+))?$'>
    /sensorlogs(.:format)
  </td>
  <td data-route-reqs='sensorlogs#index'>
    sensorlogs#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/sensorlogs(.:format)' data-regexp='^\/sensorlogs(?:\.([^\/.?]+))?$'>
    /sensorlogs(.:format)
  </td>
  <td data-route-reqs='sensorlogs#create'>
    sensorlogs#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_sensorlog'>
      new_sensorlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensorlogs/new(.:format)' data-regexp='^\/sensorlogs\/new(?:\.([^\/.?]+))?$'>
    /sensorlogs/new(.:format)
  </td>
  <td data-route-reqs='sensorlogs#new'>
    sensorlogs#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_sensorlog'>
      edit_sensorlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensorlogs/:id/edit(.:format)' data-regexp='^\/sensorlogs\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /sensorlogs/:id/edit(.:format)
  </td>
  <td data-route-reqs='sensorlogs#edit'>
    sensorlogs#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='sensorlog'>
      sensorlog<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/sensorlogs/:id(.:format)' data-regexp='^\/sensorlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensorlogs/:id(.:format)
  </td>
  <td data-route-reqs='sensorlogs#show'>
    sensorlogs#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/sensorlogs/:id(.:format)' data-regexp='^\/sensorlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensorlogs/:id(.:format)
  </td>
  <td data-route-reqs='sensorlogs#update'>
    sensorlogs#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/sensorlogs/:id(.:format)' data-regexp='^\/sensorlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensorlogs/:id(.:format)
  </td>
  <td data-route-reqs='sensorlogs#update'>
    sensorlogs#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/sensorlogs/:id(.:format)' data-regexp='^\/sensorlogs\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /sensorlogs/:id(.:format)
  </td>
  <td data-route-reqs='sensorlogs#destroy'>
    sensorlogs#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='home_index'>
      home_index<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/home/index(.:format)' data-regexp='^\/home\/index(?:\.([^\/.?]+))?$'>
    /home/index(.:format)
  </td>
  <td data-route-reqs='home#index'>
    home#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='root'>
      root<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/' data-regexp='^\/$'>
    /
  </td>
  <td data-route-reqs='users#login'>
    users#login
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='login'>
      login<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/login(.:format)' data-regexp='^\/login(?:\.([^\/.?]+))?$'>
    /login(.:format)
  </td>
  <td data-route-reqs='users#login'>
    users#login
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='register'>
      register<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/register(.:format)' data-regexp='^\/register(?:\.([^\/.?]+))?$'>
    /register(.:format)
  </td>
  <td data-route-reqs='users#register'>
    users#register
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/register(.:format)' data-regexp='^\/register(?:\.([^\/.?]+))?$'>
    /register(.:format)
  </td>
  <td data-route-reqs='users#register'>
    users#register
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/login(.:format)' data-regexp='^\/login(?:\.([^\/.?]+))?$'>
    /login(.:format)
  </td>
  <td data-route-reqs='users#create_login_session'>
    users#create_login_session
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='logout'>
      logout<span class='helper'>_path</span>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/logout(.:format)' data-regexp='^\/logout(?:\.([^\/.?]+))?$'>
    /logout(.:format)
  </td>
  <td data-route-reqs='users#logout'>
    users#logout
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/logout(.:format)' data-regexp='^\/logout(?:\.([^\/.?]+))?$'>
    /logout(.:format)
  </td>
  <td data-route-reqs='users#logout'>
    users#logout
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarms'>
      alarms<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms(.:format)' data-regexp='^\/alarms(?:\.([^\/.?]+))?$'>
    /alarms(.:format)
  </td>
  <td data-route-reqs='alarms#index'>
    alarms#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/alarms(.:format)' data-regexp='^\/alarms(?:\.([^\/.?]+))?$'>
    /alarms(.:format)
  </td>
  <td data-route-reqs='alarms#create'>
    alarms#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_alarm'>
      new_alarm<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms/new(.:format)' data-regexp='^\/alarms\/new(?:\.([^\/.?]+))?$'>
    /alarms/new(.:format)
  </td>
  <td data-route-reqs='alarms#new'>
    alarms#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_alarm'>
      edit_alarm<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms/:id/edit(.:format)' data-regexp='^\/alarms\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /alarms/:id/edit(.:format)
  </td>
  <td data-route-reqs='alarms#edit'>
    alarms#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='alarm'>
      alarm<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/alarms/:id(.:format)' data-regexp='^\/alarms\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarms/:id(.:format)
  </td>
  <td data-route-reqs='alarms#show'>
    alarms#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/alarms/:id(.:format)' data-regexp='^\/alarms\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarms/:id(.:format)
  </td>
  <td data-route-reqs='alarms#update'>
    alarms#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/alarms/:id(.:format)' data-regexp='^\/alarms\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarms/:id(.:format)
  </td>
  <td data-route-reqs='alarms#update'>
    alarms#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/alarms/:id(.:format)' data-regexp='^\/alarms\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /alarms/:id(.:format)
  </td>
  <td data-route-reqs='alarms#destroy'>
    alarms#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='users'>
      users<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/users(.:format)' data-regexp='^\/users(?:\.([^\/.?]+))?$'>
    /users(.:format)
  </td>
  <td data-route-reqs='users#index'>
    users#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/users(.:format)' data-regexp='^\/users(?:\.([^\/.?]+))?$'>
    /users(.:format)
  </td>
  <td data-route-reqs='users#create'>
    users#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_user'>
      new_user<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/users/new(.:format)' data-regexp='^\/users\/new(?:\.([^\/.?]+))?$'>
    /users/new(.:format)
  </td>
  <td data-route-reqs='users#new'>
    users#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_user'>
      edit_user<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/users/:id/edit(.:format)' data-regexp='^\/users\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /users/:id/edit(.:format)
  </td>
  <td data-route-reqs='users#edit'>
    users#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='user'>
      user<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/users/:id(.:format)' data-regexp='^\/users\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /users/:id(.:format)
  </td>
  <td data-route-reqs='users#show'>
    users#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/users/:id(.:format)' data-regexp='^\/users\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /users/:id(.:format)
  </td>
  <td data-route-reqs='users#update'>
    users#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/users/:id(.:format)' data-regexp='^\/users\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /users/:id(.:format)
  </td>
  <td data-route-reqs='users#update'>
    users#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/users/:id(.:format)' data-regexp='^\/users\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /users/:id(.:format)
  </td>
  <td data-route-reqs='users#destroy'>
    users#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='gateways'>
      gateways<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/gateways(.:format)' data-regexp='^\/gateways(?:\.([^\/.?]+))?$'>
    /gateways(.:format)
  </td>
  <td data-route-reqs='gateways#index'>
    gateways#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/gateways(.:format)' data-regexp='^\/gateways(?:\.([^\/.?]+))?$'>
    /gateways(.:format)
  </td>
  <td data-route-reqs='gateways#create'>
    gateways#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='new_gateway'>
      new_gateway<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/gateways/new(.:format)' data-regexp='^\/gateways\/new(?:\.([^\/.?]+))?$'>
    /gateways/new(.:format)
  </td>
  <td data-route-reqs='gateways#new'>
    gateways#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='edit_gateway'>
      edit_gateway<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/gateways/:id/edit(.:format)' data-regexp='^\/gateways\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /gateways/:id/edit(.:format)
  </td>
  <td data-route-reqs='gateways#edit'>
    gateways#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name='gateway'>
      gateway<span class='helper'>_path</span>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/gateways/:id(.:format)' data-regexp='^\/gateways\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /gateways/:id(.:format)
  </td>
  <td data-route-reqs='gateways#show'>
    gateways#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/gateways/:id(.:format)' data-regexp='^\/gateways\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /gateways/:id(.:format)
  </td>
  <td data-route-reqs='gateways#update'>
    gateways#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/gateways/:id(.:format)' data-regexp='^\/gateways\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /gateways/:id(.:format)
  </td>
  <td data-route-reqs='gateways#update'>
    gateways#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/gateways/:id(.:format)' data-regexp='^\/gateways\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /gateways/:id(.:format)
  </td>
  <td data-route-reqs='gateways#destroy'>
    gateways#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices(.:format)' data-regexp='^\/devices(?:\.([^\/.?]+))?$'>
    /devices(.:format)
  </td>
  <td data-route-reqs='devices#index'>
    devices#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/devices(.:format)' data-regexp='^\/devices(?:\.([^\/.?]+))?$'>
    /devices(.:format)
  </td>
  <td data-route-reqs='devices#create'>
    devices#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/new(.:format)' data-regexp='^\/devices\/new(?:\.([^\/.?]+))?$'>
    /devices/new(.:format)
  </td>
  <td data-route-reqs='devices#new'>
    devices#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/:id/edit(.:format)' data-regexp='^\/devices\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /devices/:id/edit(.:format)
  </td>
  <td data-route-reqs='devices#edit'>
    devices#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#show'>
    devices#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#update'>
    devices#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#update'>
    devices#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/devices/:id(.:format)' data-regexp='^\/devices\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /devices/:id(.:format)
  </td>
  <td data-route-reqs='devices#destroy'>
    devices#destroy
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects(.:format)' data-regexp='^\/projects(?:\.([^\/.?]+))?$'>
    /projects(.:format)
  </td>
  <td data-route-reqs='projects#index'>
    projects#index
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='POST'>
    POST
  </td>
  <td data-route-path='/projects(.:format)' data-regexp='^\/projects(?:\.([^\/.?]+))?$'>
    /projects(.:format)
  </td>
  <td data-route-reqs='projects#create'>
    projects#create
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/new(.:format)' data-regexp='^\/projects\/new(?:\.([^\/.?]+))?$'>
    /projects/new(.:format)
  </td>
  <td data-route-reqs='projects#new'>
    projects#new
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/:id/edit(.:format)' data-regexp='^\/projects\/([^\/.?]+)\/edit(?:\.([^\/.?]+))?$'>
    /projects/:id/edit(.:format)
  </td>
  <td data-route-reqs='projects#edit'>
    projects#edit
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='GET'>
    GET
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#show'>
    projects#show
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PATCH'>
    PATCH
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#update'>
    projects#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='PUT'>
    PUT
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#update'>
    projects#update
  </td>
</tr>
<tr class='route_row' data-helper='path'>
  <td data-route-name=''>
  </td>
  <td data-route-verb='DELETE'>
    DELETE
  </td>
  <td data-route-path='/projects/:id(.:format)' data-regexp='^\/projects\/([^\/.?]+)(?:\.([^\/.?]+))?$'>
    /projects/:id(.:format)
  </td>
  <td data-route-reqs='projects#destroy'>
    projects#destroy
  </td>
</tr>

  </tbody>
</table>

<script type='text/javascript'>
  // Iterates each element through a function
  function each(elems, func) {
    if (!elems instanceof Array) { elems = [elems]; }
    for (var i = 0, len = elems.length; i < len; i++) {
      func(elems[i]);
    }
  }

  // Sets innerHTML for an element
  function setContent(elem, text) {
    elem.innerHTML = text;
  }

  // Enables path search functionality
  function setupMatchPaths() {
    // Check if the user input (sanitized as a path) matches the regexp data attribute
    function checkExactMatch(section, elem, value) {
      var string = sanitizePath(value),
          regexp = elem.getAttribute("data-regexp");

      showMatch(string, regexp, section, elem);
    }

    // Check if the route path data attribute contains the user input
    function checkFuzzyMatch(section, elem, value) {
      var string = elem.getAttribute("data-route-path"),
          regexp = value;

      showMatch(string, regexp, section, elem);
    }

    // Display the parent <tr> element in the appropriate section when there's a match
    function showMatch(string, regexp, section, elem) {
      if(string.match(RegExp(regexp))) {
        section.appendChild(elem.parentNode.cloneNode(true));
      }
    }

    // Check if there are any matched results in a section
    function checkNoMatch(section, defaultText, noMatchText) {
      if (section.innerHTML === defaultText) {
        setContent(section, defaultText + noMatchText);
      }
    }

    // Ensure path always starts with a slash "/" and remove params or fragments
    function sanitizePath(path) {
      var path = path.charAt(0) == '/' ? path : "/" + path;
      return path.replace(/\#.*|\?.*/, '');
    }

    var regexpElems     = document.querySelectorAll('#route_table [data-regexp]'),
        searchElem      = document.querySelector('#search'),
        exactMatches    = document.querySelector('#exact_matches'),
        fuzzyMatches    = document.querySelector('#fuzzy_matches');

    // Remove matches when no search value is present
    searchElem.onblur = function(e) {
      if (searchElem.value === "") {
        setContent(exactMatches, "");
        setContent(fuzzyMatches, "");
      }
    }

    // On key press perform a search for matching paths
    searchElem.onkeyup = function(e){
      var userInput         = searchElem.value,
          defaultExactMatch = '<tr><th colspan="4">Paths Matching (' + escape(sanitizePath(userInput)) +'):</th></tr>',
          defaultFuzzyMatch = '<tr><th colspan="4">Paths Containing (' + escape(userInput) +'):</th></tr>',
          noExactMatch      = '<tr><th colspan="4">No Exact Matches Found</th></tr>',
          noFuzzyMatch      = '<tr><th colspan="4">No Fuzzy Matches Found</th></tr>';

      // Clear out results section
      setContent(exactMatches, defaultExactMatch);
      setContent(fuzzyMatches, defaultFuzzyMatch);

      // Display exact matches and fuzzy matches
      each(regexpElems, function(elem) {
        checkExactMatch(exactMatches, elem, userInput);
        checkFuzzyMatch(fuzzyMatches, elem, userInput);
      })

      // Display 'No Matches' message when no matches are found
      checkNoMatch(exactMatches, defaultExactMatch, noExactMatch);
      checkNoMatch(fuzzyMatches, defaultFuzzyMatch, noFuzzyMatch);
    }
  }

  // Enables functionality to toggle between `_path` and `_url` helper suffixes
  function setupRouteToggleHelperLinks() {

    // Sets content for each element
    function setValOn(elems, val) {
      each(elems, function(elem) {
        setContent(elem, val);
      });
    }

    // Sets onClick event for each element
    function onClick(elems, func) {
      each(elems, function(elem) {
        elem.onclick = func;
      });
    }

    var toggleLinks = document.querySelectorAll('#route_table [data-route-helper]');
    onClick(toggleLinks, function(){
      var helperTxt   = this.getAttribute("data-route-helper"),
          helperElems = document.querySelectorAll('[data-route-name] span.helper');

      setValOn(helperElems, helperTxt);
    });
  }

  setupMatchPaths();
  setupRouteToggleHelperLinks();
</script>


  

<h2 style="margin-top: 30px">Request</h2>
<p><b>Parameters</b>:</p> <pre>None</pre>

<div class="details">
  <div class="summary"><a href="#" onclick="return toggleSessionDump()">Toggle session dump</a></div>
  <div id="session_dump" style="display:none"><pre>_csrf_token: &quot;EZvLne4FsH5sptTIIJy7ofp7omN6e0ZGgY5kCYLobJ8=&quot;
session_id: &quot;739afa49ae086d4ab79241d5be71b960&quot;</pre></div>
</div>

<div class="details">
  <div class="summary"><a href="#" onclick="return toggleEnvDump()">Toggle env dump</a></div>
  <div id="env_dump" style="display:none"><pre>HTTP_ACCEPT: &quot;*/*&quot;
HTTP_ACCEPT_ENCODING: &quot;gzip, deflate, sdch&quot;
HTTP_ACCEPT_LANGUAGE: &quot;zh-CN,zh;q=0.8&quot;
REMOTE_ADDR: &quot;219.142.69.76&quot;
SERVER_NAME: &quot;110.76.185.36&quot;
SERVER_PROTOCOL: &quot;HTTP/1.1&quot;</pre></div>
</div>

<h2 style="margin-top: 30px">Response</h2>
<p><b>Headers</b>:</p> <pre>None</pre>

</div>


</body>
</html>
