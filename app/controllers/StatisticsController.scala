package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class StatisticsController extends Controller {
    def index = Action {
        Ok(views.html.stat.statistics_index())
    }

    def action = Action {
        Ok(views.html.stat.statistics_action())
    }

    def data = Action {
        Ok(views.html.stat.statistics_data())
    }
}
