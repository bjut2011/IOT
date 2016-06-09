class Geofence
  include MongoMapper::Document

  key :user_id, ObjectId
  key :create_time, Time
  key :name, String
  many :polygodetail
  belongs_to :user   

end
