class PolygodetailsController < ApplicationController
  before_action :set_polygodetail, only: [:show, :edit, :update, :destroy]

  # GET /polygodetails
  # GET /polygodetails.json
  def index
    @polygodetails = Polygodetail.all
  end

  # GET /polygodetails/1
  # GET /polygodetails/1.json
  def show
  end

  # GET /polygodetails/new
  def new
    @polygodetail = Polygodetail.new
  end

  # GET /polygodetails/1/edit
  def edit
  end

  # POST /polygodetails
  # POST /polygodetails.json
  def create
    @polygodetail = Polygodetail.new(polygodetail_params)

    respond_to do |format|
      if @polygodetail.save
        format.html { redirect_to @polygodetail, notice: 'Polygodetail was successfully created.' }
        format.json { render :show, status: :created, location: @polygodetail }
      else
        format.html { render :new }
        format.json { render json: @polygodetail.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /polygodetails/1
  # PATCH/PUT /polygodetails/1.json
  def update
    respond_to do |format|
      if @polygodetail.update(polygodetail_params)
        format.html { redirect_to @polygodetail, notice: 'Polygodetail was successfully updated.' }
        format.json { render :show, status: :ok, location: @polygodetail }
      else
        format.html { render :edit }
        format.json { render json: @polygodetail.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /polygodetails/1
  # DELETE /polygodetails/1.json
  def destroy
    @polygodetail.destroy
    respond_to do |format|
      format.html { redirect_to polygodetails_url, notice: 'Polygodetail was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_polygodetail
      @polygodetail = Polygodetail.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def polygodetail_params
      params.require(:polygodetail).permit(:lat, :lng)
    end
end
