class AlarmlogsController < ApplicationController
  before_action :set_alarmlog, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /alarmlogs
  # GET /alarmlogs.json
  def index
    @alarmlogs = Alarmlog.all
  end

  # GET /alarmlogs/1
  # GET /alarmlogs/1.json
  def show
  end
 
  def SimpleMap
    @lng=params[:lng]
    @lat=params[:lat]
  end

  # GET /alarmlogs/new
  def new
    @alarmlog = Alarmlog.new
  end

  def getAlarmByDeviceID
    
     @DeviceID=params[:DeviceID]
     logger.info @DeviceID
     @alogs=Alarmlog.where(device_id:@DeviceID)
     respond_to do |format|
       format.json {render :json => {:code =>0,:d => {:reports => @alogs}}}
     end
  end

  # GET /alarmlogs/1/edit
  def edit
  end

  # POST /alarmlogs
  # POST /alarmlogs.json
  def create
    @alarmlog = Alarmlog.new(alarmlog_params)

    respond_to do |format|
      if @alarmlog.save
        format.html { redirect_to @alarmlog, notice: 'Alarmlog was successfully created.' }
        format.json { render :show, status: :created, location: @alarmlog }
      else
        format.html { render :new }
        format.json { render json: @alarmlog.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /alarmlogs/1
  # PATCH/PUT /alarmlogs/1.json
  def update
    respond_to do |format|
      if @alarmlog.update(alarmlog_params)
        format.html { redirect_to @alarmlog, notice: 'Alarmlog was successfully updated.' }
        format.json { render :show, status: :ok, location: @alarmlog }
      else
        format.html { render :edit }
        format.json { render json: @alarmlog.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alarmlogs/1
  # DELETE /alarmlogs/1.json
  def destroy
    @alarmlog.destroy
    respond_to do |format|
      format.html { redirect_to alarmlogs_url, notice: 'Alarmlog was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alarmlog
      @alarmlog = Alarmlog.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def alarmlog_params
      params.require(:alarmlog).permit(:name)
    end
end
