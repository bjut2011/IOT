json.array!(@sensors) do |sensor|
  json.extract! sensor, :id, :name, :sensorType, :sensorSign, :sensorUnit
  json.url sensor_url(sensor, format: :json)
end
