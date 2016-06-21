class Device
  include MongoMapper::Document

  key :project_id, ObjectId
  key :user_id, ObjectId
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
  belongs_to :user   
 
  key :mobile, String 
  key :sn, String
  key :name, String
  key :model, String
  key :modelName, String
  key :state, Integer
  key :speedLimit, String
  key :icon, String
  key :carNum, String
  key :locationID, String
  key :groupID, Integer
  key :serverUtcDate, String
  key :deviceUtcDate, String
  key :baiduLat, String
  key :baiduLng, String
  key :ofl, String
  key :speed, String
  key :course, String
  key :dataType, String
  key :dataContext, String
  key :distance, String
  key :isStop, Integer
  key :stopTimeMinute, Integer
  key :carStatus, String
  key :status, String
end
