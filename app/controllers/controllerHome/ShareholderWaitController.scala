package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShareholderWaitController extends Controller {
    def shareholderWait = Action{
        Ok(views.html.controllerHome.shareholder_wait())
    }
}