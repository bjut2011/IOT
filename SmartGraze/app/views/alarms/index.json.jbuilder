json.array!(@alarms) do |alarm|
  json.extract! alarm, :id, :name, :alarmType, :alarmType_Name, :alarmTypeDiv, :target, :target_name, :switchVal
  json.url alarm_url(alarm, format: :json)
end
