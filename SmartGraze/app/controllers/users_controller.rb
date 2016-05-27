class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token
  # GET /users
  # GET /users.json
  def index
    @users = User.all
  end

  # GET /users/1
  # GET /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end
  
  def logout
     cookies.delete(:token)
     redirect_to root_url, :notice => "已经退出登录"
  end
 
  def login
    cookies.delete(:token)
  end
 
  def register
    if request.get?
       cookies.delete(:token)
    else
      @user = User.new(name: params[:name],password_digest: params[:password],type: 1)
    

      respond_to do |format|
        if @user.save
          @user.update_attributes!(token: SecureRandom.urlsafe_base64)
          format.json {render :json => {:code =>0,:msg =>"注册成功",:redirect_uri =>"/"}}
        else
          format.json {render :json => {:code =>1,:msg =>"注册失败",:redirect_uri =>"/"}}
        end
      end
    end
  end
 
  def create_login_session
    @user = User.find_by_name(params[:name])
    logger.info "OKddddda"
    if @user
      if @user.password_digest==params[:password]
        cookies.permanent[:token] = @user.token
        respond_to do |format|
           format.json {render :json => {:code =>0,:msg =>"登录成功",:redirect_uri =>"/monitor?pid="+@user.id}}
        end
      else
        respond_to do |format|
         format.json {render :json => {:code =>1,:msg =>"登录成功",:errorMsg => "密码不对",:redirect_uri =>"/devices?pid="+@user.id}}
        end
        
      end
    else
      respond_to do |format|
         format.json {render :json => {:code =>1,:msg =>"登录成功",:errorMsg => "用户名不存在",:redirect_uri =>"/devices?pid="+@user.id}}
      end
    end
  end

  # GET /users/1/edit
  def edit
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)
    
    logger.info user_params

    respond_to do |format|
      if @user.save
        @user.update_attributes!(token: SecureRandom.urlsafe_base64)
        format.html { redirect_to @user, notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update_attributes(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      params.require(:user).permit(:name, :email, :password_digest, :remeber_digest,:type)
    end
end
