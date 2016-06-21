require 'test_helper'

class FenceTodevicesControllerTest < ActionController::TestCase
  setup do
    @fence_todevice = fence_todevices(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:fence_todevices)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create fence_todevice" do
    assert_difference('FenceTodevice.count') do
      post :create, fence_todevice: { name: @fence_todevice.name }
    end

    assert_redirected_to fence_todevice_path(assigns(:fence_todevice))
  end

  test "should show fence_todevice" do
    get :show, id: @fence_todevice
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @fence_todevice
    assert_response :success
  end

  test "should update fence_todevice" do
    patch :update, id: @fence_todevice, fence_todevice: { name: @fence_todevice.name }
    assert_redirected_to fence_todevice_path(assigns(:fence_todevice))
  end

  test "should destroy fence_todevice" do
    assert_difference('FenceTodevice.count', -1) do
      delete :destroy, id: @fence_todevice
    end

    assert_redirected_to fence_todevices_path
  end
end
