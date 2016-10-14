package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class InvestorsListController extends Controller {
    def investorsList = Action{
        Ok(views.html.controllerHome.investors_list())
    }
}
