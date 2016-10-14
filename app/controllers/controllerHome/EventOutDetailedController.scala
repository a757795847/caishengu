package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class EventOutDetailedController extends Controller {
    def eventOutDetailed = Action{
        Ok(views.html.controllerHome.event_out_detailed())
    }
}