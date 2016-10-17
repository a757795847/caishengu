package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/17.
  */
class StatDataController extends Controller {
    def statData = Action{
        Ok(views.html.controllerHome.stat_data())
    }
}
