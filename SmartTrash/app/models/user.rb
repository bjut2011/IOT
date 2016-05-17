class User
  include MongoMapper::Document

  key :name, String
  key :email, String
  key :password_digest, String
  key :remeber_digest, String
  key :token, String
  key :type, Integer
  many :device
end
