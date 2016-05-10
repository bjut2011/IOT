class DevicesController < ApplicationController
  before_action :set_device, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /devices
  # GET /devices.json
  def index
    @devices = Device.all
    if params["pid"]
       pid=params["pid"]
       logger.info pid
       @devices=Project.find(pid).device
       @project_name=Project.find(pid).name
       @project_id=Project.find(pid).id
    end
  end
  def layout
  end
  
  def getDevices
    @devices = Device.all
    if params["pid"]
       pid=params["pid"]
       logger.info pid
       @devices=Project.find(pid).device
       @project_name=Project.find(pid).name
       @project_id=Project.find(pid).id
    end
    respond_to do |format|
      format.json {render :json => {:code =>0,:data => @devices}}
    end
  end

  def explore
    @devices = Device.all
    if params["pid"]
       pid=params["pid"]
       logger.info pid
       @devices=Project.find(pid).device
       @project_name=Project.find(pid).name
       @project_id=Project.find(pid).id
    end
  end
  # GET /devices/1
  # GET /devices/1.json
  def show
      @dev_id=params["id"]
      @dev=Device.find(@dev_id)
      @sensor=@dev.sensor
      @project=Project.find(@dev.project_id)
  end

  def monitor
   if params["pid"]
       pid=params["pid"]
       logger.info pid
       @devices=Project.find(pid).device
       @project_name=Project.find(pid).name
       @project_id=Project.find(pid).id
    end
  end
  
  def modify
  end
  # GET /devices/new
  def new
    @device = Device.new
    @project_id=params[:pid]
  end

  # GET /devices/1/edit
  def edit
  end

  # POST /devices
  # POST /devices.json
  def create
    logger.info params
    create_time=Time.now
    project_id=params["pid"]
    device_name=params["deviceName"]
    device_mark=""
    device_details=""
    sn=params["sn"]
    lon=params["devicePositionLng"].to_f
    lat=params["devicePositionLat"].to_f
    @device = Device.new(project_id:project_id,create_time:create_time,device_name:device_name,device_mark:device_mark,device_details:device_details,lon:lon,lat:lat,device_sn:sn)
    @device.save
    for item in params[:deviceSensorList] do
        logger.info item[1][:sensorName]
        senid=item[1][:sensorId]
        sensorType=item[1][:sensorType].to_i
        sensorSign=0
        if item[1][:sensorSign]
           sensorSign=item[1][:sensorSign].to_i 
        end
        if senid!=''
          sen=Sensor.find(senid)
          sen.update_attributes(name:item[1][:sensorName],sensorUnit:item[1][:sensorUnit],sensorType:sensorType,sensorSign:sensorSign)
        else
          sensorType=item[1][:sensorType].to_i
          sensorSign=0
          if item[1][:sensorSign]
            sensorSign=item[1][:sensorSign].to_i 
          end
          sen=Sensor.new(device_id:@device.id,name:item[1][:sensorName],sensorType:sensorType,sensorSign:sensorSign,sensorUnit:item[1][:sensorUnit])
          sen.save()
        end
        
        
    end
    respond_to do |format|
      #if @device.save
        #format.html { redirect_to @device, notice: 'Device was successfully created.' }
        # format.json {render :json => {:code =>0,:msg =>"创建成功",:redirect_uri =>"/",:data => {:device_id => @device.id,:key =>"",:proj_name => @device.project.name}}}
      #else
        #format.html { render :new }
        format.json {render :json => {:code =>1,:msg =>"创建失败",:redirect_uri =>"/"}}
      #end
    end
  end

  # PATCH/PUT /devices/1
  # PATCH/PUT /devices/1.json
  def update
    @device=Device.find(params[:id])
    deviceName=params[:deviceName]
    if deviceName
       @device.update_attributes(device_name:deviceName)
    end
    for item in params[:deviceSensorList] do
        logger.info item[1][:sensorName]
        senid=item[1][:sensorId]
        sensorType=item[1][:sensorType].to_i
        sensorSign=0
        if item[1][:sensorSign]
           sensorSign=item[1][:sensorSign].to_i 
        end
        if senid!=''
          sen=Sensor.find(senid)
          sen.update_attributes(name:item[1][:sensorName],sensorUnit:item[1][:sensorUnit],sensorType:sensorType,sensorSign:sensorSign)
        else
          sensorType=item[1][:sensorType].to_i
          sensorSign=0
          if item[1][:sensorSign]
            sensorSign=item[1][:sensorSign].to_i 
          end
          sen=Sensor.new(device_id:@device.id,name:item[1][:sensorName],sensorType:sensorType,sensorSign:sensorSign,sensorUnit:item[1][:sensorUnit])
          sen.save()
        end
        
        
    end
    respond_to do |format|
      #if @device.update(device_params)
       # format.html { redirect_to @device, notice: 'Device was successfully updated.' }
      format.json { render :json => {:code =>1,:msg =>"ok",:redirect_uri =>"/"} }
      #else
        #format.html { render :edit }
        #format.json { render json: @device.errors, status: :unprocessable_entity }
      #end
    end
  end

  # DELETE /devices/1
  # DELETE /devices/1.json
  def destroy
    @device.destroy
    respond_to do |format|
      format.html { redirect_to devices_url, notice: 'Device was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_device
      @device = Device.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def device_params
      params.require(:device).permit(:project_id, :device_name, :device_mark, :device_details, :device_img, :create_time, :lon, :lat)
    end
end
