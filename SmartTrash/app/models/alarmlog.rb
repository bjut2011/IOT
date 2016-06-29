class Alarmlog
  include MongoMapper::Document

  key :user_id, String
  key :device_id, String
  key :device_name, String
  key :code, Integer
  key :sendmsg, String
  key :mobile, String

end
