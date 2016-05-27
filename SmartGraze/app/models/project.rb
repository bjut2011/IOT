class Project
  include MongoMapper::Document

  key :name, String
  key :pid, Integer
  key :created_time, Time
  key :project_details, String
  many :device
end
