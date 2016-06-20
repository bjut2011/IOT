class SensorsController < ApplicationController
  before_action :set_sensor, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /sensors
  # GET /sensors.json
  def index
    @sensors = Sensor.all
  end

  # GET /sensors/1
  # GET /sensors/1.json
  def show
  end

  # GET /sensors/new
  def new
    @sensor = Sensor.new
  end

  # GET /sensors/1/edit
  def edit
  end

  def querySensorDataDetail
    sensorId=params[:sensorId]
    startTime=params[:startTime]
    endTime=params[:endTime]
    stime=Time.parse(startTime)
    etime=Time.parse(endTime)
    tm=stime.to_i
    tm_e=etime.to_i
    @count=Sensorlog.where(:sensor_id => sensorId,:update_time.gt => tm,:update_time.lt => tm_e).count
    @totolpage=@count/50+1;
    @sensors=Sensorlog.where(:sensor_id => sensorId,:update_time.gt => tm,:update_time.lt => tm_e).sort(:time => :desc).paginate(page:params[:page],per_page:50)
    #@sensors = Sensorlog.where(sensor_id:sensorId).sort(:time => :desc).limit(100)
    @se=Sensor.find(sensorId)
    respond_to do |format|
      format.json {render :json => {:code =>0,:sensor => @se,:totalPage => @totolpage,:page => params[:page],:dataList => @sensors}}
    end
  end

  # POST /sensors
  # POST /sensors.json
  def create
    @sensor = Sensor.new(sensor_params)

    respond_to do |format|
      if @sensor.save
        format.html { redirect_to @sensor, notice: 'Sensor was successfully created.' }
        format.json { render :show, status: :created, location: @sensor }
      else
        format.html { render :new }
        format.json { render json: @sensor.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sensors/1
  # PATCH/PUT /sensors/1.json
  def update
    respond_to do |format|
      if @sensor.update(sensor_params)
        format.html { redirect_to @sensor, notice: 'Sensor was successfully updated.' }
        format.json { render :show, status: :ok, location: @sensor }
      else
        format.html { render :edit }
        format.json { render json: @sensor.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sensors/1
  # DELETE /sensors/1.json
  def destroy
    @sensor.destroy
    respond_to do |format|
      format.json {render :json => {:code =>0,:msg =>"OK"}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sensor
      @sensor = Sensor.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sensor_params
      params.require(:sensor).permit(:name, :sensorType, :sensorSign, :sensorUnit)
    end
end
