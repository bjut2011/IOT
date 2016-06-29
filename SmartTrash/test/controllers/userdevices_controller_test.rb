require 'test_helper'

class UserdevicesControllerTest < ActionController::TestCase
  setup do
    @userdevice = userdevices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:userdevices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create userdevice" do
    assert_difference('Userdevice.count') do
      post :create, userdevice: { device_id: @userdevice.device_id, user_id: @userdevice.user_id }
    end

    assert_redirected_to userdevice_path(assigns(:userdevice))
  end

  test "should show userdevice" do
    get :show, id: @userdevice
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @userdevice
    assert_response :success
  end

  test "should update userdevice" do
    patch :update, id: @userdevice, userdevice: { device_id: @userdevice.device_id, user_id: @userdevice.user_id }
    assert_redirected_to userdevice_path(assigns(:userdevice))
  end

  test "should destroy userdevice" do
    assert_difference('Userdevice.count', -1) do
      delete :destroy, id: @userdevice
    end

    assert_redirected_to userdevices_path
  end
end
