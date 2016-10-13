package controllers

import play.api._
import play.api.mvc._
class LoginController extends Controller{
    def login = Action{
        Ok(views.html.admin_test())

    }
}
