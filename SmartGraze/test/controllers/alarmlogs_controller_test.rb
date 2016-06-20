require 'test_helper'

class AlarmlogsControllerTest < ActionController::TestCase
  setup do
    @alarmlog = alarmlogs(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:alarmlogs)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create alarmlog" do
    assert_difference('Alarmlog.count') do
      post :create, alarmlog: { name: @alarmlog.name }
    end

    assert_redirected_to alarmlog_path(assigns(:alarmlog))
  end

  test "should show alarmlog" do
    get :show, id: @alarmlog
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @alarmlog
    assert_response :success
  end

  test "should update alarmlog" do
    patch :update, id: @alarmlog, alarmlog: { name: @alarmlog.name }
    assert_redirected_to alarmlog_path(assigns(:alarmlog))
  end

  test "should destroy alarmlog" do
    assert_difference('Alarmlog.count', -1) do
      delete :destroy, id: @alarmlog
    end

    assert_redirected_to alarmlogs_path
  end
end
