package controllers

import play.api._
import play.api.mvc._
/**
  * Created by admin3 on 16/10/21.
  */
class MyprojectController extends Controller{
    def myproject = Action {
        Ok(views.html.myproject.my_project())

    }
    def details = Action {
        Ok(views.html.myproject.my_project_details())

    }

}
