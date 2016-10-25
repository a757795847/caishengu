package controllers

import play.api._
import play.api.mvc._

class HomepageController extends Controller{
    def homepage = Action{
        Ok(views.html.homepage.homepage())

    }

}
