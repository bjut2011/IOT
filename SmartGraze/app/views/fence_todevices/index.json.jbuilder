json.array!(@fence_todevices) do |fence_todevice|
  json.extract! fence_todevice, :id, :name
  json.url fence_todevice_url(fence_todevice, format: :json)
end
