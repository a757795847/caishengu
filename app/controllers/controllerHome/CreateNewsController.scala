package controllers.controllerHome

import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class CreateNewsController extends Controller{
    def createNews = Action{
        Ok(views.html.controllerHome.create_news())
    }
}
