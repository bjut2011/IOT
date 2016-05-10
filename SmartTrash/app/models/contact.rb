class Contact
  include MongoMapper::Document

  key :name, String
  key :mobile, String
  key :email, String

end
