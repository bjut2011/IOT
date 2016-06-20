json.array!(@alarmlogs) do |alarmlog|
  json.extract! alarmlog, :id, :user_id, :code, :sendmsg, :mobile
  json.url alarmlog_url(alarmlog, format: :json)
end
