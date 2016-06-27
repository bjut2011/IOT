Rails.application.routes.draw do
  resources :fence_todevices
  resources :alarmlogs
  resources :polygodetails
  resources :geofences
  resources :schedulers
  get 'dmaps/layout' =>"dmaps#layout"
  post 'getAlarmByDeviceID' =>"alarmlogs#getAlarmByDeviceID"
  get 'SimpleMap' =>"alarmlogs#SimpleMap"
  resources :dmaps
  resources :contacts
  resources :sensors
  get 'AlarmDetail' =>"alarms#AlarmDetail"
  get 'alarms/toAddAlarms' =>"alarms#toAddAlarms"
  get 'alarms/toUpdateAlarms' =>"alarms#toUpdateAlarms"
  post 'alarms/querySensorByDeviceId' =>"alarms#querySensorByDeviceId"
  post 'alarms/addAlarms' =>"alarms#addAlarms"
  get 'map' =>"devices#map"
  post 'getPolygonList' =>"geofences#getPolygonList"
  post 'getPolygonDetail' =>"geofences#getPolygonDetail"
  get 'Tracking' =>"devices#Tracking"
  get 'Playback' =>"devices#Playback"
  get 'DevicesFxtj' =>"devices#DevicesFxtj"
  get 'gettracking' =>"devices#gettracking"
  get 'dmap' =>"devices#dmap"
  get 'Geofences' =>"dmaps#Geofences"
  get 'devices/monitor' =>"devices#monitor"
  get 'monitor' =>"devices#monitor"
  get 'Report' =>"devices#Report"
  get 'devices/layout' =>"devices#layout"
  get 'devices/explore' =>"devices#explore"
  get 'devices/queryLineData' =>"devices#queryLineData"
  get 'devices/alarm' =>"devices#alarmsms"
  post 'devices/:id/update' =>"devices#update"
  post 'devices/getDevices' =>"devices#getDevices"
  get 'sensorlogs/getData' =>"sensorlogs#getData"
  post 'sensorlogs/getData' =>"sensorlogs#getData"
  post 'GetDevicesHistory' =>"sensorlogs#GetDevicesHistory"
  resources :devices
  resources :projects
  resources :sensorlogs
  get 'home/index'
  #root to: "home#index"
  root to: "users#login"
  get 'login' => 'users#login'
  get 'register' => 'users#register'
  post 'register' => 'users#register'
  post 'login' => 'users#create_login_session'
  delete 'logout' => 'users#logout'
  get 'logout' => 'users#logout'
  #get 'login' => 'sessions#new'
  #get 'login' => 'sessions#new'
  #post 'login' => 'sessions#create'
  #delete 'logout' => 'sessions#destroy'
  resources :alarms
  resources :users
  resources :gateways
  resources :devices
  resources :projects
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
