json.array!(@schedulers) do |scheduler|
  json.extract! scheduler, :id, :name, :sendval, :sendflag, :week, :hr, :min, :sec
  json.url scheduler_url(scheduler, format: :json)
end
