package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/17.
  */
class StatActionController extends Controller {
    def statAction = Action{
        Ok(views.html.controllerHome.stat_action())
    }
}
