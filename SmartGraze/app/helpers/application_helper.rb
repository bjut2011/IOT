module ApplicationHelper
   def current_admin
    logger.info "1234567"
    logger.info  User.find_by_token(cookies[:token])
    logger.info cookies[:token]
    @current_admin ||= 	User.find_by_token(cookies[:token]) if cookies[:token]
  end
end
