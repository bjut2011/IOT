class Sensorlog
  include MongoMapper::Document
  key :sensor_id, ObjectId
  key :value, Integer
  key :time, Time
  belongs_to :sensor

end
