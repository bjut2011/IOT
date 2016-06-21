class FenceTodevice
  include MongoMapper::Document

  key :name, String
  key :device_id, ObjectId
  key :fence_id, ObjectId

end
