package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/14.
  */
class LoveDetailedAddController  extends Controller{
    def loveDetailedAdd = Action{
        Ok(views.html.controllerHome.love_detailed_add())
    }
}