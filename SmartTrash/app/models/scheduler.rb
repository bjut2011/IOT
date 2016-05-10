class Scheduler
  include MongoMapper::Document

  key :name, String
  key :sendval, String
  key :sendflag, Integer
  key :week, Integer
  key :hr, Integer
  key :min, Integer
  key :sec, Integer
  key :device_id, String

end
