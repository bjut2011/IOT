class Sensor
  include MongoMapper::Document
  key :device_id, ObjectId
  key :name, String
  key :sensorType, Integer
  key :sensorSign, Integer
  key :sensorUnit, String
  key :update_time, Time
  key :updatetime, Float
  belongs_to :device
end
