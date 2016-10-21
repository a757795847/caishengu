package controllers

import play.api._
import play.api.mvc._

class MyactivitiesController extends Controller{
    def myactivities = Action{
        Ok(views.html.myactivities.myactivities())

    }
}
