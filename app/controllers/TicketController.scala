package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class TicketController extends Controller {
    def index = Action{
        Ok(views.html.ticket.ticket_index())
    }
}
