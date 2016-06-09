class DmapsController < ApplicationController
  before_action :set_dmap, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token
  layout :false
  # GET /dmaps
  # GET /dmaps.json
  def index
    @dmaps = Dmap.all
  end

  def layout
  end

  # GET /dmaps/1
  # GET /dmaps/1.json
  def show
  end

  # GET /dmaps/new
  def new
    @dmap = Dmap.new
  end

  # GET /dmaps/1/edit
  def edit
  end

  def Geofences
  end

  # POST /dmaps
  # POST /dmaps.json
  def create
    @dmap = Dmap.new(dmap_params)

    respond_to do |format|
      if @dmap.save
        format.html { redirect_to @dmap, notice: 'Dmap was successfully created.' }
        format.json { render :show, status: :created, location: @dmap }
      else
        format.html { render :new }
        format.json { render json: @dmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /dmaps/1
  # PATCH/PUT /dmaps/1.json
  def update
    respond_to do |format|
      if @dmap.update(dmap_params)
        format.html { redirect_to @dmap, notice: 'Dmap was successfully updated.' }
        format.json { render :show, status: :ok, location: @dmap }
      else
        format.html { render :edit }
        format.json { render json: @dmap.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /dmaps/1
  # DELETE /dmaps/1.json
  def destroy
    @dmap.destroy
    respond_to do |format|
      format.html { redirect_to dmaps_url, notice: 'Dmap was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_dmap
      @dmap = Dmap.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def dmap_params
      params.require(:dmap).permit(:name)
    end
end
