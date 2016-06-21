class GeofencesController < ApplicationController
  before_action :set_geofence, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /geofences
  # GET /geofences.json
  def index
    @geofences = Geofence.all
  end

  # GET /geofences/1
  # GET /geofences/1.json
  def show
  end

  # GET /geofences/new
  def new
    @geofence = Geofence.new
  end

  # GET /geofences/1/edit
  def edit
  end

  def getPolygonList
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    geos=Geofence.where(user_id:current_admin.id)
    respond_to do |format|
        format.json {render :json => {:code =>0,:msg =>"",:d =>{:arr => geos}}}
    end
  end

  def getPolygonDetail
    points=Polygodetail.where(geofence_id:params[:ZoneID])
    respond_to do |format|
        format.json {render :json => {:code =>0,:msg =>"",:d =>{:points => points}}}
    end
  end
  # POST /geofences
  # POST /geofences.json
  def create
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    name=params[:Name];
    @geofence = Geofence.new(name:name,user_id:current_admin.id,create_time:Time.now)
    @geofence.save
    pls=params[:LatLngs].split('|')
    for item in pls do
      lts=item.split(',')
      pob=Polygodetail.new(geofence_id:@geofence.id,lat:lts[0],lng:lts[1])
      pob.save
    end
    pde=params[:DeviceIDs].split(',')
    for item in pde do
      pfd=FenceTodevice.new(fence_id:@geofence.id,device_id:item)
      pfd.save
    end
    respond_to do |format|
      if @geofence.save
        format.json {render :json => {:code =>0,:msg =>"创建失败",:redirect_uri =>"/"}}
      else
        format.json {render :json => {:code =>1,:msg =>"创建失败",:redirect_uri =>"/"}}
      end
    end
  end

  # PATCH/PUT /geofences/1
  # PATCH/PUT /geofences/1.json
  def update
    respond_to do |format|
      if @geofence.update(geofence_params)
        format.html { redirect_to @geofence, notice: 'Geofence was successfully updated.' }
        format.json { render :show, status: :ok, location: @geofence }
      else
        format.html { render :edit }
        format.json { render json: @geofence.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /geofences/1
  # DELETE /geofences/1.json
  def destroy
    @geoploys=FenceTodevice.where(fence_id:@geofence.id)
    for pl in @geoploys do
        pl.destroy
    end
    @ploys=Polygodetail.where(geofence_id:@geofence.id)
    for pl in @ploys do
        pl.destroy
    end
    @geofence.destroy
    
    respond_to do |format|
        format.json {render :json => {:code =>0,:msg =>""}}
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_geofence
      @geofence = Geofence.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def geofence_params
      params.require(:geofence).permit(:name)
    end
end
