package controllers

import play.api._
import play.api.mvc._

/**
  * Created by zlm on 16/10/12.
  */
class AdminController extends Controller{

    def admin = Action {
        Ok(views.html.admin())
    }

}
