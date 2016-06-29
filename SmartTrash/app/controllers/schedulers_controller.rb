class SchedulersController < ApplicationController
  before_action :set_scheduler, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /schedulers
  # GET /schedulers.json
  def index
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @schedulers = Scheduler.all
    if params[:pid]
       @project_id=params[:pid]
    end
  end

  # GET /schedulers/1
  # GET /schedulers/1.json
  def show
  end

  # GET /schedulers/new
  def new
    @project_id=params[:pid]
    @scheduler = Scheduler.new
    @devices= Device.where(user_id:params[:pid])
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
  end

  # GET /schedulers/1/edit
  def edit
    @scheduler = Scheduler.find(params[:id])
    @curdevice = Device.find(@scheduler.device_id) 
    logger.info @scheduler.device_id
    logger.info @curdevice
    @devices= Device.where(user_id:@curdevice.user_id)
    @project_id=@curdevice.user_id
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
  end

  # POST /schedulers
  # POST /schedulers.json
  def create
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @scheduler = Scheduler.new(name:params[:name],device_id:params[:deviceId],sendval:params[:sendval],sendflag:params[:sendflag].to_i)
    @scheduler.save
    respond_to do |format|
      #if @scheduler.save
        format.html { redirect_to "/schedulers?pid="+current_admin.id, notice: 'Scheduler was successfully created.' }
        #format.json { render :show, status: :created, location: @scheduler }
      #else
       # format.html { render :new }
       # format.json { render json: @scheduler.errors, status: :unprocessable_entity }
      #end
    end
  end

  # PATCH/PUT /schedulers/1
  # PATCH/PUT /schedulers/1.json
  def update
    respond_to do |format|
      if @scheduler.update(scheduler_params)
        format.html { redirect_to @scheduler, notice: 'Scheduler was successfully updated.' }
        format.json { render :show, status: :ok, location: @scheduler }
      else
        format.html { render :edit }
        format.json { render json: @scheduler.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /schedulers/1
  # DELETE /schedulers/1.json
  def destroy
    @scheduler.destroy
    respond_to do |format|
      format.json { render :json => {:code =>0,:msg =>"Device was successfully destroyed.",:redirect_uri =>""} }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_scheduler
      @scheduler = Scheduler.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def scheduler_params
      params.require(:scheduler).permit(:name, :sendval, :sendflag, :week, :hr, :min, :sec)
    end
end
