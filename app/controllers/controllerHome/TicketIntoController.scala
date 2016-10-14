package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class TicketIntoController extends Controller {
    def ticketInto = Action{
        Ok(views.html.controllerHome.ticket_into())
    }
}
