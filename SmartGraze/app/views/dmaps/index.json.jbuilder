json.array!(@dmaps) do |dmap|
  json.extract! dmap, :id, :name
  json.url dmap_url(dmap, format: :json)
end
