json.array!(@userdevices) do |userdevice|
  json.extract! userdevice, :id, :user_id, :device_id
  json.url userdevice_url(userdevice, format: :json)
end
