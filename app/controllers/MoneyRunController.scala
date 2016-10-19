package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class MoneyRunController extends Controller {
    def index = Action {
        Ok(views.html.money_run.money_run())
    }
}