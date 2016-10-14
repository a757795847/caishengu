package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class MoneyRunController extends Controller {
    def moneyRun = Action{
        Ok(views.html.controllerHome.money_run())
    }
}