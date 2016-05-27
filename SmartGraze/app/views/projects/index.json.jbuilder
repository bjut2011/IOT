json.array!(@projects) do |project|
  json.extract! project, :id, :name, :pid, :created_time
  json.url project_url(project, format: :json)
end
