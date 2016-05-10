require 'test_helper'

class DevicesControllerTest < ActionController::TestCase
  setup do
    @device = devices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:devices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create device" do
    assert_difference('Device.count') do
      post :create, device: { create_time: @device.create_time, device_details: @device.device_details, device_img: @device.device_img, device_mark: @device.device_mark, device_name: @device.device_name, lat: @device.lat, lon: @device.lon, project_id: @device.project_id }
    end

    assert_redirected_to device_path(assigns(:device))
  end

  test "should show device" do
    get :show, id: @device
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @device
    assert_response :success
  end

  test "should update device" do
    patch :update, id: @device, device: { create_time: @device.create_time, device_details: @device.device_details, device_img: @device.device_img, device_mark: @device.device_mark, device_name: @device.device_name, lat: @device.lat, lon: @device.lon, project_id: @device.project_id }
    assert_redirected_to device_path(assigns(:device))
  end

  test "should destroy device" do
    assert_difference('Device.count', -1) do
      delete :destroy, id: @device
    end

    assert_redirected_to devices_path
  end
end
