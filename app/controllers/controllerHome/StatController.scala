package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class StatController extends Controller {
    def stat = Action{
        Ok(views.html.controllerHome.stat())
    }
}