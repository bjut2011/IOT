class Alarm
  include MongoMapper::Document

  key :name, String
  key :alarmType, String
  key :alarmType_Name, String
  key :alarmTypeDiv, String
  key :upperBoundC, String
  key :lowerBoundC, String
  key :duration, String
  key :target, String
  key :target_name, String
  key :switchVal, String
  key :projectId, String
  key :sensorId, String
  key :deviceId, String
  key :userId, String
  key :contactId, String

end
