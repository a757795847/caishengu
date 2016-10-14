package controllers.controllerHome
import play.api._
import play.api.mvc._
/**
  * Created by zlm on 16/10/13.
  */
class ItemWaitController extends Controller {
    def itemWait = Action{
        Ok(views.html.controllerHome.item_wait())
    }
}