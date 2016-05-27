json.array!(@gateways) do |gateway|
  json.extract! gateway, :id, :name
  json.url gateway_url(gateway, format: :json)
end
