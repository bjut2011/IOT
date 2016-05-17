json.array!(@sensorlogs) do |sensorlog|
  json.extract! sensorlog, :id, :value
  json.url sensorlog_url(sensorlog, format: :json)
end
