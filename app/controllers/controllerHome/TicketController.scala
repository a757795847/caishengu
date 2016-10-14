package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class TicketController extends Controller {
    def ticket = Action{
        Ok(views.html.controllerHome.ticket())
    }
}
