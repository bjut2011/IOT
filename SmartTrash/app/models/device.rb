class Device
  include MongoMapper::Document

  key :project_id, ObjectId
  key :device_name, String
  key :device_mark, String
  key :device_details, String
  key :device_img, String
  key :create_time, Time
  key :lon, Float
  key :lat, Float
  key :status, Integer
  key :device_sn, String
  many :sensor
  belongs_to :project   

end
