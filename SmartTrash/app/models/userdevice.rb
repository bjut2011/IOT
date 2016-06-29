class Userdevice
  include MongoMapper::Document

  key :user_id, String
  key :device_id, String

end
