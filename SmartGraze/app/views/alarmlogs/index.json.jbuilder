json.array!(@alarmlogs) do |alarmlog|
  json.extract! alarmlog, :id, :name
  json.url alarmlog_url(alarmlog, format: :json)
end
