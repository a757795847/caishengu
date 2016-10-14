package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class EventOutController extends Controller {
    def eventOut = Action{
        Ok(views.html.controllerHome.event_out())
    }
}
