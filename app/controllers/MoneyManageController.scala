package controllers

import play.api.mvc._

/**
  * Created by zlm on 16/10/13.
  */
class MoneyManageController extends Controller {
    def index = Action {
        Ok(views.html.money_manage.money_manage())
    }
    def details = Action {
        Ok(views.html.money_manage.money_details())
    }
    def history = Action {
        Ok(views.html.money_manage.money_history())
    }
}
