class UserdevicesController < ApplicationController
  before_action :set_userdevice, only: [:show, :edit, :update, :destroy]

  # GET /userdevices
  # GET /userdevices.json
  def index
    @userdevices = Userdevice.all
  end

  # GET /userdevices/1
  # GET /userdevices/1.json
  def show
  end

  # GET /userdevices/new
  def new
    @userdevice = Userdevice.new
  end

  # GET /userdevices/1/edit
  def edit
  end

  # POST /userdevices
  # POST /userdevices.json
  def create
    @userdevice = Userdevice.new(userdevice_params)

    respond_to do |format|
      if @userdevice.save
        format.html { redirect_to @userdevice, notice: 'Userdevice was successfully created.' }
        format.json { render :show, status: :created, location: @userdevice }
      else
        format.html { render :new }
        format.json { render json: @userdevice.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /userdevices/1
  # PATCH/PUT /userdevices/1.json
  def update
    respond_to do |format|
      if @userdevice.update(userdevice_params)
        format.html { redirect_to @userdevice, notice: 'Userdevice was successfully updated.' }
        format.json { render :show, status: :ok, location: @userdevice }
      else
        format.html { render :edit }
        format.json { render json: @userdevice.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /userdevices/1
  # DELETE /userdevices/1.json
  def destroy
    @userdevice.destroy
    respond_to do |format|
      format.html { redirect_to userdevices_url, notice: 'Userdevice was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_userdevice
      @userdevice = Userdevice.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def userdevice_params
      params.require(:userdevice).permit(:user_id, :device_id)
    end
end
