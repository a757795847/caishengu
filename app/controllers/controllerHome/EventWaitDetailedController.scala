package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class EventWaitDetailedController extends Controller {
    def eventWaitDetailed = Action{
        Ok(views.html.controllerHome.event_wait_detailed())
    }
}

