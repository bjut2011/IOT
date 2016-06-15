class Alarm
  include MongoMapper::Document

  key :name, String
  key :alarmType, String
  key :alarmType_Name, String
  key :alarmTypeDiv, String
  key :target, String
  key :duration, String
  key :lowerBoundC, String
  key :upperBoundC, String
  key :target_name, String
  key :switchVal, String
  key :projectId, String
  key :sensorId, String
  key :deviceId, String
  key :userId, String
  key :contactId, String

end
