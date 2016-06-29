class User
  include MongoMapper::Document

  key :name, String
  key :email, String
  key :mobile, String
  key :password_digest, String
  key :remeber_digest, String
  key :token, String
  key :type, Integer
  key :parent_id, String
  many :device
  many :contact
end
