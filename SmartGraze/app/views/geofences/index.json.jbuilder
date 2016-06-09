json.array!(@geofences) do |geofence|
  json.extract! geofence, :id, :name
  json.url geofence_url(geofence, format: :json)
end
