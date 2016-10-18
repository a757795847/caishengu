package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class EventWaitController extends Controller {
    def eventWait = Action{
        Ok(views.html.controller.event_wait())
    }
}

