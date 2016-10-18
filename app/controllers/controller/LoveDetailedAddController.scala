package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/14.
  */
class LoveDetailedAddController  extends Controller{
    def loveDetailedAdd = Action{
        Ok(views.html.controller.love_detailed_add())
    }
}