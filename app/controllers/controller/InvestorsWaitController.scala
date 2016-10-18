package controllers.controller
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class InvestorsWaitController extends Controller {
    def investorsWait = Action{
        Ok(views.html.controller.investors_wait())
    }
}
