package controllers

import play.api._
import play.api.mvc._
class AdminTestController extends Controller{
    def admin = Action{
        Ok(views.html.admin())

    }
}
