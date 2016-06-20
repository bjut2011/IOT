class AlarmsController < ApplicationController
  before_action :set_alarm, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /alarms
  # GET /alarms.json
  def index
    @alarms = Alarm.all
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    if params["pid"]  and current_admin.type!=0
       pid=params["pid"]
       logger.info pid
       @project_name=User.find(pid).name
       @project_id=User.find(pid).id.to_s
       @alarms=Alarm.where(userId:@project_id)
    end
  end
   
  def AlarmDetail
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @devices=Device.all
    if current_admin.type!=0
      @devices=Device.where(user_id:current_admin.id)
    end
  end
 
  def addAlarms
     current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
     contactId=params[:contactId]
     deviceId=params[:deviceId]
     sensorId=params[:sensorId]
     alarmType=params[:alarmType]
     upperBoundC =""
     if params[:upperBoundC]
       upperBoundC=params[:upperBoundC]
     end
     lowerBoundC=""
     if params[:lowerBoundC]
       lowerBoundC=params[:lowerBoundC]
     end
     duration=""
     if params[:duration]
       duration=params[:duration]
     end
     target=params[:target]
     switchVal=params[:switchVal]
     dev=Device.find(deviceId)
     userId=dev.user_id.to_s()
     alarm=Alarm.new(contactId:contactId,deviceId:deviceId,sensorId:sensorId,alarmType:alarmType,alarmTypeDiv:upperBoundC,duration:duration,upperBoundC:upperBoundC,lowerBoundC:lowerBoundC,target:target,switchVal:switchVal,userId:userId)
     alarm.save
     respond_to do |format|
        format.html { redirect_to "/alarms?pid="+userId, notice: 'Alarm was successfully created.' }
        format.json { render :json => {:code =>1,:msg =>"ok",:redirect_uri =>"/"} }
     end
  end
 
  def querySensorByDeviceId
     deviceId=params[:deviceId]
     device=Device.find(deviceId)
     sensors=device.sensor
     respond_to do |format|
       format.json {render :json =>{:sensorList => sensors,:code => 0}}
     end
  end

 
  def toAddAlarms
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    if params["pid"] and current_admin.type!=0
      pid=params["pid"]
      prj=User.find(pid)
      @devices=prj.device
      if @devices
         @sensors= @devices[0].sensor
      end
    else
     @devices=Device.all
    end
    @contacts=Contact.all
    if @devices
       @sensors= @devices[0].sensor
    end
  end
  
  def toUpdateAlarms
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    if params["pid"] and current_admin.type!=0
      pid=params["pid"]
      prj=User.find(pid)
      @devices=prj.device
      if @devices
         @sensors= @devices[0].sensor
      end
    else
     @devices=Device.all
    end
    @contacts=Contact.all
    if @devices
       @sensors= @devices[0].sensor
    end
    if params["alarmsId"]
       @alarm=Alarm.find(params["alarmsId"])
       @sensors=Device.find(@alarm.deviceId).sensor
    end
  end
  # GET /alarms/1
  # GET /alarms/1.json
  def show
  end

  # GET /alarms/new
  def new
    @alarm = Alarm.new
  end

  # GET /alarms/1/edit
  def edit
  end

  # POST /alarms
  # POST /alarms.json
  def create
    @alarm = Alarm.new(alarm_params)

    respond_to do |format|
      if @alarm.save
        format.html { redirect_to @alarm, notice: 'Alarm was successfully created.' }
        format.json { render :show, status: :created, location: @alarm }
      else
        format.html { render :new }
        format.json { render json: @alarm.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /alarms/1
  # PATCH/PUT /alarms/1.json
  def update
    respond_to do |format|
      if @alarm.update(alarm_params)
        format.html { redirect_to @alarm, notice: 'Alarm was successfully updated.' }
        format.json { render :show, status: :ok, location: @alarm }
      else
        format.html { render :edit }
        format.json { render json: @alarm.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alarms/1
  # DELETE /alarms/1.json
  def destroy
    @alarm.destroy
    respond_to do |format|
      format.json { render :json => {:code =>0,:msg =>"Alarm was successfully destroyed.",:redirect_uri =>""} }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alarm
      @alarm = Alarm.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def alarm_params
      params.require(:alarm).permit(:name, :alarmType, :alarmType_Name, :alarmTypeDiv, :target, :target_name, :switchVal)
    end
end
