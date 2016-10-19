package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class EventController extends Controller {

    def index = Action {
        Ok(views.html.event.event_index())
    }

    def out = Action {
        Ok(views.html.event.event_out())
    }

    def waits = Action {
        Ok(views.html.event.event_wait())
    }
}
