class SensorlogsController < ApplicationController
  before_action :set_sensorlog, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /sensorlogs
  # GET /sensorlogs.json
  def index
    @sensorlogs = Sensorlog.all
  end

  # GET /sensorlogs/1
  # GET /sensorlogs/1.json
  def show
  end

  # GET /sensorlogs/new
  def new
    @sensorlog = Sensorlog.new
  end

  # GET /sensorlogs/1/edit
  def edit
  end
  
  def getData
    @sensorlog=Sensorlog.where(sensor_id:params[:sensorid]).sort(:time => :desc).limit(12)
    logger.info params
    respond_to do |format|
      format.json {render :json => {:code =>0,:data => @sensorlog}}
    end
  end

  def querySensorHistoryDatas
    ##@sensorlog=Sensorlog.all(:sensor_id => params[:sensorid],:order => "time DESC")
    tm=Time.now.to_i
    day=Time.now
    type=params[:queryDate]
    if type.nil?
      day=day-1.hour
      tm=day.to_i
      logger.info day
      @sensorlog=Sensorlog.where(:sensor_id => params[:sensorid],:update_time.gt => tm).sort(:time => :desc)
    elsif type.to_i==1
      day=day-1.hour
      tm=day.to_i
      logger.info day
      @sensorlog=Sensorlog.where(:sensor_id => params[:sensorid],:update_time.gt => tm).sort(:time => :desc)
    elsif type.to_i==2
      day = Time.new(day.year, day.month, day.day)
      tm=day.to_i
      logger.info day
      @sensorlog=Sensorlog.where(:sensor_id => params[:sensorid],:update_time.gt => tm).sort(:time => :desc)
    elsif type.to_i==3
      day_e= Time.new(day.year, day.month, 1)
      day=day-1.month
      day= Time.new(day.year, day.month, 1)
      tm=day.to_i
      tm_e=day_e.to_i
      logger.info day
      logger.info day_e
      @sensorlog=Sensorlog.where(:sensor_id => params[:sensorid],:update_time.gt => tm,:update_time.lt => tm_e).sort(:time => :desc)
    elsif type.to_i==4
      day = Time.new(day.year, day.month, 1)
      tm=day.to_i
      logger.info day
      @sensorlog=Sensorlog.where(:sensor_id => params[:sensorid],:update_time.gt => tm).sort(:time => :desc)
    end
    respond_to do |format|
      format.json {render :json => {:code =>0,:data => @sensorlog}}
    end

  end

  # POST /sensorlogs
  # POST /sensorlogs.json
  def create
    @sensorlog = Sensorlog.new(sensorlog_params)

    respond_to do |format|
      if @sensorlog.save
        format.html { redirect_to @sensorlog, notice: 'Sensorlog was successfully created.' }
        format.json { render :show, status: :created, location: @sensorlog }
      else
        format.html { render :new }
        format.json { render json: @sensorlog.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /sensorlogs/1
  # PATCH/PUT /sensorlogs/1.json
  def update
    respond_to do |format|
      if @sensorlog.update(sensorlog_params)
        format.html { redirect_to @sensorlog, notice: 'Sensorlog was successfully updated.' }
        format.json { render :show, status: :ok, location: @sensorlog }
      else
        format.html { render :edit }
        format.json { render json: @sensorlog.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /sensorlogs/1
  # DELETE /sensorlogs/1.json
  def destroy
    @sensorlog.destroy
    respond_to do |format|
      format.html { redirect_to sensorlogs_url, notice: 'Sensorlog was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sensorlog
      @sensorlog = Sensorlog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def sensorlog_params
      params.require(:sensorlog).permit(:value)
    end
end
