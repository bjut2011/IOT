class AlarmsController < ApplicationController
  before_action :set_alarm, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /alarms
  # GET /alarms.json
  def index
    @alarms = Alarm.all
    if params["pid"]
       pid=params["pid"]
       logger.info pid
       @project_name=Project.find(pid).name
       @project_id=Project.find(pid).id.to_s
       @alarms=Alarm.where(projectId:@project_id)
    end
  end
  
  def addAlarms
     contactId=params[:contactId]
     deviceId=params[:deviceId]
     sensorId=params[:sensorId]
     alarmType=params[:alarmType]
     upperBoundC=params[:upperBoundC]
     target=params[:target]
     switchVal=params[:switchVal]
     dev=Device.find(deviceId)
     projectId=dev.project_id.to_s()
     alarm=Alarm.new(contactId:contactId,deviceId:deviceId,sensorId:sensorId,alarmType:alarmType,alarmTypeDiv:upperBoundC,target:target,switchVal:switchVal,projectId:projectId)
     alarm.save
     respond_to do |format|
        format.html { redirect_to "/alarms?pid="+projectId, notice: 'Alarm was successfully created.' }
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
    if params["pid"]
      pid=params["pid"]
      prj=Project.find(pid)
      @devices=prj.device
      @contacts=Contact.all
      if @devices
         @sensors= @devices[0].sensor
      end
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
      format.html { redirect_to alarms_url, notice: 'Alarm was successfully destroyed.' }
      format.json { head :no_content }
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
