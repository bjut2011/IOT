require 'test_helper'

class DmapsControllerTest < ActionController::TestCase
  setup do
    @dmap = dmaps(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:dmaps)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create dmap" do
    assert_difference('Dmap.count') do
      post :create, dmap: { name: @dmap.name }
    end

    assert_redirected_to dmap_path(assigns(:dmap))
  end

  test "should show dmap" do
    get :show, id: @dmap
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @dmap
    assert_response :success
  end

  test "should update dmap" do
    patch :update, id: @dmap, dmap: { name: @dmap.name }
    assert_redirected_to dmap_path(assigns(:dmap))
  end

  test "should destroy dmap" do
    assert_difference('Dmap.count', -1) do
      delete :destroy, id: @dmap
    end

    assert_redirected_to dmaps_path
  end
end
