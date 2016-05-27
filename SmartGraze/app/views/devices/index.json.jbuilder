json.array!(@devices) do |device|
  json.extract! device, :id, :project_id, :device_name, :device_mark, :device_details, :device_img, :create_time, :lon, :lat
  json.url device_url(device, format: :json)
end
