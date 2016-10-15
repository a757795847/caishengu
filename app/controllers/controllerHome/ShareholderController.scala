package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShareholderController extends Controller {
    def shareholder = Action{
        Ok(views.html.controllerHome.shareholder())
    }
}