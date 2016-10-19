package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class StatController extends Controller {
    def index = Action {
        Ok(views.html.stat.stat_index())
    }

    def action = Action {
        Ok(views.html.stat.stat_action())
    }

    def data = Action {
        Ok(views.html.stat.stat_data())
    }
}
