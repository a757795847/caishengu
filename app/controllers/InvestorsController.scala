package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class InvestorsController extends Controller {

    def index = Action {
        Ok(views.html.investors.investors_index())
    }

    def detail = Action {
        Ok(views.html.investors.investors_detail())
    }
}
