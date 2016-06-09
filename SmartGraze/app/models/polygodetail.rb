class Polygodetail
  include MongoMapper::Document
  key :geofence_id, ObjectId
  key :lat, String
  key :lng, String
  
  belongs_to :geofence   

end
