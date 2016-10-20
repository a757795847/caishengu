package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class UserController extends Controller {
    def index = Action {
        Ok(views.html.user.user_index())
    }

    def detail = Action {
        Ok(views.html.user.user_detail())
    }
}
