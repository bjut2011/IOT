require 'test_helper'

class PolygodetailsControllerTest < ActionController::TestCase
  setup do
    @polygodetail = polygodetails(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:polygodetails)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create polygodetail" do
    assert_difference('Polygodetail.count') do
      post :create, polygodetail: { lat: @polygodetail.lat, lng: @polygodetail.lng }
    end

    assert_redirected_to polygodetail_path(assigns(:polygodetail))
  end

  test "should show polygodetail" do
    get :show, id: @polygodetail
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @polygodetail
    assert_response :success
  end

  test "should update polygodetail" do
    patch :update, id: @polygodetail, polygodetail: { lat: @polygodetail.lat, lng: @polygodetail.lng }
    assert_redirected_to polygodetail_path(assigns(:polygodetail))
  end

  test "should destroy polygodetail" do
    assert_difference('Polygodetail.count', -1) do
      delete :destroy, id: @polygodetail
    end

    assert_redirected_to polygodetails_path
  end
end
