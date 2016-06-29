class ContactsController < ApplicationController
  before_action :set_contact, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /contacts
  # GET /contacts.json
  def index
    @contacts = Contact.all
    @user_id=params[:pid]
    @current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    
  end

  # GET /contacts/1
  # GET /contacts/1.json
  def show
  end

  # GET /contacts/new
  def new
    @contact = Contact.new
    @user_id=params[:pid]
  end

  # GET /contacts/1/edit
  def edit
    @contact=Contact.find(params[:id])
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @user_id=current_admin.id
  end

  # POST /contacts
  # POST /contacts.json
  def create
    current_admin ||=  User.find_by_token(cookies[:token]) if cookies[:token]
    @contact = Contact.new(name:params[:name],user_id:current_admin.id,mobile:params[:mobile],email:params[:email])
    @contact.save
    respond_to do |format|
        format.html { redirect_to "/contacts?pid="+current_admin.id, notice: 'Scheduler was successfully created.' }
    end
  end

  # PATCH/PUT /contacts/1
  # PATCH/PUT /contacts/1.json
  def update
    id=params[:id]
    contact=Contact.find(id)
    if contact
      contact.update_attributes(name:params[:name],email:params[:email],mobile:params[:mobile])
       
    end
    respond_to do |format|
      format.json { render :json => {:code =>0,:msg =>"ok",:redirect_uri =>"/"} }
    end
  end

  # DELETE /contacts/1
  # DELETE /contacts/1.json
  def destroy
    @contact.destroy
    respond_to do |format|
      format.json { render :json => {:code =>0,:msg =>"Device was successfully destroyed.",:redirect_uri =>""} }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_contact
      @contact = Contact.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def contact_params
      params.require(:contact).permit(:name, :mobile, :email)
    end
end
