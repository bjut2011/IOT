class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  skip_before_filter :verify_authenticity_token

  # GET /projects
  # GET /projects.json
  def index
    @projects = Project.all
  end

  # GET /projects/1
  # GET /projects/1.json
  def show
  end

  # GET /projects/new
  def new
    @project = Project.new
  end

  # GET /projects/1/edit
  def edit
  end

  # POST /projects
  # POST /projects.json
  def create
    project_name=""
    project_details=""
    if params["project_name"]
      project_name=params["project_name"]
    end
    if params["project_details"]
      project_details=params["project_details"]
    end
    created_time =  Time.now
    
    @project = Project.new(name:project_name,created_time:created_time,project_details:project_details)

    respond_to do |format|
      if @project.save
         format.json {render :json => {:code =>0,:msg =>"创建成功",:redirect_uri =>"/"}}
      else
         format.json {render :json => {:code =>1,:msg =>"创建失败",:redirect_uri =>"/"}}
      end
    end
  end

  # PATCH/PUT /projects/1
  # PATCH/PUT /projects/1.json
  def update
    respond_to do |format|
      if @project.update(project_params)
        format.html { redirect_to @project, notice: 'Project was successfully updated.' }
        format.json { render :show, status: :ok, location: @project }
      else
        format.html { render :edit }
        format.json { render json: @project.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /projects/1
  # DELETE /projects/1.json
  def destroy
    @project.destroy
    respond_to do |format|
      format.html { redirect_to projects_url, notice: 'Project was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_project
      @project = Project.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def project_params
      params.require(:project).permit(:name, :pid, :created_time)
    end
end
