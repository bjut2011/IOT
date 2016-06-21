class FenceTodevicesController < ApplicationController
  before_action :set_fence_todevice, only: [:show, :edit, :update, :destroy]

  # GET /fence_todevices
  # GET /fence_todevices.json
  def index
    @fence_todevices = FenceTodevice.all
  end

  # GET /fence_todevices/1
  # GET /fence_todevices/1.json
  def show
  end

  # GET /fence_todevices/new
  def new
    @fence_todevice = FenceTodevice.new
  end

  # GET /fence_todevices/1/edit
  def edit
  end

  # POST /fence_todevices
  # POST /fence_todevices.json
  def create
    @fence_todevice = FenceTodevice.new(fence_todevice_params)

    respond_to do |format|
      if @fence_todevice.save
        format.html { redirect_to @fence_todevice, notice: 'Fence todevice was successfully created.' }
        format.json { render :show, status: :created, location: @fence_todevice }
      else
        format.html { render :new }
        format.json { render json: @fence_todevice.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /fence_todevices/1
  # PATCH/PUT /fence_todevices/1.json
  def update
    respond_to do |format|
      if @fence_todevice.update(fence_todevice_params)
        format.html { redirect_to @fence_todevice, notice: 'Fence todevice was successfully updated.' }
        format.json { render :show, status: :ok, location: @fence_todevice }
      else
        format.html { render :edit }
        format.json { render json: @fence_todevice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /fence_todevices/1
  # DELETE /fence_todevices/1.json
  def destroy
    @fence_todevice.destroy
    respond_to do |format|
      format.html { redirect_to fence_todevices_url, notice: 'Fence todevice was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_fence_todevice
      @fence_todevice = FenceTodevice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def fence_todevice_params
      params.require(:fence_todevice).permit(:name)
    end
end
