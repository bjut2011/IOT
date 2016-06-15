class Contact
  include MongoMapper::Document

  key :name, String
  key :user_id, ObjectId
  key :mobile, String
  key :email, String
  belongs_to :user

end
