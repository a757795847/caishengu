package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ShareholderListController extends Controller {
    def shareholderList = Action{
        Ok(views.html.controllerHome.shareholder_list())
    }
}
