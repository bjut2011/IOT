require 'test_helper'

class SensorlogsControllerTest < ActionController::TestCase
  setup do
    @sensorlog = sensorlogs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:sensorlogs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create sensorlog" do
    assert_difference('Sensorlog.count') do
      post :create, sensorlog: { value: @sensorlog.value }
    end

    assert_redirected_to sensorlog_path(assigns(:sensorlog))
  end

  test "should show sensorlog" do
    get :show, id: @sensorlog
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @sensorlog
    assert_response :success
  end

  test "should update sensorlog" do
    patch :update, id: @sensorlog, sensorlog: { value: @sensorlog.value }
    assert_redirected_to sensorlog_path(assigns(:sensorlog))
  end

  test "should destroy sensorlog" do
    assert_difference('Sensorlog.count', -1) do
      delete :destroy, id: @sensorlog
    end

    assert_redirected_to sensorlogs_path
  end
end
