class Alarmlog
  include MongoMapper::Document
  key :device_id, String
  key :name, String
  key :typeID, Integer
  key :createTime, String
  key :latitude, String
  key :longitude, String
  key :deviceTime, String
  key :address, String
  key :note, String

end
