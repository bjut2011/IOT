json.array!(@polygodetails) do |polygodetail|
  json.extract! polygodetail, :id, :lat, :lng
  json.url polygodetail_url(polygodetail, format: :json)
end
