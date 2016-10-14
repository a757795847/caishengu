package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class TributeDetailedController extends Controller {
    def tributeDetailed = Action{
        Ok(views.html.controllerHome.tribute_detailed())
    }
}
