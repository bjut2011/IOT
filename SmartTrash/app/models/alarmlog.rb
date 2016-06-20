class Alarmlog
  include MongoMapper::Document

  key :user_id, String
  key :code, Integer
  key :sendmsg, String
  key :mobile, String

end
